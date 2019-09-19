import VueRouter from 'vue-router'
import Vue from 'vue'
Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/', // 首页
      component: resolve => require(['@/components/NineGame1906'], resolve),
      meta: {title: '活动列表页'}
    },
    {
      path: '/activeEgg', // 首页
      component: resolve => require(['@/components/activeEgg'], resolve),
      meta: {title: '砸金蛋活动'}
    },
    {
      path: '/turnPlate',
      component: resolve => require(['@/components/turnplate'], resolve),
      meta: {title: '大转盘'}
    }
  ]
})
