<!--
import { constants } from 'http2';
 * @Author: your name
 * @Date: 2022-02-04 12:15:49
 * @LastEditTime: 2022-02-12 22:39:14
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue-app\src\components\course\questionPage.vue
-->
<template>
<div>
  <van-skeleton class="skeleton-class" v-if="loadingStatus === 'pending'" title :row="16" />
  <div v-else-if="loadingStatus === 'success' && questionInfo.length">
    <div class="question-page__body-wrapper">
      <van-swipe ref="swipe" @change="(index) => current = index + 1" :loop="false">
        <van-swipe-item style="min-height: 500px" v-for="(item, index) in questionInfo" :key="item._id">
          <!-- header title-->
          <div class="question-page__title">
            <van-tag size="medium" type="primary">{{item.type_name}}</van-tag> {{`${index + 1}. ${item.title}`}}
          </div>
          <RadioTemp v-if="[1, 3].indexOf(item.type) !== -1" :question="item" :type="type"></RadioTemp>
          <MultiTemp v-else-if="[item.type === 2]" :question="item" :type="type"></MultiTemp>
          <van-empty v-else image="error" description="题目出现问题，请稍后再试，或向管理员反应~" />
          <div class="question-page__answer-wrapper" v-if="shouldShowAnswer(item)">
            <span>正确答案：</span>{{item.answer}}
          </div>

        </van-swipe-item>
        <template #indicator>
          <div></div>
        </template>
      </van-swipe>
    </div>
    <!-- footer 答题卡 -->
    <AnswerList :type="type" :questionInfo="questionInfo" @handleExamSubmit="handleExamSubmit" @handleSwipeTo="handleSwipeTo" :listLength="questionInfo.length" :currentIndex="current" :rightCounts="answerInfo.rightCounts" :errorCounts="answerInfo.errorCounts">
    </AnswerList>
  </div>
  <van-empty v-else :description="showQuestionEmptyText()" />
</div>
</template>

<script>
import radioTemplate from './radioTemplate.vue'
import multiTemplate from './multiTemplate.vue'
import answerList from './answerList.vue'
// import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
// import uuid from '@/utils/uuid.js'
import {
  Dialog
} from 'vant';
import {
  Notify
} from 'vant';

export default {
  name: 'questionPage',
  components: {
    'RadioTemp': radioTemplate,
    'MultiTemp': multiTemplate,
    'AnswerList': answerList
  },
  computed: {
    // todo 每次做完题目都要遍历几百道题目，可能效率不高，目前先这样，后续看着优化
    answerInfo() {
      return this.questionInfo.reduce((total, current) => {
        if (current.type === 2) {
          if (current.haveSelected || this.type === 'show') {
            total = this.getAnswerStatus(total, current.answer, current.selectAnswer)
          }
        } else if ([1, 3].indexOf(current.type) !== -1) {
          if (this.type !== 'show' && current.selectAnswer.length) {
            total = this.getAnswerStatus(total, current.answer, current.selectAnswer)
          } else if (this.type === 'show') {
            total = this.getAnswerStatus(total, current.answer, current.selectAnswer)
          }
        }
        return total
      }, {
        errorCounts: 0,
        rightCounts: 0
      })
    }
  },
  data() {
    return {
      current: 1,
      loadingStatus: 'pending',
      errorMsg: '暂无题库，请检查是否购买并有效',
      questionInfo: [],
      type: '',
      eid: undefined,
      sid: undefined,
      submiting: false
    }
  },
  methods: {
    getAnswerStatus(total = {
      errorCounts: 0,
      rightCounts: 0
    }, answer, select) {
      if (answer === select) {
        total.rightCounts++
      } else {
        total.errorCounts++
      }
      return total
    },
    handleSwipeTo(index) {
      this.$refs.swipe.swipeTo(index - 1, {
        immediate: true
      })
    },
    async handleExamSubmit() {
      if (this.submiting) {
        return false
      }
      this.submiting = true
      const app = this.$cloudbase

      const eid = this.eid
      let score = this.answerInfo.rightCounts * 2.5
      const timeNow = parseInt(new Date().getTime() / 1000)
      let addRecord = this.questionInfo.reduce((total, current) => { // 只保存错题
        if (current.selectAnswer !== current.answer) {
          total.wrongList.push(current.id)
        }
        return total
      }, {
        sid: this.sid,
        uid: 1,
        wrongList: [],
        gmt_create: timeNow,
        gmt_modified: timeNow
      })
      let examUpdateData = {
        score: score,
        status: 1,
        gmt_modified: timeNow
      }
      // todo 加载状态
      app.callFunction({
          name: 'submitExam',
          data: {
            eid: eid,
            addData: addRecord,
            updateData: examUpdateData
          }
        })
        .then(res => {
          console.log(res)
          Dialog.confirm({
              title: '注意',
              message: `您的考试成绩为${score}分`,
              confirmButtonText: '查看答案',
              confirmButtonColor: '#F7681B'
            })
            .then(() => {
              this.questionInfo.forEach(item => {
                if (item.type === 2) {
                  item.haveSelected = true
                }
              })
              this.type = 'show'
            })
            .catch(() => {
              this.$router.replace({
                path: '/'
              })
            })
        })
        .catch((error) => {
          console.log(error)
          Notify({
            type: 'danger',
            message: '提交失败，请稍后重试',
            duration: 2000
          });
        })
        .finally(() => {
          this.submiting = false
        })
    },
    shouldShowAnswer(item) {
      if (this.type === 'show') {
        return true
      } else if (this.type === 'test') {
        return false
      } else {
        if (item.type === 2) {
          if (item.haveSelected) {
            return true
          }
        } else {
          if (item.selectAnswer.length) {
            return true
          }
        }
      }
    },
    showQuestionEmptyText() {
      if (this.loadingStatus === 'fail') {
        return `${this.errorMsg},请稍后再试，异常请与管理员联系`
      } else {
        if (this.type === 'wrong') {
          return '暂时没有错题,快去做题吧'
        } else {
          return '暂无题库, 请稍后再试，异常请与管理员联系'
        }
      }
    }
  },
  async created() {
    const type = this.$route.query.type || null
    const sid = (this.$route.query.sid && parseInt(this.$route.query.sid)) || null
    if (!type || !sid) {
      this.loadingStatus = 'fail'
      return false
    }
    this.sid = sid
    this.type = type
    const app = this.$cloudbase
    app.callFunction({
        name: 'getQuestion',
        data: {
          uid: 1, // todo 增加鉴权
          sid: parseInt(sid),
          type: type
        }
      })
      .then(res => {
        console.log(res)
        let result = res.result
        if (result.success === false) {
          this.loadingStatus = 'fail'
          this.errorMsg = result.message
          return false
        }
        if (type === 'test') {
          this.eid = result.data.eid
        }
        let resData = type === 'test' ? result.data.data : result.data
        this.questionInfo = resData.map(current => {
          if (!current.selectAnswer) {
            current.selectAnswer = ''
          }
          if (current.type === 2) {
            current.haveSelected = type === 'show' ? true : false
          }
          return current
        })
        this.loadingStatus = 'success'
      })
      .catch((error) => {
        console.log(error)
        this.loadingStatus = 'fail'
      })
  }
}
</script>

<style lang="less" scoped>
@import "../../style/common.less";
.question-page {
  &__body-wrapper {
    padding: 12px 12px 0 12px;
    text-align: left;

  }

  &__title {
    // font-size: 16px;
    .cell-resize();
    margin-bottom: 32px;
  }

  &__submit-btn {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

  &__answer-wrapper {
    margin: 20px 0 0 12px;
    // font-size: 16px;
    .cell-resize();
  }
}
</style>
