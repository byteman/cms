<template>
  <section class="app-main">
    <transition name="fade" mode="out-in">
      <router-view :key="key"></router-view>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    }
  },
  mounted() {
    console.log('AppMain mounted')
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .app-main{
    background: #fff;
    padding: 20px;
    height: 100%;
    width: 100%;
  }
</style>
