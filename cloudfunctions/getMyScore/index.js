/*
 * @Author: your name
 * @Date: 2022-01-25 19:29:30
 * @LastEditTime: 2022-02-15 00:22:05
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue-app\cloudfunctions\helloworld\index.js
 */
const cloud = require("@cloudbase/node-sdk");

exports.main = async event => {
  const app = cloud.init({
    env: cloud.SYMBOL_CURRENT_ENV,
  });
  const uid = event.uid

  const db = app.database()
  const _ = db.command

  let scoresInfo = await db
    .collection('exam')
    .where({
      uid: _.eq(uid),
      status: _.eq(1)
    })
    .orderBy('gmt_modified', 'desc')
    .limit(10)
    .get()
  let questionSetInfo = await db
    .collection('questionSet')
    .get()
  if (scoresInfo.code || questionSetInfo.code) {
    return {
      success: false,
      message: scoresInfo.message || questionSetInfo.message || '获取异常，请稍后重试'
    }
  }
  let scoreData = scoresInfo.data
  let questionSetData = questionSetInfo.data.reduce((total, current) => {

    total[current.id] = {
      ...current
    }
    delete total[current.id].id
    delete total[current.id]._id
    return total
  }, {})

  let returnData = scoreData.map(item => {
    return {
      ...item,
      ...questionSetData[item.sid]
    }
  })

  return {
    success: true,
    message: '成功',
    data: returnData
  }
};