<template>
    <div class="chat-page">
      <ChatRoom :selfUser="selfUser" :messages="messages" />
    </div>
  </template>
  
  <script>
  import ChatRoom from "./ChatRoom.vue";
  
  export default {
    name: "ChatBox",
    components: {
      ChatRoom,
    },
    data() {
      return {
        selfUser: "张三",
        messages: [
          {
            sender: "李四",
            receiver: "张三",
            content: "你好",
            time: "10:00",
          },
          {
            sender: "张三",
            receiver: "李四",
            content: "你好，有什么事吗？",
            time: "10:05",
          },
          {
            sender: "李四",
            receiver: "张三",
            content: "有一件事想问问你。",
            time: "10:10",
          },
        ],
      };
    },
  };
  </script>
  
  <style>
  .chat-page {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  </style>