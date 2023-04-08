<template>
    <div class="chat-page">
        <div class="header">
            <div class="logo">Logo</div>
            <div class="settings">Settings</div>
        </div>
        <div class="content">
            <div class="sidebar">
                <ul class="conversation-list">
                    <li v-for="(conversation, index) in conversations" :key="index"
                        :class="{ active: activeConversationIndex === index }" @click="activateConversation(index)">
                        <div class="conversation-title">{{ conversation.title }}</div>
                        <div class="conversation-preview">{{ conversation.lastMessage }}</div>
                    </li>
                </ul>
            </div>
            <div class="conversation">
                <div class="conversation-header">{{ activeConversation.title }}</div>
                <div class="conversation-messages">
                    <div class="message" v-for="(message, index) in activeConversation.messages" :key="index">
                        <div class="message-author">{{ message.author }}</div>
                        <div class="message-body">{{ message.body }}</div>
                    </div>
                </div>
                <div class="message-input">
                    <input type="text" v-model="newMessage" placeholder="Type a message...">
                    <button @click="sendMessage">Send</button>
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="logo">Logo</div>
            <div class="slogan">Slogan</div>
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'ChatBox',
    data() {
        return {
            conversations: [
                {
                    title: "John",
                    lastMessage: "Hi, how are you?",
                    messages: [
                        { author: "John", body: "Hi, how are you?" },
                        { author: "Me", body: "I'm good, thanks!" },
                        { author: "John", body: "That's great to hear!" },
                    ],
                },
                {
                    title: "Jane",
                    lastMessage: "Can you help me with something?",
                    messages: [
                        { author: "Jane", body: "Can you help me with something?" },
                        { author: "Me", body: "Sure, what do you need help with?" },
                        { author: "Jane", body: "I need help setting up my computer." },
                    ],
                },
            ],
            activeConversationIndex: 0,
            newMessage: "",
        };
    },
    computed: {
        activeConversation() {
            return this.conversations[this.activeConversationIndex];
        },
    },
    methods: {
        activateConversation(index) {
            this.activeConversationIndex = index;
        },
        sendMessage() {
            if (this.newMessage.trim() === "") {
                return;
            }
            this.activeConversation.messages.push({
                author: "Me",
                body: this.newMessage.trim(),
            });
            this.newMessage = "";
        },
    },
};
</script>
  
<style scoped>
.chat-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 70vh;
    width: 60%;
    margin: 15% 20%;
    background-color: #f5f5f5;
}

.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 10%;
    padding: 0 1rem;
}

.settings {
    cursor: pointer;
}

.content {
    display: flex;
    height: 80%;
}

.sidebar {
    width: 20%;
    border-right: 1px solid #ccc;
    overflow-y: scroll;
}

.conversation-list {
    list-style: none;
    margin: 0;
    padding: 0;
}

.conversation-list li {
    cursor: pointer;
    padding: 1rem;
}

.conversation-list li.active {
    background-color: #ccc;
}

.conversation-title {
    font-weight: bold;
}

.conversation-preview {
    color: #888;
}

.conversation {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.conversation-header {
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    border-bottom: 1px solid #ccc;
    padding: 0 1rem;
}

.conversation-messages {
    flex: 1;
    overflow-y: scroll;
    padding: 1rem;
}

.message {
    margin-bottom: 1rem;
}

.message-author {
    font-weight: bold;
    margin-bottom: 0.5rem;
}

.message-body {
    white-space: pre-wrap;
}

.message-input {
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid #ccc;
    padding: 0 1rem;
}

.message-input input {
    flex: 1;
    padding: 0.5rem;
    border-radius: 0.25rem;
    border: none;
    margin-right: 0.5rem;
}

.message-input button {
    padding: 0.5rem 1rem;
    background-color: #0084ff;
    color: #fff;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
}

.footer {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 10%;
    padding: 0 1rem;
}

.slogan {
    margin-left: 0.5rem;
}
</style>
  