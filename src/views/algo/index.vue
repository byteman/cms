<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span style="line-height: 36px;">{{title}}</span>
    </div>
    <el-form   ref="devform" label-width="150px">
      <el-col :span="11">
         <el-form-item label="设备编号" prop="deviceId">
          <el-input v-model="param.deviceId"></el-input>
        </el-form-item>
        <el-form-item label="质量分数" prop="qualityScore">
          <el-input v-model="param.qualityScore"></el-input>
        </el-form-item>
      
        <el-form-item label="对比阀值" prop="compareScore">
          <el-input v-model="param.compareScore"></el-input>
        </el-form-item>
         <el-form-item label="低头角度" prop="yield">
          <el-input v-model="param.yield"></el-input>
        </el-form-item>
      
       <el-form-item label="重新建模" prop="rebuildModel">
          <el-checkbox v-model="param.rebuildModel">重新建模</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
        </el-form-item>

      </el-col>

      <el-col :span="11" :offset="1">
        <el-form-item label="陌生人阀值" prop="moshenScore">
          <el-input v-model="param.moshenScore"></el-input>
        </el-form-item>
        <el-form-item label="识别间隔(毫秒)" prop="regcoInterval">
          <el-input v-model="param.regcoInterval"></el-input>
        </el-form-item>
        <el-form-item label="抬头角度" prop="rise">
          <el-input v-model="param.rise"></el-input>
        </el-form-item>
         <el-form-item label="转头角度" prop="turn">
          <el-input v-model="param.turn"></el-input>
        </el-form-item>

      </el-col>

    </el-form>

  </el-card>
</template>

<script>

import { GetAlgoParam } from '@/api/algo'

export default {

  props: ['data', 'title', 'btnName', 'type'],

  data() {
    return {
      param:{
          qualityScore:0.7,
          regcoInterval:3000,
          compareScore:0.7,
          moshenScore:0,
          deviceId:'',
          rebuildModel:false,
          rise:0,
          yield:0,
          turn:0
      }
    }
  },
  methods: {
    fetchAlgo() {
      
       GetAlgoParam().then(response => {
        this.param = response.data
        this.listLoading = false
      })

    },  
    onSubmit() {
     
      this.$refs.devform.validate((valid) => {
        if (valid) {
         
        } else {
          console.log('error submit!!')
        }
      })
    },
    onCancel() {
      console.log('onCancel')
      this.$emit('success', false)
    }
  },
  mounted() {
    console.log('edit mounted')
    this.fetchAlgo()
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
  width: 800px;
  margin: 30px auto;
  height: 700px;
}

</style>
