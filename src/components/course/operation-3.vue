<!--
 * @Author: your name
 * @Date: 2022-02-04 14:25:53
 * @LastEditTime: 2022-02-11 11:33:27
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue-app\src\components\course\course-3.vue
-->
<template>
<div>
  <div v-if="Object.keys(imgUrls).length">
    <img class="operation-3__img" v-for="(item, index) in imgKeys" :key="index" :src="imgUrls[`${item}.png`]" alt="">
  </div>
</div>
</template>

<script>
export default {
  name: 'operation-3',
  props: {
    imgUrls: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      imgKeys: [
        '1c9939961349d53ace6fdb9535759dc4',
        'd57ab5f0abcafc8af9b29735737a2e44',
        '27f9a1129eda18dc4b2a73c33ec277ed',
        '13b4c0ee28805d5e5e6440cc1dc87bd6',
        '7d5dd871c23a63a449ee77e6c6fe45ea',
        'ccd401657f3785395959e69df429edb1',
        '6cad518341662a75d2aa40760226ca84',
        '80d8d84ebfc270e962590aa098ceb9b6',
        '4e4ca5621527f3665b913cd766a08631',
        'b9807d113094b377706a2b5ebb16882c',
        '10c7f4f6baf27caa38c84eb402845938',
        '2abc4c201396bbbc0d3d74739ba1b2fb',
        '1ee9df647d70bb17f06e9598d659cc9b',
        '9f5b66c6b67d46b93035750217e65c96',
        '28aa4249761d52ffc0fe33fa6f07f1fc',
        '6e6ea2de6af56e571fc80a76fceba4d3',
        '0007ff9f21040a4d7ec7f2e3139a50e1',
        '751b37660022470b8fdea0c2157501f8',
        'd632ebfc99ee1880eadf530c2967d63c',
        'fed975fbd40b11720c7b289f0f117d91',
        '20f22bf5028444ecd4015dc693d051dd',
        '80a79bf036f8d86e08f6174d81b196a0',
        '5577f7f1ea619ccd37a31091e49146ca'
      ]
    }
  }
}
</script>
<style scoped>
.operation-3__img {
  width: 100%;
}


</style>

