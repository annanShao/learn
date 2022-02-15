/*
 * @Author: your name
 * @Date: 2022-01-25 19:29:30
 * @LastEditTime: 2022-02-15 12:42:51
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue-app\cloudfunctions\helloworld\index.js
 */
const cloud = require("@cloudbase/node-sdk");

exports.main = (event, context) => {
  const app = cloud.init({
    env: cloud.SYMBOL_CURRENT_ENV,
  });

  const db = app.database()
  const data = []
  const paymentInfo = []
  const uid = event.userId
  const _ = db.command
  db
    .collection('questionSet')
    .get()
    .then((res) => {
      data = res.data
    })
  
  db
    .collection('payment')
    .where({
      uid: _.eq(uid)
    })
    .get()
    .then((res) => {
      paymentInfo = res.data
    })
  paymentInfo.reduce((total, current, index) => {
    if ((current.gmt_create - parseInt(new Date().getTime() / 1000)) <= (current.type * 60 * 60 * 24 * 30)) {
      total.push(current)
    }
    return total
  }, [])
  return {
    data,
    paymentInfo
  };
};