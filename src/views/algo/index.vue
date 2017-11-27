<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span style="line-height: 36px;">{{title}}</span>
    </div>
    <el-form :model="param" :rules="rules" ref="devform" label-width="150px">
      <el-col :span="11">
        <!--
         <el-form-item label="设备编号" prop="deviceId">
          <el-input v-model="param.deviceId" disabled></el-input>
        </el-form-item>
        <el-form-item label="检测人脸数" prop="maxFaceNum">
          <el-input v-model="param.maxFaceNum" type="number"></el-input>
        </el-form-item>
        <el-form-item label="最低质量分" prop="qualityScore">
          <el-input v-model="param.qualityScore" type="number"></el-input>-->
        </el-form-item>
        <el-form-item label="质量分阀值" prop="qualityScore">
          <el-input v-model="param.qualityScore" type="number"></el-input>
        </el-form-item>
        <!-- <el-form-item label="识别阀值" prop="compareScore">
          <el-input v-model="param.compareScore" type="number"></el-input>
        </el-form-item>
        <el-form-item label="陌生人开关" prop="isAllOutPut">
          <el-checkbox v-model="param.isAllOutPut">陌生人开启</el-checkbox>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="onSubmit">设 置</el-button>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <!--
        <el-form-item label="抬头角度" prop="rise">
          <el-input v-model="param.rise" type="number"></el-input>
        </el-form-item>
         <el-form-item label="转头角度" prop="turn">
          <el-input v-model="param.turn" type="number"></el-input>
        </el-form-item>
        <el-form-item label="低头角度" prop="yield">
          <el-input v-model="param.yield" type="number"></el-input>
        </el-form-item>
        <el-form-item label="偏头角度" prop="side">
          <el-input v-model="param.side" type="number"></el-input>
        </el-form-item>
        -->
        <!-- <el-form-item label="陌生人阀值" prop="strangerThreshold">
          <el-input v-model="param.strangerThreshold" type="number"></el-input>
        </el-form-item> -->
        <el-form-item label="识别间隔(毫秒)" prop="regcoInterval">
          <el-input v-model="param.regcoInterval" type="number"></el-input>
        </el-form-item>
        <!-- <el-form-item label="选人开关" prop="vip_selection">
          <el-checkbox v-model="param.vip_selection">VIP选人开关</el-checkbox>
        </el-form-item> -->
      </el-col>
    </el-form>
  </el-card>
</template>

<script>

import { GetAlgoParam, SetAlgoParam} from '@/api/algo'

export default {

  props: ['data', 'title', 'btnName', 'type'],

  data() {
    return {
      param:{
          deviceId: '12345678',
          maxFaceNum: 1,
          qualityScore: 0.4,
          qualityThreshold: 0.5,
          isAllOutPut:'false',
          recgThreshold: 0.7,
          rebuildModel: false,
          strangerThreshold: 0,
          recgInterval: 3000,
          rise: 0,
          yield: 0,
          turn: 0,
          side: 0,
      },
      rules: {
        maxFaceNum: [
          { required: true, message: '请输入检测人脸数'},
        ],
        qualityScore: [
          { required: true, message: '请输入最低质量分'},
        ],
        qualityThreshold: [
          { required: true, message: '请输入质量分阀值'},
        ],
        compareScore: [
          { required: true, message: '请输入识别阀值'},
        ],
        regcoInterval: [
          { required: true, message: '请输入识别间隔'}
        ],
        strangerThreshold: [
          { required: true, message: '请输入陌生人阀值'}
        ],
        rise: [
          { required: true, message: '请输入抬头角度'}
        ],
        yield: [
          { required: true, message: '请输入底头角度'}
        ],
        turn: [
          { required: true, message: '请输入转头角度'}
        ],
        side: [
          { required: true, message: '请输入偏头角度'}
        ],
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
        console.log('*******', this.param);
        if (valid) {
          SetAlgoParam(this.param).then(response => {
            this.$message({
                type: 'info',
                showClose: true,
                message: '保存成功'
              })
          })
        } else {
           this.$message({
                type: 'error',
                showClose: true,
                message: '保存失败'
              })
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
  },
  fillter: {
    cutName(value){
      return value.toFixed(2)
    }

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
