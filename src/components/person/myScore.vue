<!--
import { constants } from 'http2';
 * @Author: your name
 * @Date: 2022-01-26 20:51:59
 * @LastEditTime: 2022-02-12 22:45:14
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue-app\src\components\person\myScore.vue
-->
<template>
<div>
  <van-skeleton class="skeleton-class" v-if="loadingStatus === 'pending'" title :row="8" />
  <div class="my-score__wrapper" v-else-if="loadingStatus === 'success' && scoreInfo.length">
    <van-divider class="my-score__title" :hairline="false">
      本年度近十次考试成绩
    </van-divider>
    <div v-for="item in scoreInfo" :key="item.id" class="my-score__block-wrapper">
      <div class="my-score__block-item">
        <span>考试科目：</span>{{`${item.name}${item.type === 1 ? '新培' : '复审'}`}}
      </div>
      <div class="my-score__block-item">
        <span>考试分数：</span><span>{{`${item.score}分`}}</span>
        <van-tag style="margin-left: 6px;" plain :color="item.isPass ? '#54d16f' : '#f46263'" :text-color="item.isPass ? '#54d16f' : '#f46263'">{{item.isPass ? '合格' : '不合格'}}</van-tag>
      </div>
      <div class="my-score__block-item">
        <span>考试时间：</span>{{new Date(item.gmt_modified * 1000).toLocaleString('zh', { hour12: false })}}
      </div>
    </div>
  </div>
  <van-empty v-else description="暂时没有成绩记录"></van-empty>
</div>
</template>

<script>
export default {
  name: 'myScore',
  data() {
    return {
      scoreInfo: [],
      loadingStatus: 'pending'
    }
  },
  async created() {
    const app = this.$cloudbase
    app.callFunction({
        name: 'getMyScore',
        data: {
          uid: 1 // todo
        }
      })
      .then(res => {
        this.scoreInfo = res.result.data.map(item => {
          return {
            ...item,
            isPass: item.score >= 60
          }
        })
        this.loadingStatus = 'success'
      })
      .catch(res => {
        console.log(res)
        this.loadingStatus = 'fail'
      })
  }
}
</script>

<style lang="less" scoped>
@import "../../style/common.less";
.my-score {
  &__wrapper {
    padding: 12px;
  }

  &__title {
    // font-size: 16px;
    .cell-resize();
    font-weight: 400;
    text-align: center;
    border-color: '#1989fa';
    padding: '0 16px';
    color: #333333;
  }

  &__block-wrapper {
    display: flex;
    flex-direction: column;
    border-radius: 12px;
    margin: 8px;
    border: 1px dashed #ccc;
    text-align: left;
    padding: 12px;
    // font-size: 16px;
    .cell-resize();
  }

  &__block-item {
    display: flex;
    margin-bottom: 8px;
    align-items: center;

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
