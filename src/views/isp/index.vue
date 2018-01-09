<template>
  <el-card class="box-card">
    <div class="cardheight">
    <el-form :model="form" :rules="rules" ref="validform" label-width="140px"  class="formClass">

      <el-form-item label="AE曝光模式">
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
    <el-form-item label="Exposuretime(微秒)" prop="Exposuretime" title="手动模式最大曝光时间,取值范围32-1000000">
       <el-input v-model="form.Exposuretime" placeholder="取值范围32-1000000"></el-input>
    </el-form-item>
    <el-form-item label="MaxET(微秒)" prop="MaxET" title="自动曝光模式自定义最大曝光时间,取值范围32-1000000">
       <el-input v-model="form.MaxET" placeholder="手动模式下最大增益"></el-input>
    </el-form-item>
    <el-form-item label="MaxDGain" prop="MaxDGain" title="自动曝光模式下的最大增益,取值范围1-255">
       <el-input v-model="form.MaxDGain" placeholder="自动曝光模式下的最大增益"></el-input>
    </el-form-item>
  

    <el-form-item label="DGain" prop="DGain" title="手动模式增益整数部分,取值范围1-255">   
        <el-input v-model="form.DGain" placeholder="手动模式增益整数部分"></el-input>
    </el-form-item>

    <el-form-item label="DGainDeci" title="手动模式增益小数部分,取值范围0-0.9">
        <el-select v-model="form.DGainDeci" placeholder="请选择手动模式增益小数部分" style="width:100%">
          <el-option
            v-for="item in DGainDeci_options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="AWB白平衡模式">
        <el-select v-model="form.AWB_Mode" placeholder="请选择白平衡模式" style="width:100%">
          <el-option
            v-for="item in awb_mode_options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
      </el-select>
    </el-form-item>

    <el-form-item>
      <el-button class="button" type="primary" @click='onSave'>保存</el-button>
    </el-form-item>

  </el-form>
  </div>
  </el-card>
</template>

<script>

import { GetISP, SetISP } from '@/api/isp'

export default {

  data() {
    var threshold_validator_Time = (rule, value, callback) => {
   //   var re = /^\d+(\.\d+)?$/;
      var re = /^[1-9]+[0-9]*]*$/;
      if (value === "") {
        callback();
      } else if (!re.test(value)) {
        callback(new Error("该值必须在32-1000000之间的数字"));
      } else if (value < 32 || value > 1000000) {
        callback(new Error("该值必须在32-1000000之间的数字"));
      } else {
        callback();
      }
    };

    var threshold_validator_Gain = (rule, value, callback) => {
      var re = /^[1-9]+[0-9]*]*$/;
      if (value === "") {
        callback();
      } else if (!re.test(value)) {
        callback(new Error("该值必须在1-255之间的数字"));
      } else if (value < 1 || value > 255) {
        callback(new Error("该值必须在1-255之间的数字"));
      } else {
        callback();
      }
    };

    return {   
      form: {
        AE_Shutter_Mode:0,
        AE_MaxET_Mode:2,
        Exposuretime: 32,
        MaxET: 32,
        DGain: 1,
        MaxDGain: 255,
        DGainDeci: 0,
        AWB_Mode:0,

        isp_type:1,
      },
      rules:{
        Exposuretime: [{ validator: threshold_validator_Time, trigger: "blur" }],
        MaxET: [{ validator: threshold_validator_Time, trigger: "blur" }],
        MaxDGain: [{ validator: threshold_validator_Gain, trigger: "blur" }],
        DGain: [{ validator: threshold_validator_Gain, trigger: "blur" }],
      },
       DGainDeci_options: [
        {
          value: 0,
          label: '0'
        }, {
          value: 0.1,
          label: '0.1'
        }, {
          value: 0.2,
          label: '0.2'
        }, {
          value: 0.3,
          label: '0.3'
        }, {
          value: 0.4,
          label: '0.4'
        }, {
          value: 0.5,
          label: '0.5'
        }, {
          value: 0.6,
          label: '0.6'
        }, {
          value: 0.7,
          label: '0.7'
        }, {
          value: 0.8,
          label: '0.8'
        }, {
          value: 0.9,
          label: '0.9'
        }
      ],
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
      awb_mode_options: [
        {
          value: 0,
          label: 'AWB_AUTO'
        }, {
          value: 0x10,
          label: 'AWB_FLUORESCENT_LAMP'
        }, {
          value: 0x11,
          label: 'AWB_INCANDESCENT_LAMP'
        }, {
          value: 0x12,
          label: 'AWB_OUTDOOR_SUN'
        }, {
          value: 0x13,
          label: 'AWB_OUTDOOR_CLOUDY'
        }, {
          value: 0x14,
          label: 'AWB_OUTDOOR_DUSK'
        }, {
          value: 0x15,
          label: 'AWB_INDOOR_OFFICE'
        }, {
          value: 0x1f,
          label: 'AWB_DISABLE'
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
    ResetVal() {
      this.form.AE_Shutter_Mode =0; 
      this.form.AE_MaxET_Mode=2;
      this.form.Exposuretime=32;
      this.form.MaxET=32;
      this.form.DGain=1;
      this.form.MaxDGain=255;
      this.form.DGainDeci=0;
      this.form.AWB_Mode=0;
    },
    onSave() {
      this.$refs.validform.validate(valid => {
        if (valid) {
          this.setISP()
        }
      })   
    },
    getISP() {
      console.log('AE get isp')
      SetISP({'isp_type': 4}).then(response => { 
        console.log(response.data)
        if (response.data.AE_Shutter_Mode){
          this.form.AE_Shutter_Mode =response.data.AE_Shutter_Mode
        }
        if (response.data.AE_MaxET_Mode) {
          this.form.AE_MaxET_Mode=response.data.AE_MaxET_Mode
        }
        if (response.data.Exposuretime) {
          this.form.Exposuretime=response.data.Exposuretime
        }
        if (response.data.MaxET) {
          this.form.MaxET=response.data.MaxET
        }
        if (response.data.DGain) {
          this.form.DGain=response.data.DGain
        }
        if (response.data.MaxDGain) {
          this.form.MaxDGain=response.data.MaxDGain
        }
        if (response.data.DGainDeci) {
          this.form.DGainDeci=response.data.DGainDeci
        }
        if (response.data.AWB_Mode) {
          this.form.AWB_Mode=response.data.AWB_Mode
        } 
      })
    },
    setISP() {
      SetISP(this.form).then(response => {
        console.log(response);
        if (response.data.status == 0) {
          this.$message('保存成功')
          } else {
            alert("保存失败，错误信息：" + response.data.status);
            }       
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
  clear: both;
}

.button {
  margin-left: 150px;
}

.box-card {
  width: 90%;
  margin: 30px auto;
  /* height: 700px; */
}
.cardheight {
  height: auto;
}
.formClass{
  margin-right: 10px
}
</style>
