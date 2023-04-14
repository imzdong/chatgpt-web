<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <!--
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="" />
      </div>
      -->
      <!-- 登录表单区域 -->
      <el-form label-width="0px">
        <!-- 用户名 -->
        <el-form-item>
          <el-input v-model="username" placeholder="请输入您的账号"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item>
          <el-input v-model="password" placeholder="请输入您的密码"></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item>
          <el-button type="primary" @click="handleSubmit">登录</el-button>
          <el-button type="info">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginView",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    handleSubmit() {
      this.$axios.post('/api/login', {
            username: this.username,
            password: this.password
          }).then(response => {
            if (response.data.token) {
              localStorage.setItem('token', response.data.token)
              this.$router.push({ path: '/home' });
            } else {
              this.$alert('用户名或密码错误', '登录失败', {
                confirmButtonText: 'ok'
              })
            }
          }).catch(error => {
            console.error(error);
          });
          
    }
  },
};
</script>

<style scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100vh;
}

.login_box {
  /**  宽450像素 */
  width: 450px;
  /** 高300像素 */
  height: 300px;
  /** 背景颜色 */
  background-color: #fff;
  /** 圆角边框3像素 */
  border-radius: 3px;
  /** 绝对定位 */
  position: absolute;
  /** 距离左则50% */
  left: 50%;
  /** 上面距离50%*/
  top: 50%;
  /** 进行位移，并且在横轴上位移-50%，纵轴也位移-50%*/
  transform: translate(-50%, -50%);
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.login_btn {
  /** 设置弹性布局*/
  display: flex;
  /** 横轴上尾部对齐*/
  justify-content: flex-end;
}
</style>

