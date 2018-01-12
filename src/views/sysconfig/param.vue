<template>
  <div class="container">
    <div class="main-content">
      <el-form ref="form" :model="para" label-width="100px"  style="padding:30px 0 0;">
        <el-form-item label="设备唯一编号">
          <el-input v-model="para.code"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="footer">
      <el-button type="primary" plain round @click="onSubmit">提交</el-button>
    </div>
  </div>
</template>

<script>
  import {CommQuery} from '@/api/sysconfig'
  import {PortSave} from '@/api/sysconfig'
  import {BasicSave} from '@/api/sysconfig'

  export default {
    data() {
      return {
        para: {
          code: 'para.code'
        }
      }
    },
    created() {
      console.log('video debug  created')
    },
    mounted() {
      CommQuery(0x10303)
        .then(response => {
          this.para = response.data.data;
          console.log(this.para)
        })
        .catch(() => {
        })
    },
    methods: {
      onSubmit: function() {
        PortSave(0x10315, this.para.code)
          .then(response => {
            this.$message('设备唯一编号(Port)保存:' + response.data.message)
            console.log(response.data.message)
          })
          .catch(() => {
            console.log('1')
          })
        BasicSave(0x10304, this.para.code)
          .then(response => {
          })
          .catch(() => {
            console.log('1')
          })
      },
      reload: function() {
        CommQuery(0x10303)
          .then(response => {
            this.para = response.data.data
            console.log(this.para)
          })
          .catch(() => {
          })
      }
    }
  }
</script>

<style scoped>
  .container {
    width: 99%;
    margin: 0 auto;
    border: 0px solid #dfe6ec;
    min-height: 600px;
  }

  .content {
    width: 97%;
    margin: 0px auto;
  }

  .footer {
    height: 50px;
    margin-top: 40px;
    /*margin-right: 90px;*/
    text-align: center;
  }
</style>
