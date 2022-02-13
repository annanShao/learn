/*
 * @Author: your name
 * @Date: 2022-02-13 21:31:54
 * @LastEditTime: 2022-02-13 23:03:58
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
  let options = {
    url: url,
    method: "POST", //请求方式 get post... 不多介绍了
    headers: { //需要啥传啥 我列了几个常用的，不需要删除即可
      // "cookie":"aaa=%E4%BD%A0%E5%A5%BD;yyyyy=nihao;", //请求携带的cookie 这里我是自己代码拼的，官网用的是tough-cookie 
      "content-type": "application/json", //编码类型 不同的content-type传递方式不相同 下面传参时会介绍
    },
    responseType: "json", //解析响应的方式默认(text) text，json，buffer 这里我使用buffer 因为buffer可以更自由的判断响应体的类型
    followRedirect: true, //是否遵循重定向响应 默认(true)
    timeout: 25000, //请求超时时间 好像还可以比较详细的设置 需要的分细的去官网看把
    // rejectUnauthorized:true, //检测到无效的SSL证书时，引发错误.默认（true） false是忽略无效证书错误
    //下面是携带参数了，划重点 根据不同的content-type选择一个即可
    json: {
      payid: 123456,
      method: 'unifiedorder',
      ...data
    }, //application/json时使用 支持类型 object| Array | number | string | boolean | null
    // body:form,//multipart/form-data时使用 多个参数继续append即可。
    // form:{a:1}, //application/x-www-form-urlencoded时使用 类型只能是对象object
    // http2:true, //根据ALPN协议选择HTTP/2 默认(http 1.1) 这里我还在研究
    // isStream:true //返回的是Stream流 默认false 返回的是Promise http2好像要配合这个使用
  }
  const resData = await got(options);

  console.log("body", resData);
  return {
    resData
  };
};