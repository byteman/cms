<template>
  <div>
    <div class="cloudwalk_logo">
      <img src="../../assets/cloudwalk_logo_pic.png" alt="">
    </div>
    <div class="nav_content">
      <template v-for="item in routes">
        <router-link v-if="!item.hidden&&item.noDropdown&&item.children.length>0"
                     :to="item.path+'/'+item.children[0].path">
          <el-menu-item :index="item.path+'/'+item.children[0].path">
            <icon-svg v-if='item.icon' :icon-class="item.icon"/>
            {{item.children[0].name}}
          </el-menu-item>
        </router-link>
        <el-submenu :index="item.name" v-if="!item.noDropdown&&!item.hidden">
          <template slot="title">
            <icon-svg v-if='item.icon' :icon-class="item.icon"/>
            {{item.name}}
          </template>
          <template v-for="child in item.children" v-if='!child.hidden'>
            <sidebar-item class='menu-indent' v-if='child.children&&child.children.length>0'
                          :routes='[child]'></sidebar-item>
            <router-link v-else class="menu-indent" :to="item.path+'/'+child.path">
              <el-menu-item :index="item.path+'/'+child.path">
                {{child.name}}
              </el-menu-item>
            </router-link>
          </template>
        </el-submenu>
      </template>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'SidebarItem',
    props: {
      routes: {
        type: Array
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .cloudwalk_logo {
    width: 100%;
    height: 160px;
    padding-top: 12%;
    box-sizing: border-box;
    border-bottom: 1px solid #1c2531;
    img {
      width: 80%;
      display: flex;
      line-height: 1;
      margin: 0 auto;
      vertical-align: middle;
    }
  }

  .nav_content {
    border-top: 1px solid #303e50;
    box-sizing: border-box;
  }

  .svg-icon {
    margin-right: 10px;
  }

  .hideSidebar .menu-indent {
    display: block;
    text-indent: 10px;
  }

  .el-menu li {
    color: #bfbfbf;
    font-size: 16px;
    box-sizing: border-box;
    padding-left: 40px !important;
    border-left: 2px solid transparent;
  }

  .el-menu-item.is-active {
    color: #5aa5e8;
    background: #17202a;
    border-left: 2px solid #3dabea;
    box-sizing: border-box;

  }

  .el-menu li:hover {
    background: #17202a;
    border-left: 2px solid #3dabea;
  }
</style>

