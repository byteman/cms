<template>
  <div>
    <div >

      <el-table :data="list" style="width: 100%"   v-loading="loading" element-loading-text="加载中,请等待">

    </el-table-column>

        <el-table-column prop="channel" label="摄像头ID" width="80">
        </el-table-column>
        <el-table-column prop="totalNetFrame" label="网络接收帧" width="100">
        </el-table-column>
        <el-table-column prop="totalNetLostFrame" label="网络丢失帧" width="100">
        </el-table-column>
        <el-table-column prop="totalDecodedFrame" label="已解码视频帧" width="120">
        </el-table-column>
        <el-table-column prop="totalDecodeErrFrame" label="解码失败帧" width="100">
        </el-table-column>
        <el-table-column prop="totalDecodeLostFrame" label="解码缓存丢失视频帧" width="150">
        </el-table-column>
        <!-- <el-table-column prop="ExpireAt" label="剩余时长(秒)">
        </el-table-column> -->
        <el-table-column prop="lastNetTime" label="上次接收视频时间" width="150">
        </el-table-column>

        <el-table-column prop="totalEncodeFrame" label="编码视频帧" width="100">
        </el-table-column>

        <el-table-column prop="totalEncodeLostFrame" label="编码丢失视频帧" width="120">
        </el-table-column>

         <el-table-column prop="totalAlgoFrame" label="算法视频帧" width="100">
        </el-table-column>
         <el-table-column prop="totalAlgoLostFrame" label="抓拍丢失视频帧" width="120">
        </el-table-column>
         <el-table-column prop="totalRegLostFrame" label="识别丢失视频帧" width="120">
        </el-table-column>
         <el-table-column prop="startTime" label="首次启动时间" >
        </el-table-column>
         <el-table-column prop="totalDuration" label="运行总时长">
        </el-table-column>
          <el-table-column prop="totalCaptureCount" label="总抓拍数">
        </el-table-column>

      </el-table>

    </div>
 

  </div>
</template>

<script>
import { GetVideoDebug } from "@/api/sysconfig"
export default {
  data() {
    return {
      loading: false,
      list: []
    }
  },
  created() {
    console.log("video debug  created");
  },
  mounted() {
    console.log("video debug mounted")
    this.loading = true
    this.myFunc = setInterval(() => {
      this.timer()
    }, 2000)
  },
  beforeDestroy() {
    console.log("destory timer")
    clearInterval(this.myFunc)
  },
  methods: {
    timer: function() {
      console.log("call getvideo")
      GetVideoDebug()
        .then(response => {
          this.list = response.data.data
          console.log(this.list)
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
};
</script>

<style scoped>
.footer {
  height: 50px;
  margin-top: 10px;
  margin-right: 90px;
  text-align: right;
}

.el-card__header {
  padding: 1px 2px;
}

.tree {
  height: 1000px;
}
</style>
