/*
 * @Author: your name
 * @Date: 2022-02-09 19:53:29
 * @LastEditTime: 2022-06-01 14:26:40
 * @LastEditors: annan shao 43042815+annanShao@users.noreply.github.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue-app\.postcssrc.js
 */
module.exports = {
  "plugins": {
    'autoprefixer': {
      browsers: ['Android >= 4.0', 'iOS >= 7']
    },
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['!font-size'],
      // exclude: /node_modules|folder_name/i
    }
  }
}