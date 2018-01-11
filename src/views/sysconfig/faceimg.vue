<template>
  <div class="container">
    <div class="header">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="选择查询底库">
          <el-select v-model="selectdb" placeholder="请选择底库编号" @change="handleSelectDbChange">
            <el-option
              v-for="item in dboptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button plain @click="onAdd" type="primary">新增人脸</el-button>
        </el-form-item>
        <el-form-item>
          <el-button plain @click="onImport" type="success">批量导入</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="content">
      <el-table :data="list" v-loading="loading" element-loading-text="努力加载中。。。,请稍等！">
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="aligndata" label="头像" align='center'>
          <template slot-scope="scope">
            <img class="avatar" :src="scope.row.aligndata"/>
          </template>
        </el-table-column>
        <el-table-column prop="gender" label="性别"></el-table-column>
        <el-table-column prop="birthday" label="生日"></el-table-column>
        <el-table-column prop="staticDBId" label="所在底库"></el-table-column>
        <el-table-column label="操作" width="300" align='center'>
          <template slot-scope="scope">
            <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="footer">
        <div class="block">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            layout="prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </div>
    </div>

    <!--底库批量导入人脸-->
    <el-dialog title='批量导入人脸进底库' :visible.sync="upload_show" width="25%" center>
      <el-form ref="form" label-width="100px">
        <el-form-item label="底库">
          <el-select v-model="selectdb" placeholder="请选择底库" @change="handleSelectDbChange" :maxlength="10"
                     class="database-num2">
            <el-option
              v-for="item in dboptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="图片压缩包">
          <el-upload
            class="upload"
            :data="upload_form"
            :limit="1"
             :action="upload_url"
             accept=".zip"
            :before-upload="handleBeforeUpload"
            :on-success='handleSuccess'
            :on-exceed="handleExceed"
            :on-preview="handlePreview"
            :auto-upload="true"
            :file-list="upload_file_list">
            <el-button size="large" type="primary" class="btn-distance database-num2">选择上传（仅支持zip文件）</el-button>
            <div slot="tip" class="el-upload__tip">{{ upload_message }}</div>
            <div slot="tip" class="el-upload__tip">图片命名格式: <span class="redTip">姓名-用户id</span>-部门-性别-民族-籍贯-生日</div>
            <div slot="tip" class="el-upload__tip">红色部分为必选，图片仅支持jpg/png/bmp格式</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="upload_show = false">关闭</el-button>
      </span>
    </el-dialog>

    <!--底裤新增人脸-->
    <el-dialog :title="face_title" :visible.sync="face_show" width="50%" center>
      <el-form ref="devform" :model="devform" label-width="100px" :rules="rules">
        <el-col :span="11">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="devform.name" placeholder="请输入姓名" :maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-radio v-model="devform.gender" label="男">男</el-radio>
            <el-radio v-model="devform.gender" label="女">女</el-radio>
          </el-form-item>
          <el-form-item label="生日">
            <el-date-picker
              v-model="devform.birthday"
              type="date"
              placeholder="请选择出生年月" class="date-seletor">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="底库" prop="selectdb">
            <el-select v-model="devform.selectdb" placeholder="请选择底库" @change="handleSelectDbChange" :maxlength="10"
                       class="database-num1">
              <el-option
                v-for="item in dboptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="11">
          <el-form-item label="头像" prop="face_avatar_url">
            <el-upload
              class="drag-avatar-upload"
              drag
              action=""
              :before-upload="beforeUpload"
              :on-change="changeFile">
              <img id="giftImg" v-bind:src="devform.face_avatar_url" class="avatar1">
              <div class="el-upload__text">将图片拖到此处，或<em>点击上传</em></div>
            </el-upload>
          </el-form-item>
        </el-col>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="face_show = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('devform')">{{face_dlg_btn_name}}</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { GetGroup, QueryFaceList, AddFace, DeleteFace } from "@/api/sysconfig";
import { Base64ToImage } from "@/api/snap";
import ElInput from "element-ui/packages/input/src/input";

export default {
  components: {
    ElInput
  },
  data() {
    var name_validator = (rule, value, callback) => {
      // console.log(value);
      if (value === "") {
        callback(new Error("姓名不能为空"));
      } else {
        callback();
      }
    };
    var sex_validator = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请选择性别"));
      } else {
        callback();
      }
    };
    var dk_validator = (rule, value, callback) => {
      // console.log(value);
      if (value === "") {
        callback(new Error("底库不能为空"));
      } else {
        callback();
      }
    };
    var pic_validator = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("图片不能为空"));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      total: 50,
      currentPage: 1,
      selectdb: "",
      dboptions: [],
      list: [],    // 列表数据
      upload_show: false,
      upload_file_list: [],
      upload_form: {},
      upload_url: "",
      upload_message: "",
      face_title: "",
      face_show: false,
      face: {},
      face_avatar_url: "",
      face_dlg_btn_name: "",
      // 表单验证
      devform: {
        name: "", // 姓名
        birthday: "", // 生日
        gender: "男", // 性别
        selectdb: "", // 底库
        face_avatar_url: "" // url
      },
      rules: {
        name: [
          { required: true, validator: name_validator, trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" }
        ],
        gender: [{ required: true, validator: sex_validator, trigger: "blur" }],
        selectdb: [
          { required: true, validator: dk_validator, trigger: "blur" }
        ],
        face_avatar_url: [
          { required: true, validator: pic_validator, trigger: "blur" }
        ]
      }
    };
  },
  created() {

  },
  mounted() {
    this.loading = true;
    // this.upload_url = process.env.BASE_API + "/system/increaseLib";
    this.upload_url = 'http://' + location.hostname + ':8887'+ "/system/increaseLib";
    GetGroup(80001)
      .then(response => {
        const tmpList = response.data.data.group_ids;
        tmpList.forEach(function(item) {
          item.value = item.id;
          item.label = item.id + "(" + item.group_name + ")";
        });
        this.dboptions = tmpList;
        console.log(this.dboptions);
      })
      .catch(() => {});
    this.onRefresh();   // 获取查询数据列表
  },
  methods: {
    beforeUpload(file) {
      return false
    },
    handlePreview(file){
      console.log(file);},
    changeFile(file, fileList) {
      var This = this;
      var reader = new FileReader();
      reader.readAsDataURL(file.raw);
      reader.onload = function(e) {
        This.devform.face_avatar_url = this.result;
      };
    },
    onRefresh() {
      let starttime = null;
      let endtime = null;
      let staticDBId = null;
      let userId = null;

      if (this.selectdb !== 0) {
        staticDBId = this.selectdb;
      }

      this.loading = true;
      // 查询列表
      QueryFaceList(
        this.currentPage.toString(),
        "10",
        starttime,
        endtime,
        staticDBId,
        userId)
        .then(response => {
          this.list = [];
          this.total = 0;
          const tmpList = response.data.data.list;
          console.log(tmpList);
          tmpList.forEach(function(item) {
            item.aligndata = Base64ToImage(item.img);
            if(!item.gender){item.gender='未知'};
            if(!item.birthday){item.birthday='未知'};
          });
          this.list = tmpList;
          // console.log(this.list);
          this.total = parseInt(response.data.data.total);
          this.loading = false;
        })
        .catch(() => {
          this.list = [];
          this.total = 0;
          this.loading = false;
        });
    },
    handleSelectDbChange() {
      this.onRefresh();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.onRefresh();
    },
    // 新增人脸
    onAdd() {
      this.face_title = "底库新增人脸";
      this.face_show = true;
      // this.face = {}
      this.devform.selectdb = this.selectdb;
      // this.face_avatar_url = ''
      this.face_dlg_btn_name = "新 增";
    },
    onImport() {
      this.upload_show = true;
      this.upload_form.group_id = this.selectdb;
      this.upload_file_list = [];
    },
    handleDelete(row) {
      this.$confirm("确认删除该设备, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          console.log(row.staticDBId, row.id);
          DeleteFace(row.staticDBId, row.id)
            .then(response => {
              this.$message({
                type: "info",
                message: "删除人脸结果:" + response.data.info
              });
              this.onRefresh();
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "删除人脸异常"
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleBeforeUpload(file) {
      if (!this.selectdb) {
        this.$message("底库为空，请选择底库后重试");
        return false;
      }
      var zipReg = /^\S+\.zip$/;
      if (!zipReg.test(file.name)) {
        this.$message("请上传后缀为.zip的压缩包文件！");
        return false;
      } else {
        return true;
      }
      this.upload_message = "";
    },
    handleSuccess(res, file, fileList) {
      if (res.status !== 0) {
        this.upload_message = "失败反馈:" + JSON.stringify(res);
      }
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length +
          fileList.length} 个文件`
      );
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },

    submitForm(formName) {
      // console.log(formName);
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.devform.birthday);
          console.log(this.devform.face_avatar_url);
          console.log(this.devform.gender);
          console.log(this.devform.name);
          console.log(this.devform.selectdb);

          let mStaticDBId = null;
          let mImg = null;
          let mBirthday = null;
          let mGender = null;
          let mName = null;

          if (this.devform.selectdb) {
            mStaticDBId = this.devform.selectdb;
          }

          if (this.devform.face_avatar_url) {
            mImg = this.devform.face_avatar_url.substring(
              this.devform.face_avatar_url.indexOf(",") + 1
            );
          }
          if (this.devform.birthday) {
            mBirthday = this.devform.birthday;
          }
          if (this.devform.gender) {
            mGender = this.devform.gender;
          }
          if (this.devform.name) {
            mName = this.devform.name;
          }

          AddFace(mStaticDBId, mImg, mBirthday, mGender, mName)
            .then(response => {
              this.$message({
                type: "info",
                message: "新增人脸结果成功"
              });
              this.onRefresh();
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "新增人脸异常"
              });
            });
          this.face_show = false;
        } else {
          this.$message({
            message: "请正确填写信息！"
          });
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.avatar1 {
  margin-top: 20px;
  width: 120px;
  height: 90px;
  border: none;
}
.date-seletor {
  width: 310px;
}
.redTip {
  color: #f56c6c;
  font-weight: bold;
}

.container {
  width: 100%;
  margin: 0 auto;
  border: 1px solid #dfe6ec;
  min-height: 600px;
  background: #fff;
}

.el-dialog__body {
  padding: 25px 25px 0 !important;
}

.database-num1 {
  width: 310px;
}

.database-num2 {
  width: 250px;
}

.el-form {
  overflow: hidden;
}

.content {
  width: 97%;
  margin: 0px auto;
}

.el-upload__tip {
  margin: 0;
  line-height: 20px;
}

.btn-distance {
  margin-bottom: 20px;
}

.header {
  /* margin-top:10px;
       line-height:50px;
      margin-bottom: 10px; */
  padding: 24px;

  background-color: rgb(248, 249, 248);
  height: 80px;
}

/*.drag-avatar-upload{*/
/*height: 225px!important;*/
/*}*/
.footer {
  height: 50px;
  margin-top: 10px;
  margin-right: 90px;
  text-align: right;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar {
  height: 88px;
}
</style>
