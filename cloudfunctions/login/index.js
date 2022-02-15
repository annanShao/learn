/*
 * @Author: your name
 * @Date: 2022-02-14 22:29:33
 * @LastEditTime: 2022-02-14 23:07:26
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue-app-really\cloudfunctions\login\index.js
 */
const cloud = require("@cloudbase/node-sdk");

exports.main = async (event, context) => {
  const app = cloud.init({
    env: cloud.SYMBOL_CURRENT_ENV,
  });

  const userInfo = event.userInfo
  const db = app.database()
  const _ = db.command

  let res = await db
    .collection('user')
    .where({
      uid: _.eq(userInfo.uid)
    })
    .get()
  if (!res.data.length) {
    let timeNow = parseInt(new Date().getTime() / 1000)
    let addRes = await db
    .collection('user')
    .add({
      ...userInfo,
      gmt_create: timeNow,
      gmt_modified: timeNow
    })
    if (!addRes.code) {
      return {
        success: true,
        message: '登陆成功'
      }
    } else {
      return {
        success: false,
        message: '信息保存失败'
      }
    }
  }

  return {
      success: true,
      message: '已经录入'
  }
}