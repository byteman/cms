<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="曝光设置" name="basic" >
      <basic ref="basicch"></basic>
    </el-tab-pane>
    <el-tab-pane label="基本设置" name="param" >
      <paramx ref="paramch"></paramx>
    </el-tab-pane>
    <el-tab-pane label="高级设置" name="status" >
      <status ref="statusch"></status>
    </el-tab-pane>
    <el-tab-pane label="重置参数" name="resetparam" >
      <ResetParam ref="resetparamch"></ResetParam>
    </el-tab-pane>

  </el-tabs>

</template>

<script>

  import { SetISP } from '@/api/isp'

  import Basic from './index'
  import Paramx from './standard'
  import Status from './advanced'
  import ResetParam from './reset'
  export default {
    components: {
      basic: Basic,
      Paramx,
      Status,
      ResetParam,
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
        switch (tab.name) {
          case 'basic':
            this.$refs.basicch.getISP()
            break
          case 'param':
            this.$refs.paramch.getISP()
            break
          case 'status':
            this.$refs.statusch.getISP()
            break
          case 'resetparam':
            break
          default:
            break
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

  .buttom{
    margin-left: 350px;
  }

</style>
