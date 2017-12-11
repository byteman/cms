<template>
  
<el-form ref="form" :model="para" label-width="140px">
  <el-form-item label="设备唯一编号">
    <el-input v-model="para.id"></el-input>
  </el-form-item>
  <el-form-item label="Http端口">
    <el-input v-model="para.port"></el-input>
  </el-form-item>
</el-form>
</template>

<script>

export default {
  data() {
    return {
      para:{
          port:8887,
          id:'12345'
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
