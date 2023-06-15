<template>
    <div>
      <!-- 表单弹窗 -->
      <el-dialog
        :visible="formVisible"
        title="AddRoom"
        @close="closeFormDialog"
      >
        <el-form :model="form" ref="form" label-width="100px">
          <el-form-item label="Name">
            <el-input v-model="form.roomName"></el-input>
          </el-form-item>
        </el-form>
        <div class="dialog-footer">
          <el-button @click="closeFormDialog">取消</el-button>
          <el-button type="primary" @click="submitForm">确定</el-button>
        </div>
      </el-dialog>
    </div>
  </template>
  
  <script>
  export default {
    name:'AddRoom',
    data() {
      return {
        formVisible: false,
        form: {
          roomName: ''
        }
      };
    },
    methods: {
      showFormDialog() {
        console.log("show child")
        this.formVisible = true;
        console.log(this.formVisible)
      },
      closeFormDialog() {
        this.formVisible = false;
      },
      submitForm() {
        // 处理表单提交逻辑，例如将数据发送到服务器或添加到聊天室列表
        const newRoom = {
          id: Math.random(),
          name: this.form.roomName
        };
        this.$emit('child-click', newRoom);
        this.closeFormDialog();
      }
    }
  };
  </script>
  