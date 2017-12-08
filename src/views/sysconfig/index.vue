<template>
  <div>
    <div >

      <el-table :data="list" style="width: 100%"  element-loading-text="同步中">

        <el-table-column prop="channel" label="摄像头ID">
        </el-table-column>
        <el-table-column prop="totalNetFrame" label="网络接收帧">
        </el-table-column>
        <el-table-column prop="Cascade" label="网络丢失帧" >
        </el-table-column>
        <el-table-column prop="RegDevType" label="已解码视频帧" >
        </el-table-column>
        <el-table-column prop="Domain" label="解码失败帧">
        </el-table-column>
        <el-table-column prop="IP" label="解码缓存丢失视频帧">
        </el-table-column>
        <!-- <el-table-column prop="ExpireAt" label="剩余时长(秒)">
        </el-table-column> -->
        <el-table-column prop="lastNetTime" label="上次接收视频时间" >
        </el-table-column>

        <el-table-column prop="Status" label="编码视频帧">
        </el-table-column>

        <el-table-column prop="Status" label="编码丢失视频帧" >
        </el-table-column>

         <el-table-column prop="Status" label="算法视频帧" >
        </el-table-column>
         <el-table-column prop="Status" label="抓拍丢失视频帧" >
        </el-table-column>
         <el-table-column prop="Status" label="识别丢失视频帧" >
        </el-table-column>
         <el-table-column prop="Status" label="首次启动时间" >
        </el-table-column>
         <el-table-column prop="Status" label="运行总时长">
        </el-table-column>
          <el-table-column prop="Status" label="总抓拍数">
        </el-table-column>

      </el-table>

    </div>
 

  </div>
</template>

<script>
 import { GetVideoDebug} from '@/api/sysconfig'
export default {
 
  data() {
    return {
      list:[]
    }
  },
  created() {
    console.log('gbplatform created')
  },
  mounted() {
    console.log('gbplatform mounted')
    this.$nextTick(function () {
        setInterval(this.timer, 1000);
    })
  },
  methods: {
     timer: function () {
       console.log('debug')
       
    
      GetVideoDebug().then(response => {    
         
        this.list=response.data.data
        console.log(this.list)
      }).catch(() => {
        
      })

     }
  }
}
</script>

<style scoped>
.footer {
  height: 50px;
  margin-top: 10px;
  margin-right: 90px;
  text-align: right;
}

.el-card__header {
  padding: 1px 2px
}

.tree {
  height: 1000px;
}
</style>
