/*
 * @Author: your name
 * @Date: 2022-01-25 19:29:30
 * @LastEditTime: 2022-02-15 12:43:26
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue-app\cloudfunctions\helloworld\index.js
 */
const cloud = require("@cloudbase/node-sdk");

exports.main = async event => {
  const app = cloud.init({
    env: cloud.SYMBOL_CURRENT_ENV,
  });
  const {uid, sid, qid} = event
  const db = app.database()
  const _ = db.command

  let removeRes = await db
  .collection('questionRecord')
  .where({
    uid: _.eq(uid),
    sid: _.eq(sid)
  })
  .get()

  if (removeRes.code || !removeRes.data.length) {
    return {
      success: false,
      message: '移除失败，请稍后再试'
    }
  }
  let wrongList = removeRes.data[0].wrongList
  let removeIndex = wrongList.indexOf(qid)
  if (removeIndex === -1) {
    return {
      success: false,
      message: '移除失败，题目号出错'
    }
  }
  wrongList.splice(removeIndex, 1)

  let updateRes = db
  .collection('questionRecord')
  .where({
    uid: _.eq(uid),
    sid: _.eq(sid)
  })
  .update({
    wrongList
  })

  if (updateRes.code) {
    return {
      success: false,
      message: '移除失败，请稍后再试'
    }
  }
  return {
    success: true,
    message: '移除成功'
  }

};