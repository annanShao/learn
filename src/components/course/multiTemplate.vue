<!--
import { constants } from 'http2';
 * @Author: your name
 * @Date: 2022-02-07 21:17:25
 * @LastEditTime: 2022-02-12 00:39:10
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue-app\src\components\course\multiTemplate.vue
-->
<template>
<div>
  <div v-for="item in question.options" :key="item.key" class="course-multi-template__option" :class="judgeAnswerClassOrWord(item, 'class')" @click="handleSelectAnswer(item.key)">
    <div class="course-multi-template__option-key" :class="handleShowSelectClass(item.key)">
      {{judgeAnswerClassOrWord(item, 'word')}}
    </div>
    <div class="course-multi-template__option-value">
      {{item.value}}
    </div>
  </div>
  <van-button class="course-multi-template__confirm-btn" v-if="!question.haveSelected && type !== 'test'" type="primary" block @click="hanldeComfirmAnswer">确认</van-button>
</div>
</template>

<script>
export default {
  name: 'multiTemplate',
  props: {
    question: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      answerTemp: ""
    }
  },
  methods: {
    judgeAnswerClassOrWord(option, type) {
      // console.log(option, type, this.question)
      if (this.type === 'show') { // tdo 测试一下
        return this.judgeAnswerClassOrWordTemp(this.question.selectAnswer, this.question.answer, option.key, type)
      } else if (this.type === 'test') {
        return type === 'class' ? '' : option.key
      } else {
        // if (!this.question.haveSelected) {
        //   return type === 'class' ? 'selectStatus' : option.key
        // }
        if (type === 'class') {
          if (this.question.haveSelected) {
            return this.judgeAnswerClassOrWordTemp(this.question.selectAnswer, this.question.answer, option.key, type)
          }
        } else {
          return this.judgeAnswerClassOrWordTemp(this.question.selectAnswer, this.question.answer, option.key, type)
        }
      }
    },
    judgeAnswerClassOrWordTemp(select, answer, option, type) {
      // console.log(type, select, option)
      if (select.indexOf(option) !== -1) {
        if (answer.indexOf(option) !== -1) {
          return type === 'class' ? 'answer-right' : ''
        } else {
          return type === 'class' ? 'answer-wrong' : ''
        }
      } else {
        if (answer.indexOf(option) !== -1) {
          return type === 'class' ? 'answer-right--unchoose' : option
        }
        return type === 'class' ? '' : option
      }
    },
    handleSelectAnswer(key) {
      if (this.type === 'test') {
        this.handleSelectAnswerTemp(key)
        this.question.selectAnswer = this.answerTemp
        
      } else if (this.type !== 'show' && !this.question.selectAnswer.length) {
        this.handleSelectAnswerTemp(key)
      }
    },
    handleSelectAnswerTemp(key) {
      const index = this.answerTemp.indexOf(key)
      if (index !== -1) {
        this.answerTemp = this.answerTemp.replace(key, '')
      } else {
        this.answerTemp += key
        this.answerTemp = this.answerTemp.split('').sort().join('')
      }
    },
    hanldeComfirmAnswer() {
      this.question.selectAnswer = this.answerTemp
      this.question.haveSelected = true
    },
    handleShowSelectClass(key) {
      if (!this.question.haveSelected && this.answerTemp.indexOf(key) !== -1) {
        return 'choose-temp'
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "./common.less";

.course-multi-template {
  &__option {
    font-size: 14px;
    border-bottom: 1px solid #eee;
    padding: 12px;
    display: flex;
    align-items: center;

    &:first-child {
      border-top: 1px solid #eee;
    }

    &-key {
      border: 1px solid #eee;
      border-radius: 50%;
      font-size: 14px;
      width: 20px;
      height: 20px;
      text-align: center;
      line-height: 20px;

      .answer-right & {
        .right-icon;
        color: #6c0;
        border: none;
      }

      .answer-wrong & {
        .error-icon;
        color: #f46263;
        border: none;
      }

      .answer-right--unchoose & {
        color: #6c0;
        border-color: #6c0;
      }
    }

    &-value {
      margin-left: 16px;
      max-width: 270px;

      .answer-right & {
        color: #6c0;
      }

      .answer-wrong & {
        color: #f46263;
      }

      .answer-right--unchoose & {
        color: rgb(89, 173, 6);
        border-color: rgb(89, 173, 6);
      }
    }
  }

  &__confirm-btn {
    margin-top: 20px;
    max-height: 36px;
  }
}

.choose-temp {
  background: #dddd;
}
</style>
