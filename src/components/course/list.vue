<template>
<div>
  <van-skeleton class="skeleton-class" v-if="loadingStatus === 'pending'" title :row="8" />
  <div style="padding-bottom: 50px" v-else-if="loadingStatus === 'success'">
    <van-tabs v-model="activeTag">
      <van-tab v-for="(item, index) in typeDict" :key="index" title-class="cell-font-resize" :title="item">
        <ListPanel :questionType="index" :data="courseListDetail[index]"></ListPanel>
      </van-tab>
    </van-tabs>
  </div>
  <van-empty v-else description="获取题库列表异常，请稍后再试"></van-empty>
</div>
</template>

<script>
import listPanel from './listPanel.vue'
import {
  Notify
} from 'vant';

export default {
  name: 'list',
  components: {
    'ListPanel': listPanel
  },
  data() {
    return {
      activeTag: 0,
      courseList: [],
      activeNames: [],
      paymentIds: [],
      paymentDetails: [],
      typeDict: ['新培', '复审'],
      loadingStatus: 'pending'
    }
  },
  computed: {
    courseListDetail: function () {
      if (!this.courseList || !this.courseList.length) {
        return []
      }
      return this.courseList.reduce((total, current) => {
        const idIndex = this.paymentIds.indexOf(current.id)
        if (idIndex !== -1) {
          current.status = 1
          current.gmt_create = this.paymentDetails[idIndex].gmt_create
          current.count = (this.paymentDetails[idIndex].count === 20 ? 30 : this.paymentDetails[idIndex].count) / 10
          current.gmt_end = this.paymentDetails[idIndex].gmt_create + current.count * 60 * 60 * 24 * 30
        }
        total[current.type - 1].push(current)
        return total
      }, [
        [],
        []
      ])
    }
  },
  async created() {
    const app = this.$cloudbase
    const uid = localStorage.getItem('uid') || null;
    if (uid === null) {
      Notify({
        type: 'warning',
        message: '请刷新后重试'
      })
      return false;
    }
    app.callFunction({
        name: 'getList',
        data: {
          uid: uid
        }
      })
      .then(res => {
        if (res.result.success) {
          this.loadingStatus = 'success'
          this.courseList = res.result.data.courseListData
          this.paymentIds = res.result.data.paymentInfo.paymentIds
          this.paymentDetails = res.result.data.paymentInfo.paymentDetails
        } else {
          this.loadingStatus = 'fail'
          Notify({
            type: 'danger',
            message: res.result.message,
            duration: 2000
          })
        }
      })
      .catch(error => {
        this.loadingStatus = 'fail'
        Notify({
          type: 'danger',
          message: error.message,
          duration: 2000
        })
      })
  }
}
</script>

<style scoped>
.course-list__cell {
  text-align: left;
}

.course-list__tags {
  margin-left: 14px;
}
</style>
