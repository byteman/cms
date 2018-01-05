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
    width: 100%;
    height: calc(100vh - 60px);
    padding: 30px;
    background: #22272d;
    overflow-y: hidden;
    box-sizing: border-box;
  }
</style>
