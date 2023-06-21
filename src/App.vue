<template>
  <router-view />
</template>

<script>

export default {
  name: 'App'
}
</script>


<style>
/* 网页的布局占满全屏 移除滚屏*/
html,
body,
#app {
  /*设置内部填充为0，几个布局元素之间没有间距*/
  padding: 0px;
  /*外部间距也是如此设置*/
  margin: 0px;
  /*统一设置高度为100%*/
  height: 100%;
}

/* 网页的布局占满全屏 移除vue3默认带的css */
/* #app {
    margin: 0;
    padding: 0;
    font-weight: normal;
    height: 100vh;
    width: 100%;
    padding: 0;
    margin: 0;
} */
/* 设置 App.vue 的高度为 100% */
/*
html, body, #app {
  height: 100%;
  background-color: aqua;
  padding:0px;
  margin:0px;
}
*/
/* 去除滚轮 */
/* *{
  margin: 0;
  padding: 0;
} */
</style>
