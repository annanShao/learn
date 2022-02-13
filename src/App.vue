<!--
 * @Author: your name
 * @Date: 2022-01-20 17:46:42
 * @LastEditTime: 2022-02-14 02:33:22
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue-app\src\App.vue
-->
<template>
<div id="app">
  <router-view />
</div>
</template>

<script>
// import uuid from './utils/uuid.js'
// import wx from 'weixin-js-sdk'
export default {
  name: "App",
  methods: {
    async login() {
      // 1. 建议登录前先判断当前是否已经登录
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
            } else { // 未登录，唤起微信登录     
              provider.signInWithRedirect();
            }
          });
      }
    }
  },
  created() {
    // 以匿名登录为例
    const auth = this.$cloudbase.auth({
      persistence: "local"
    })
    auth.anonymousAuthProvider().signIn();
    // wx.config({
    //   debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    //   appId: 'wx15ee0f3d3544e530', // 必填，公众号的唯一标识
    //   timestamp: new Date().getTime(), // 必填，生成签名的时间戳
    //   nonceStr: uuid(), // 必填，生成签名的随机串
    //   signature: uuid(), // 必填，签名
    //   jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表
    // });
    // // this.login(); // 微信登录
    // console.log(result)

    window.document.documentElement.setAttribute('dataSize', 3);
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
