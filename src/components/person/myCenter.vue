<!--
 * @Author: your name
 * @Date: 2022-01-24 15:27:51
 * @LastEditTime: 2022-02-15 11:00:56
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue-app\src\components\person\myCenter.vue
-->
<template>
<div>
  <van-cell-group>
    <van-cell title-class="person-mycenter__cell cell-font-resize" value-class="cell-font-resize" title="昵称" :value="userInfo.nickName" />
    <van-cell title-class="person-mycenter__cell cell-font-resize" value-class="cell-font-resize" title="用户id" :value="userInfo.uid.substr(0, 12)" />
  </van-cell-group>
  <van-divider dashed class="cell-font-resize">功能</van-divider>
  <van-cell-group>
    <van-cell title="我的成绩" clickable icon="completed" title-class="person-mycenter__cell cell-font-resize" @click="handleClickSys('scores')" />
    <van-cell title="我的订单" clickable icon="cart-o" title-class="person-mycenter__cell cell-font-resize" @click="handleClickSys('payments')" />
    <van-cell title="字体大小" clickable icon="setting-o" title-class="person-mycenter__cell cell-font-resize" @click="handleClickSys('operate')" />
    <van-action-sheet v-model="showPanel" @select="handleChooseFont" :actions="actions" cancel-text="取消" close-on-click-action />
  </van-cell-group>
</div>
</template>

<script>
import {
  Notify
} from 'vant';

export default {
  name: 'myCenter',
  data() {
    return {
      userInfo: {
        nickName: '',
        uid: '',
        avatar: ''
      },
      showPanel: false,
      actions: [{
        name: '小号'
      }, {
        name: '中号'
      }, {
        name: '大号'
      }, {
        name: '特大号'
      }],
    }
  },
  created() {
    const uid = localStorage.getItem('uid') || null;
    if (uid === null) {
      Notify({
        type: 'warning',
        message: '请刷新后重试'
      })
      return false
    }
    this.uid = uid
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
  },
  methods: {
    handleClickSys(to) {
      if (to === 'scores') {
        this.$router.push({
          path: '/myScore'
        })
      } else if (to === 'payments') {
        this.$router.push({
          path: '/myPayment'
        })
      } else if (to === 'operate') {
        this.showPanel = true
      }
    },
    handleChooseFont(action, index) {
      window.document.documentElement.setAttribute('dataSize', index);
      localStorage.setItem('dataSize', index)
    }
  }
}
</script>

<style lang="less">
.person-mycenter__cell {
  text-align: left;
}
</style>
