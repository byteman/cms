<template>
  <el-menu class="navbar" mode="horizontal">
    <el-row type="flex">
      <!--<el-col :span="0">-->
      <!--<div class="navba-middle-info">-->
      <!--<div class="navbar-header-notice">公告</div>-->
      <!--<span>&nbsp;恭贺FaceGo-Smart正式上线，欢迎使用...</span>-->
      <!--</div>-->
      <!--</el-col>-->
      <el-col :span="24" class="leave_out">
        <el-button type="text" class="cw-menu-item" @click="logout">
          <img src="../../assets/common_search/sign-out.png" class="pull-left">
          <p>安全退出</p>
        </el-button>
        <div class="vline"></div>
        <div class="pull-right logininfo">
          <img src="../../assets/common_search/tx.png" class="pull-left">
          <div class="pull-left">
            <p>欢迎您，超级管理员</p>
            <p>{{time}}</p>
          </div>
        </div>
      </el-col>
    </el-row>
  </el-menu>
</template>

<script>
  import {mapGetters} from "vuex";
  import {getTime} from "@/utils/index";
  import Hamburger from "@/components/Hamburger";

  export default {
    data() {
      return {
        time: ""
      };
    },
    mounted() {
      this.myFunc = setInterval(() => {
        this.time = getTime();
      }, 1000);
    },
    beforeDestroy() {
      clearInterval(this.myFunc);
    },
    components: {
      Hamburger
    },
    computed: {
      ...mapGetters(["sidebar", "avatar"])
    },
    methods: {
      toggleSideBar() {
        this.$store.dispatch("ToggleSideBar");
      },
      logout() {
        this.$store.dispatch("LogOut").then(() => {
          location.reload(); // 为了重新实例化vue-router对象 避免bug
        });
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .navbar {
    height: 60px;
    line-height: 60px;
    background: #6386cd;
    border: 0;
    border-radius: 0 !important;
    outline: none;
    .leave_out {
      outline: none;
      border: none;
    }
    .hamburger-container {
      line-height: 58px;
      height: 60px;
      float: left;
      padding: 0 10px;
    }
    .errLog-container {
      display: inline-block;
      position: absolute;
      right: 150px;
    }
    .screenfull {
      position: absolute;
      right: 90px;
      top: 16px;
      color: red;
    }

    .navba-middle-info {
      width: 50%;
      overflow: hidden;
      height: 60px;
      float: left;
      margin-left: 20px;
      min-width: 420px;
    }
    .navba-middle-info > span {
      color: #fff;
    }
    .navbar-header-notice {
      float: left;
      width: 40px;
      height: 60px;
      background-size: 100%;
      background-repeat: no-repeat;
      background-position: center;
      background-image: url("../../assets/common_search/notice.png");
      color: #fff;
      font-size: 15px;
    }
    .logininfo {
      height: 60px !important;
      display: flex;
      align-items: flex-end;
      width: 221px !important;
      margin: 0;
      padding: 0;
      float: right;
    }
    .logininfo > img {
      margin: 12px 5px;
      width: 36px;
      height: 36px;
      border-radius: 18px;
    }
    .logininfo > div {
      font-size: 12px;
      height: 30px;
      color: #fff;
      margin: 15px 0;
    }
    .logininfo > div > p {
      width: 100%;
      height: 14px;
      display: block;
      margin: 0;
      padding: 0;
      line-height: 20px;
    }
    .cw-menu-item {
      color: #fff;
      width: 125px !important;
      border-bottom: none;
      position: relative;
      float: right;
      font-size: 14px;
    }
    .cw-menu-item,
    .cw-menu-submenu-title {
      margin: 0;
      padding: 0 20px;
      position: relative;
      display: block;
      white-space: nowrap;
    }
    .cw-menu-item,
    .cw-menu-submenu,
    .cw-menu-submenu-title {
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .vline {
      width: 0px;
      height: 20px !important;
      margin: 20px 0px 20px;
      border-left: 1px solid #fff;
      float: right;
    }
    .el-row {
      margin-right: 20px;
    }
    .cw-menu-item > span > img {
      margin: 22px 5px;
      width: 16px;
      height: 16px;
      border-radius: 18px;
      float: left;
    }
    .cw-menu-item > span {
      display: block;
    }
    .cw-menu-item > span > p {
      margin: 0;
      padding: 0;
      line-height: 60px;
    }
    .cw-menu-item:hover {
      background-color: #4f73bc;
    }
  }
</style>

