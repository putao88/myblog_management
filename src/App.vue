<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
// @import '~normalize.css/normalize.css';// normalize.css 样式格式化
@import './styles/index.scss'; // 全局自定义的css样式
#app {
    height:100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
html,body {
    height: 100%;
    margin:0;
    padding:0;
}
</style>
