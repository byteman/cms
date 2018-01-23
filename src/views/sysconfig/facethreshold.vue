<template>
  <el-form ref="form" :model="faceThresholds" label-width="70px" style="padding:30px 0 0;">
    <el-form-item label="开启阈值">
      <el-switch v-model="faceThresholds.switchBox">
      </el-switch>
    </el-form-item>
    <el-form-item label="识别阈值">
      <el-input v-model="faceThresholds.settingValue" ></el-input>
    </el-form-item>
    <div class="footer">
      <el-button type="primary" plain  @click="submit_rec">提交</el-button>
    </div>
  </el-form>

</template>

<script>
  import { queryThresholdData, updateThresholdData } from '@/api/sysconfig'

  export default {
    data() {
      var setValue_validator = (rule, value, callback) => {
        if (value < 0 || value > 1) {
          callback(new Error("图片阈值必须是0-1之间的小数"));
          this.$message.error("图片阈值必须是0-1之间的小数");
        }
      };
      return {
        controlEdit: false,
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
        // if (!this.faceThresholds.switchBox){
        //   this.faceThresholds.settingValue =  0.00001;
        // }
        this.faceThresholds.settingValue = this.faceThresholds.switchBox ? this.faceThresholds.settingValue : 0.00001 ;

        if (this.faceThresholds.settingValue >= 1 || this.faceThresholds.settingValue <= 0 ){
          this.$message.error("阈值设置为0-1之间的小数！");
          this.faceThresholds.settingValue = "";
          return;
        }
        updateThresholdData(this.faceThresholds.switchBox, JSON.parse(this.faceThresholds.settingValue)).then(responce => {
          if (responce.data.result === 0){
            this.$message.success("提交成功！");
            this.reload();
          } else {
            this.$message.error("数据提交失败！请检查！");
          }
        }).catch(() => {
          this.$message.error("数据提交失败！请检查！");
        })
      },
      reload() {
        queryThresholdData()
          .then(response => {
            this.faceThresholds.settingValue = response.data.picValue;
            this.faceThresholds.switchBox = response.data.switchValue;
          })
          .catch(() => {
            this.$message.error("数据提交失败！请检查！");
          })
      }
    }
  }
</script>

<style scoped lang="scss">
  .footer {
    height: 50px;
    margin-top: 40px;
    text-align: center;
  }
</style>
