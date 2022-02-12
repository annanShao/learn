/*
 * @Author: your name
 * @Date: 2022-01-25 19:29:30
 * @LastEditTime: 2022-02-11 02:14:08
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue-app\cloudfunctions\helloworld\index.js
 */
const cloud = require("@cloudbase/node-sdk");

exports.main = async event => {
  const app = cloud.init({
    env: cloud.SYMBOL_CURRENT_ENV,
  });
  const db = app.database()
  const _ = db.command
  const addRecordData = event.addData
  const updateExamData = event.updateData
  const eid = event.eid
  const sid = addRecordData.sid
  const uid = addRecordData.uid

  let resRecord = {}
  let haveWrongData = await db
    .collection('questionRecord')
    .where({
      sid: _.eq(sid),
      uid: _.eq(uid)
    })
    .get()
  if (haveWrongData.code) {
    return {
      success: false,
      message: '提交异常，请稍后再试'
    }
  } else {
    if (haveWrongData.data.length) {
      let haveIds = haveWrongData.data[0].wrongList
      addRecordData.wrongList = Array.from(new Set([...haveIds, ...addRecordData.wrongList]))
      resRecord = await db
        .collection('questionRecord')
        .where({
          sid: _.eq(sid),
          uid: _.eq(uid)
        })
        .update(addRecordData)
      if (resRecord.code) {
        return {
          success: false,
          message: '提交异常，请稍后再试'
        }
      }
    } else {
      resRecord = await db
        .collection('questionRecord')
        .add(addRecordData)
      if (resRecord.code) {
        return {
          success: false,
          message: '提交异常，请稍后再试'
        }
      }
    }
  }
  let updateRes = await db
    .collection('exam')
    .where({
      id: _.eq(eid)
    })
    .update({
      ...updateExamData
    })
  if (updateRes.code) {
    return {
      success: false,
      message: '提交异常，请稍后再试'
    }
  }
  return {
    success: true,
    message: '成功'
  }


};