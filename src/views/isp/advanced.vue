<template>
  <el-card class="box-card">
    <div class="test">
    <el-form ref="form"  label-width="130px" class="form0">

      <el-form-item label="图像镜像和翻转">
        <el-select v-model="form.flipmirror" placeholder="请选择图像镜像翻转模式" style="width:100%;">
            <el-option
              v-for="item in flip_mirror_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="光圈控制模式">
        <el-select v-model="form.iris" placeholder="请选择光圈控制模式" style="width:100%;">
            <el-option
              v-for="item in iris_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="IR-CUT控制模式">
        <el-select v-model="form.ircut" placeholder="请选择IR-CUT控制模式" style="width:100%;">
            <el-option
              v-for="item in ircut_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="IR-CUT切换点阈值">
        <el-slider @change="onIrCutThChange()" v-model="form.ircut_th" style="margin-left:10px"></el-slider>
      </el-form-item>

      <el-form-item label="黑白彩色切换模式">
        <el-select v-model="form.colorblack" placeholder="请选择黑白彩色切换模式" style="width:100%;">
            <el-option
              v-for="item in colorblack_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
        </el-select>
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
      <el-form-item label="色彩输出模式">
        <el-select v-model="form.color_type" placeholder="请选择色彩输出模式" style="width:100%;">
            <el-option
              v-for="item in color_type_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="2D降噪级别">
        <el-slider @change="onDenoise_2dChange()" v-model="form.denoise_2d" max="32" style="margin-left:10px"></el-slider>
      </el-form-item>
      <el-form-item label="3D降噪级别">
        <el-slider @change="onDenoise_3dChange()" v-model="form.denoise_3d" max="32" style="margin-left:10px"></el-slider>
      </el-form-item>

      <el-form-item label="电子防抖">
        <el-select v-model="form.eis" placeholder="请选择电子防抖模式" style="width:100%;">
            <el-option
              v-for="item in eis_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="去雾">
        <el-select v-model="form.defog" placeholder="请选择去雾模式" style="width:100%;">
            <el-option
              v-for="item in defog_options"
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
    return {
      form: {
        flipmirror: 0,
        iris: 1,
        ircut: 0,
        ircut_th: 16,
        colorblack: 0,
        wdr_mode: 16,
        wdr_level: 0,
        color_type: 0,
        denoise_2d: 16,
        denoise_3d: 16,
        eis: 0,
        defog: 0,

        isp_type:3,
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
      denoise_options: [
        {
          value: 0,
          label: '关闭降噪功能'
        }, {
          value: 1,
          label: '开启2D降噪'
        }, {
          value: 2,
          label: '开启3D降噪'
        }
      ],
      denoise_level_options: [
        {
          value: 0,
          label: '低级'
        }, {
          value: 1,
          label: '中级'
        }, {
          value: 2,
          label: '高级'
        }
      ],
      color_type_options: [
        {
          value: 0,
          label: 'BT601'
        }, {
          value: 1,
          label: 'BT709'
        }
      ],
      eis_options: [
        {
          value: 0,
          label: '关闭电子防抖功能'
        }, {
          value: 1,
          label: '开启电子防抖功能'
        }
      ],
      defog_options: [
        {
          value: 0,
          label: '关闭去雾功能'
        }, {
          value: 1,
          label: '开启低强度去雾功能'
        }, {
          value: 2,
          label: '开启中强度去雾功能'
        }, {
          value: 3,
          label: '开启高强度去雾功能'
        }
      ],
       colorblack_options: [
        {
          value: 0,
          label: '自动模式'
        }, {
          value: 1,
          label: '强制彩色'
        }, {
          value: 2,
          label: '强制黑白'
        }
      ],
      flip_mirror_options: [
        {
          value: 0,
          label: '图像正常'
        }, {
          value: 1,
          label: '图像上下翻转'
        }, {
          value: 2,
          label: '图像左右翻转'
        }, {
          value: 3,
          label: '图像左右上下同时翻转'
        }
      ],
      iris_options: [
        {
          value: 0,
          label: '光圈始终开启最大'
        }, {
          value: 1,
          label: '自动控制模式'
        }, {
          value: 2,
          label: '手动光圈镜头模式'
        }, {
          value: 3,
          label: '强制自动光圈模式'
        }
      ],
      ircut_options: [
        {
          value: 0,
          label: '自动控制日夜模式切换'
        }, {
          value: 1,
          label: '手动控制日间模式'
        }, {
          value: 2,
          label: '手动控制夜间模式'
        }
      ],
    }
  },
  methods: {   
    ResetVal() {
      this.form.flipmirror =0; 
      this.form.iris=1;
      this.form.ircut=0;
      this.form.ircut_th=16;
      this.form.colorblack=0;
      this.form.wdr_mode=16;
      this.form.wdr_level=0;
      this.form.color_type=0;
      this.form.denoise_2d=16;
      this.form.denoise_3d=16;
      this.form.eis=0;
      this.form.defog=0;
    },
    onSave() {
      this.setISP()
    },
    onReset() {
      console.log('onCancel')
      this.$emit('success', false)
    },
    onIrCutThChange(){
      console.log(this.form.ircut_th)
    },
    onDenoise_2dChange(){
      console.log(this.form.denoise_2d)
    },
    onDenoise_3dChange(){
      console.log(this.form.denoise_3d)
    },  
    getISP() {
      console.log('advanced get isp')
      SetISP({'isp_type': 6}).then(response => { 
        console.log(response.data)
        if (response.data.flipmirror) {
          this.form.flipmirror =response.data.flipmirror
        }
        if (response.data.iris) {
          this.form.iris=response.data.iris
        }
        if (response.data.ircut) {
          this.form.ircut=response.data.ircut
        }
        if (response.data.ircut_th) {
          this.form.ircut_th=response.data.ircut_th
        }
        if (response.data.colorblack) {
          this.form.colorblack=response.data.colorblack
        }
        if (response.data.wdr_mode) {
          this.form.wdr_mode=response.data.wdr_mode
        }
        if (response.data.wdr_level) {
          this.form.wdr_level=response.data.wdr_level
        }
        if (response.data.color_type) {
          this.form.color_type=response.data.color_type
        }
        if (response.data.denoise_2d) {
          this.form.denoise_2d=response.data.denoise_2d
        }
        if (response.data.denoise_3d) {
          this.form.denoise_3d=response.data.denoise_3d
        }
        if (response.data.eis) {
          this.form.eis=response.data.eis
        }
        if (response.data.defog) {
          this.form.defog=response.data.defog
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
  clear: both
}

.button {
  margin-left: 160px;
}

.box-card {
  width: 90%;
  margin: 30px auto;
  /* height: 700px; */
}
.test {
  height: 600px;
  overflow-y:scroll;
}
.form0{
  margin-right: 10px
}

</style>
