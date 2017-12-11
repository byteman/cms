<template>
  
<el-form ref="form" :model="status" label-width="80px">
  <el-form-item label="相机状态">
    <el-input v-model="status.camera"></el-input>
  </el-form-item>
  <el-form-item label="cpu占用率">
    <el-input v-model="status.cpu"></el-input>
  </el-form-item>
  
</el-form>
</template>

<script>

export default {
  data() {
    return {
      status:{
          cpu:50,
          camera:'在线'
      }
    
    };
  },
  created() {
    console.log("video debug  created");
  },
  mounted() {},
  methods: {
    
  }
};
</script>

<style scoped>


</style>
