/*
 * @Author: your name
 * @Date: 2022-01-25 19:29:30
 * @LastEditTime: 2022-06-10 15:08:25
 * @LastEditors: annan shao 43042815+annanShao@users.noreply.github.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue-app\cloudfunctions\helloworld\index.js
 */
const cloud = require("@cloudbase/node-sdk");

exports.main = async event => {
  const app = cloud.init({
    env: cloud.SYMBOL_CURRENT_ENV,
  });
  const {sid, type, uid} = event
  const db = app.database()
  let data = []
  const _ = db.command

  data = await db
    .collection('payment')
    .where({
      uid: _.eq(uid),
      sid: _.eq(sid),
      status: _.eq(1)
    })
    .orderBy("gmt_create", "desc")
    .get()
  if (!data.data.length) {
    return {
      success: false,
      message: '题库未购买'
    }
  }
  const tempData = data.data[0]
  // if ((tempData.gmt_create + tempData.count / 10 * 60) < parseInt(new Date().getTime() / 1000)) { // test
  if ((tempData.gmt_create + (tempData.count === 20 ? 30 : tempData.count) / 10 * 60 * 60 * 24 * 30) < parseInt(new Date().getTime() / 1000)) {
    return {
      success: false,
      message: '题库有效期已过，请重新购买'
    }
  }

  switch (type) {
    case 'order':
      // todo 测试点，如果多次购买并且过期了，看看如何情况
      let resData = await db
        .collection('question')
        .where({
          sid: _.eq(sid)
        })
        .limit(800)
        .get()
      return {
        success: true,
          data: resData.data,
          message: '成功'
      }
      case 'wrong':
        let wrongData = await db
          .collection('questionRecord')
          .where({
            sid: _.eq(sid),
            uid: _.eq(uid)
          })
          .get()
        if (wrongData.code) {
          return {
            success: false,
            message: wrongData.message || '错题获取异常，请稍后再试'
          }
        }
        if (!wrongData.data.length) {
          return {
            success: false,
            message: '暂无错题'
          }
        }
        let wrongList = wrongData.data[0].wrongList || []
        let wrongQuestionRes = await db
          .collection('question')
          .where({
            id: _.in(wrongList)
          })
          .limit(800)
          .get()
        if (wrongQuestionRes.code) {
          return {
            success: false,
            message: wrongQuestionRes.message || '错题获取异常，请稍后再试'
          }
        }

        return {
          success: true,
            message: '成功',
            data: wrongQuestionRes.data
        }
        case 'test':
          let types = [3, 1, 2]
          let counts = parseInt(sid) <= 14 ? [15, 15, 10] : [20, 20, 10]
          // let counts = [15, 15, 10]
          let testData = []
          let res = {}
          let searchFlag = true
          for (let index = 0; index < 3; index++) {
            res = await db
              .collection('question')
              .aggregate()
              .match({
                sid: sid,
                type: types[index]
              })
              .sample({
                size: counts[index]
              })
              .limit(counts[index])
              .end()
            if (res.code) {
              searchFlag = false
            }
            testData.push(...res.data)
          }
          let eid = uuid()
          let nowTime = parseInt(new Date().getTime() / 1000)
          let examInfo = await db
            .collection('exam')
            .add({
              id: eid,
              uid: uid,
              sid: sid,
              score: 0,
              status: 0, // 暂时是无效的
              gmt_create: nowTime,
              gmt_modified: nowTime
            })
          if (examInfo.code || !searchFlag) {
            return {
              success: false,
              message: examInfo.message || '异常错误，请稍后再试'
            }
          }
          return {
            success: true,
              message: '成功',
              data: {
                eid: eid,
                data: testData
              }
          }
          default:
            return {
              message: '参数错误',
                success: false
            }
  }
};

function uuid() {
  var d = new Date().getTime();
  d += parseInt(Math.random() * 1000)
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0; // d是随机种子
    d = Math.floor(d / 16);
    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}