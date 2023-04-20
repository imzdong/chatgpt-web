<template>
  <div class="conversation-detail">
    <div class="message-list">
      <div v-for="(message, index) in messages" :key="index" class="message-item">
        <div class="message-header">
          <div class="message-username">{{ message.username }}</div>
          <div class="message-time">{{ message.time }}</div>
        </div>
        <div class="message-content">{{ message.content }}</div>
      </div>
    </div>
    <div class="message-input">
      <el-input
        v-model="newMessage"
        placeholder="请输入消息"
        type="textarea"
        autosize
        :rows="3"
      ></el-input>
      <el-button class="send-button" type="primary" @click="sendMessage">发送</el-button>
    </div>
  </div>
</template>

<script>
import { reactive, ref, onMounted  } from 'vue';
import { getConversationMessages, sendApiMessage } from '../api/conversations';

export default {
  name: 'ConversationDetail',
  props: {
    conversationId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const messages = reactive([]);
    const newMessage = ref('');

    // 获取会话消息列表
    const fetchMessages = async () => {
      try {
        const data = await getConversationMessages(props.conversationId);
        messages.push(data.messages);
      } catch (error) {
        console.error(error);
      }
    };

    // 发送消息
    const sendMessage = async () => {
      try {
        const data = await sendApiMessage(props.conversationId, newMessage.value);
        messages.push(data.message);
        newMessage.value = '';
      } catch (error) {
        console.error(error);
      }
    };

    // 在组件挂载时获取会话消息列表
    onMounted(() => {
      fetchMessages();
    });

    return {
      messages,
      newMessage,
      sendMessage,
    };
  },
};
</script>

<style scoped>
.conversation-detail {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.message-list {
  flex: 1;
  overflow-y: scroll;
  padding: 20px;
}

.message-item {
  margin-bottom: 20px;
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.message-username {
  font-size: 14px;
  font-weight: bold;
}

.message-time {
  font-size: 12px;
  color: #999;
}

.message-content {
  font-size: 14px;
}

.message-input {
  display: flex;
  margin-top: 20px;
}

.send-button {
  margin-left: 10px;
}
</style>
