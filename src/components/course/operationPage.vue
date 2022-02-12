<!--
import { fileURLToPath } from 'url';
import { constants } from 'http2';
import { parse } from 'querystring';
 * @Author: your name
 * @Date: 2022-02-04 12:16:44
 * @LastEditTime: 2022-02-12 11:55:30
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue-app\src\components\course\operationPage.vue
-->
<template>
<div>
  <van-skeleton class="skeleton-class" title :row="13" v-if="!getImgDone" />
  <div v-else>
    <div v-if="courseIndex === 1">
      <img v-for="item in Object.values(fileUrls)" :key="item" class="course-operationpage__img-full" :src="item" alt="">
    </div>
    <div v-else-if="courseIndex === 2">
      <Operation-2 :imgUrls="fileUrls"></Operation-2>
    </div>
    <div v-else-if="courseIndex === 3">
      <Operation-3 :imgUrls="fileUrls"></Operation-3>
    </div>
    <div v-else-if="courseIndex === 4">
      <Operation-4 :imgUrls="fileUrls"></Operation-4>
    </div>
    <div v-else-if="courseIndex === 5">
      <Operation-5></Operation-5>
    </div>
    <div v-else-if="courseIndex === 6">
      <Operation-6></Operation-6>
    </div>
    <div v-else class="course-operationpage__shownull-words">
      <van-empty description="此题库暂无更多操作手册信息......" />
    </div>
  </div>
</div>
</template>

<script>
import operation_2 from './operation-2.vue';
import operation_3 from './operation-3.vue';
import operation_4 from './operation-4.vue';
import operation_5 from './operation-5.vue';
import operation_6 from './operation-6.vue';

export default {
  name: 'operationPage',
  components: {
    'Operation-2': operation_2,
    'Operation-3': operation_3,
    'Operation-4': operation_4,
    'Operation-5': operation_5,
    'Operation-6': operation_6
  },
  data() {
    return {
      courseIndex: 999,
      fileUrls: {},
      getImgDone: false
    }
  },
  methods: {
    getNameFromFileId(fileId) {
      return fileId.substr(fileId.match(`operation_${this.courseIndex}`).index + 12)
    }
  },
  async created() {
    this.courseIndex = parseInt(this.$route.query.sid)
    const app = this.$cloudbase
    const db = app.database()
    const _ = db.command

    let {
      data
    } = await db
      .collection('operationImg')
      .where({
        sid: _.eq(this.courseIndex)
      })
      .get()
    let fileIds = data.map(current => {
      return current.fileId
    })
    if (fileIds.length) {
      app
        .getTempFileURL({
          fileList: fileIds
        })
        .then((res) => {
          this.fileUrls = res.fileList.reduce((total, current) => {
            let key = this.getNameFromFileId(current.tempFileURL)
            total[key] = current.tempFileURL
            return total
          }, {})
          console.log(this.fileUrls)
          this.getImgDone = true
        });
    } else {
      this.getImgDone = true
    }
  }
}
</script>

<style scoped>
.course-operationpage__shownull-words {
  color: #999;
  font-size: 16px;
  margin-top: 50px;
}

.course-operationpage__img-full {
  width: 100%
}
</style>
