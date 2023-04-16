<template>
    <div>
      <el-container class="home-container">
        <el-aside width="200px" class="left-nav">
            <ChatNav/>
        </el-aside>
        <el-main class="chat-content">
          <ChatRoom/>
        </el-main>
      </el-container>
    </div>
  </template>

<script>
import ChatNav from "../components/ChatNav.vue";
import ChatRoom from "../components/ChatRoom.vue";

export default {
  name: "ChatView",
  data() {
    return {
      logining: false
    };
  },
  methods: {
    handleSubmit(){
    }
  },
  components:{
    ChatNav,
    ChatRoom
  }
};
</script>  

<style>

.home-container{
  background-color: #f3f4f5;
  height: 100vh;
}

.left-nav{
  background-color: #f4f8fc;
}

.chat-content{
  background-color: #e3effa;
}

</style>