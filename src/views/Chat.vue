<template>
	<div>
		<add-room @child-click="addRoom" ref="childComponent" />
		<vue-advanced-chat height="calc(100vh - 20px)" :current-user-id="currentUserId" :rooms="JSON.stringify(rooms)"
			:rooms-loaded="true" @add-room="triggerChildClick" :messages="JSON.stringify(messages)"
			:messages-loaded="messagesLoaded" @send-message="sendMessage($event.detail[0])"
			@fetch-messages="fetchMessages($event.detail[0])" />
	</div>
</template>

<script>
// import { register } from '../../vue-advanced-chat/dist/vue-advanced-chat.es.js'

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
			currentUserId: '1234',
			rooms: [
				{
					roomId: '1',
					roomName: 'Room 1',
					avatar: 'https://66.media.tumblr.com/avatar_c6a8eae4303e_512.pnj',
					users: [
						{ _id: '1234', username: 'John Doe' },
						{ _id: '4321', username: 'John Snow' }
					]
				}
			],
			messages: [],
			messagesLoaded: false
		}
	},

	methods: {

		initializeData() {
			this.$axios.get('/ai/chat/user/dcb39623-153f-4647-8b7a-81e5c5f78d19').then(response => {
				/* response.data.forEach((num) => {
					
				}); */
				for (let i = 0; i < response.data.length; i++) {
					const room = response.data[i];
					console.log(response.data[i]);
					this.rooms[i] = {
						roomId: room.id,
						roomName: room.name,
						model: room.model,
						avatar: 'https://www.flaticon.com/free-icons/english-bulldog',
						users: [
							{ _id: room.userId, username: 'dong' }
						]
					};
				}

			}).catch(error => {
				console.error(error);
			});
		},

		fetchMessages({ options = {} }) {
			console.log(options)
			/** 
			setTimeout(() => {
				if (options.reset) {
					this.messages = this.addMessages(true)
				} else {
					this.messages = [...this.addMessages(), ...this.messages]
					this.messagesLoaded = true
				}
				// this.addNewMessage()
			})
			*/
		},

		addMessages(reset) {
			const messages = []

			for (let i = 0; i < 30; i++) {
				messages.push({
					_id: reset ? i : this.messages.length + i,
					content: `${reset ? '' : 'paginated'} message ${i + 1}`,
					senderId: '4321',
					username: 'John Doe',
					date: '13 November',
					timestamp: '10:20'
				})
			}

			return messages
		},

		sendMessage(message) {
			this.messages = [
				...this.messages,
				{
					_id: this.messages.length,
					content: message.content,
					senderId: this.currentUserId,
					timestamp: new Date().toString().substring(16, 21),
					date: new Date().toDateString()
				}
			]
		},

		addNewMessage() {
			setTimeout(() => {
				this.messages = [
					...this.messages,
					{
						_id: this.messages.length,
						content: 'NEW MESSAGE',
						senderId: '1234',
						timestamp: new Date().toString().substring(16, 21),
						date: new Date().toDateString()
					}
				]
			}, 2000)
		},

		addRoom(newRoom) {
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
