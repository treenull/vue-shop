import Vue from 'vue'
import VueRouter from 'vue-router'

//import Login from "../components/Login";
const Login = () => import(/* webpackChunkName: "login_home_welcome" */ '../components/Login')
//import Home from "../components/Home";
const Home = () => import(/* webpackChunkName: "login_home_welcome" */ '../components/Home')
//import Welcome from "../components/Welcome";
const Welcome = () => import(/* webpackChunkName: "login_home_welcome" */ '../components/Welcome')
//import Users from "../components/user/Users";
const Users = () => import(/* webpackChunkName: "Users_Rights_Roles" */ '../components/user/Users.vue')



Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [
        { path: '/welcome', component: Welcome },
        { path: '/users', component: Users }
      ]
    }
  ]
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  //     next()  放行    next('/login')  强制跳转

  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router

