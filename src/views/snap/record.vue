<template>
  <div class="container">
    <div class="header">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="起始时间">
          <el-date-picker
            v-model="datetimerange"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="相机编号">
          <el-select v-model="selectcam" multiple :multiple-limit=1 placeholder="请输入相机编号">
            <el-option
              v-for="item in camoptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit" plain>查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click="onReset" plain>重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="content">
      <el-table :data="list" v-loading="loading" element-loading-text="加载中,请等待">
        <el-table-column prop="camid" label="通道ID" align='center' width="150"></el-table-column>
        <el-table-column prop="camname" label="相机编号" align='center' width="150"></el-table-column>
        <el-table-column prop="framenum" label="人脸所属帧号" align='center' width="150"></el-table-column>
        <el-table-column prop="keyptscore" label="人脸质量分" align='center' width="150"></el-table-column>
        <el-table-column prop="kfktimestamp" label="抓拍时间" align='center'></el-table-column>
        <el-table-column prop="trackid" label="跟踪ID" align='center' width="150"></el-table-column>
        <el-table-column prop="statecode" label="状态码" align='center' width="150"></el-table-column>
        <el-table-column prop="isface" label="人脸置信度" align='center' width="150"></el-table-column>
        <el-table-column prop="aligndata" label="人脸图片数据" align='center' width="150">
          <template slot-scope="scope">
            <img class="avatar" :src="scope.row.aligndata"/>
          </template>
        </el-table-column>
      </el-table>

      <div class="footer">
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            layout="prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    CommQuery
  } from '@/api/sysconfig'
  import {
    QuerySnapRecord,
    Base64ToImage
  } from '@/api/snap'

  export default {
    data() {
      return {
        datetimerange: [],
        selectcam: [],
        camoptions: [],
        currentPage: 1,
        total: 0,
        list: [],
        loading: false
      }
    },
    created() {
      console.log('snap record page created')
    },
    mounted() {
      this.loading = true
      CommQuery(0x12003)
        .then(response => {
          const tmpList = response.data.data.channels
          tmpList.forEach( item => {
            item.value = item.id
            item.label = item.id + '(' + item.name + ')'
          })
          this.camoptions = tmpList
          // console.log(this.camoptions)
        })
        .catch(() => {
        })
      this.onRefresh()
    },
    methods: {
      onRefresh() {
        let starttime = null
        let endtime = null
        let camid = null
        const camname = null

        if (this.datetimerange.length === 2) {
          let y = this.datetimerange[0].getUTCFullYear()
          let m = this.datetimerange[0].getUTCMonth()
          let d = this.datetimerange[0].getUTCDate()
          let h = this.datetimerange[0].getUTCHours()
          let M = this.datetimerange[0].getUTCMinutes()
          let s = this.datetimerange[0].getUTCSeconds()
          let utc = Date.UTC(y, m, d, h, M, s)
          starttime = utc
          y = this.datetimerange[1].getUTCFullYear()
          m = this.datetimerange[1].getUTCMonth()
          d = this.datetimerange[1].getUTCDate()
          h = this.datetimerange[1].getUTCHours()
          M = this.datetimerange[1].getUTCMinutes()
          s = this.datetimerange[1].getUTCSeconds()
          utc = Date.UTC(y, m, d, h, M, s)
          endtime = utc
          console.log(starttime + endtime)
        }
        if (this.selectcam.length > 0) {
          camid = []
          this.selectcam.forEach( item => {
            camid.push(item.toString())
          })
        }
        this.loading = true
        QuerySnapRecord(this.currentPage.toString(), '10', starttime, endtime, camid, camname)
          .then(response => {
            this.list = []
            this.total = 0
            const tmpList = response.data.data.list
            tmpList.forEach( item =>  {
              item.aligndata = Base64ToImage(item.aligndata)
              item.kfktimestamp = new Date(item.kfktimestamp).toLocaleString()
            })
            this.list = tmpList
            this.total = parseInt(response.data.data.total)
            this.loading = false
            // console.log(this.list)
          })
          .catch(() => {
            this.list = []
            this.total = 0
            this.loading = false
            // console.log('error')
          })
      },
      onSubmit() {
        this.onRefresh()
      },
      onReset() {
        this.selectcam = []
        this.datetimerange = []
      },
      handleSizeChange() {
        this.onRefresh()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.onRefresh()
      }
    }
  }
</script>

<style scoped>
  .container {
    width: 99%;
    margin: 0 auto;
    border: 1px solid #dfe6ec;
    min-height: 600px;
  }

  .content {
    width: 97%;
    margin: 0 auto;
  }

  .avatar {
    width: 50%
  }

  .header {
    padding: 24px;

    background-color: rgb(248, 249, 248);
    height: 80px;
  }

  .footer {
    height: 50px;
    margin-top: 10px;
    margin-right: 90px;
    text-align: right;
  }
</style>
