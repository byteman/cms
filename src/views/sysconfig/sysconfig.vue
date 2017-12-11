<template>
  

   <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="基本资料" name="basic">
      <basic  ref='basic'></basic>
    </el-tab-pane>
    <el-tab-pane label="参数配置" name="param">
      <paramx  ref='param'></paramx>
    </el-tab-pane>
    <el-tab-pane label="状态查询" name="status">
      <status  ref='status'></status>
    </el-tab-pane>
   
  </el-tabs>

</template>

<script>
import Basic from './basic'
import Paramx from './param'
import Status from './status'
export default {
  components: {
    Basic,
    Paramx,
    Status
  },
  data() {
   

    return {
      activeName: 'basic',
    
    };
  },
  created() {
    console.log("video debug  created");
  },
  mounted() {},
  methods: {
    handleClick(tab, event) {
      this.$refs.basic.Reload()
      console.log('---------')
      console.log(tab, event)
    }
  }
};
</script>

<style scoped>

.el-tabs{
  width:50%;
  margin: 0 auto;
}
</style>
