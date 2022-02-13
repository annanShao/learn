/*
 * @Author: your name
 * @Date: 2022-01-25 19:29:30
 * @LastEditTime: 2022-02-13 18:19:47
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue-app\cloudfunctions\helloworld\index.js
 */
const cloud = require("@cloudbase/node-sdk");
const { sub_mch_id } = require('key.json')

exports.main = async event => {
  const app = cloud.init({
    env: cloud.SYMBOL_CURRENT_ENV,
  });
  const {
    sid,
    uid,
    count,
    type,
    code
  } = event


  if ([1, 3].indexOf(count) === -1) {
    return {
      success: false,
      message: '时间选择错误'
    }
  }

  const db = app.database()
  const timeNow = parseInt(new Date().getTime() / 1000)

  let addRes = await db
    .collection('payment')
    .add({
      sid: sid,
      status: 1,
      type: type,
      count: count * 10,
      uid: uid,
      id: uuid(),
      pid: '1234', // todo 流水号
      gmt_create: timeNow,
      gmt_modified: timeNow
    })

    if (addRes.code) {
      return {
        success: false,
        message: addRes.message
      }
    } else {
      return {
        success: true,
        message: '购买成功',
        data: {
          timeNow
        }
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