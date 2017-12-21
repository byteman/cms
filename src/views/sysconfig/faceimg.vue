<template>
  <div class="container">
    <div class="header">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="底库选择">
          <el-select v-model="selectdb" placeholder="请输入相机编号" @change="handleSelectDbChange">
            <el-option
              v-for="item in dboptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button plain @click="onAdd">新增人脸</el-button>
        </el-form-item>
        <el-form-item>
          <el-button plain @click="onImport">批量导入</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="content">

      <el-table :data="list" v-loading="loading" element-loading-text="加载中,请等待">

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
            <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
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

    <el-dialog title='底库批量导入人脸' :visible.sync="upload_show" width="30%" center>
      <el-form ref="form" label-width="100px">
        <el-form-item label="底库编号">
          <el-input v-model="upload_form.group_id" readonly="readonly"></el-input>
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
            :file-list="upload_file_list">
            <el-button size="small" type="primary">选择上传（仅支持zip文件）</el-button>
            <div slot="tip" class="el-upload__tip">{{ upload_message }}</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="upload_show = false">关闭</el-button>
      </span>
    </el-dialog>

    <el-dialog :title="face_title" :visible.sync="face_show" width="50%" center>
      <el-form ref="form" :model="face" label-width="100px">

        <el-col :span="11">

          <el-form-item label="姓名">
            <el-input v-model="face.name"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-input v-model="face.gender"></el-input>
          </el-form-item>
          <el-form-item label="生日">
            <el-input v-model="face.birthday"></el-input>
          </el-form-item>

        </el-col>

        <el-col :span="11">

          <el-form-item label="头像">
            <input ref="file" type="file" @change="handleFileChange"/>
            <img class="face-avatar" :src="face.avatar"/>
          </el-form-item>

        </el-col>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="face_show = false">取 消</el-button>
        <el-button type="primary" @click="onFaceBtnClick">{{face_dlg_btn_name}}</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import {
    GetGroup,
    QueryFaceList
  } from "@/api/sysconfig"
  import {
    Base64ToImage
  } from '@/api/snap'
  import {
    VueImgInputer
  } from 'vue-img-inputer'
  import ElInput from "element-ui/packages/input/src/input";

  export default {
    name: 'app',
    components: {
      ElInput,
      VueImgInputer
    },
    data() {
      return {
        loading: false,
        total: 50,
        currentPage: 1,
        selectdb: '',
        dboptions: [],
        list: [],
        upload_show: false,
        upload_file_list: [],
        upload_form: {},
        upload_url: '',
        upload_message: '',
        face_title: '',
        face_show: false,
        face: {},
        face_dlg_btn_name: '',
        face_image_url: '',
        face_image_visible: false,
        file: ''
      }
    },
    created() {
      console.log('face image page created')
    },
    mounted() {
      this.loading = true
      this.upload_url = process.env.BASE_API + '/system/increaseLib'
      GetGroup(80001)
        .then(response => {
          const tmpList = response.data.data.group_ids
          tmpList.forEach(function (item) {
            item.value = item.id
            item.label = item.id + '(' + item.group_name + ')'
          })
          this.dboptions = tmpList
          console.log(this.dboptions)
        })
        .catch(() => {
        })
      this.onRefresh()
    },
    methods: {
      onRefresh() {
        let starttime = null
        let endtime = null
        let staticDBId = null
        let userId = null

        if (this.selectdb !== 0) {
          staticDBId = this.selectdb
        }

        this.loading = true
        QueryFaceList(this.currentPage.toString(), '10', starttime, endtime, staticDBId, userId)
          .then(response => {
            this.list = []
            this.total = 0
            const tmpList = response.data.data.list
            tmpList.forEach(function (item) {
              item.aligndata = Base64ToImage(item.img)
            })
            this.list = tmpList
            this.total = parseInt(response.data.data.total)
            this.loading = false
            console.log(this.list)
          })
          .catch(() => {
            this.list = []
            this.total = 0
            this.loading = false
            console.log('error')
          })
      },
      handleSelectDbChange() {
        this.onRefresh()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.onRefresh()
      },
      onAdd() {
        if (this.selectdb !== '') {
          this.face_title = '底库新增人脸'
          this.face_show = true
          this.face = {}
          this.face_dlg_btn_name = '新 增'
        } else {
          this.$message('底库为空，请选择底库后重试')
        }
      },
      onImport() {
        if (this.selectdb !== '') {
          this.upload_show = true
          this.upload_form.group_id = this.selectdb
          this.upload_file_list = []
        } else {
          this.$message('底库为空，请选择底库后重试')
        }
      },
      handleDelete(row) {
        this.$confirm('确认删除该设备, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      },
      handleEdit(row) {
        this.face_title = '底库修改人脸'
        this.face_show = true
        this.face.name = row.name
        this.face.gender = row.gender
        this.face.birthday = row.birthday
        this.face.avatar = row.aligndata
        this.face_image_visible = true
        this.face_dlg_btn_name = '修 改'
      },
      handleBeforeUpload(file) {
        this.upload_message = ''
      },
      handleSuccess(res, file, fileList) {
        if (res.status !== 0) {
          this.upload_message = '失败反馈:' + JSON.stringify(res)
        }
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
      },
      handleFileChange(event) {
        console.log(this.$refs.file.files)
        let files = this.$refs.file.files
        const data = new FormData();
        data.append('logo', files[0]);
        console.log(data.get());
      },
      handleRemove(file, fileList) {
        console.log(file, fileList)
      },
      onFaceBtnClick() {
      }
    }
  }
</script>

<style scoped>
  .container {
    width: 99%;
    margin: 0 auto;
    border: 1px solid #dfe6ec;
    min-height: 600px;

  }

  .el-form {

    overflow: hidden;
  }

  .content {
    width: 97%;
    margin: 0px auto;
  }

  .header {
    /* margin-top:10px;
     line-height:50px;
    margin-bottom: 10px; */
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
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .face-avatar {
    height: 120px;
    display: block;
  }

  .avatar {
    height: 88px
  }


</style>
