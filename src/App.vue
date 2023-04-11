<template>
  <router-view />
</template>

<script>


export default {
  name: 'App'
}
</script>

<style>
/* 设置 App.vue 的高度为 100% */
html, body, #app {
  height: 100%;
  background-color: aqua;
  padding:0px;
  margin:0px;
  position:absolute;
  top:0px;
  left:0px;
  width:100%;
  height:100%;
  border:hidden;
}
</style>
