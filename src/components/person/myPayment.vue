<!--
 * @Author: your name
 * @Date: 2022-01-26 20:52:12
 * @LastEditTime: 2022-02-12 13:35:14
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue-app\src\components\person\myPayment.vue
-->
<template>
<div>
  <div v-if="loadingStatus === 'success'">
    <van-tabs v-model="activeTag">
      <van-tab v-for="(item, index) in typeDict" :key="index" :title="item">
        <PaymentCard v-for="cardItem in cardData[index]" :key="cardItem._id" :data="cardItem"></PaymentCard>
        <van-empty v-if="!cardData[index].length" description="暂时没有订单记录" />
      </van-tab>
    </van-tabs>
  </div>
  <van-skeleton class="skeleton-class" v-else-if="loadingStatus === 'pending'" title :row="8" />
  <van-empty v-else description="订单记录获取异常，请稍后再试"></van-empty>
</div>
</template>

<script>
import paymentCard from './paymentCard.vue'
import {
  Notify
} from 'vant';

export default {
  name: 'myPayment',
  components: {
    'PaymentCard': paymentCard
  },
  computed: {
    cardData: function () {
      return this.data.reduce((total, current) => {
        current.subject = this.questionSetDict[current.sid - 1]
        current.gmt_end = current.gmt_create + current.count / 10 * 60 * 60 * 24 * 30
        total[current.type - 1].push(current)
        return total
      }, [
        [],
        []
      ])
    }
  },
  data() {
    return {
      data: [],
      activeTag: 0,
      typeDict: ['新培', '复审'],
      questionSetDict: [],
      loadingStatus: 'pending'
    }
  },
  async created() {
    const app = this.$cloudbase

    app.callFunction({
        name: 'getMyPayments',
        data: {
          uid: 1
        }
      })
      .then(res => {
        if (res.result.success) {
          this.loadingStatus = 'success'
          this.data = res.result.data.paymentInfo
          this.questionSetDict = res.result.data.questionSetDict
        } else {
          this.loadingStatus = 'fail'
          Notify({
            type: 'danger',
            message: res.result.message,
            duration: 2000
          });
        }
      })
      .catch(error => {
        this.loadingStatus = 'fail'
        Notify({
          type: 'danger',
          message: error.message,
          duration: 2000
        });
      })

  }
}
</script>

<style lang="less" scoped>
</style>
