/*
 * @Author: your name
 * @Date: 2022-02-13 14:27:12
 * @LastEditTime: 2022-02-13 14:46:19
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue-app\cloudfunctions\payCallback\index.js
 */
// functions/server/index.js
const serverless = require("serverless-http");
const cloud = require("@cloudbase/node-sdk");

exports.main = serverless(async (req, res) => {

  const app = cloud.init({
    env: cloud.SYMBOL_CURRENT_ENV,
  });
  const db = app.database()

  let questionSetRes = await db
    .collection('questionSet')
    .get()

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end(JSON.stringify(questionSetRes));
});