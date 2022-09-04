<template>
  <div class="editblog-container">
    <ArticleEditor mode="edit" />
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
.editblog-container {
  .mt {
    margin: 10px 0;
  }
}
</style>
