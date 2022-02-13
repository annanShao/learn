<!--
 * @Author: your name
 * @Date: 2022-01-24 15:27:51
 * @LastEditTime: 2022-02-12 23:04:15
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue-app\src\components\person\myCenter.vue
-->
<template>
<div>
  <van-cell-group>
    <van-cell title-class="person-mycenter__cell cell-font-resize" value-class="cell-font-resize" title="昵称" :value="userInfo.name" />
    <van-cell title-class="person-mycenter__cell cell-font-resize" value-class="cell-font-resize" title="手机号" :value="userInfo.phone" />
  </van-cell-group>
  <van-divider dashed class="cell-font-resize">功能</van-divider>
  <van-cell-group>
    <van-cell title="我的成绩" clickable icon="completed" title-class="person-mycenter__cell cell-font-resize" @click="handleClickSys('scores')" />
    <van-cell title="我的订单" clickable icon="cart-o" title-class="person-mycenter__cell cell-font-resize" @click="handleClickSys('payments')" />
    <van-cell title="字体大小" clickable icon="setting-o" title-class="person-mycenter__cell cell-font-resize" @click="handleClickSys('operate')"/>
    <van-action-sheet v-model="showPanel" @select="handleChooseFont" :actions="actions" cancel-text="取消" close-on-click-action/>
  </van-cell-group>
</div>
</template>

<script>
export default {
  name: 'myCenter',
  data() {
    return {
      userInfo: {
        name: '',
        phone: '',
        avatar: ''
      },
      showPanel: false,
      actions: [{ name: '小号' }, { name: '中号' }, { name: '大号' }, {name: '特大号'}],
    }
  },
  created() {
    const app = this.$cloudbase
    const db = app.database()
    const _ = db.command
    // todo 看跟微信关联了之后，是哪个在创建个人信息
    db
      .collection('user')
      .where({
        id: _.eq(1)
      })
      .get()
      .then((res) => {
        this.userInfo = {
          name: res.data[0].name,
          phone: res.data[0].phone
        }
      })
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
    }
  }
}
</script>

<style lang="less">
.person-mycenter__cell {
  text-align: left;
}
</style>
