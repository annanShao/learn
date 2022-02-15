/*
 * @Author: your name
 * @Date: 2022-02-15 10:25:39
 * @LastEditTime: 2022-02-15 10:41:18
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue-app-really\cloudfunctions\checkPayment\index.js
 */
const cloud = require("@cloudbase/node-sdk");

exports.main = async event => {
  const app = cloud.init({
    env: cloud.SYMBOL_CURRENT_ENV,
  });

  const {pid, timeStamp} = event

  const db = app.database()
  const _ = db.command

  let res = await db
  .collection('payment')
  .where({
    pid: _.eq(pid),
    timeStamp: _.eq(timeStamp)
  })
  .field({
    status: true
  })
  .get()

  if (res.code) {
    return {
      success: false,
      message: res.message
    }
  }
  if (res.data.length && res.data[0].status) {
    return {
      success: true,
      message: '成功！'
    }
  }
  return {
    success: false,
    message: '失败'
  }
}