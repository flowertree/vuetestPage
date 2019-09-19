import Vue from 'vue'
import App from './App'
import router from './router'
import 'babel-polyfill'
import MintUI from 'mint-ui'
import axios from 'axios'
import VueResource from 'vue-resource'
import vueSeamlessScroll from 'vue-seamless-scroll'
import 'mint-ui/lib/style.css'
import '../static/css/common.css'
import '../static/js/app.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' // (根据版本路径不同会有差异，按照自己版本路径)
import VuePaginate from 'vue-paginate'
import moment from 'moment' // 导入文件
import rem from '../static/js/rem'
import _ from 'lodash'

Vue.prototype.axios = axios
Vue.prototype.$moment = moment // 赋值使用
Vue.prototype._ = _ // 使用lodash
Vue.use(VueResource)
Vue.use(MintUI)
Vue.use(ElementUI)
Vue.use(VuePaginate)
Vue.use(rem)
// Vue.use(loadsh)
Vue.config.productionTip = false
moment.locale('zh-cn')// 需要汉化
// //微信
// let VConsole = require('../node_modules/vconsole/dist/vconsole.min');
// // 路径根据自己的来改动，可能每个人的不一样
// let vConsole = new VConsole();//初始化
// Vue.use(vConsole);//设为全局」

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  components: { App, vueSeamlessScroll },
  template: '<App/>'
})
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

// vue切换路由滚动条恢复到顶部
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})

// 允许vue请求 携带cookies
Vue.http.interceptors.push((request, next) => {
  request.credentials = true
  next()
})
