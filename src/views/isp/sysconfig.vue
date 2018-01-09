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

    <div class="buttom">
      <el-button  type="warning" @click='onReset'>重置</el-button>
    </div>

  </el-tabs>

</template>

<script>

  import { SetISP } from '@/api/isp'

  import Basic from './index'
  import Paramx from './standard'
  import Status from './advanced'
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
      onReset() {
         console.log('onReset')
         SetISP({'isp_type': 0}).then(response => {
           console.log(response);
           if (response.data.status == 0) {
             switch (this.activeName) {
               case 'basic':
               this.$refs.basicch.ResetVal()
               break
               case 'param':
               this.$refs.paramch.ResetVal()
               break
               case 'status':
               this.$refs.statusch.ResetVal()
               break
               default:
               break
              }
              this.$message('重置成功')
            } else {
              alert("重置失败，错误信息：" + response.data.status);
            }       
           })       
 //     this.$emit('success', false)
    },
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
