<template>
  <el-form ref="form" :model="basic" label-width="80px">
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
    created() {
      console.log('video debug  created')
    },
    mounted() {
      CommQuery(0x10303)
        .then(response => {
          this.basic = response.data.data
          console.log(this.list)
        })
        .catch(() => {
        })
    },
    methods: {
      reload: function() {
        console.log('basic reload')
        CommQuery(0x10303)
          .then(response => {
            this.basic = response.data.data
            console.log(this.list)
          })
          .catch(() => {
          })
      }
    }
  }
</script>

<style scoped>

</style>
