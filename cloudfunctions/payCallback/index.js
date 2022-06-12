/*
 * @Author: your name
 * @Date: 2022-02-13 14:27:12
 * @LastEditTime: 2022-06-10 15:19:38
 * @LastEditors: annan shao 43042815+annanShao@users.noreply.github.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue-app\cloudfunctions\payCallback\index.js
 */
// functions/server/index.js

const serverless = require("serverless-http");
const cloud = require("@cloudbase/node-sdk");
const xmlreader = require('xmlreader');

exports.main = serverless(async (req, res) => {

  const app = cloud.init({
    env: cloud.SYMBOL_CURRENT_ENV,
  });
  const db = app.database()
  const _ = db.command
  const event = req.apiGateway.event

  const body = req.apiGateway.event.body

  const data = body && Buffer.from(body, 'base64').toString('utf8')

  let result = {}
  xmlreader.read(data, function (errors, response) {
    if (errors !== null) {
    } else {
      if (response.xml.return_code.text().toLocaleUpperCase() == 'SUCCESS') {
        result = {
          out_trade_no: response.xml.out_trade_no.text(),
          total_fee: response.xml.total_fee.text(),
          transaction_id: response.xml.transaction_id.text(),
        }
      } else {
      }
    }
  })

  await db.collection('callbacktest').add({
    body: data,
    ...result,
    gmt_create: parseInt(new Date().getTime() / 1000)
  })

  let paymentInfo = await db
    .collection('payment')
    .where({
      id: _.eq(result.out_trade_no)
    })
    .get()

  if (paymentInfo.code || !paymentInfo.data || !paymentInfo.data.length) {
    res.statusCode = 100;
    res.setHeader("Content-Type", "text/plain");
    res.end(false);
  } else {

    const data = paymentInfo.data[0]
    if (parseInt(data.count) * 100 !== parseInt(result.total_fee)) {
      res.statusCode = 100;
      res.setHeader("Content-Type", "text/plain");
      res.end(false);
    } else {
      let updateRes = await db
        .collection('payment')
        .where({
          id: _.eq(result.out_trade_no)
        })
        .update({
          ...result,
          status: 1,
          gmt_modified: parseInt(new Date().getTime() / 1000)
        })
      if (updateRes.code) {
        res.statusCode = 100;
        res.setHeader("Content-Type", "text/plain");
        res.end(false);
      } else {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain");
        res.end("<xml><return_code><![CDATA[SUCCESS]]></return_code><return_msg><![CDATA[OK]]></return_msg></xml>");
      }
    }
  }
});