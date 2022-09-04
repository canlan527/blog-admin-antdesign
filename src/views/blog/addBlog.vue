<template>
  <div class="addblog-container">
    <ArticleEditor mode="add" />
  </div>
</template>

<script>
import ArticleEditor from '@/components/ArticleEditor'

export default {
  components: { ArticleEditor },
  data() {
    return {}
  },
}
</script>

<style lang="less" scoped>
.addblog-container {
  .mt {
    margin: 10px 0;
  }
}
</style>
