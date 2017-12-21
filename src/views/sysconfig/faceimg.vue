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
      <el-form ref="devform" :model="face" label-width="100px" :rules="rules">

        <el-col :span="11">

          <el-form-item label="姓名">
            <el-input v-model="face.name" :maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-input v-model="face.gender" :maxlength="10"></el-input>
          </el-form-item>
          <el-form-item label="生日" prop="birthday">
            <el-input v-model="face.birthday"  :maxlength="10"></el-input>
          </el-form-item>

        </el-col>

        <el-col :span="11">

          <el-form-item label="头像">
            <el-upload
              class="drag-avatar-upload"
              action=""
              drag
              :before-upload="beforeUpload"
              :on-change="changeFile">
              <img id="giftImg" v-bind:src="face_avatar_url" class="avatar1">
              <div class="el-upload__text">将图片拖到此处，或<em>点击上传</em></div>
            </el-upload>
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
    QueryFaceList,
    AddFace,
    DeleteFace
  } from "@/api/sysconfig"
  import {
    Base64ToImage
  } from "@/api/snap"
  import ElInput from "element-ui/packages/input/src/input"

  export default {
    components: {
      ElInput
    },
    data() {
      var birthday_validator = (rule, value, callback) => {
        var re = /^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/
        console.log(value)
        console.log(re.test(value))
        if (!re.test(value)) {
          callback(new Error('日期必须为正确日期，如：2012-01-30'))
        } else {
          callback()
        }
      }

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
        face_avatar_url: '',
        face_dlg_btn_name: '',

        rules: {
          birthday: [{validator: birthday_validator, trigger: 'blur'}]
        }
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
      beforeUpload(file) {
        return false
      },
      changeFile(file, fileList) {
        var This = this
        var reader = new FileReader()
        reader.readAsDataURL(file.raw)
        reader.onload = function (e) {
          This.face_avatar_url = this.result
        }
      },
      onRefresh() {
        let starttime = null
        let endtime = null
        let staticDBId = null
        let userId = null

        if (this.selectdb !== 0) {
          staticDBId = this.selectdb
        }

        this.loading = true
        QueryFaceList(
          this.currentPage.toString(),
          '10',
          starttime,
          endtime,
          staticDBId,
          userId
        )
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
          console.log(this.selectdb)
          this.face_title = '底库新增人脸'
          this.face_show = true
          this.face = {}
          this.face.staticDBId = this.selectdb
          this.face_avatar_url = ''
          this.face_dlg_btn_name = '新 增'
        } else {
          this.$message('底库为空，请选择底库后重试')
        }
        console.log(this.selectdb)
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
            console.log(row.staticDBId, row.id)
            DeleteFace(row.staticDBId, row.id)
              .then(response => {
                this.$message({
                  type: 'info',
                  message: '删除人脸结果:' + response.data.info
                })
                this.onRefresh()
              })
              .catch(() => {
                this.$message({
                  type: 'info',
                  message: '删除人脸异常'
                })
              })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
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
        this.$message.warning(
          `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length +
          fileList.length} 个文件`
        )
      },
      handleRemove(file, fileList) {
        console.log(file, fileList)
      },
      onFaceBtnClick() {
        console.log('aa')
        if (this.face_dlg_btn_name === '新 增') {
          console.log('bb')
          this.$refs.devform.validate(valid => {
            console.log('cc')
            if (valid) {
              console.log('kk')
              let mStaticDBId = null
              let mImg = null
              let mBirthday = null
              let mGender = null
              let mName = null
              if (this.face.staticDBId !== null && this.face.staticDBId.length > 0) {
                mStaticDBId = this.face.staticDBId
              }
              if (this.face_avatar_url !== null && this.face_avatar_url.length > 0) {
                mImg = this.face_avatar_url.substring(23)
              }
              if (this.face.birthday !== null && this.face.birthday.length > 0) {
                mBirthday = this.face.birthday
              }
              if (this.face.gender !== null && this.face.gender.length > 0) {
                mGender = this.face.gender
              }
              if (this.face.name !== null && this.face.name.length > 0) {
                mName = this.face.name
              }
              AddFace(mStaticDBId, mImg, mBirthday, mGender, mName)
                .then(response => {
                  this.$message({
                    type: 'info',
                    message: '新增人脸结果:' + response.data.info
                  })
                  this.onRefresh()
                })
                .catch(() => {
                  this.$message({
                    type: 'info',
                    message: '新增人脸异常'
                  })
                })
              this.face_show = false
            } else {
              console.log('gg')
            }
          })
        }
      }
    }
  }
</script>

<style scoped>
  .avatar1 {
    margin-top: 20px;
    width: 120px;
    height: 90px;
    border: none;
  }

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
    border-color: #409eff;
  }

  .avatar {
    height: 88px;
  }
</style>
