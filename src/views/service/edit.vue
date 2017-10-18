<template>
  <el-card class="box-card">

    <div slot="header" class="clearfix">

      <span style="line-height: 36px;">{{title}}</span>

    </div>

    <el-form ref="form" :model="form" label-width="100px" >

      <el-col :span="11">

        <el-form-item label="服务名称">

          <el-input v-model="mydata.Name"></el-input>

        </el-form-item>

        <el-form-item label="主机地址">

          <el-input v-model="mydata.HostAddress"></el-input>

        </el-form-item>

        <el-form-item label="登录用户名">

          <el-input v-model="mydata.LoginName"></el-input>

        </el-form-item>
        <el-form-item label="消息中心地址">
          <el-input v-model="mydata.NatsAddr"></el-input>
        </el-form-item>

        <el-form-item label="数据库地址">
          <el-input v-model="mydata.DBAddr"></el-input>
        </el-form-item>

        <el-form-item>

          <el-button type="primary" @click="onSubmit">{{btnName}}</el-button>

          <el-button @click="onCancel">取消</el-button>

        </el-form-item>

      </el-col>

      <el-col :span="11">

        <el-form-item label="服务编码">

          <el-input v-model="mydata.ID"></el-input>

        </el-form-item>

        <el-form-item label="监听端口">

          <el-input v-model="mydata.PortListener"></el-input>

        </el-form-item>

        </el-form-item>

        <el-form-item label="登录密码">

          <el-input v-model="mydata.LoginPwd"></el-input>

        </el-form-item>

        <el-form-item label="消息中心端口">
          <el-input v-model="mydata.NatsPort"></el-input>
        </el-form-item>
        <el-form-item label="数据库端口">
          <el-input v-model="mydata.DBPort"></el-input>
        </el-form-item>

      </el-col>

    </el-form>

  </el-card>
</template>

<script>
import {

  AddService

} from '@/api/service'

import { UpdateService } from '@/api/service'

export default {

  props: ['data', 'title', 'btnName', 'type'],

  data() {

    return {

      form: {

        name: '',

        code: '',

        date1: '',

        date2: '',

        delivery: false,

        type: [],

        resource: '',

        desc: ''

      },
      mydata: this.data

    }

  },

  methods: {

    onSubmit() {
      console.log('mydata', this.mydata)
      // var call = (this.type === 1) ? AddService : UpdateService
      this.fullscreenLoading = true
      AddService(this.mydata).then(response => {
        this.$emit('success', true)
        this.fullscreenLoading = false
        console.log(response.data)
      })
    },

    onCancel() {
      console.log('onCancel')
      this.$emit('success', false)
    }

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
