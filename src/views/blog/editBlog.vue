<template>
  <div class="editblog-container">
    <h3>文章标题</h3>
    <a-input placeholder="请输入文章标题" v-model="form.title"></a-input>
    <h3 class="mt">文章编辑</h3>
    <editor ref="toastuiEditor" height="800px" :options="editorOptions" />
    <h3 class="mt">文章描述</h3>
    <a-textarea v-model="form.description" placeholder="请添加文章描述" :auto-size="{ minRows: 3, maxRows: 5 }" />
    <h3 class="mt">文章头图</h3>
    <Upload v-model="form.thumb"></Upload>
    <h3 class="mt">文章分类</h3>
    <a-select
      placeholder="分类等级"
      :value="form.categoryId"
      @change="handleChange"
      style="width: 200px"
    >
      <a-select-option v-for="item of blogType" :key="item.id"> {{ item.name }} </a-select-option>
    </a-select>
    <br />
    <br />
    <a-button type="primary" @click="handleSubmit">确认修改</a-button>
  </div>
</template>

<script>
import { getBlogType } from '@/api/blogType'
import { updateBlog, findOneBlog } from '@/api/blog'
import Upload from '@/components/Upload'
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
      id: null,
      form: {
        title: '',
        description: '',
        toc: [],
        categoryId: '',
        select: ''
      },
      selectName: '',
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
    this.id = this.$route.params.id
    getBlogType().then((res) => {
      this.blogType = res
    })
    findOneBlog(this.id).then((res) => {
      this.form.title = res.title
      this.form.categoryId = res.category.id
      console.log(this.form.categoryId);
      this.form.description = res.description
      this.form.title = res.title
      this.form.thumb = res.thumb
      this.$refs.toastuiEditor.invoke('setHTML', res.htmlContent)
    })
  },
  methods: {
    handleChange(value) {
      this.$forceUpdate();
      this.form.categoryId = value;
    },
    handleSubmit() {
      const obj = {
        toc: [],
        createDate: new Date().getTime(),
        htmlContent: this.$refs.toastuiEditor.invoke('getHTML'),
        markdownContent: this.$refs.toastuiEditor.invoke('getMarkdown'),
        thumb: this.form.thumb || '',
        categoryId: this.form.categoryId,
        title: this.form.title,
        description: this.form.description,
      }
      if (obj.title && obj.htmlContent && obj.markdownContent && obj.categoryId) {
        updateBlog({ id: this.id, data: obj }).then((res) => {
          this.$router.push({
            path: '/blog/blog-list',
          })
          this.$message.success('修改成功', 0.5)
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
.editblog-container {
  .mt {
    margin: 10px 0;
  }
}
</style>
