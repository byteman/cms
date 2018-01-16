<template>
  <el-form ref="form" :model="basic" label-width="70px"  style="padding:30px 0 0;">
    <el-form-item label="设备名称">
      <el-input v-model="basic.name" readonly="readonly"></el-input>
    </el-form-item>
    <el-form-item label="设备编号">
      <el-input v-model="basic.code" readonly="readonly"></el-input>
    </el-form-item>
    <el-form-item label="主控版本">
      <el-input v-model="basic.mainversion" readonly="readonly"></el-input>
    </el-form-item>
    <el-form-item label="算法版本">
      <el-input v-model="basic.algorithmversion" readonly="readonly"></el-input>
    </el-form-item>
    <el-form-item label="抓拍版本">
      <el-input v-model="basic.snapVer" readonly="readonly"></el-input>
    </el-form-item>
    <!--<el-form-item>-->
      <!--<el-button type="primary" plain @click="submitForm">提交</el-button>-->
    <!--</el-form-item>-->
  </el-form>
</template>

<script>
  import { CommQuery } from '@/api/sysconfig'

  export default {
    data() {
      return {
        basic: {}
      }
    },
    mounted() {
      this.reload();
    },
    methods: {
      submitForm(){
        console.log('提交修改');
      },
      reload(){
        CommQuery(0x10303)
          .then(response => {
            this.basic = response.data.data;
          })
          .catch(() => {
              this.$message.error("获取数据失败！请检查！")
          })
      }
    }
  }
</script>

<style scoped>

</style>
