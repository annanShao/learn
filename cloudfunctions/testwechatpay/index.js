/*
 * @Author: your name
 * @Date: 2022-02-13 21:31:54
 * @LastEditTime: 2022-02-14 01:20:11
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue-app-really\cloudfunctions\testwechatpay\index.js
 */
const axios = require('axios');
exports.main = async (event, context) => {

  const url = "https://yixuetongjianpei-1586532-1309423492.ap-shanghai.run.tcloudbase.com";
  let res = await axios.get(url)
  return res
};