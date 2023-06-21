<template>
	<div>
		<add-room @child-click="parentAddRoom" ref="childComponent" />
		<vue-advanced-chat height="calc(100vh - 20px)" :current-user-id="currentUserId" :rooms="JSON.stringify(rooms)"
			:rooms-loaded="true" @add-room="triggerChildClick" :messages="JSON.stringify(messages)"
			:messages-loaded="messagesLoaded" @send-message="sendMessage($event.detail[0])"
			:loadingHistory="loadingHistory" />
	</div>
</template>

<script>
// import { register } from '../../vue-advanced-chat/dist/vue-advanced-chat.es.js'
// @fetch-messages="fetchMessages($event.detail[0])"
import AddRoom from '@/components/ChatRoom.vue';
// https://github.com/antoine92190/vue-advanced-chat
// import { register } from '../../vue-advanced-chat/dist/vue-advanced-chat.es.js'
//register()

export default {
	name: "ChatView",
	components: {
		AddRoom
	},
	created() {
		// 在 created 钩子函数中初始化数据
		this.initializeData();
	},
	data() {
		return {
			currentUserId: '78f0343b-2684-44fe-84cb-f05fdaa1e9f0',
			rooms: [
			],
			messages: [],
			messagesLoaded: true,
			loadingHistory: false
		}
	},

	methods: {

		initializeData() {
			this.$axios.get('/ai/chat/user/' + this.currentUserId).then(response => {
				const avatars = new Map([
					['gpt-3.5-turbo', 'imgs/gpt-3.5.png'],
					['gpt-4', 'imgs/gpt-4.png'],
					['code-davinci-002', 'imgs/code.png'],
					['DALL·E', 'imgs/dall.png'],
					['whisper-1', 'imgs/dall.png'],
					// ...
				]);
				for (let i = 0; i < response.data.length; i++) {
					const room = response.data[i];
					console.log(response.data[i]);
					this.rooms[i] = {
						roomId: room.id,
						roomName: room.name,
						model: room.model,
						avatar: avatars[room.model] ? avatars[room.model] : 'imgs/gpt-3.5.png',
						users: [
							{ _id: room.userId, username: room.userName },
							{ _id: room.botUserId, username: room.botName }
						]
					};
				}
				if (this.rooms[0]) {
					this.loadingHistory = false;
					this.getMessagesByChatId(this.rooms[0].roomId);
					this.loadingHistory = true;
				}
			}).catch(error => {
				console.error(error);
			});
		},

		getMessagesByChatId(chatId) {
			this.$axios.get('/ai/chat/' + chatId + '/messages').then(response => {
				const chatMessages = response.data.messages;
				const msgs = []
				console.log("chatMessages:" + chatMessages.length);
				if (chatMessages.length > 0) {
					for (let i = 0; i < chatMessages.length; i++) {
						const msg = chatMessages[i];
						const dbDate = new Date(msg.createdDate);
						msgs.push({
							_id: i,
							content: msg.content,
							senderId: msg.userId,
							username: msg.userName,
							date: dbDate.getFullYear()+'-'+(dbDate.getMonth() + 1)+'-'+dbDate.getDay(),
							timestamp: dbDate.getHours()+':'+(dbDate.getMinutes() + 1)+':'+dbDate.getSeconds()
						})
					}
				}
				this.messages = msgs;
			}).catch(error => {
				console.error(error);
			});
		},

		sendMessage(message) {
			/* 
			{
				"content": "123",
				"files": null,
				"replyMessage": null,
				"usersTag": [],
				"roomId": "b3d61be3-1e3e-4066-93a1-adc0195d5123"
			}
			*/
			console.log(message);
			const newMsg = {
				_id: this.messages.length,
				content: message.content,
				senderId: this.currentUserId,
				timestamp: new Date().toString().substring(16, 21),
				date: new Date().toDateString()
			}
			this.messages = [
				...this.messages,
				newMsg
			]
			this.loadingHistory = false;
			this.$axios.post('/ai/chat/' + message.roomId + '/message', {
				message: message.content,
				userId: this.currentUserId,
			}).then(response => {
				console.log(response.data);
				const botRes = response.data
				const botMsg = {
					_id: this.messages.length,
					content: botRes.content,
					senderId: botRes.userId,
					timestamp: new Date().toString().substring(16, 21),
					date: new Date().toDateString()
				}
				this.loadingHistory = true;
				this.messages = [
					...this.messages,
					botMsg
				]
			}).catch(error => {
				console.error(error);
			});

		},

		parentAddRoom(newRoom) {
			console.log("add room")
			console.log(newRoom)
			this.rooms.push(newRoom)
		},
		triggerChildClick() {
			console.log("triggerChild")
			// 通过 $refs 获取子组件实例，并调用子组件的方法
			this.$refs.childComponent.showFormDialog();
		}

	}
}
</script>

<style lang="scss">
body {
	font-family: 'Quicksand', sans-serif;
}
</style>
