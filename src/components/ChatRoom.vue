<template>
    <div>
      <!-- 表单弹窗 -->
      <el-dialog
        v-model="dialogVisible"
        title="AddRoom"
        @close="closeFormDialog"
      >
        <el-form :model="form" ref="form" label-width="100px">
          <el-form-item label="Name">
            <el-input v-model="form.roomName" style="width:80%"></el-input>
          </el-form-item>
          <el-form-item label="Model" >
            <el-select v-model="form.model" style="width:80%" placeholder="Select" size="large">
              <el-option
                v-for="item in modelList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
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
    name:'AddRoom',
    data() {
      return {
        dialogVisible: false,
        form: {
          roomName: '',
          model: '',
        },
        modelList:[
        {label: 'gpt-3.5', value: 'gpt-3.5-v'},
        {label: 'gpt-4', value: 'gpt-4-v'},
        {label: 'code', value: 'code-v'},
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
        // 处理表单提交逻辑，例如将数据发送到服务器或添加到聊天室列表
        const newRoom = {
          roomId: Math.random(),
          roomName: this.form.roomName,
          model: this.form.model,
          avatar: 'https://www.flaticon.com/free-icons/english-bulldog',
					users: [
						{ _id: uuid, username: 'dong' }
					]
        };
        this.$emit('child-click', newRoom);
        this.closeFormDialog();
      }
    }
  };
  </script>
  