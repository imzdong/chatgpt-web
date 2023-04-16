<template>
    <div class="chat-room">
      <div class="message-list">
        <div
          v-for="(message, index) in localMessages"
          :key="index"
          class="message-item"
          :class="{ self: message.sender === selfUser }"
        >
          <div class="message-sender">{{ message.sender }}</div>
          <div class="message-time">{{ message.time }}</div>
          <div class="message-content">{{ message.content }}</div>
        </div>
      </div>
      <div class="message-input">
        <input v-model="inputText" type="text" placeholder="输入消息..." />
        <button @click="send">发送</button>
      </div>
    </div>
  </template>
  
  <script>

class ChatMessage {
    constructor({ sender, receiver, content, time }) {
      this.sender = sender;
      this.receiver = receiver;
      this.content = content;
      this.time = time;
    }
  }

  
  export default {
    name: "ChatRoom",
    props: {
      selfUser: {
        type: String,
        required: true,
      },
      messages: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        inputText: "",
        localMessages: this.messages
      };
    },
    created() {
    // 创建WebSocket连接
    this.socket = new WebSocket('ws://localhost:3000')
    // 监听WebSocket事件
    this.socket.addEventListener('message', event => {
      const message = JSON.parse(event.data)
      this.messages.push(message)
    })
  },
    methods: {
      send() {
        if (this.inputText) {
          const message = new ChatMessage({
            sender: this.selfUser,
            receiver: "",
            content: this.inputText,
            time: new Date().toLocaleTimeString(),
          });
          this.localMessages.push(message);
          this.inputText = "";
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .chat-room {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  
  .message-list {
    flex-grow: 1;
    overflow: auto;
    padding: 8px;
  }
  
  .message-item {
    display: flex;
    flex-direction: column;
    margin-bottom: 8px;
  }
  
  .message-item.self {
    align-self: flex-end;
  }
  
  .message-sender {
    font-size: 12px;
    color: gray;
  }
  
  .message-time {
    font-size: 10px;
    color: #aaa;
  }
  
  .message-content {
    background-color: #f6f6f6;
    padding: 4px 8px;
    border-radius: 4px;
  }
  .message-input {
    display: flex;
    align-items: center;
    padding: 8px;
    background-color: #f6f6f6;
  }
  
  input[type="text"] {
    flex-grow: 1;
    border: none;
    outline: none;
    background-color: transparent;
  }
  
  button {
    margin-left: 8px;
    background-color: #0095ff;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px 12px;
    cursor: pointer;
    font-size: 14px;
    outline: none;
  }
  
  button:hover {
    background-color: #0085cc;
  }
  </style>