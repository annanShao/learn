/*
 * @Author: your name
 * @Date: 2022-01-20 17:46:42
 * @LastEditTime: 2022-02-13 21:09:12
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue-app\src\main.js
 */
import Vant from 'vant';
import 'vant/lib/index.css';
import Vue from "vue";
import App from "./App.vue";
import Cloudbase from "@cloudbase/vue-provider";
import router from './router';
import "./utils/rem.js";
import 'amfe-flexible/index';

// 注意更新此处的TCB_ENV_ID为你自己的环境ID
window._tcbEnv = window._tcbEnv || {TCB_ENV_ID:"construction-training-8a6832589a"};

export const envId = window._tcbEnv.TCB_ENV_ID;
export const region = window._tcbEnv.TCB_REGION;

Vue.config.productionTip = false;

Vue.use(Cloudbase, {
  env: envId,
  region: region
});

Vue.use(Vant);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
