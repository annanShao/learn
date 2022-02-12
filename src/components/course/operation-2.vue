<!--
 * @Author: your name
 * @Date: 2022-02-04 14:25:46
 * @LastEditTime: 2022-02-11 11:37:23
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue-app\src\components\course\course-2.vue
-->
<template>
<div>
  <div class="operation-2__wrapper">
    <h1>操作手册</h1>
    <h3> 一、识别判断施工升降机设置的二个简单故障</h3>
    <strong>吊笼上、下运行时自停现象</strong>
    <p>1、上、下限位开关接触不良或损坏</p>
    <p>2、严重超载</p>
    <p>3、控制装置(按钮手柄》接触不良或损坏</p>
    <strong>运行时，上、下限位开关失灵</strong>
    <p>1.上、下限位开关损坏</p>
    <p>2、上、下限位碰块移位</p>
    <strong>吊笼运行时有跳动现象</strong>
    <p>1、导轨架对接阶差过大</p>
    <p>2、齿条螺栓松动。对接阶差过大</p>
    <p>3、齿轮严重磨损</p>
    <h3>二、施工升降机零部件报废标准，并说明原因</h3>
    <strong>SC型施工升降机</strong>
    <p>1、出厂年限超过8年《不含8年》</p>
    <p>2、传动系统磨损严重</p>
    <p>3、钢结构疲劳、变形、腐蚀等较严重</p>
    <strong>SS型施工升降机</strong>
    <p>1出厂年限超过5年（不含5年)</p>
    <strong>标准节</strong>
    <p> 1、立管壁厚最大减少量为出厂厚度的25%时</p>
    <strong>主要结构件(除标准节外)</strong>
    <p>1、 腐蚀深度达原厚度的10%</p>
    <strong>防坠安全器</strong>
    <p> 1、 有裂纹或自出厂之日起满5年</p>
    <strong>主要金属结构件《基础底架,导轨架标准节、吊笼骨架、驱动板等》</strong>
    <p> 1、 发生结构整体生稳</p>
    <h3>三、口述处置方法</h3>
    <strong>施工升降机电动机制动失灵</strong>
    <p> 1. 调节压力弹簧螺丝，使闸瓦刹车皮有足够的制动力才能可靠制动。</p>
    <strong>突然断电</strong>
    <p> 1.应立即关闭吊笼内控制箱的电源开关、切断电源，紧急情况下，可立即拉下极限开关臂杆切断电源，防止突然来电发生意外，然后与地面或楼层上有关人员联系，判明断电原因，按正确方法处置，严禁攀爬导轨架、附墙架、防护栏杆等进入楼层</p>
    <strong>对重出轨</strong>
    <p>对重有通行的轨道，防止其出轨，如果出轨了，就不能运行，一定要维修。</p>

    <strong>钢丝绳报废标准</strong>
    <p>1、出现整根绳股断裂;</p>
    <p>2、绳芯损坏，绳径显著减小;</p>
    <p>3、断丝紧靠一起形成局部聚集;</p>
    <p>4、弹性显著减小，明显地不易弯曲;</p>
    <p>5、钢丝绳直径减少7%或更多时(相对于公称直径，磨损);</p>
    <p>6、钢丝绳外部钢丝的腐蚀出现深坑，钢丝相当松弛;</p>
    <p>7、钢丝绳直径局部严重增大;有严重的内部腐蚀;</p>
    <p>8、钢丝绳发生笼状畸变;</p>
    <p>9、有严重的内部腐蚀;</p>
    <p>10、钢丝绳严重扭结;</p>
    <p>11、钢丝绳严重弯折。</p>
  </div>
  <div v-if="Object.keys(imgUrls).length">
    <img class="operation-2__img" v-for="(item, index) in imgKeys" :key="index" :src="imgUrls[`${item}.png`]" alt="">
  </div>
</div>
</template>

<script>
export default {
  name: "operation-2",
  props: {
    imgUrls: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      imgKeys: [
        'd541bf394588ecfd75809970ecfcd3e9',
        '27333fbefe4ac219721a055d814cbc2b',
        '43498c702a11dc66fcbab5694150cfc2',
        '09f216bcd38a1e645e70bcca68d26105',
        '131168963af3a2be959d9d349da74c8b',
        'eb1eab11565ec3e083dca012b70c10fa',
        '28f0d86fc061d6088169166dec0cfa03',
        'e58543b9b9f7eecc959122edf9b07d1f',
        '1645fe0f19dff88b344aec6083718705',
        '15ab5f3664fc4d8224b12678502829af',
        '9f21ba0d2c1253e8d3b9e590bd82df0c',
        '6cfe2fc4182c1550c1be9ab5f557ad3c',
        '4fb2ebc5e252da482b60da41a031fa47'
      ]
    }
  }
};
</script>

<style scoped>
.operation-2__wrapper {
  text-align: left;
  margin: 0 12px;
}
.operation-2__img {
  width: 100%;
}
h1 {
  font-size: 28px;
}

h3 {
  font-size: 22px;
}

strong {
  font-size: 20px;
}

p {
  font-size: 16px;
}
</style>
