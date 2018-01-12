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
      <facethresholds ref="facethreshold"></facethresholds>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import Basic from './basic'
  import Paramx from './param'
  import Status from './status'
  import Facethresholds from './facethreshold'
  export default {
    components: {
      basic: Basic,
      Paramx,
      Status,
      Facethresholds
    },
    data() {
      return {
        activeName: 'basic'
      }
    },
    created() {
      console.log('video debug  created')
    },
    mounted() {
    },
    methods: {
      handleClick(tab) {
        switch (tab.name) {
          case 'basic':
            console.log(this.$refs.basicch)
            this.$refs.basicch.reload()
            break;
          case 'param':
            console.log(this.$refs.paramch)
            this.$refs.paramch.reload()
            break;
          case 'status':
            this.$refs.statusch.reload()
            break;
          case 'threshold':
            this.$refs.facethreshold.reload()
            break;
          default:
            this.$refs.basicch.reload()
        }
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
