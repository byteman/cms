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
  </el-tabs>
</template>

<script>
  import Basic from './basic'
  import Paramx from './param'
  import Status from './status'
  export default {
    components: {
      basic: Basic,
      Paramx,
      Status
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
      handleClick(tab, event) {
        console.log(tab.name)
        console.log(event.type)
        switch (tab.name) {
          case 'basic':
            console.log(this.$refs.basicch)
            this.$refs.basicch.reload()
            break
          case 'param':
            console.log(this.$refs.paramch)
            this.$refs.paramch.reload()
            break
          case 'status':
            this.$refs.statusch.reload()
            break
          default:
        }
      }
    }
  }
</script>

<style scoped>
  .el-tabs {
    width: 50%;
    margin: 0 auto;
  }
</style>
