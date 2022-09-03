<template>
  <div class="addblog-container">
    <h3>文章标题</h3>
    <a-input placeholder="请输入文章标题" v-model="form.title"></a-input>
    <h3 class="mt">文章编辑</h3>
    <editor :initialValue="viewerText" ref="toastuiEditor" height="800px" :options="editorOptions" />
    <h3 class="mt">文章描述</h3>
    <a-textarea v-model="form.description" placeholder="请添加文章描述" :auto-size="{ minRows: 3, maxRows: 5 }" />
    <h3 class="mt">文章头图</h3>
    <Upload v-model="form.thumb" ></Upload>
    <h3 class="mt">文章分类</h3>
    <a-select
      placeholder="分类等级"
      v-if="blogType[0]"
      :default-value="blogType[0].name"
      @change="handleChange"
      style="width: 200px"
    >
      <a-select-option v-for="item of blogType" :key="item.id"> {{ item.name }} </a-select-option>
    </a-select>
    <br />
    <br />
    <a-button type="primary" @click="handleSubmit">发布文章</a-button>
  </div>
</template>

<script>

import { getBlogType } from '@/api/blogType';
import { addBlog } from '@/api/blog';
import Upload from '@/components/Upload';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import { Editor } from '@toast-ui/vue-editor';
import '@toast-ui/editor/dist/i18n/zh-cn';
import '@toast-ui/editor/dist/toastui-editor.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js';

export default {
  components: { Editor, Upload },
  data() {
    return {
      form: {
        toc: [],
      },
      viewerText: '',
      editor: Editor,
      blogType: [],
      imgUrl: '', // 图片在服务器上的地址
      editorOptions: {
        language: 'zh-CN',
        plugins: [codeSyntaxHighlight]
      },
    }
  },
  created() {
    getBlogType().then((res) => {
      this.blogType = res
      this.form.categoryId = res[0].id
    })
  },
  methods: {
    handleChange(value) {
      this.form.categoryId = value
    },
    handleSubmit() {
      const obj = {
        toc: [],
        createDate:new Date().getTime(),
        htmlContent: this.$refs.toastuiEditor.invoke('getHTML'),
        markdownContent: this.$refs.toastuiEditor.invoke('getMarkdown'),
        thumb:this.form.thumb || '',
        categoryId: this.form.categoryId,
        title: this.form.title,
        description: this.form.description,
      }   
      if(obj.title && obj.htmlContent && obj.markdownContent && obj.categoryId) {
        addBlog(obj).then(res => {
          this.$router.push({
            path: '/blog/blog-list',
          })
        })
      } else {
        this.$message.warn('请填写完成表单')
      }
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
