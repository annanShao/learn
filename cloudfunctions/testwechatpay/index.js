/*
 * @Author: your name
 * @Date: 2022-02-13 21:31:54
 * @LastEditTime: 2022-02-14 00:06:57
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue-app-really\cloudfunctions\testwechatpay\index.js
 */
const cloud = require("@cloudbase/node-sdk");
const got = require("got"); // 需自行安装依赖

exports.main = async (event, context) => {
  // internal 域名
  //   const internalDomain = "yourEnvId-yourAppId.region.internal.tcloudbase.com";
  const app = cloud.init({
    env: cloud.SYMBOL_CURRENT_ENV,
  });
  const url = "https://yixuetongjianpei-1586532-1309423492.ap-shanghai.run.tcloudbase.com";
  let data = {
    info: 123
  }
  const code_options = 
  {
    methods: 'post',
    body: JSON.stringify({
      payid: 1234567,
      method: 'unifiedorder'
    })
  }
  //获取二进制图片
  const resData = await got.post(url, code_options);

  console.log("body", resData);
  return {
    resData
  };
};