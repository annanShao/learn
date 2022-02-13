<!--
import { constants } from 'http2';
import { constants } from 'http2';
 * @Author: your name
 * @Date: 2022-02-07 21:17:06
 * @LastEditTime: 2022-02-12 22:42:10
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue-app\src\components\course\radioTemplate.vue
-->
<template>
<div>
  <div v-for="item in question.options" :key="item.key" class="course-radio-template__option" :class="judgeAnswerClassOrWord(item, 'class')" @click="handleSelectAnswer(item.key)">
    <div class="course-radio-template__option-key">
      {{judgeAnswerClassOrWord(item, 'word')}}
    </div>
    <div class="course-radio-template__option-value">
      {{item.value}}
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'radioTemplate',
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
    return {}
  },
  methods: {
    judgeAnswerClassOrWord(option, type) {
      if (this.type === 'show') { // todo 测试一下
        return this.judgeAnswerClassOrWordTemp(this.question.selectAnswer, this.question.answer, option.key, type)
      } else if (this.type === 'test') {
        if (type === 'class' && this.question.selectAnswer === option.key) {
          return 'answer-select'
        } else if (type === 'word') {
          return option.key
        }
        return ''
      } else {
        if (type === 'class') {
          if (this.question.selectAnswer.length) {
            return this.judgeAnswerClassOrWordTemp(this.question.selectAnswer, this.question.answer, option.key, type)
          }
        } else {
          return this.judgeAnswerClassOrWordTemp(this.question.selectAnswer, this.question.answer, option.key, type)
        }
      }
    },
    judgeAnswerClassOrWordTemp(select, answer, option, type) {
      // console.log(type, select, option)
      if (select === option) {
        if (answer === option) {
          return type === 'class' ? 'answer-right' : ''
        } else {
          return type === 'class' ? 'answer-wrong' : ''
        }
      } else {
        if (answer === option) {
          // if (this.type === 'show') {
          //   return type === 'class' ? 'answer-right' : '' // todo
          // }
          if (type === 'class') {
            return select.length ? 'answer-right' : 'answer-right--unchoose'
          } else {
            return select.length ? '' : option
          }
          // return type === 'class' ? 'answer-right' : select.length ? '' : option // todo
        }
        return type === 'class' ? '' : option
      }
    },
    handleSelectAnswer(key) {
      if (this.type !== 'test') {
        if (!this.question.selectAnswer.length) {
          this.question.selectAnswer = key
        }
      } else {
        this.question.selectAnswer = key
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../style/common.less";
.course-radio-template {
  &__option {
    // font-size: 16px;
    .cell-resize();
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
      // font-size: 16px;
      .cell-resize();
      .option-key();
      text-align: center;

      .answer-right & {
        .right-icon-resize();
        color: #6c0;
        border: none;
      }

      .answer-wrong & {
        .error-icon-resize();
        color: #f46263;
        border: none;
      }

      .answer-select & {
        // color: #58D3F7;
        background: #dddd;
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

      .answer-select & {
        // color: #58D3F7;
      }

      .answer-right--unchoose & {
        color: rgb(89, 173, 6);
        border-color: rgb(89, 173, 6);
      }
    }
  }
}
</style>
