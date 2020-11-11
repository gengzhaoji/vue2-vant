<template>
  <div id="app">
    <router-view
      v-if="!$route.meta.keepAlive"
      :key="$route.fullPath"
    ></router-view>
    <keep-alive>
      <router-view
        v-if="$route.meta.keepAlive"
        :key="$route.fullPath"
      ></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "APP"
};
</script>
<style scoped lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
