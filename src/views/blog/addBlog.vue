<template>
  <div class="addblog-container">
    <h3>文章标题</h3>
    <a-input placeholder="请输入文章标题" v-model="form.title"></a-input>
    <h3 class="mt">文章编辑</h3>
    <editor ref="toastuiEditor" height="800px"/>
    <h3 class="mt">文章描述</h3>
    <a-textarea v-model="form.description" placeholder="请添加文章描述" :auto-size="{ minRows: 3, maxRows: 5 }" />
    <h3 class="mt">文章头图</h3>
    <Upload v-model="form.thumb"></Upload>
    <h3 class="mt">文章分类</h3>
    <a-select placeholder="分类等级" v-if="blogType[0]" :default-value="blogType[0].name" @change="handleChange"  style="width: 200px">
      <a-select-option v-for="item of blogType" :key="item.id" > {{ item.name }} </a-select-option>
    </a-select>
    <br>
    <br>
    <a-button type="primary" @click="handleSubmit">发布文章</a-button>
  </div>
</template>

<script>
import { getBlogType } from '@/api/blogType';
import Upload from '@/components/Upload';
// import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/vue-editor';

export default {
  components: { Editor, Upload },
  data() {
    return {
      form:{},
      editor: Editor,
      blogType: [],
      imgUrl: '',// 图片在服务器上的地址
    }
  },
  created() {
    getBlogType().then(res => {
      this.blogType = res;
    })
  },
  methods: {
    handleChange(value) {
      this.form.categoryId = value;
    },
    handleSubmit() {
      this.form.toc = [];
      this.form.createDate = new Date().getTime();
      this.form.htmlContent = this.$refs.toastuiEditor.invoke('getHTML');
      this.form.markdownContent =  this.$refs.toastuiEditor.invoke('getMarkdown');
      console.log(this.form.thumb);
    },
    
  },
}
</script>

<style lang="less" scoped>
// @import '~@wangeditor/editor/dist/css/style.css';
.addblog-container {
  .mt {
    margin: 10px 0;
  }
}
</style>
