<template>
  <el-card class="box-card">

    <el-form ref="form"  label-width="200px">

      <el-form-item label="亮度设置">
        <el-slider @change="onBrightnessChange()" v-model="form.brightness" style="margin-left:10px"></el-slider>
      </el-form-item>

      <el-form-item label="动态范围模式">
        <el-select v-model="form.wdr_mode" placeholder="请选择动态范围模式" style="width:100%;">
            <el-option
              v-for="item in wdr_mode_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="动态范围强度">
        <el-select v-model="form.wdr_level" placeholder="请选择动态强度" style="width:100%;">
            <el-option
              v-for="item in wdr_level_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="AE(曝光模式)">
        <el-select v-model="form.AE_Shutter_Mode" placeholder="请选择曝光模式" style="width:100%">
          <el-option
            v-for="item in ae_mode_options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="AE_MaxET_Mode" title="在曝光模式50HZ_Auto和60Hz_Auto中设置最大曝光时间">
        <el-select v-model="form.AE_MaxET_Mode" placeholder="请选择曝光模式" style="width:100%">
          <el-option
            v-for="item in max_et_options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="ExposureTime(微秒)" title="手动模式最大曝光时间,取值范围32-1000000">
       <el-input v-model="form.Exposuretime" placeholder="取值范围32-1000000"></el-input>
    </el-form-item>
    <el-form-item label="MaxET(微秒)" title="手动模式下最大增益,取值范围32-1000000">
       <el-input v-model="form.MaxET" placeholder="手动模式下最大增益"></el-input>
    </el-form-item>
    <el-form-item label="MaxDGain" title="自动曝光模式下的最大增益,取值范围1-255">
       <el-input v-model="form.MaxDGain" placeholder="自动曝光模式下的最大增益"></el-input>
    </el-form-item>
  

    <el-form-item label="DGain" title="手动模式增益整数部分,取值范围1-255">   
        <el-input v-model="form.DGain" placeholder="手动模式增益整数部分" suffix-icon="el-icon-question"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click='onSave'>保存</el-button>
      <el-button  @click='onReset'>重置</el-button>
    </el-form-item>

  </el-form>
  
  </el-card>
</template>

<script>

import { GetISP, SetISP } from '@/api/isp'

export default {

  data() {
    return {
      form: {
        brightness: 50,
        wdr_mode: 16,
        wdr_level: 1, 

        AE_Shutter_Mode:0,
        AE_MaxET_Mode:2,
        Exposuretime: 32,
        MaxET: 32,
        DGain: 1,
        AGain: 0,
        MaxDGain: 255,
        MaxAGain: 0,
        DGainDeci: 0,
        AGainDeci: 0,

        etus:0,
        gainValue:0,
        gainFormat:0
      },
      wdr_mode_options: [
        {
          value: 1,
          label: '调试模式'
        }, {
          value: 2,
          label: '背光补偿模式'
        }, {
          value: 4,
          label: '强光抑制'
        }, {
          value: 8,
          label: '宽动态'
        }, {
          value: 16,
          label: '常规模式'
        }
      ],
      wdr_level_options: [
        {
          value: 0,
          label: '低'
        }, {
          value: 1,
          label: '中'
        }, {
          value: 2,
          label: '高'
        }
      ],
      gain_options: [
        {
          value: 0,
          label: '10.6'
        }, {
          value: 1,
          label: '9.7'
        }, {
          value: 2,
          label: '8.8'
        }, {
          value: 3,
          label: '7.9'
        }
      ],
      ae_mode_options: [
        {
          value: 0,
          label: 'AE_50Hz_Auto'
        }, {
          value: 1,
          label: 'AE_60Hz_Auto'
        }, {
          value: 2,
          label: 'AE_50Hz_Indoor'
        }, {
          value: 3,
          label: 'AE_60Hz_Indoor'
        }, {
          value: 0xf,
          label: '手动曝光'
        }
      ],
      max_et_options: [
        {
          value: 0,
          label: 'S5'
        }, {
          value: 1,
          label: 'S10'
        }, {
          value: 2,
          label: 'S25'
        }, {
          value: 3,
          label: 'S30'
        }, {
          value: 4,
          label: 'S33'
        }, {
          value: 5,
          label: 'S40'
        }, {
          value: 6,
          label: 'S50'
        }, {
          value: 7,
          label: 'S60'
        }, {
          value: 8,
          label: 'S100'
        }, {
          value: 9,
          label: 'S120'
        }, {
          value: 10,
          label: 'S250'
        }, {
          value: 11,
          label: 'S500'
        }, {
          value: 12,
          label: 'S1000'
        }, {
          value: 13,
          label: 'S5000'
        }, {
          value: 14,
          label: 'S10000'
        },
        {
          value: 15,
          label: '手动设置'
        }
      ]
    }
  },
  methods: {   
    onSave() {
      this.setISP()
    },
    onBrightnessChange(){
      console.log(this.form.brightness)
    },
    onReset() {
      console.log('onCancel')
      this.$emit('success', false)
    },
    getISP() {
      GetISP().then(response => {
        console.log('get isp')
        console.log(response.data)
        this.form.etus = response.data.gain.etus
        this.form.gainValue = response.data.gain.value
        this.form.gainFormat = response.data.gain.format   
      })
    },
    setISP() {
      SetISP(this.form).then(response => {
        this.$message('保存成功')
      })
    }
  },
  mounted() {
    console.log('edit mounted')
    this.getISP()
  }
}
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.bottom {
  margin-bottom: 13px;
  line-height: 12px;
}

.clearfix:after {
  clear: both
}

.button {
  padding: 0;
  float: right;
}

.box-card {
  width: 40%;
  margin: 30px auto;
  /* height: 700px; */
}

</style>
