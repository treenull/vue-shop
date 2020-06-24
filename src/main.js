import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入字体图标
import './assets/fonts/iconfont.css'
// 导入全局样式表
import './assets/css/global.css'

//导入NProgress包，JS和CSS
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import axios from 'axios'
// 配置请求的跟路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
Vue.prototype.$http = axios

//在request拦截器中，显示进度条
axios.interceptors.request.use(config => {
  // console.log(config)
  NProgress.start()
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 最后必须return
  return config
})

//在response拦截器中，隐藏进度条
axios.interceptors.response.use(config => {
  NProgress.done()
  return config
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
