<!--
 * @Author: your name
 * @Date: 2022-01-24 15:27:51
 * @LastEditTime: 2022-02-11 22:17:47
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue-app\src\components\person\myCenter.vue
-->
<template>
<div>
  <van-cell-group>
    <van-cell title-class="person-mycenter__cell" title="昵称" :value="userInfo.name" />
    <van-cell title-class="person-mycenter__cell" title="手机号" :value="userInfo.phone"/>
  </van-cell-group>
  <van-divider dashed>功能</van-divider>
  <van-cell-group>
    <van-cell title="我的成绩" clickable icon="completed" title-class="person-mycenter__cell" @click="handleClickSys('scores')"/>
    <van-cell title="我的订单" clickable icon="cart-o" title-class="person-mycenter__cell" @click="handleClickSys('payments')"/>
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
      }
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
        this.$router.push({path: '/myScore'})
      } else if (to === 'payments') {
        this.$router.push({path: '/myPayment'})
      }
    }
  }
}
</script>

<style>
.person-mycenter__words {
  font-size: 18px;
  font-weight: bold;
}

.person-mycenter__cell {
  text-align: left;
}
</style>
