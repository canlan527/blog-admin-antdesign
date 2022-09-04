<template>
  <div class="edit-project-container">
    <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
      <h3>项目名称</h3>
      <a-form-model-item>
        <a-input v-model="form.name" placeholder="请添加项目名称"></a-input>
      </a-form-model-item>
      <h3>项目描述 (每一项描述以英文逗号分割)</h3>
      <a-form-model-item>
        <a-textarea
          v-model="form.desc"
          placeholder="请添加项目描述"
          :auto-size="{ minRows: 3, maxRows: 5 }"
        ></a-textarea>
      </a-form-model-item>
      <h3>项目链接</h3>
      <a-form-model-item>
        <a-input v-model="form.url" placeholder="请添加项目链接"></a-input>
      </a-form-model-item>
      <h3>github地址</h3>
      <a-form-model-item>
        <a-input v-model="form.github" placeholder="请添加项目github地址"></a-input>
      </a-form-model-item>
      <h3>预览图</h3>
      <a-form-model-item>
        <upload v-model="form.thumb"></upload>
      </a-form-model-item>
      <h3>排序</h3>
      <a-form-model-item>
        <a-select v-model="form.order" placeholder="分类等级">
          <a-select-option v-for="item of levelList" :key="item"> {{ item }} </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-button class="btn" type="primary" @click="handleSubmit">确认提交</a-button>
    </a-form-model>
  </div>
</template>

<script>
import { updateProject } from '@/api/project'
import Upload from '@/components/Upload'

const levelList = [1, 2, 3, 4, 5]
export default {
  components: { Upload },
  data() {
    return {
      levelList,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        name: '',
        desc: '',
        description: [],
        thumb: '',
        github: '',
        url: '',
        order: 1,
      },
    }
  },
  methods: {
    handleSubmit() {
      this.form.description = this.form.desc.split(',')
      updateProject(this.form).then(res => {
        this.$message.success('添加成功', 0.6);
        this.$router.push({
          name: 'project-list'
        })
      })
    },
  },
}
</script>

<style></style>
