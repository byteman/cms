<template>
 <div class="login-container">
    <div class="form-center">
      <el-row>
        <el-col :span="12"><div class="form-logo" ></div></el-col>
        <el-col :span="12">
          <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px"
            class="card-box login-form">
            <el-form-item prop="username">
              <span class="svg-container svg-container_login">
                <icon-svg icon-class="yonghuming" />
              </span>
              <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="输入您的登录名" />
            </el-form-item>
            <el-form-item prop="password">
              <span class="svg-container">
                <icon-svg icon-class="mima" ></icon-svg>
              </span>
              <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
                placeholder="输入您的密码"></el-input>
            </el-form-item>
            <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
              登&nbsp;录
            </el-button>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { md5 , isvalidUsername } from "@/utils/validate";
import { setToken } from '@/utils/auth' // 验权

export default {
  name: "login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error("请输入正确的用户名"));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value.length < 3) {
        callback(new Error("密码不能小于3位"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [{ required: true, trigger: "blur", validator: validatePass }]
      },
      loading: false
    };
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loginForm.password = md5(this.loginForm.password);
          this.loading = true;
          this.$store
            .dispatch("Login", this.loginForm)
            .then(() => {
              this.loading = false;
              // setToken(1);
              this.$router.push({ path: "/" });
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
@import "src/styles/mixin.scss";
$dark_gray: #889aa4;
$light_gray: #000;
.login-container {
  position: fixed;
  top:0;
  bottom:0;
  right:0;
  left:0;
  margin: auto;
  background: url("../../assets/login_images/login_pg.png") no-repeat center;
  background-size: cover;
  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
    -webkit-text-fill-color: #fff !important;
  }
  input {
    background: transparent;
    border: 0px;
    -webkit-appearance: none;
    border-radius: 0px;
    margin: 12px 15px 12px -5px;
    color: $light_gray;
    height: 23px;
    border-left: 1px solid #ccc;
    padding-left: 5px;
  }
  .el-input {
    display: inline-block;
    height: 47px;
    width: 80%;
  }
  .svg-container {
    padding: 4px 5px 4px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 44px;
    &_login {
      font-size: 20px;
    }
  }
  .login-form {
    position: absolute;
    left: 50%;
    right: 0;
    top: 80px;
    width: 50%;
    padding: 35px 50px 15px 50px;
  }
  .form-center {
    position: absolute;
    width: 850px;
    height: 440px;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    background: url("../../assets/login_images/form_pg.png") no-repeat top;
    background-size: cover;

  }
  .el-row {
    height: 100%;
  }
  .form-logo {
    position: absolute;
    width: 170px;
    height: 210px;
    top: 50%;
    left: 25%;
    margin-left: -85px;
    margin-top: -125px;
    background-size: 100%;
    background-repeat: no-repeat;
    background-image: url("../../assets/login_images/yckj.png");
  }
  .el-form-item {
    border: 1px solid #ccc;
    border-radius: 5px;
    color: #454545;
    margin-bottom: 40px;
    width: 323px;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
  }
  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
  .el-button {
    background: #93a4b8;
    height: 50px;
    border: 0;
    font-size: 25px;
    margin-top: 30px;
  }
}
</style>
