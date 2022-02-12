/*
 * @Author: your name
 * @Date: 2022-01-24 15:47:19
 * @LastEditTime: 2022-02-04 12:39:25
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue-app\src\router\index.js
 */
import Vue from 'vue'
import Router from 'vue-router'
// import some components
import Home from '@/components/public/home.vue'
import myScore from '@/components/person/myScore.vue'
import myPayment from '@/components/person/myPayment.vue'
import questionPage from '@/components/course/questionPage.vue'
import operationPage from '@/components/course/operationPage.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/myScore',
      name: 'myScore',
      component: myScore
    },
    {
      path: '/myPayment',
      name: 'myPayment',
      component: myPayment
    },
    {
      path: '/question',
      name: 'question',
      component: questionPage
    },
    {
      path: '/operation',
      name: 'operation',
      component: operationPage
    }
  ]
})