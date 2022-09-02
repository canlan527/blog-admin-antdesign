<template>
  <div class="addblog-container">
    <h3>文章标题</h3>
    <a-input placeholder="请输入文章标题" v-model="form.title"></a-input>
    <h3 class="mt">文章编辑</h3>
      <div style="border: 1px solid #ccc">
      <Toolbar style="border-bottom: 1px solid #ccc" :editor="editor" :defaultConfig="toolbarConfig" :mode="mode" />
      <Editor
        style="height: 500px; overflow-y: hidden"
        v-model="html"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="onCreated"
      />
    </div>
    <h3 class="mt">文章描述</h3>
    <a-textarea v-model="form.description" placeholder="请添加文章描述" :auto-size="{ minRows: 3, maxRows: 5 }" />
    <h3 class="mt">文章头图</h3>
    <Upload></Upload>
    <h3 class="mt">文章分类</h3>
    <a-select placeholder="分类等级" v-if="blogType[0]" :default-value="blogType[0].name" @change="handleChange"  style="width: 200px">
      <a-select-option v-for="item of blogType" :key="item.id" > {{ item.name }} </a-select-option>
    </a-select>
  </div>
</template>

<script>
import { getBlogType } from '@/api/blogType'
import Upload from '@/components/Upload'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

export default {
  components: { Editor, Toolbar, Upload },
  data() {
    return {
      form:{},
      editor: null,
      html: '<p>hello</p>',
      toolbarConfig: {},
      editorConfig: { placeholder: '请输入内容...' },
      mode: 'default', // or 'simple'
      blogType: [],
    }
  },
  created() {
    getBlogType().then(res => {
      this.blogType = res;
    })
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
    },
    handleChange(value) {
      console.log(value);
    }
  },
  mounted() {
    // 模拟 ajax 请求，异步渲染编辑器
    setTimeout(() => {
      this.html = '<p>模拟 Ajax 异步设置内容 HTML</p>'
    }, 1500)
  },
  beforeDestroy() {
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁编辑器
  },

}
</script>

<style lang="less" scoped>
@import '~@wangeditor/editor/dist/css/style.css';
.addblog-container {
  .mt {
    margin: 10px 0;
  }
}
</style>
