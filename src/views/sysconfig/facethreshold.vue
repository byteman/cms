<template>
  <el-form ref="form" :model="basic" label-width="70px" style="padding:30px 0 0;">
    <el-form-item label="开启阈值">
      <el-switch v-model="value2">
      </el-switch>
    </el-form-item>
    <el-form-item label="识别阈值">
      <el-input v-model="rec_threshold" readonly="readonly"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit_rec">提交</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    name: "facethreshold",
    data() {
      return {
        value1: true,
        value2: false,
        rec_threshold: ''
      }

    },
    methods:{
      submit_rec() {
        console.log('submit!');
      }
    }
  }
</script>

<style scoped>

</style>
