<!--
 * @Author: your name
 * @Date: 2022-01-30 16:11:10
 * @LastEditTime: 2022-02-12 22:49:41
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue-app\src\components\person\paymentCard.vue
-->
<template>
<div class="person-paymentcard__wrapper">
  <div v-for="item in Object.keys(cardKeys)" :key="item" style="display: flex;align-items: center">
    <span style="font-weight: bold">{{cardKeys[item]}}：</span>
    <span v-if="item === 'gmt_create' || item === 'gmt_end'">{{new Date(data[item] * 1000).toLocaleString('zh', { hour12: false })}}</span>
    <span v-else-if="item === 'status'">
      <van-tag v-if="!data.status" plain type="danger">未购买</van-tag>
      <van-tag v-else plain type="success">已购买</van-tag>
    </span>
    <span v-else>{{data[item]}}</span>
  </div>
</div>
</template>

<script>
export default {
  name: 'paymentCard',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      cardKeys: {
        pid: '订单编号',
        subject: '考试科目',
        count: '订单金额',
        gmt_create: '创建时间',
        gmt_end: '到期时间',
        status: '订单状态'
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../style/common";
.person-paymentcard__wrapper {
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  margin: 8px 20px;
  border: 1px dashed #999;
  text-align: left;
  padding: 12px;
  /* font-size: 16px; */
  .cell-resize();
}
</style>
