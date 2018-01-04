<template>
  <el-card class="box-card">

    <el-form ref="form"  label-width="200px">

      <el-form-item label="亮度设置">
        <el-slider @change="onBrightnessChange()" v-model="form.brightness" style="margin-left:10px"></el-slider>
      </el-form-item>

      <el-form-item label="对比度设置">
        <el-slider @change="onContrastChange()" v-model="form.contrast" style="margin-left:10px"></el-slider>
      </el-form-item>

      <el-form-item label="饱和度设置">
        <el-slider @change="onSaturationChange()" v-model="form.saturation" style="margin-left:10px"></el-slider>
      </el-form-item>

      <el-form-item label="色调设置">
        <el-slider @change="onHueChange()" v-model="form.hue" style="margin-left:10px"></el-slider>
      </el-form-item>

      <el-form-item label="锐度设置">
        <el-slider @change="onSharpnessChange()" v-model="form.sharpness" style="margin-left:10px"></el-slider>
      </el-form-item>

    <el-form-item class="button">
      <el-button  type="primary" @click='onSave'>保存</el-button>
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
        contrast: 50,
        saturation: 50,
        hue: 50,
        sharpness: 50,

        isp_type:2,
      },
    }
  },
  methods: {   
    ResetVal() {
      this.form.brightness =50; 
      this.form.contrast=50;
      this.form.saturation=50;
      this.form.hue=50;
      this.form.sharpness=50;
    },
    onSave() {
      this.setISP()
    },
    onBrightnessChange(){
      console.log(this.form.brightness)
    },
    onContrastChange(){
      console.log(this.form.contrast)
    },
    onSaturationChange(){
      console.log(this.form.saturation)
    },
    onHueChange(){
      console.log(this.form.hue)
    },
    onSharpnessChange(){
      console.log(this.form.sharpness)
    },
    onReset() {
      console.log('onCancel')
      this.$emit('success', false)
    },
    getISP() {
      console.log('standard get isp')
      SetISP({'isp_type': 5}).then(response => {      
        console.log(response.data)
        this.form.brightness = response.data.brightness
        this.form.contrast = response.data.contrast
        this.form.saturation = response.data.saturation
        this.form.hue = response.data.hue
        this.form.sharpness = response.data.sharpness
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
  margin-left: 90px
}

.box-card {
  width: 90%;
  margin: 30px auto;
  /* height: 700px; */
}

</style>
