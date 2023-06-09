import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/Login.vue';
import ChatView from '../views/Chat.vue';


const routes =  [
  {
    path: '/',
    redirect: '/chat',
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/chat',
    name: 'chat',
    component: ChatView,
    meta: {
      requiresAuth: true,
    },
  },
]

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHistory(),
  routes, // `routes: routes` 的缩写
})
  
  // 全局前置守卫
  router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('token')
    console.log(isAuthenticated);
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!isAuthenticated) {
        next('/login')
      } else {
        next()
      }
    } else {
      next()
    }
  })

export default router
