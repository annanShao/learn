/*
 * @Author: your name
 * @Date: 2022-01-25 19:29:30
 * @LastEditTime: 2022-06-10 15:08:07
 * @LastEditors: annan shao 43042815+annanShao@users.noreply.github.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue-app\cloudfunctions\helloworld\index.js
 */
const cloud = require("@cloudbase/node-sdk");

exports.main = async event => {
  const app = cloud.init({
    env: cloud.SYMBOL_CURRENT_ENV,
  });

  const {
    uid
  } = event

  const db = app.database()
  const _ = db.command

  let questionSetRes = await db
    .collection('questionSet')
    .get()

  let res = await db
    .collection('payment')
    .where({
      uid: _.eq(uid),
      status: _.eq(1)
    })
    .get()

  if (questionSetRes.code || res.code) {
    return {
      success: false,
      mesage: questionSetRes.message || res.message || '获取题库列表异常，请稍后再试'
    }
  }
  let paymentInfo = res.data.reduce((total, current) => {
    if ((parseInt(new Date().getTime() / 1000) - current.gmt_create) <= ((current.count === 20 ? 30 : current.count) / 10 * 60 * 60 * 24 * 30)) {
    // if ((parseInt(new Date().getTime() / 1000) - current.gmt_create) <= (current.count / 10 * 60)) { // test 一分钟或者三分钟
      total.paymentDetails.push(current)
      total.paymentIds.push(current.sid)
    }
    return total
  }, {
    paymentIds: [],
    paymentDetails: []
  })

  return {
    success: true,
    message: '获取成功',
    data: {
      courseListData: questionSetRes.data,
      paymentInfo
    }
  }


};