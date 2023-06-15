import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router/index'
import axios from 'axios'
import { register } from 'vue-advanced-chat'

const app = createApp(App)

app.use(ElementPlus)
app.use(router)

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL
})
  // 将实例添加到原型链上，方便在组件中使用 
app.config.globalProperties.$axios = instance

register()

app.mount('#app')
