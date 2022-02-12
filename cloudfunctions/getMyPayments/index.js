/*
 * @Author: your name
 * @Date: 2022-01-25 19:29:30
 * @LastEditTime: 2022-02-11 20:31:46
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue-app\cloudfunctions\helloworld\index.js
 */
const cloud = require("@cloudbase/node-sdk");

exports.main = async event => {
  const app = cloud.init({
    env: cloud.SYMBOL_CURRENT_ENV,
  });

  const {uid} = event

  const db = app.database()
    const _ = db.command

    let paymentInfo= await db
      .collection('payment')
      .where({
        uid: _.eq(uid)
      })
      .limit(800)
      .get()
    
    let res = await db
      .collection('questionSet')
      .get()
    if (paymentInfo.code || res.code) {
      return {
        success: false,
        message: paymentInfo.message || res.message || '订单记录获取失败，请稍后再试'
      }
    }

    let questionSetDict = res.data.map((total) => {
      return total.name
    })
    return {
      success: true,
      message: '获取成功',
      data: {
        questionSetDict,
        paymentInfo: paymentInfo.data
      }
    }

};