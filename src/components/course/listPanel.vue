<!--
 * @Author: your name
 * @Date: 2022-01-30 14:12:05
 * @LastEditTime: 2022-06-01 13:58:29
 * @LastEditors: annan shao 43042815+annanShao@users.noreply.github.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue-app\src\components\course\listPanel.vue
-->
<template>
<div>
  <van-collapse v-model="activePanels" class="course-listpanel__wrapper" accordion>
    <van-collapse-item v-for="(item, index) in data" :key="item._id" :name="item._id">
      <template #title>
        <div class="course-list__cell">
          {{`${item.name}${typeDict[item.type - 1]}`}}
          <span class="course-list__tags">
            <van-tag v-if="!item.status" plain type="danger">未购买</van-tag>
            <van-tag v-else plain type="success">已购买</van-tag>
          </span>
        </div>
      </template>
      <template>
        <div v-if="!item.status">
          <div class="course-listpanel__collapse-label">
            您还未购买此题库或已到期，请点击立即购买~
          </div>
          <!-- 选择一个月三个月 -->
          <van-radio-group v-model="chooseQuestionCount[index].count" direction="horizontal" :icon-size="18" class="list-panel__radio-group">
            <van-radio :name="1" class="cell-font-resize" checked-color="#ff6034">1个月</van-radio>
            <van-radio :name="3" class="cell-font-resize" checked-color="#ff6034">3个月</van-radio>
          </van-radio-group>
          <van-button @click="handleBuyQuestion(item.id, item.type, index, chooseQuestionCount[index].count)" round style="height: 30px" color="linear-gradient(to right, #ff6034, #ee0a24)" block>立即购买</van-button>
        </div>
        <div v-else class="course-listpanel__cell-wrapper">
          <van-cell title-class="cell-font-resize" value-class="cell-font-resize" title="购买时长：" :value="`${item.count}个月`" />
          <van-cell title-class="cell-font-resize" value-class="cell-font-resize" title="本题库购买时间：" :value="new Date(item.gmt_create * 1000).toLocaleString('zh', { hour12: false })" />
          <van-cell title-class="cell-font-resize" value-class="cell-font-resize" title="本题库有效时间：" :value="new Date(item.gmt_end * 1000).toLocaleString('zh', { hour12: false })" />
          <van-divider dashed class="cell-font-resize">功能</van-divider>
          <van-cell title-class="cell-font-resize" value-class="cell-font-resize" :title="questionChoose[questionType][itemQ]" v-for="itemQ in Object.keys(questionChoose[questionType])" :key="itemQ" @click="handleQuestionEnter(itemQ, item.id)" is-link />
        </div>
      </template>
    </van-collapse-item>
  </van-collapse>

  <!-- <van-dialog v-model="showDialog" @confirm="handleBuyQuestion" title="购买题库" confirmButtonColor="#F7681B" show-cancel-button> -->

  <!-- </van-dialog> -->
</div>
</template>

<script>
/* eslint-disable */
import _ from "lodash";

import { Dialog } from "vant";

import { Notify } from "vant";

export default {
  name: "listPanel",
  data() {
    return {
      activePanels: [],
      currentPanelIndex: -1,
      typeDict: ["新培", "复审"],
      questionChoose: [
        {
          order: "顺序练习",
          test: "模拟考试",
          operation: "实操手册",
          wrong: "错题回顾",
        },
        {
          order: "顺序练习",
          test: "模拟考试",
          wrong: "错题回顾",
        },
      ],
      showDialog: false,
      chooseQuestionCount: [],
      finalData: {},
    };
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    questionType: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    handleQuestionEnter(flag, sid) {
      switch (flag) {
        case "operation":
          this.$router.push({
            path: "/operation",
            query: {
              sid: sid,
            },
          });
          break;
        default:
          this.$router.push({
            path: "/question",
            query: {
              sid: sid,
              type: flag,
            },
          });
      }
    },
    handleBuyQuestion: _.debounce(function(sid, type, index, choose) {
      this.currentPanelIndex = index;
      if (!choose) {
        Notify({
          type: "warning",
          message: "请先选择购买时间",
          duration: 2000,
        });
        return false;
      }
      const count = parseInt(choose);
      const uid = localStorage.getItem("uid");
      const openid = localStorage.getItem("openid");
      if (uid === null) {
        Notify({
          type: "warning",
          message: "请刷新后重试",
        });
      }
      Dialog.confirm({
        title: "注意",
        message: `是否确定购买此题库——${choose}个月`,
      })
        .then(() => {
          const app = this.$cloudbase;
          app
            .callFunction({
              name: "buyQuestion",
              data: {
                sid,
                uid: uid,
                count: count,
                type,
                openid: openid,
              },
            })
            .then((res) => {
              // 唤起支付
              if (res.result.success) {
                const timeNow = res.result.data.timeNow;
                this.finalData = res.result.data.finalData;
                if (typeof WeixinJSBridge == "undefined") {
                  if (document.addEventListener) {
                    document.addEventListener(
                      "WeixinJSBridgeReady",
                      onBridgeReady,
                      false
                    );
                  } else if (document.attachEvent) {
                    document.attachEvent("WeixinJSBridgeReady", onBridgeReady);
                    document.attachEvent(
                      "onWeixinJSBridgeReady",
                      onBridgeReady
                    );
                  }
                } else {
                  this.onBridgeReady({
                    count,
                    index,
                    timeNow,
                  });
                }
              } else {
                Notify({
                  type: "danger",
                  message: res.result.message,
                });
              }
            })
            .catch((error) => {
              Notify({
                type: "danger",
                message: error.message,
                duration: 2000,
              });
            });
        })
        .catch(() => {
          // on cancel
        });
    }, 500),
    onBridgeReady(data = null) {
      let that = this;
      WeixinJSBridge.invoke(
        "getBrandWCPayRequest",
        {
          ...this.finalData,
        },
        async function(res) {
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            // 使用以上方式判断前端返回,微信团队郑重提示：
            //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
            const app = that.$cloudbase;
            await app
              .callFunction({
                name: "checkPayment",
                data: {
                  pid: that.finalData.package.slice(10),
                  timeStamp: that.finalData.timeStamp,
                },
              })
              .then((res) => {
                if (res.result.success && data) {
                  // 这样子直接更新就不需要刷新了
                  that.data[data.index] = {
                    ...that.data[data.index],
                    count: data.count,
                    gmt_create: data.timeNow,
                    gmt_end: data.timeNow + data.count * 60 * 60 * 24 * 30,
                    status: 1,
                  };
                  that.$forceUpdate();
                } else {
                  // 刷新
                  window.location.reload();
                }
              });
          }
        }
      );
    },
  },
  created() {
    this.chooseQuestionCount = this.data.map(() => {
      return {
        count: 1,
      };
    });
  },
};
</script>

<style lang="less">
@import "../../style/common.less";

.course-listpanel__wrapper {
  text-align: left;
}

.course-listpanel__collapse-label {
  margin: 8px 0;
  .cell-resize();
}

.course-listpanel__cell-wrapper > .van-cell {
  padding: 4px 6px;
}

.course-list__cell {
  // font-size: 16px;
  .cell-resize();
}

.list-panel__radio-group {
  margin: 12px 0;
  display: flex;
  justify-content: space-around;
}
</style>
