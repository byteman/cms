<template>
  <el-form ref="form" :model="faceThresholds" label-width="70px" style="padding:30px 0 0;">
    <el-form-item label="开启阈值">
      <el-switch v-model="faceThresholds.switchBox">
      </el-switch>
    </el-form-item>
    <el-form-item label="识别阈值">
      <el-input v-model="faceThresholds.settingValue"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" plain @click="submit_rec">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import { queryThresholdData, updateThresholdData } from '@/api/sysconfig'

  export default {
    data() {
      var setValue_validator = (rule, value, callback) => {
        var re = /^\d+(\.\d+)?$/;
        var re2 = /^[1-9]+[0-9]*]*$/;
        if (!re.test(value)) {
          callback(new Error("组ID必须是0-1之间的小数"));
          this.$message("组ID必须是0-1之间的小数");
        }
        if (value < 0 || value > 1) {
          callback(new Error("0-1之间的小数"));
          this.$message("0-1之间的小数");
        }
      }

      return {
        faceThresholds: {
          switchBox: false,   //  切换开关
          settingValue: ''   //  设置
        },
        rules: {
          settingValue: [{validator: setValue_validator, trigger: "blur"}],
        }
      }

    },
    mounted() {
      this.reload();
    },
    methods: {
      submit_rec() {
        console.log(this.faceThresholds.switchBox);
        console.log(this.faceThresholds.settingValue);
        updateThresholdData(this.faceThresholds.switchBox, this.faceThresholds.settingValue).then(responce => {
          console.log(responce);
          this.faceThresholds = responce.data
        }).catch(() => {
          this.$message.error("数据获取失败！请检查！");
        })
      },
      reload() {
        queryThresholdData()
          .then(response => {
            this.faceThresholds = response.data;
            console.log(response);
          })
          .catch(() => {
            this.$message.error("数据提交失败！请检查！");
          })
      }
    }
  }
</script>

<style scoped>

</style>
