<template>
  <div>
    <!-- 表单弹窗 -->
    <el-dialog v-model="dialogVisible" title="AddRoom" @close="closeFormDialog">
      <el-form :model="form" ref="form" label-width="100px">
        <el-form-item label="Name">
          <el-input v-model="form.roomName" style="width:80%"></el-input>
        </el-form-item>
        <el-form-item label="Model">
          <el-select v-model="form.model" style="width:80%" placeholder="Select" size="large">
            <el-option v-for="item in modelList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="closeFormDialog">取消</el-button>
          <el-button type="primary" @click="submitForm">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
  
<script>

import { v4 as uuidv4 } from 'uuid';

export default {
  name: 'AddRoom',
  data() {
    return {
      dialogVisible: false,
      form: {
        roomName: '',
        model: '',
      },
      modelList: [
        { label: 'gpt-3.5-turbo', value: 'gpt-3.5-turbo' },
        { label: 'gpt-4', value: 'gpt-4' },
        { label: 'code-davinci-002', value: 'code-davinci-002' },
        { label: 'DALL·E', value: 'DALL·E' },
        { label: 'whisper-1', value: 'whisper-1' },
      ],
    };
  },
  methods: {
    showFormDialog() {
      console.log("show child")
      this.dialogVisible = true;
      console.log(this.dialogVisible)
    },
    closeFormDialog() {
      this.dialogVisible = false;
    },
    submitForm() {
      // 生成 UUID
      const uuid = uuidv4();
      console.log(uuid);
      const userId = '78f0343b-2684-44fe-84cb-f05fdaa1e9f0';
      this.$axios.post('/ai/chat', {
        chatRoomName: this.form.roomName,
        chatRoomId: uuid,
        userId: userId,
        model: this.form.model
      }).then(response => {
        const room = response.data;
        console.log(room);
        const avatars = new Map([
					['gpt-3.5-turbo', 'imgs/gpt-3.5.png'],
					['gpt-4', 'imgs/gpt-4.png'],
					['code-davinci-002', 'imgs/code.png'],
					['DALL·E', 'imgs/dall.png'],
					['whisper-1', 'imgs/dall.png'],
					// ...
				]);
        const newRoom = {
          roomId: room.id,
          roomName: room.name,
          model: room.model,
          avatar: avatars[room.model] ? avatars[room.model] : 'imgs/gpt-3.5.png',
          users: [
            { _id: room.userId, username: room.userName },
            { _id: room.botUserId, username: room.botName }
          ]
        };
        this.$emit('child-click', newRoom);
        this.closeFormDialog();
      }).catch(error => {
        console.error(error);
      });

    }
  }
};
</script>
  