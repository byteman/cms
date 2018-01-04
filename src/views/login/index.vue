<template>
  <div class="login-container">
    <el-row  type="flex">
      <el-col :push="13" :xs="10" :sm="8" :md="7" :lg="5" :xl="5">
        <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0"  class="card-box login-form">
          <el-form-item>
            <img src="../../../src/assets/walkcloud_logo.png" alt="">
          </el-form-item>
          <el-form-item prop="username">
          <span class="svg-container svg-container_login">
            <icon-svg icon-class="username" />
          </span>
            <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item prop="password">
            <span class="svg-container">
              <icon-svg icon-class="password" ></icon-svg>
            </span>
            <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
                      placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item class="remberPassword">
            <div class="rember-right">
              <label>记住密码</label>
              <el-switch v-model="delivery"></el-switch>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="loginBtn" :loading="loading" @click.native.prevent="handleLogin">
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate'

export default {
  name: 'login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 3) {
        callback(new Error('密码不能小于3位'))
      } else {
        callback()
      }
    };
    return {
      loginForm: {
        username: '',
        password: ''
      },
      delivery: false,
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false
    }
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: '/preview' })
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/mixin.scss";
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;

  .login-container {
    @include relative;
    height: 100vh;
    background:url("../../../src/assets/login_bg.jpg") no-repeat center center;
    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0 1000px #293444 inset !important;
      -webkit-text-fill-color: #fff !important;
    }
    input {
      background: transparent;
      border: 0;
      -webkit-appearance: none;
      border-radius: 0;
      padding: 12px 5px 12px 15px;
      color: $dark_gray;
      height: 44px;
    }
    .el-input {
      display: inline-block;
      height: 44px;
      width: 85%;
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
    }
    .svg-container {
      padding: 0px 5px 0px 15px;
      color: $dark_gray;
      vertical-align: top;
      width: 30px;
      display: inline-block;
      &_login {
        font-size: 20px;
      }
    }
    .rember-right{
      float: right;
      color: #cdcdcd;
    }
    .remberPassword{
      border: none!important;
    }
    .loginBtn{
      font-size: 24px;
      width: 100%;
      border-radius: 10px;
    }
    .title {
      font-size: 26px;
      /*font-weight: 400;*/
      color: $light_gray;
      margin: 0 auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .login-form {
      min-width: 300px;
      padding: 34px;
      margin-top: 64%;
      background: #fff;
      border-radius: 20px;
      box-shadow: 0 8px 8px 6px rgba(0,0,0,0.6);
    }
    .el-form-item:first-child{
      border: none;
      margin-bottom: 60px;
    }
    .el-form-item:last-child{
      border: none;
    }
    .el-form-item img{
     margin: 0 auto;
      display: flex;
      width: 50%;
    }
    .el-form-item {
      border: 1px solid rgba(188, 188, 188, 0.9);
      background: none;
      border-radius: 10px;
      color: #454545;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
    }
    .thirdparty-button{
      position: absolute;
      right: 35px;
      bottom: 28px;
    }
  }
</style>
