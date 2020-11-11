<template>
  <div id="app">
    <div id="nav">
      测试页面
      <van-button type="default">默认按钮</van-button>
      <van-button type="primary">主要按钮</van-button>
      <van-button type="info">信息按钮</van-button>
      <van-button type="warning">警告按钮</van-button>
      <van-button type="danger">危险按钮</van-button>
    </div>
    <router-view />
  </div>
</template>
<script>
export default {
  methods: {

  },
  mounted() {
    // this.$myMethod('测试数据2')
  }
};
</script>
<style lang="scss">
@import "assets/style/common.scss";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: $bkc;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
