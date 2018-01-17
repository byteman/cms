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
          <el-select v-model="batchUploadDb" placeholder="请选择底库" :maxlength="10" class="database-num2">
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
            ref="upload"
            :action="upload_url"
            accept=".zip"
            :auto-upload="false"
            :show-file-list="true"
            :before-upload="handleBeforeUpload"
            :on-success='handleSuccess'
            :on-progress="updateZipPag"
            :on-exceed="handleExceed"
            :on-preview="handlePreview"
            :on-error="updateZipError"
            :file-list="upload_file_list">
            <el-button size="large" type="primary" class="btn-distance database-num2">选择上传（仅支持zip文件）</el-button>
            <!--<div slot="tip" class="el-upload__tip">{{ upload_message }}</div>-->
            <div slot="tip" class="el-upload__tip">图片命名格式: <span class="redTip">姓名-用户id</span>-部门-性别-民族-籍贯-生日</div>
            <div slot="tip" class="el-upload__tip">红色部分为必选，图片仅支持jpg/png/bmp格式</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button plain type="primary" @click="updateZipPag">上传</el-button>
        <el-button plain @click="upload_show = false">关闭</el-button>
      </span>
    </el-dialog>

    <!--底裤新增单张人脸-->
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
            <el-select v-model="devform.selectdb" placeholder="请选择底库" :maxlength="10" class="database-num1">
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
              <img id="giftImg" :src="devform.face_avatar_url" class="avatar1">
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
  import {GetGroup, QueryFaceList, AddFace, DeleteFace} from "@/api/sysconfig";
  import {Base64ToImage} from "@/api/snap";
  import ElInput from "element-ui/packages/input/src/input";

  export default {
    components: {
      ElInput
    },
    data() {
      let name_validator = (rule, value, callback) => {
        // console.log(value);
        if (!value) {
          callback(new Error("姓名不能为空"));
        } else {
          callback();
        }
      };
      let sex_validator = (rule, value, callback) => {
        if (!value) {
          callback(new Error("请选择性别"));
        } else {
          callback();
        }
      };
      let dk_validator = (rule, value, callback) => {
        if (value.length === 0) {
          callback(new Error("底库不能为空"));
        } else {
          callback();
        }
      };
      let pic_validator = (rule, value, callback) => {
        if (!value) {
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
        upload_form: {},   // 上传至底库
        upload_url: "",
        upload_message: "",
        face_title: "",
        face_show: false,
        face: {},
        face_avatar_url: "",
        face_dlg_btn_name: "",
        batchUploadDb: "",  // 批量上传底库
        // 表单验证
        devform: {
          name: "", // 姓名
          birthday: "", // 生日
          gender: "男", // 性别
          selectdb: "", // 底库
          face_avatar_url: "/static/boyAvaster.png"  // url
        },
        rules: {
          name: [
            {required: true, validator: name_validator, trigger: "blur"},
            {min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur"}
          ],
          gender: [{required: true, validator: sex_validator, trigger: "blur"}],
          dboptions: [
            {required: true, validator: dk_validator, trigger: "blur"}
          ],
          face_avatar_url: [
            {required: true, validator: pic_validator, trigger: "blur"}
          ]
        }
      };
    },
    created() {

    },
    mounted() {
      this.loading = true;
      this.upload_url = process.env.BASE_API + "/system/increaseLib";
      // this.upload_url = 'http://' + location.hostname + ':8887' + "/system/increaseLib";
      GetGroup(80001)
        .then(response => {
          const tmpList = response.data.data.group_ids;
          tmpList.forEach( item => {
            item.value = item.id;
            item.label = item.id + "(" + item.group_name + ")";
          });
          this.dboptions = tmpList;
          this.onRefresh();   // 获取查询数据列表
        })
        .catch(() => {
          this.$message.error('获取数据失败,请检查服务器！')
        });
    },
    methods: {
      // 上传单张人脸
      beforeUpload(file) {
        return false
      },
      // 上传后文件可以预览
      handlePreview(file) {
        console.log(file);
      },

      updateZipError(err, file, fileList) {
        console.log(err);
        // console.log(file);
        // console.log(fileList);
        // if (err !== 0) {
          // this.upload_message = "上传文件:" + JSON.stringify(res);
        // }
      },

      changeFile(file) {
        let This = this;
        let reader = new FileReader();
        reader.readAsDataURL(file.raw);
        reader.onload = function () {
          This.devform.face_avatar_url = this.result;
        };
      },
      // 上传文件时的处理函数
      updateZipPag(event, file, fileList){
        if (!this.batchUploadDb){
          this.$message.error("请选择上传底库！");
          return;
        }

        this.$refs.upload.submit();  // 上传文件
        // this.$confirm('确认上传文件包？, 是否继续?', '提示', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        //
        // }).then(() => {
        //   this.$message({
        //     type: 'success',
        //     message: '上传成功!'
        //   })
        // }).catch(() => {
        //   this.$message({
        //     type: 'info',
        //     message: '取消上传！'
        //   })
        // })
      },
      // 刷新列表
      onRefresh() {
        let starttime = null;
        let endtime = null;
        let staticDBId = null;
        let userId = null;
        if (this.selectdb) {
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
            tmpList.forEach( item => {
              item.aligndata = Base64ToImage(item.img);
              if (!item.gender) {
                item.gender = '未知'
              }
              if (!item.birthday) {
                item.birthday = '未知'
              } else {
                item.birthday = item.birthday.slice(0, item.birthday.indexOf("T"))
              }
            });
            this.list = tmpList;
            this.total = parseInt(response.data.data.total);
            this.loading = false;
          })
          .catch(() => {
            this.list = [];
            this.total = 0;
            this.loading = false;
            this.$message.error("获取数据失败,请检查服务器！")
          });
      },
      handleSelectDbChange() {
        this.onRefresh();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.onRefresh();
      },
      // 新增人脸弹窗
      onAdd() {
        this.face_title = "底库新增人脸";
        this.face_show = true;
        this.face_dlg_btn_name = "新增";
      },
      // 导入人脸弹窗
      onImport() {
        this.upload_show = true;
        this.upload_form.group_id = this.batchUploadDb;  // 上传底库
        this.upload_file_list = [];
      },
      // 删除单张人脸
      handleDelete(row) {
        this.$confirm("确认删除该条人脸信息, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            DeleteFace(row.staticDBId, row.id)
              .then(response => {
                if (response.data.result === 0){
                  this.$message.success("删除人脸成功!")
                  this.onRefresh();
                } else {
                  this.$message.success("删除人脸失败!")
                }
              })
              .catch(() => {
                this.$message.error("删除人脸失败或请求超时！");
              });
          })
          .catch(() => {
            this.$message.info({
              message: "取消删除人脸！"
            });
          });
      },
      handleBeforeUpload(file) {
        console.log(file);
        if (!this.batchUploadDb) {
          // debugger;
          this.$message.error("底库不能为空，请选择底库后重试");
          return ;
        }
        let zipReg = /^\S+\.zip$/;
        if (!zipReg.test(file.name)) {
          this.$message.error("请上传后缀为.zip的压缩包文件！");
          return ;
        }
        if(!file){
          this.$message.error("上传文件不能为空，请选择文件后重试！");
          return;
        }
        },
      // 上传压缩包
      handleSuccess(res, file, fileList) {
        console.log(res);
        if (res.result !== 0) {
          this.$message.error("上传文件失败！")
          this.upload_file_list.shift();
        } else {
          this.batchUploadDb = "";  // 清空底库
          this.$message.success("上传文件成功！");
          this.onRefresh();
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
      // 新增单张人脸
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            let mStaticDBId = this.devform.selectdb;
            let mImg = this.devform.face_avatar_url.substring(
              this.devform.face_avatar_url.indexOf(",") + 1
            );
            let mBirthday = this.devform.birthday;
            let mGender = this.devform.gender;
            let mName = this.devform.name;

            AddFace(mStaticDBId, mImg, mBirthday, mGender, mName)
              .then(response => {
                if (response.data.result) {
                  this.$message.error("新增人脸失败！");
                  return false;
                } else {
                  this.devform.birthday = '';
                  this.devform.gender = '男';
                  this.devform.name = '';
                  this.devform.face_avatar_url = '/static/boyAvaster.png';
                  this.devform.selectdb = '';
                  this.onRefresh();
                }
              })
              .catch(() => {
                this.$message.error("新增人脸失败");
              });
            this.face_show = false;
          } else {
            this.$message.warning({
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
    margin-top: 30px;
    width: 120px;
    height: 120px;
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
    padding: 24px;
    background-color: rgb(248, 249, 248);
    height: 80px;
  }

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
    width: 30%;
    vertical-align: bottom;
    margin: 0 auto;
    display: block;
  }
</style>
