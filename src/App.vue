<!--
 * @Author: your name
 * @Date: 2022-01-20 17:46:42
 * @LastEditTime: 2022-02-15 12:55:36
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue-app\src\App.vue
-->
<template>
<div id="app">
  <router-view v-if="haveLogin" />
  <van-skeleton v-if="!haveLogin" class="skeleton-class" :row="8" />
</div>
</template>

<script>
// import uuid from './utils/uuid.js'
// import wx from 'weixin-js-sdk'
import {
  Notify
} from 'vant';

export default {
  name: "App",
  data() {
    return {
      haveLogin: false
    }
  },
  methods: {
    addInfoToLocal(user) {
      const app = this.$cloudbase
      localStorage.setItem('openid', user.openid)
      localStorage.setItem('uid', user.uid)
      let userInfo = {
        uid: user.uid,
        openid: user.openid,
        nickName: user.nickName,
        avatarUrl: user.avatarUrl
      }
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
      app.callFunction({
          name: 'login',
          data: {
            userInfo: userInfo
          }
        })
        .then(res => {
          console.log('登陆成功', res)
          this.haveLogin = true
        })
        .catch(error => {
          console.log(error)
          Notify({
            type: 'danger',
            message: '登陆失败，请刷新后重试',
            duration: 0
          })
        })
    },
    async login() {
      // 1. 建议登录前先判断当前是否已经登录
      if (localStorage.getItem('openid') && localStorage.getItem('uid')) {
        this.haveLogin = true
        return false // 已登录
      }
      const app = this.$cloudbase
      const auth = app.auth();
      const provider = auth.weixinAuthProvider({
        appid: "wx15ee0f3d3544e530",
        scope: "snsapi_userinfo" // 拉去用户的个人信息
      });
      const loginState = await auth.getLoginState();
      if (!loginState) { // 2. 调用微信登录API
        provider
          .getRedirectResult()
          .then((loginState) => {
            if (loginState) {
              // 登录成功，本地已存在登录态，将个人信息存到数据库，并且把openid存在本地
              this.addInfoToLocal(loginState.user)
            } else { // 未登录，唤起微信登录     
              provider.signInWithRedirect();
            }
          });
      } else {
        this.addInfoToLocal(loginState.user)
      }
    }
  },
  async created() {
    await this.login(); // 微信登录
    let dataSize = localStorage.getItem('dataSize')
    if (dataSize) {
      window.document.documentElement.setAttribute('dataSize', dataSize);
    } else {
      window.document.documentElement.setAttribute('dataSize', 3);
    }
  }
};
</script>

<style lang="less">
@import "./style/common";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  margin: 0;
  padding: 0;
}

* {
  box-sizing: border-box;
}

.skeleton-class {
  margin-top: 20px;
}

.cell-font {
  font-size: 16px;
}

.cell-font-resize {
  .cell-resize();
}
</style>
