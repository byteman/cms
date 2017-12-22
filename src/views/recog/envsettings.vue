<template>
  <div class="content">
    <el-form :model="param" :rules="rules" ref="devform" label-width="150px" size="mini">
      <el-col :span="23">
        <el-form-item label="性别优化" >
          <el-select v-model="param.six_flag" >
            <el-option label="无限制" value="0"></el-option>
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="2"></el-option>
          </el-select>
        </el-form-item>
          
      
        <el-form-item label="国籍优化" >
          <el-select v-model="param.nationality_flag" >
            <el-option label="关闭" value="0"></el-option>
            <el-option label="开启" value="1"></el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="年龄优化最小值" prop="ageMin">
          <el-input v-model="param.ageMin" ></el-input>
        </el-form-item>


        <el-form-item label="年龄优化最大值" prop="ageMax">
          <el-input v-model="param.ageMax"></el-input>
        </el-form-item>


        <el-form-item label="肤色优化阈值" prop="skin_threshold">
          <el-input v-model="param.skin_threshold"></el-input>
        </el-form-item>


        <el-form-item label="识别阈值" prop="reg_score_threshold">
          <el-input v-model="param.reg_score_threshold"></el-input>
        </el-form-item>


        <el-form-item label="优化识别阈值" prop="live_score_threshold">
          <el-input v-model="param.live_score_threshold"></el-input>
        </el-form-item>


        <el-form-item label="正系数" prop="score_for_add">
          <el-input v-model="param.score_for_add"></el-input>
        </el-form-item>


        <el-form-item label="负系数" prop="score_for_minus">
          <el-input v-model="param.score_for_minus"></el-input>
        </el-form-item>
        <div>        
          <el-form-item>
          <el-button type="primary"  @click="onSubmit">保存</el-button>
        </el-form-item>
        </div>
      </el-col>
    </el-form>
  </div>
</template>

<script>
import { GetEngineSettings, SetEngineSettings } from "@/api/envsettings";

export default {
  data() {
    var age_validator = (rule, value, callback) => {
      var re = /^\d+(\.\d+)?$/;
      var re2 = /^[1-9]+[0-9]*]*$/;
      console.log(re.test(value));
      if (!re.test(value)) {
        callback(new Error("年龄必须在0-120之间的整数"));
      } else if (value < 0 || value > 120) {
        callback(new Error("年龄必须在0-120之间的整数"));
      } else if (!re2.test(value)) {
        callback(new Error("年龄必须在0-120之间的整数"));
      } else {
        callback();
      }
    };

    var threshold_validator = (rule, value, callback) => {
      var re = /^\d+(\.\d+)?$/;
      if (!re.test(value)) {
        callback(new Error("该值必须在0-1之间的数字"));
      } else if (value.length > 7) {
        callback(new Error("该值必须在0-1之间的数字,只支持小数点后5位"));
      } else if (value < 0 || value > 1) {
        callback(new Error("该值必须在0-1之间的数字"));
      } else {
        callback();
      }
    };

    return {
      param: {
        six_flag: "",
        nationality_flag: "",
        ageMin: "",
        ageMax: "",
        skin_threshold: "",
        reg_score_threshold: "",
        live_score_threshold: "",
        score_for_add: "",
        score_for_minus: ""
      },

      rules: {
        ageMin: [{ validator: age_validator, trigger: "blur" }],
        ageMax: [{ validator: age_validator, trigger: "blur" }],
        skin_threshold: [{ validator: threshold_validator, trigger: "blur" }],
        reg_score_threshold: [
          { validator: threshold_validator, trigger: "blur" }
        ],
        live_score_threshold: [
          { validator: threshold_validator, trigger: "blur" }
        ],
        score_for_add: [{ validator: threshold_validator, trigger: "blur" }],
        score_for_minus: [{ validator: threshold_validator, trigger: "blur" }]
      }
    };
  },
  methods: {
    OnShow() {
      GetEngineSettings().then(response => {
        if (response.data.data.six_flag == 1) {
          this.param.six_flag = "1";
        } else if (response.data.data.six_flag == 2) {
          this.param.six_flag = "2";
        } else {
          this.param.six_flag = "0";
        }

        if (response.data.data.nationality_flag == 1) {
          this.param.nationality_flag = "1";
        } else {
          this.param.nationality_flag = "0";
        }

        this.param.ageMin = response.data.data.ageMin;
        this.param.ageMax = response.data.data.ageMax;
        this.param.skin_threshold = response.data.data.skin_threshold;
        this.param.reg_score_threshold = response.data.data.reg_score_threshold;
        this.param.live_score_threshold =
          response.data.data.live_score_threshold;
        this.param.score_for_add = response.data.data.score_for_add;
        this.param.score_for_minus = response.data.data.score_for_minus;
      });
    },

    OnSave() {
      SetEngineSettings(
        this.param.six_flag,
        this.param.nationality_flag,
        this.param.ageMin,
        this.param.ageMax,
        this.param.skin_threshold,
        this.param.reg_score_threshold,
        this.param.live_score_threshold,
        this.param.score_for_add,
        this.param.score_for_minus
      );
    },

    onSubmit() {
      this.$refs.devform.validate(valid => {
        if (valid) {
          SetEngineSettings(
            this.param.six_flag,
            this.param.nationality_flag,
            this.param.ageMin,
            this.param.ageMax,
            this.param.skin_threshold,
            this.param.reg_score_threshold,
            this.param.live_score_threshold,
            this.param.score_for_add,
            this.param.score_for_minus
          ).then(response => {
            console.log(response);
            if (response.data.status == 0) {
              alert("保存成功");
            } else {
              alert("保存失败，错误信息：" + response.data.message);
            }
          });
        }
      });
    }
  },
  mounted() {
    this.OnShow();
  }
};
</script>
<style scoped>
.content {
  width: 97%;
  margin: 0 auto;
  margin-top: 50px;
}
</style>

