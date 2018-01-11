<template>

<el-form ref="form" :model="status" label-width="100px" style="padding:30px 0 0;">
  <el-row :gutter="40">
    <el-col :span="12">
      <el-form-item label="总内存" >
        <el-input v-model="status.memtotal" readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item label="已用内存">
        <el-input v-model="status.memused" readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item label="总磁盘容量">
        <el-input v-model="status.disktotal" readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item label="剩余磁盘容量">
        <el-input v-model="status.diskused" readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item label="CPU使用率" >
        <el-input v-model="status.cpu" readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item label="建模状态" >
        <el-input v-model="status.createLibStatus" readonly="readonly"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="注册照总数" >
        <el-input v-model="status.createLibAllFace" readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item label="已建注册照数" >
        <el-input v-model="status.createLibCreated" readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item label="异常注册照数" >
        <el-input v-model="status.createLibFailed" readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item label="可增量注册数" >
        <el-input v-model="status.num_space_spare" readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item label="建模开始时间" >
        <el-input v-model="status.createLibStartTime" readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item label="建模结束时间" >
        <el-input v-model="status.createLibEndTime" readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item label="建模耗时" >
        <el-input v-model="status.createLibDuration" readonly="readonly"></el-input>
      </el-form-item>

    </el-col>
  </el-row>



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
    console.log('video debug  created')
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
    reload: function() {
      CommQuery(0x12005)
        .then(response => {
          this.status = response.data.data
          console.log(this.list)
        })
        .catch(() => {})
    }
  }
}
</script>

<style scoped>


</style>
