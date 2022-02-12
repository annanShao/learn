<!--
import { constants } from 'http2';
import { constants } from 'http2';
import { constants } from 'http2';
import { NumberKeyboard } from 'vant';
 * @Author: your name
 * @Date: 2022-02-09 17:11:11
 * @LastEditTime: 2022-02-12 13:35:26
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue-app\src\components\course\answerList.vue
-->
<template>
<div>
  <div @touchmove.prevent class="answer-list__wrapper" :class="{'answer-list__wrapper--up': showSelectPanel}">
    <div class="answer-list__left-wrapper">
      <div class="answer-list__time-wrapper">
        <div class="answer-list__time-submit" @click="handleSubmitExam('click')" v-if="type === 'test'">
          <van-icon name="completed" />
          <span style="font-size: 14px;margin-left: 2px">交卷</span>
        </div>
        <van-icon name="underway-o" />
        <van-count-down ref="timeDown" @finish="handleSubmitExam('time')" class="time-down" v-if="type === 'test'" :time="time" format="mm:ss" />
        <span v-else style="font-size: 14px;margin-left: 6px;">不限时</span>
      </div>
      <van-icon @click="handleRemoveWrong" style="margin-left: 12px;" name="delete-o" v-if="type === 'wrong'"><span class="answer-list__delete-word">移除</span></van-icon>
    </div>
    <div class="answer-list__right-wrapper">
      <div class="answer-list__icon-error-wrapper" v-if="type !== 'test'">
        <div class="error-icon-bottom">{{''}}</div> <span class="answer-list__icon-error-words">{{errorCounts}}</span>
      </div>
      <div class="answer-list__icon-right-wrapper" v-if="type !== 'test'">
        <div class="right-icon-bottom"></div> <span class="answer-list__icon-right-words">{{rightCounts}}</span>
      </div>
      <div class="answer-list__answer-show-wrapper" @click="handleOperatePanel('normal')">
        <van-icon name="apps-o" />
        <span style="margin-left: 4px;font-size: 14px">{{currentIndex}}/{{listLength}}</span>
      </div>
    </div>
  </div>
  <!-- 选择题目界面 -->
  <transition name="mask">
    <div @touchmove.prevent v-show="showSelectPanel" class="answer-list__mask" @click="handleOperatePanel('close')"></div>
  </transition>
  <!-- <transition name="scroll-panel"> -->
  <div ref="answerList" @touchstart="handleTouchStart" @touchmove="handleTouchMove" class="answer-list__scroll-panel-wrapper" :class="{'answer-list__scroll-panel--up': showSelectPanel}">
    <div class="answer-list__scroll-panel-item" v-for="item in listLength" :key="item" @click="handleSelectItem(item)" :class="handleItemClass(item - 1)">
      {{item}}
    </div>
  </div>
  <!-- </transition> -->
</div>
</template>

<script>
import {
  Dialog
} from 'vant';
import {
  Notify
} from 'vant'

export default {
  name: 'answerList',
  props: {
    // todo
    type: {
      type: String,
      required: true
    },
    rightCounts: {
      type: Number,
      required: true
    },
    errorCounts: {
      type: Number,
      required: true
    },
    listLength: {
      type: Number,
      required: true
    },
    currentIndex: {
      type: Number,
      required: true
    },
    questionInfo: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      time: 60 * 60 * 1000,
      showSelectPanel: false,
      startY: 0
    }
  },
  methods: {
    handleOperatePanel(type = 'normal') {
      if (type === 'close') {
        this.showSelectPanel = false
      } else {
        this.showSelectPanel = !this.showSelectPanel
      }
    },
    handleSelectItem(index) {
      // console.log(index)
      this.$emit("handleSwipeTo", index)
      this.showSelectPanel = false
    },
    handleItemClass(index) {
      let classTemp = []
      const select = this.questionInfo[index].selectAnswer
      const answer = this.questionInfo[index].answer
      const itemType = this.questionInfo[index].type
      if (this.type === 'show') {
        classTemp.push(...this.getClassTempFromIndex(index, answer, select))
      } else if (this.type === 'test') {
        if (select.length) {
          if (this.currentIndex === index + 1) {
            classTemp.push(['current-normal-active', 'active-status'])
          } else {
            classTemp.push('active-status')
          }
        }
      } else {
        if (itemType === 2) {
          if (this.questionInfo[index].haveSelected) {
            classTemp.push(...this.getClassTempFromIndex(index, answer, select))
          } else {
            if (this.currentIndex === index + 1) {
              classTemp.push('current-normal')
            }
          }
        } else if ([1, 3].indexOf(itemType) !== -1) {
          if (select.length) {
            classTemp.push(...this.getClassTempFromIndex(index, answer, select))
          } else {
            if (this.currentIndex === index + 1) {
              classTemp.push('current-normal')
            }
          }
        }
      }
      return classTemp
    },
    getClassTempFromIndex(index, answer, select) {
      if (this.currentIndex === index + 1) {
        if (answer === select) {
          return ['right-status', 'current-right']
        } else {
          return ['error-status', 'current-error']
        }
      } else {
        if (answer === select) {
          return ['right-status']
        } else {
          return ['error-status']
        }
      }
    },
    handleSubmitExam(from) {
      if (from === 'click') {
        Dialog.confirm({
            title: '注意',
            message: '是否确认交卷'
          })
          .then(() => {
            this.$refs.timeDown.pause()
            this.$emit('handleExamSubmit')
          })
      } else {
        // 时间到了直接交
        this.$emit('handleExamSubmit')
      }
    },
    handleRemoveWrong() {
      Dialog.confirm({
          title: '注意',
          message: '是否确认移除该题目'
        })
        .then(() => {
          let index = this.currentIndex - 1
          const {
            id,
            sid
          } = this.questionInfo[index]
          const app = this.$cloudbase
          app.callFunction({
              name: 'removeWrong',
              data: {
                uid: 1, // uid
                sid: sid,
                qid: id
              }
            })
            .then(res => {
              if (res.result.success) {
                Notify({
                  type: 'success',
                  message: res.result.message,
                  duration: 2000
                })
                console.log('before', this.questionInfo.length)
                this.questionInfo.splice(index, 1)
                if (!this.questionInfo.length) {
                  Dialog.confirm({
                      title: '提示',
                      message: '恭喜已经没有错题了',
                      showCancelButton: false
                    })
                    .then(() => {
                      this.$router.replace({
                        path: '/'
                      })
                    })
                } else {
                  console.log(index, this.questionInfo.length)
                  if (this.questionInfo.length === index) {
                    this.$emit("handleSwipeTo", index)
                  } else {
                    this.$emit("handleSwipeTo", index + 1)
                  }
                }
              } else {
                Notify({
                  type: 'danger',
                  message: res.result.message,
                  duration: 2000
                })
              }
            })
            .catch(error => {
              console.log(error)
              Notify({
                type: 'danger',
                message: error.message,
                duration: 2000
              })
            })
        })
        .catch(() => {})
    },
    // todo
    handleTouchMove(e) {
      const target = this.$refs.answerList
      let endY = e.touches[0].pageY;
      let delta = endY - this.startY;
      if (
        (target.scrollTop === 0 && delta > 0) ||
        (target.scrollTop + target.clientHeight === target.scrollHeight && delta < 0)
      ) {
        e.preventDefault();
      }
    },
    handleTouchStart(e) {
      this.startY = e.touches[0].pageY; 
    }
  }
}
</script>

<style lang="less" scoped>
@import "./common.less";

.answer-list {
  &__wrapper {
    background: #fff;
    padding: 12px;
    display: flex;
    position: fixed;
    width: 100%;
    font-size: 16px;
    align-items: center;
    bottom: 0;
    color: #bbb;
    justify-content: space-between;
    min-height: 43px;
    transition: 0.5s;
    z-index: 1972;

    &--up {
      bottom: 250px;
    }
  }

  &__right-wrapper {
    display: flex;
  }

  &__left-wrapper {
    display: flex;
    align-items: center;
  }

  &__icon-error {
    &-wrapper {
      display: flex;
      align-items: center;
      margin-right: 20px;
    }

    &-words {
      margin-left: 6px;
    }
  }

  &__icon-right {
    &-wrapper {
      display: flex;
      align-items: center;
      margin-right: 20px;
    }

    &-words {
      margin-left: 6px
    }
  }

  &__answer-show-wrapper {
    right: 12px;
    font-size: 16px;
  }

  &__time {
    &-submit {
      font-size: 16px;
      margin-right: 8px;
      line-height: 16px;
      color: #54d16f;
      font-weight: bold;
    }

    &-wrapper {
      display: flex;
      align-items: center;
      color: #bbb;

      & .time-down {
        color: #bbb;
        margin-left: 4px;
        font-size: 14px;
        line-height: 14px;
      }
    }
  }

  &__delete-word {
    font-size: 14px;
    margin-left: 6px;
    line-height: 16px;
  }

  &__scroll-panel {
    &-wrapper {
      overflow-y: auto;
      position: fixed;
      bottom: -250px;
      height: 250px;
      background: #fff;
      width: 100%;
      transition: 0.5s;
      z-index: 1971;
      padding-bottom: 12px;
    }

    &-item {
      float: left;
      width: 49px;
      height: 49px;
      margin: 12px 0 0 10px;
      border-radius: 25px;
      border: 1px solid #ccc;
      font-size: 15px;
      line-height: 49px;
      text-align: center;
      color: #ccc;
    }

    &--up {
      bottom: 0px;
      // transform: translateY(250px)
    }
  }

  &__mask {
    position: fixed;
    z-index: 1970;
    background: rgba(0, 0, 0, .5);
    height: 100%;
    width: 100%;
    top: 0;
    transition: 0.5s;
  }

}

.mask-enter-active,
.mask-leave-active {
  transition: opacity 0.5s
}

.mask-enter,
.mask-leave-to {
  opacity: 0
}

.scroll-panel-enter-active,
.scroll-panel-leave-active {
  transition: transform 0.5s
}

.scroll-panel-enter,
.scroll-panel-leave-to {
  transform: translateY(250px);
}

.current-normal {
  background: #f6f6f6;
}

.right-status {
  color: #54d16f;
  border-color: #54d16f;
}

.error-status {
  color: #f46263;
  border-color: #f46263;
}

.active-status {
  color: #58D3F7;
  border-color: #58D3F7;
}

.current-right {
  background: #f7fff0;
}

.current-error {
  background: #fff3f3;
}

.current-normal-active {
  background: #58d2f729;
  // background: #89def8;
}
</style>
