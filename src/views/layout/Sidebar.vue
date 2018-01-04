<template>
  <el-menu mode="vertical" theme="dark" :default-active="$route.path" class="sidebar_theme">
    <sidebar-item :routes='permission_routers'></sidebar-item>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'permission_routers'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .sidebar_theme{
    background: #2a3037;
    box-shadow: 20px 0 3px 3px rgba(0,0,0,.2);
  }
.el-menu {
  min-height: 100%;
  border-right: none;
}
</style>
