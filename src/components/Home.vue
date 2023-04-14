<template>
    <div class="common-layout">
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>Main</el-main>
      </el-container>
    </div>
  </template>
<script>
export default {
  name: "HomeView",
  data() {
    return {
      logining: false
    };
  },
  methods: {
    handleSubmit(){
    }
  },
};
</script>  