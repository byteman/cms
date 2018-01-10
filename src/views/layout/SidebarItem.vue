<template>
  <div class="aside_bar">
    <template v-for="item in routes">
      <router-link v-if="!item.hidden&&item.noDropdown&&item.children.length>0" :to="item.path+'/'+item.children[0].path">
        <el-menu-item :index="item.path+'/'+item.children[0].path">
          <icon-svg v-if='item.icon' :icon-class="item.icon" /> {{item.children[0].name}}
        </el-menu-item>
      </router-link>
      <el-submenu :index="item.name" v-if="!item.noDropdown&&!item.hidden">
        <template slot="title">
          <icon-svg v-if='item.icon' :icon-class="item.icon" /> {{item.name}}
        </template>
        <template v-for="child in item.children" v-if='!child.hidden'>
          <sidebar-item class='menu-indent' v-if='child.children&&child.children.length>0' :routes='[child]'> </sidebar-item>
          <router-link v-else class="menu-indent" :to="item.path+'/'+child.path">
            <el-menu-item :index="item.path+'/'+child.path">
              {{child.name}}
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>
    </template>
  </div>
</template>

<script>
export default {
  name: "SidebarItem",
  props: {
    routes: {
      type: Array
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" >
  .aside_bar{
    width: 190px;
  }
.svg-icon {
  margin-right: 10px;
}
.hideSidebar .menu-indent {
  display: block;
  text-indent: 10px;
}
.el-submenu .el-menu-item {
  background: #edf1f9;
  color: #6699cc;
  font-size: 14px;
  padding: 0 0 0 60px!important;
}
.el-submenu .el-menu-item.is-active {
  background: #abbde1;
  color: #fff;
}
.el-submenu .el-menu-item:hover {
  background: #d5dff3 !important;
  color: #6699cc;
}
.el-menu-item {
  font-size: 16px;
  height: 56px;
  color: #333;
}
.el-menu-item:hover {
  background: #7596d7 !important;
  color: #fff;
}
.el-menu-item.is-active {
  background: #4f73bc;
  color: #fff;
}
.el-submenu {
  font-size: 16px;
  color: #333;
  overflow: hidden;
}
.el-submenu.is-active .el-submenu__title {
  background: #4f73bc;
  color: #fff;
}
.el-submenu__title:hover {
  background: #7596d7 !important;
  color: #fff;
}
.el-submenu__title {
  font-size: 16px;
}
</style>

