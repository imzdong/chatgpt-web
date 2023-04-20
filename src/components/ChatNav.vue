<template>
  <div class="left-panel">

    <div class="new-conversation">
      <!-- 新建会话按钮 -->
      <el-button type="primary" icon="el-icon-plus" @click="createConversation">新建会话</el-button>
    </div>

    <div class="conversation-list">
      <!-- 会话列表 -->
      <div class="conversation" v-for="conversation in conversations" :key="conversation.id">
        <div class="conversation-avatar"></div>
        <div class="conversation-info">
          <div class="conversation-title">{{ conversation.title }}</div>
          <div class="conversation-last-message">{{ conversation.lastMessage }}</div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      conversations: [
        { id: 1, title: 'Conversation 1', lastMessage: 'Hello' },
        { id: 2, title: 'Conversation 2', lastMessage: 'How are you?' },
        { id: 3, title: 'Conversation 3', lastMessage: 'Fine, thanks' },
        { id: 4, title: 'Conversation 4', lastMessage: 'Goodbye' }
      ]
    }
  },
  methods: {
    createConversation() {
      // TODO: 实现新建会话逻辑
    }
  }
}
</script>

<style scoped>
.left-panel {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.conversation-list {
  flex-grow: 1;
  overflow-y: auto;
}

.conversation {
  display: flex;
  align-items: center;
  padding: 12px;
  cursor: pointer;
  transition: background-color .2s ease-in-out;

  &:hover {
    background-color: #f3f3f3;
  }

  &-avatar {
    width: 40px;
    height: 40px;
    background-color: #ccc;
    border-radius: 50%;
    margin-right: 12px;
  }

  &-info {
    display: flex;
    flex-direction: column;

    .conversation-title {
      font-weight: bold;
    }

    .conversation-last-message {
      font-size: 12px;
      color: #666;
    }
  }
}

.new-conversation {
  margin-bottom: 12px;
  display: flex;
  justify-content: center;
}
</style>
