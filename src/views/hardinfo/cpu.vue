<template>
  <div :class="className" :style="{height:height,width:width}">
  </div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts 主题

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    },
    load: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      chart: null,
      // percent: 10,
      // timer: null,
      option: {
        title: {
          text: 'cpu占用率'
        },
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%'
        },
        toolbox: {
          feature: {
            restore: {},
            saveAsImage: {}
          }
        },
        series: [
          {
            name: 'cpu占用率',
            type: 'gauge',
            detail: { formatter: '{value}%' },
            data: [{ value: this.load, name: '%' }]
          }
        ]
      }
    }
  },
  created() {

  },
  mounted() {
    console.log('mounted', this.$el)
    this.initcharts()
    // this.timer = setInterval(getTotelNumber, 1000)
    // var self = this;
    // function getTotelNumber() {
    //   console.log('percent=', self.percent)
    //   self.chart.setOption({
    //      series: [{
    //         name: 'cpu占用率',
    //         data: [{ value: self.percent++, name: '%' }]
    //     }]
    //   })
    // }
  },
  beforeDestroy() {
    // if (this.timer != null){
    //   clearInterval(this.timer)
    // }

    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
    // this.timer = null
  },
  methods: {
    initcharts() {
      console.log('initcharts', this.$el)
      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.setOption(this.option)
    }
  },
  watch: {
    load: function(val) {
      console.log('load change', val)
      this.chart.setOption({
        series: [{
          name: 'cpu占用率',
          data: [{ value: val, name: '%' }]
        }]
      })
    }
  }
}
</script>

<style>

</style>
