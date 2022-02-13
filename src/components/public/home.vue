<!--
 * @Author: godleisen
 * @Date: 2022-01-24 14:44:12
 * @LastEditTime: 2022-02-12 21:02:38
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue-app\src\components\menu.vue
-->
<template>
<!-- todo最底下的位置适配 -->
<div class="home-wrapper">
  <!-- <van-nav-bar title="标题" left-text="返回" left-arrow @click-left="handleClickBack"></van-nav-bar> -->
  <keep-alive>
    <MyCenter v-if="activePage"></MyCenter>
    <CourseList v-if="!activePage"></CourseList>
  </keep-alive>
  <!-- <div @click="handleHelloWorld">click</div> -->
  <van-tabbar style="height:60px" v-model="activePage" @change="handleActivePageChange">
    <van-tabbar-item class="home__tabbar-item" icon="newspaper-o">课程</van-tabbar-item>
    <van-tabbar-item class="home__tabbar-item" icon="user-circle-o">个人中心</van-tabbar-item>
  </van-tabbar>
</div>
</template>

<script>
import MyCenter from '@/components/person/myCenter.vue';
import CourseList from '@/components/course/list.vue';

export default {
  name: "home",
  components: {
    'MyCenter': MyCenter,
    'CourseList': CourseList
  },
  data() {
    return {
      activePage: 0,
    };
  },
  methods: {
    handleHelloWorld() {
      const app = this.$cloudbase
      app
        .callFunction({
          name: 'helloworld'
        })
        .then((e) => {
          console.log(e)
        })
    },
    handleActivePageChange(index) {
      sessionStorage.setItem("activePage", index)
    }
  },
  beforeRouteLeave(to, from, next) {
    console.log(this.activePage)
    sessionStorage.setItem("activePage", this.activePage)
    next()
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.activePage = parseInt(sessionStorage.getItem('activePage') || 0)
    })
  }
};
</script>

<style lang="less">
@tabbar-height: 60px;

.home-wrapper {
  padding-bottom: 50px;
}

.home__tabbar-item {
  font-size: 16px;
}
</style>
