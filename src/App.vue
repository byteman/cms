<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted() {
    console.log('App mounted')
    var role = {
      role: 'admin',
      name: 'admin',
      avatar: '/logo.gif'
    }
    this.$store.dispatch('GenerateRoutes', { role }).then(() => {
      this.$router.addRoutes(this.$store.getters.addRouters)
    })
  }
}
</script>

<style lang="scss">
  @import '~normalize.css/normalize.css';// normalize.css 样式格式化
  @import './styles/index.scss'; // 全局自定义的css样式
  @import './styles/iconfont.css';

</style>
