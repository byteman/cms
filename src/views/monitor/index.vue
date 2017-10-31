<template>
  <div>
    <el-row style="padding: 20px;">
      <el-col :span="12" style="padding-right: 5px;">
        <div class="grid-content bg-purple-dark">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="line-height: 36px;"><i></i>磁盘使用情况</span>
          </div>
          <div class="chartWrapper">
            <div id="discPieChart" style="width: 100%; height: 400px;"></div>
          </div>
        </el-card>
        </div>
      </el-col>
      <el-col :span="12" style="padding-left: 5px;">
        <div class="grid-content bg-purple-dark">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="line-height: 36px;"><i></i>内存监控</span>
          </div>
          <div class="chartWrapper">
            <div id="memoryLineChart" style="width: 100%; height: 400px;">444</div>
          </div>
        </el-card>
        </div>
      </el-col>
    </el-row>
    <el-row style="padding: 20px;">
      <el-col :span="12" style="padding-right: 5px;">
        <div class="grid-content bg-purple-dark">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="line-height: 36px;"><i></i>CPU监控</span>
          </div>
          <div class="chartWrapper">
            <div id="cpuLineChart" style="width: 100%; height: 400px;">444</div>
          </div>
        </el-card>
        </div>
      </el-col>
      <el-col :span="12" style="padding-left: 5px;">
        <div class="grid-content bg-purple-dark">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="line-height: 36px;"><i></i>GPU监控</span>
          </div>
          <div class="chartWrapper">
            <div id="gpuLineChart" style="width: 100%; height: 400px;">444</div>
          </div>
        </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import { getDiscData, getMemorySize, getLineData} from '@/api/monitor'

export default {

  props: ['data', 'title', 'btnName', 'type'],

  data() {
    return {
      deviceId: '123456',
      discPieChart: null,
      memoryLineChart: null,
      cpuLineChart: null,
      gpuLineChart: null,
      changStatus: false,
      monitorProp: {
        intervalTimes: 2000,
        durationTimes: 0.1 * 60 * 60 * 1000,
        genNow: new Date().getTime() - 1 * 60 * 60 * 1000,
        genValue: Math.random() * 1000
      },
      discPieOption: {
        title : {
          text: '磁盘使用情况统计',
          x:'center'
        },
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['剩余(M)','使用(M)']
        },
        series : [
          {
            name: '磁盘大小',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
              {value:2000, name:'剩余(M)'},
              {value:2000, name:'使用(M)'},
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },
      memoryLineOption: {
        title: {
          text: '内存实时使用情况',
          subtext: '实时(每2秒一次)'
        },
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
              params = params[0];
              let date = new Date(params.name);
              return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
          },
          axisPointer: {
              animation: false
          }
        },
        xAxis: {
          type: 'time',
          splitLine: {
              show: false
          }
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%'],
          splitLine: {
              show: false
          },
          max: 2000
        },
        series: [{
          name: '模拟数据',
          type: 'line',
          showSymbol: false,
          hoverAnimation: false,
          data: this.initMemoryData || []
        }]
      },
      cpuLineOption: {
        title: {
          text: 'CPU实时使用情况',
          subtext: '实时(每5秒一次)'
        },
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
              params = params[0];
              let date = new Date(params.name);
              return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
          },
          axisPointer: {
              animation: false
          }
        },
        xAxis: {
          type: 'time',
          splitLine: {
              show: false
          }
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%'],
          splitLine: {
              show: false
          },
          max: 2000
        },
        series: [{
          name: '模拟数据',
          type: 'line',
          showSymbol: false,
          hoverAnimation: false,
          data: this.initMemoryData || []
        }]
      },
      gpuLineOption: {
        title: {
          text: 'GPU实时使用情况',
          subtext: '实时(每5秒一次)'
        },
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
              params = params[0];
              let date = new Date(params.name);
              return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
          },
          axisPointer: {
              animation: false
          }
        },
        xAxis: {
          type: 'time',
          splitLine: {
              show: false
          }
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%'],
          splitLine: {
              show: false
          },
          max: 2000
        },
        series: [{
          name: '模拟数据',
          type: 'line',
          showSymbol: false,
          hoverAnimation: false,
          data: this.initMemoryData || []
        }]
      },
      initMemoryData: [],
      initCPUData: [],
      initGPUData: [],
    }
  },
  methods: {
    _init() {
      this._initData();
      this.fetchDiscData();
      this.fetchMaxData();
      this._setInterval();
    },

    // ajax获取磁盘数据
    fetchDiscData() {
      //getDiscData().then(res => {
        this.discPieOption.series[0].data[0].value = 200; // res.remainingDisc
        this.discPieOption.series[0].data[1].value = 300; // res.usingDisc
        this.discPieChart.setOption(this.discPieOption);
      //})
    },

    // 获取总内存大小(M)
    fetchMaxData() {
      //getMemorySize().then(res => {
        this.memoryLineOption.yAxis.max = 1800; //res.memorySize
        this.memoryLineChart.setOption(this.memoryLineOption);  
      //})
    },

    // 初始化图表数据
    _initData() {
      let lineNum = this.monitorProp.durationTimes / this.monitorProp.intervalTimes;
      for (let i = 0; i < lineNum; i++) {
          //var genData = this._genInitData();
          this.initMemoryData.push(this._genInitData());
          this.initCPUData.push(this._genInitData());
          this.initGPUData.push(this._genInitData());
      }
      console.log(this.initMemoryData);
      this.memoryLineOption.series[0].data = this.initMemoryData;
      this.memoryLineChart.setOption(this.memoryLineOption);

      this.cpuLineOption.series[0].data = this.initCPUData;
      this.cpuLineChart.setOption(this.cpuLineOption);

      this.gpuLineOption.series[0].data = this.initGPUData;
      this.gpuLineChart.setOption(this.gpuLineOption);

    },

    _genInitData() {
      let oneDay = 24 * 3600 * 1000;
      this.monitorProp.genNow = new Date(+this.monitorProp.genNow + oneDay);
      // this.monitorProp.genValue = this.monitorProp.genValue + Math.random() * 21 - 10;
      return {
        name: this.monitorProp.genNow.toString(),
        value: [
          [this.monitorProp.genNow.getFullYear(), this.monitorProp.genNow.getMonth() + 1, this.monitorProp.genNow.getDate()].join('/'),
          ''
        ]
      }
    },

    _genRandomData() {
      let oneDay = 24 * 3600 * 1000;
      this.monitorProp.genNow = new Date(+this.monitorProp.genNow + oneDay);
      this.monitorProp.genValue = this.monitorProp.genValue + Math.random() * 21 - 10;
      return {
        name: this.monitorProp.genNow.toString(),
        value: [
          [this.monitorProp.genNow.getFullYear(), this.monitorProp.genNow.getMonth() + 1, this.monitorProp.genNow.getDate()].join('/'),
          Math.round(this.monitorProp.genValue)
        ]
      }
    },

    // 实时获取Memory、CPU、GPU使用比率
    _setInterval() {
      let _this = this;
      setInterval(function () {
        //getLineData().then(res => {   //{timestamp: 19822222220, memoryUsing: 2000, cpuRate: 0.6, gpuRate: 0.8}
          _this.initMemoryData.shift();
          _this.initMemoryData.push(_this._genRandomData()); // {name:'08:20:00',value['08:20:00',2000]}
          _this.memoryLineChart.setOption({series: [{data: _this.initMemoryData }]});

          _this.initCPUData.shift();
          _this.initCPUData.push(_this._genRandomData());   // {name:'08:20:00',value['08:20:00',60]}
          _this.cpuLineChart.setOption({series: [{data: _this.initCPUData }]});

          _this.initGPUData.shift();
          _this.initGPUData.push(_this._genRandomData()); // {name:'08:20:00',value['08:20:00',80]}
          _this.gpuLineChart.setOption({series: [{data: _this.initGPUData }]});
        //})
      }, this.monitorProp.intervalTimes);
    }
  },

  mounted() {
    this.discPieChart = this.$echarts.init(document.getElementById('discPieChart'));
    this.discPieChart.setOption(this.discPieOption);

    this.memoryLineChart = this.$echarts.init(document.getElementById('memoryLineChart'));
    this.memoryLineChart.setOption(this.memoryLineOption);

    this.cpuLineChart = this.$echarts.init(document.getElementById('cpuLineChart'));
    this.cpuLineChart.setOption(this.cpuLineOption);

    this.gpuLineChart = this.$echarts.init(document.getElementById('gpuLineChart'));
    this.gpuLineChart.setOption(this.gpuLineOption);

    this._init();
  },

  destroyed() {
    this.discPieChart.dispose();
    this.memoryLineChart.dispose();
    this.cpuLineChart.dispose();
    this.gpuLineChart.dispose();
  }
}
</script>

<style>
  .el-card__header{
    padding: 0px 20px !important;
  }

  .box-card i{
    padding: 4px 0;
    border-left: 3px solid blue;
  }
</style>
