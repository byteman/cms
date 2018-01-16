<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="基本资料" name="basic" >
      <basic ref="basicch"></basic>
    </el-tab-pane>
    <el-tab-pane label="参数配置" name="param" >
      <paramx ref="paramch"></paramx>
    </el-tab-pane>
    <el-tab-pane label="状态查询" name="status" >
      <status ref="statusch"></status>
    </el-tab-pane>
    <el-tab-pane label="阈值设置" name="threshold" >
      <facethresholds ref="facethresholdch"></facethresholds>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import Basic from './basic'
  import Paramx from './param'
  import Status from './status'
  import Facethresholds from './facethreshold'
  import { CommQuery } from '@/api/sysconfig'

  export default {
    components: {
      basic: Basic,
      paramx: Paramx,
      status: Status,
      facethresholds: Facethresholds
    },
    data() {
      return {
        activeName: 'basic'
      }
    },
    created() {
    },
    mounted() {
      this.reload();
    },
    methods: {
      handleClick(tab) {
        switch (tab.name) {
          case 'basic':
            this.$refs.basicch.reload();
            break;
          case 'param':
            this.$refs.paramch.reload();
            break;
          case 'status':
            this.$refs.statusch.reload();
            break;
          case 'threshold':
            this.$refs.facethresholdch.reload();
            break;
          default:
            this.$refs.basicch.reload()
        }
      },
      reload() {
        CommQuery(0x10303)
          .then(response => {
            this.para = response.data.data
            console.log(this.para)
          })
          .catch(() => {
            this.$message.error("数据获取失败！请检查服务器！")
          })
      }
    }
  }
</script>

<style scoped>
  .el-tabs {
    width: 60%;
    margin: 0 auto;
  }
</style>
