<!--
 * @Author: your name
 * @Date: 2022-02-07 12:50:14
 * @LastEditTime: 2022-02-11 11:35:18
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue-app\src\components\course\operation-4.vue
-->
<template>
<div>
  <div class="operation-4__wrapper">
    <h1>建筑电工口试题</h1>

    <strong>1．灯开关应装在哪根电源线上？</strong>
    <p>答:相线<p>
        <strong>2. 单相三孔插座的三个孔各接什么线？三根线的标准颜色是什么？</strong>
        <p>答:面向插座正面，下面两孔“左零右火”，上面的孔接保护线。火线是红色，零线是淡蓝色，保护线是黄绿双色。</p>
        <strong>3. 螺口灯头的接线要求？</strong>
        <p>答: 螺口灯头的中心点接相线，螺纹壳接中性线（零线）。</p>
        <strong>4.建筑施工现场用电应该是几级配电？几级漏电保护？</strong>
        <p>答:三级配电，至少两级漏电保护。</p>
        <strong>5．TN-S系统（三相五线制）是哪五根线，说出它们的名字及标准颜色。</strong>
        <p>答:三根相线L1（黄）、L2（绿）、L3（红），中性线N（淡蓝色）,保护零线PE(黄绿双色)。</p>
        <strong> 6.建筑工地施工现场的漏电保护器多长时间试跳一次？</strong>
        <p> 答:每天试跳一次。</p>
        <strong> 7.建筑工地施工现场的开关箱里装了什么？</strong>
        <p> 答:一个断路器（或熔断器），一个漏电开关。即“一机一闸，一箱一漏”。</p>
        <strong> 8.万用表可以测量什么？</strong>
        <p>答:电压、电流、电阻等。</p>
        <strong> 9.低压验电器(低压电笔)使用时的注意事项?</strong>
        <p> 答: 1、低压验电器检测的电压范围的60~500V。</p>
        <p>2、使用前，必须在有电处对验电器进行测试，以证明该验电器确实良好，方可使用。</p>
        <p> 3、验电时，手指必须触及笔尾的金属体，否则带电体会误判为非带电体。</p>
        <p> 4、验电时，要防止手指触及笔尖的金属部分，以免造成触电事故。</p>
        <strong> 10.开关插座的安装要求？</strong>
        <p> 答:1、当不采用安全型插座时，托儿所、幼儿园及小学等儿童活动场所安装高度不小于1.8m。</p>
        <p> 2、暗装的插座面板紧贴墙面，四周无缝隙，安装牢固，表面光滑整洁、无碎裂、划伤。</p>
        <p>3、车间及试(实)验室的插座安装高度距地面不小于0.3m，特殊场所暗装的插座不小于0.15m，同一室内插座安装高度一致。</p>
        <p> 4、地插座面板与地面齐平或紧贴地面，盖板固定牢固，密封良好。</p>
        <p> 5、开关安装位置便于操作，开关边缘距门框边缘的距离0.15～0.2m，开关距地面高度1.3m，拉线开关距地面高度2～3m，层高小于3m时，拉线开关距顶板不小于100mm，拉线出口垂直向下。</p>
        <strong> 11.触电现场急救的原则？现场急救分为几部分？</strong>
        <p> 答:原则：迅速、就地、准确、坚持。</p>
        <strong>分三部分：</strong>
        <p> 1、迅速解脱电源</p>
        <p> 2、简单诊断</p>
        <p> 3、对症处理</p>
        <h1>建筑电工看图识物</h1>
        <img style="width: 100%" v-for="(item, index) in imgKeys" :key="index" :src="imgUrls[`${item}.png`]" alt="">
  </div>
</div>
</template>

<script>
export default {
  name: 'operation-4',
  props: {
    imgUrls: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      imgKeys: [
        '94eb4efc7210c54c44baa16a9bce4842'
      ]
    }
  }
}
</script>

<style scoped>
.operation-4__wrapper {
  text-align: left;
  margin: 0 12px;
}

h1 {
  font-size: 28px;
}

strong {
  font-size: 20px;
}

p {
  font-size: 16px;
}
</style>
