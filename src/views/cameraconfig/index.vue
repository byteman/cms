<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span style="line-height: 36px;">{{title}}</span>
    </div>
    <el-form :model="param" :rules="rules" ref="devform" label-width="150px">
      <el-col :span="23">
        <el-form-item label="IP地址" prop="ipAddress">
          <el-input v-model="param.ipAddress"></el-input>
        </el-form-item>
        <el-form-item label="子网掩码" prop="subneMask">
          <el-input v-model="param.subneMask"></el-input>
        </el-form-item>
        <el-form-item label="默认网关" prop="defaultGateway">
          <el-input v-model="param.defaultGateway" type="ip"></el-input>
        </el-form-item>
        <el-form-item label="备用网关-1" prop="spareGateway1">
          <el-input v-model="param.spareGateway1" type="ip"></el-input>
        </el-form-item>
        <el-form-item label="备用网关-2" prop="spareGateway2">
          <el-input v-model="param.spareGateway2" type="ip"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">设 置</el-button>
        </el-form-item>
      </el-col>
    </el-form>
  </el-card>
</template>

<script>

import { GetCameraConfigParam,  SetCameraConfigParam} from '@/api/cameraconfig'

export default {

  props: ['data', 'title', 'btnName', 'type'],

  data() {
    return {
      param:{
          ipAddress: '127.0.0.1',
          subneMask: '255.255.255.0',
          defaultGateway: '192.168.50.1',
          spareGateway1: '192.168.60.1',
          spareGateway2: '192.168.100.1',
      },
      rules: {
        ipAddress: [
          { required: true, message: '请输入IP地址'}
        ],
        subneMask: [
          { required: true, message: '请输入子网掩码'}
        ],
        defaultGateway: [
          { required: true, message: '请输入默认网关'}
        ],
      }
    }
  },
  methods: {
    fetchSysConfig() {
       GetCameraConfigParam().then(response => {
         this.param = response.data
         this.listLoading = false
      })

    },  
    onSubmit() {
      this.$refs.devform.validate((valid) => {
        if (valid) {
          console.log('*******', this.param);
          SetCameraConfigParam(this.param).then(response => {
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
    }
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
