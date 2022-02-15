/*
 * @Author: your name
 * @Date: 2022-02-15 12:02:40
 * @LastEditTime: 2022-02-15 12:15:31
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue-app-really\cloudfunctions\getOperationImg\index.js
 */
const cloud = require("@cloudbase/node-sdk");

exports.main = async event => {
  const app = cloud.init({
    env: cloud.SYMBOL_CURRENT_ENV,
  });
  const {sid} = event
  const db = app.database()
  const _ = db.command

  let res = await db
  .collection('operationImg')
  .where({
    sid: _.eq(sid)
  })
  .get()

  if (res.code) {
    return {
      success: false,
      message: res.message
    }
  }
  return {
    success: true,
    data: res.data,
    message: '成功'
  }
}