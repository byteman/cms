<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span style="line-height: 36px;">{{title}}</span>
    </div>
    <el-form  :model="form.form_data" :rules="rules" ref="devform" label-width="100px">
      <el-col :span="11">
        <el-form-item label="设备名称" prop="name">
          <el-input v-model="mydata.name"></el-input>
        </el-form-item>
        <el-form-item label="设备编号">
          <el-input v-model="mydata.gbcode" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="设备IP" prop="ip_addr">
          <el-input v-model="mydata.ip_addr"></el-input>
        </el-form-item>
        <el-form-item label="设备端口" prop="port">
          <el-input v-model="mydata.port"></el-input>
        </el-form-item>
        <el-form-item label="设备厂商" prop="vendor_id">
          <el-select v-model="mydata.vendor_id" placeholder="请选择" style="width:100%">
            <el-option v-for="item in form.vendors_options" :key="item.value" :label="item.name" :value="item.value">
            </el-option>
          </el-select>

        </el-form-item>
        <el-form-item label="设备型号" prop="dev_type">
          <el-select v-model="mydata.dev_type" placeholder="请选择" style="width:100%">
            <el-option v-for="item in form.device_options" :key="item.value" :label="item.name" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">{{btnName}}</el-button>
          <el-button @click="onCancel">取消</el-button>
        </el-form-item>

      </el-col>

      <el-col :span="11" :offset="1">
        <el-form-item label="用户名" prop="user_name">
          <el-input v-model="mydata.user_name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass_word">
          <el-input v-model="mydata.pass_word"></el-input>
        </el-form-item>
        <el-form-item label="码流类型" prop="stream_type">
          <el-select v-model="mydata.stream_type" placeholder="请选择" style="width:100%">
            <el-option v-for="item in form.stream_options" :key="item.value" :label="item.name" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="连接协议" prop="conn_proto">
          <el-select v-model="mydata.conn_proto" placeholder="请选择" style="width:100%">
            <el-option v-for="item in form.proto_options" :key="item.value" :label="item.name" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="传输类型" prop="transmode_id">
          <el-select v-model="mydata.transmode_id" placeholder="请选择" style="width:100%">
            <el-option v-for="item in form.trans_options" :key="item.value" :label="item.name" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item v-if='mydata.conn_proto==="rtsp"' label="RTSP地址" prop="rtsp_url" 
        :rules="{required: true, message: 'RTSP地址不能为空', trigger: 'blur'}">
          <el-input v-model="mydata.rtsp_url"></el-input>
        </el-form-item>

      </el-col>

    </el-form>

  </el-card>
</template>

<script>
import { GetDictsByCode } from '@/api/dict'
import { AddDevice } from '@/api/device'

export default {

  props: ['data', 'title', 'btnName', 'type'],

  data() {
    return {
      mydata: this.data,
      form: {
        vendors_options: [],
        trans_options: [],
        proto_options: [],
        stream_options: [],
        device_options: [],
        form_data: this.data
      },
      rules: {
        name: [
          { required: true, message: '请输入设备名称', trigger: 'blur' }
        ],
        ip_addr: [
          { required: true, message: '请输入IP地址', trigger: 'blur' }
        ],
        vendor_id: [
          { required: true, message: '请选择设备厂商', trigger: 'blur' }
        ],
        dev_type: [
          { required: true, message: '请选择设备类型', trigger: 'blur' }
        ],
        stream_type: [
          { required: true, message: '请选择码流类型', trigger: 'blur' }
        ],
        conn_proto: [
          { required: true, message: '请选择连接协议', trigger: 'blur' }
        ],
        transmode_id: [
          { required: true, message: '请选择传输方式', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {

    onSubmit() {
      console.log('mydata', this.mydata)
      this.$refs.devform.validate((valid) => {
        if (valid) {
          AddDevice(this.mydata).then(response => {
            this.$emit('success', true)
            console.log(response.data)
          })
        } else {
          console.log('error submit!!')
        }
      })
    },
    resetForm(formName) {
      this.$refs.devform.resetFields()
    },
    getDicts() {
      // 厂商类型
      GetDictsByCode('VENDOR').then(response => {
        this.form.vendors_options = response.data
        console.log(response.data)
      })
      // 传输方式
      GetDictsByCode('TRANSPORT').then(response => {
        this.form.trans_options = response.data
        console.log(response.data)
      })
      // 取流协议
      GetDictsByCode('CONPROTO').then(response => {
        this.form.proto_options = response.data
      })

      // 码流类型
      GetDictsByCode('STREAMTYPE').then(response => {
        this.form.stream_options = response.data
      })
      // 设备类型
      GetDictsByCode('DEVTYPE').then(response => {
        this.form.device_options = response.data
      })
    },
    onCancel() {
      console.log('onCancel')
      this.$emit('success', false)
    }

  },
  mounted() {
    console.log('mounted')
    this.getDicts()
  }

}
</script>

<style>
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
  height: 500px;
}
</style>
