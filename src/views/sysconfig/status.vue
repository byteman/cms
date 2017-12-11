<template>
  
<el-form ref="form" :model="status" label-width="160px">
  <el-form-item label="总内存">
    <el-input v-model="status.memtotal"></el-input>
  </el-form-item>
  <el-form-item label="已用内存">
    <el-input v-model="status.memused"></el-input>
  </el-form-item>
   <el-form-item label="总磁盘容量">
    <el-input v-model="status.disktotal"></el-input>
  </el-form-item>
   <el-form-item label="剩余磁盘容量">
    <el-input v-model="status.diskused"></el-input>
  </el-form-item>
   <el-form-item label="CPU使用率">
    <el-input v-model="status.cpu"></el-input>
  </el-form-item>
   <el-form-item label="建模状态">
    <el-input v-model="status.createLibStatus"></el-input>
  </el-form-item>
   <el-form-item label="注册照总数">
    <el-input v-model="status.createLibAllFace"></el-input>
  </el-form-item>
   <el-form-item label="已建注册照数">
    <el-input v-model="status.createLibCreated"></el-input>
  </el-form-item>
   <el-form-item label="异常注册照数">
    <el-input v-model="status.createLibFailed"></el-input>
  </el-form-item>
   <el-form-item label="可增量注册数">
    <el-input v-model="status.num_space_spare"></el-input>
  </el-form-item>
   <el-form-item label="建模开始时间">
    <el-input v-model="status.createLibStartTime"></el-input>
  </el-form-item>
 <el-form-item label="建模结束时间">
    <el-input v-model="status.createLibEndTime"></el-input>
  </el-form-item>
 <el-form-item label="建模耗时">
    <el-input v-model="status.createLibDuration"></el-input>
  </el-form-item>

  
</el-form>
</template>

<script>
import { CommQuery } from '@/api/sysconfig'

export default {
  data() {
    return {
      status: {
        
      }
    
    }
  },
  created() {
    console.log("video debug  created");
  },
  mounted() {
    CommQuery(0x12005)
      .then(response => {
        this.status = response.data.data
        console.log(this.list)
      })
      .catch(() => {})
  },
  methods: {
  
  }
};
</script>

<style scoped>


</style>
