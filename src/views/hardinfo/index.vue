<template>
<div>
  <el-card class="box-card">
   <cpu width="300px" :load="load"> </cpu>
  </el-card>

  <el-card class="box-card">
   <cpu width="300px" :load="load"> </cpu>
  </el-card>

   <el-card class="box-card">
   <cpu width="300px" :load="load"> </cpu>
  </el-card>
  <el-card class="box-card">
   <cpu width="300px" :load="load"> </cpu>
  </el-card>

  <el-button style="display:block" v-tooltip.bottom-left="tooltipContent">测试</el-button>
</div>
</template>

<script>
import cpu from './cpu'
 
export default {
  components: { cpu },
  data() {
    return {
      load: 10,
      tooltipContent: 'xxxxx'
    }
  },
  created() {
    this.timer = setInterval(getTotelNumber, 1000)
    var self = this;
    function getTotelNumber() {
      console.log('load=', self.load)
      self.load++
      self.tooltipContent = "" + self.load
    }
  },
  beforeDestroy() {
   
  }
}
</script>

<style>
.box-card{
  margin: 10px;
  width: 320px;
  height: 320px;
  float: left;
}
</style>
