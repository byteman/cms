<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span style="line-height: 36px;">{{title}}</span>
    </div>
    <el-form :model="param" :rules="rules" ref="devform" label-width="150px">
      <el-col :span="23">
        <el-form-item label="相机编号(ID)" prop="cameraId">
          <el-input v-model="param.cameraId" disabled></el-input>
        </el-form-item>
        <el-form-item label="管理平台地址" prop="platformURL">
          <el-input v-model="param.platformURL"></el-input>
        </el-form-item>
        <el-form-item label="Socket端口号" prop="socketPort">
          <el-input v-model="param.socketPort" type="number"></el-input>
        </el-form-item>
        <el-form-item label="状态维持时间(秒)" prop="statusKeepTimes">
          <el-input v-model="param.statusKeepTimes" type="number"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="restoreSettings">一键还原出厂设置</el-button>
          <el-button type="info" @click="checkPlatFormStatus">校验后台在线状态</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">设 置</el-button>
        </el-form-item>
      </el-col>
    </el-form>
  </el-card>
</template>

<script>

import { GetSysConfigParam,  SetSysConfigParam} from '@/api/sysconfig'

export default {

  props: ['data', 'title', 'btnName', 'type'],

  data() {
    return {
      param:{
          cameraId: '1',
          platformURL: 3000,
          socketPort: 3000,
          statusKeepTimes: 0,
      },
      rules: {
        cameraId: [
          { required: false, message: '请输入相机编号'}
        ],
        platformURL: [
          { required: true, message: '请输入管理平台地址'}
        ],
        socketPort: [
          { required: true, message: '请输入Socket端口号'}
        ],
        statusKeepTimes: [
          { required: true, message: '请输入状态维持时间'}
        ],
      }
    }
  },
  methods: {
    fetchSysConfig() {
       GetSysConfigParam().then(response => {
         this.param = response.data
         this.listLoading = false
      })
    },  
    onSubmit() {
      this.$refs.devform.validate((valid) => {
        if (valid) {
          console.log('*******', this.param);
          SetSysConfigParam(this.param).then(response => {
            console.log(response);
          })
        } else {
          console.log('error submit!!')
        }
      })
    },
    onCancel() {
      console.log('onCancel')
      this.$emit('success', false)
    },
    restoreSettings(){
      console.log('restoreSettings')
    },
    checkPlatFormStatus(){
      console.log('checkPlatFormStatus')
    },
  },
  mounted() {
    console.log('edit mounted')
    this.fetchSysConfig()
  }

}
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.bottom {
  margin-bottom: 13px;
  line-height: 12px;
}

.clearfix:after {
  clear: both
}

.button {
  padding: 0;
  float: right;
}

.box-card {
  width: 800px;
  margin: 30px auto;
  height: 700px;
}

</style>
