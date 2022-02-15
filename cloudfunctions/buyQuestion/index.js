/*
 * @Author: your name
 * @Date: 2022-01-25 19:29:30
 * @LastEditTime: 2022-02-15 10:15:22
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue-app\cloudfunctions\helloworld\index.js
 */
const cloud = require("@cloudbase/node-sdk");
const request = require('request')
const xmlreader = require('xmlreader')
const {
  sub_mch_id,
  appid,
  apikey
} = require('key.json')
const got = require('got');

exports.main = async event => {
  const app = cloud.init({
    env: cloud.SYMBOL_CURRENT_ENV,
  });
  const {
    sid,
    uid,
    count,
    type,
    openid
  } = event


  if ([1, 3].indexOf(count) === -1) {
    return {
      success: false,
      message: '购买时长选择错误'
    }
  }

  const db = app.database()
  const timeNow = parseInt(new Date().getTime() / 1000)

  const url = "https://api.mch.weixin.qq.com/pay/unifiedorder"
  const randomId = uuid().slice(0, 32)
  const payId = uuid().slice(0, 16)

  let bodyData = "一学通建培-题库费用"
  // let total_fee = count * 10 * 100
  let total_fee = count * 1
  let notify_url = "https://construction-training-8a6832589a-1309600671.ap-shanghai.app.tcloudbase.com/payCallback"
  let spbill_create_ip = '127.0.0.1'
  let trade_type = 'JSAPI'
  let sign_type = "MD5"

  // console.log('123', randomId)
  // console.log('456', payId)

  let sign_pre = {
    appid: appid,
    mch_id: sub_mch_id,
    nonce_str: randomId,
    body: bodyData,
    out_trade_no: payId,
    total_fee: total_fee,
    spbill_create_ip: spbill_create_ip, // 给一个有效的即可
    notify_url: notify_url,
    trade_type: trade_type,
    sign_type: sign_type,
    openid: openid
  }

  let sign = MSign(sign_pre, apikey)
  // console.log(789,sign)

  let formData = "<xml>";
  formData += "<appid><![CDATA[" + appid + "]]></appid>";
  formData += "<body><![CDATA[" + bodyData + "]]></body>";
  formData += "<mch_id><![CDATA[" + sub_mch_id + "]]></mch_id>";
  formData += "<nonce_str><![CDATA[" + randomId + "]]></nonce_str>";
  formData += "<notify_url><![CDATA[" + notify_url + "]]></notify_url>";
  formData += "<openid><![CDATA[" + openid + "]]></openid>";
  formData += "<out_trade_no><![CDATA[" + payId + "]]></out_trade_no>";
  formData += "<sign_type><![CDATA[" + sign_type + "]]></sign_type>"
  formData += "<spbill_create_ip><![CDATA[" + spbill_create_ip + "]]></spbill_create_ip>";
  formData += "<total_fee><![CDATA[" + total_fee + "]]></total_fee>";
  formData += "<trade_type><![CDATA[" + trade_type + "]]></trade_type>";
  formData += "<sign>" + sign + "</sign>"; //sign是上一步签名产生的;
  formData += "</xml>";
  // console.log(999, formData)

  let {
    body
  } = await got.post({
    url: url,
    body: formData
  })


  let finalData
  let prepayId
  xmlreader.read(body.toString("utf-8"), function (errors, response) {
    if (errors !== null) {
      console.log('error', errors)
    } else {
      if (response.xml.return_msg.text().toLocaleUpperCase() == 'OK') {
        //此时返回的数据并不能直接用在客户端，需要再次签名;
        let prepay_id = response.xml.prepay_id.text();
        // console.log('res', response.xml)
        prepayId = prepay_id
        let timestamp = parseInt(new Date().getTime() / 1000) + '';
        //4.签名
        let finalsign = MSign({
          appId: appid,
          timeStamp: timestamp,
          nonceStr: randomId, // 这里注意
          package: 'prepay_id=' + prepay_id,
          signType: sign_type
        }, apikey);
        //这才是客户端最后使用的数据;
        let clientParam = {
          'appId': appid,
          'nonceStr': randomId,
          'timeStamp': timestamp,
          'package': 'prepay_id=' + prepay_id,
          'signType': sign_type,
          'paySign': finalsign
        };
        finalData = clientParam
        // return(clientParam)
      } else {
        finalData = false
      }
    }
  })

  if (!finalData) {
    return {
      success: false,
      message: '创建订单失败'
    }
  }

  let addRes = await db
    .collection('payment')
    .add({
      sid: sid,
      status: 0,
      type: type,
      count: count * 10,
      uid: uid,
      id: payId,
      total_fee,
      pid: prepayId, // todo 流水号
      timeStamp: finalData.timeStamp,
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
        finalData,
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

//签名;
//mchkey是你在支付平台设置的一个API密钥
function MSign(param, mchkey) {
  var string = raw(param);
  // console.log(string)
  string = string + '&key=' + mchkey; //key拼接在字符串最后面
  // console.log('加了密钥', string)
  var crypto = require('crypto');
  return crypto.createHash('md5').update(string, 'utf8').digest('hex').toUpperCase();
}
//args是一个JSON，方法将json中的字段按照ASCII码从小到大排序，生成一个字符串key1=value1&key2=value2。 
function raw(args) {
  var keys = Object.keys(args);
  keys = keys.sort();
  var newArgs = {};
  keys.forEach(function (key) {
    newArgs[key] = args[key];
  });
  var string = '';
  for (var k in newArgs) {
    string += '&' + k + '=' + newArgs[k];
  }
  string = string.substr(1);
  return string;
}