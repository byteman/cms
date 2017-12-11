<template>
  
<el-form ref="form" :model="basic" label-width="80px">
  <el-form-item label="设备名称">
    <el-input v-model="basic.name"></el-input>
  </el-form-item>
  <el-form-item label="设备编号">
    <el-input v-model="basic.serial"></el-input>
  </el-form-item>
   <el-form-item label="主控版本">
    <el-input v-model="basic.appVer"></el-input>
  </el-form-item>
   <el-form-item label="算法版本">
    <el-input v-model="basic.algoVer"></el-input>
  </el-form-item>
   <el-form-item label="抓拍版本">
    <el-input v-model="basic.snapVer"></el-input>
  </el-form-item>
</el-form>
</template>

<script>

export default {
  data() {
    return {
      basic:{

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
