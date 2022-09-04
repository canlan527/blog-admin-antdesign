<template>
  <a-modal
    title="编辑项目信息"
    :visible="visible"
    :confirm-loading="confirmLoading"
    @ok="() => $emit('ok')"
    @cancel="() => $emit('cancel')"
    width="70%"
  >
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
        <upload parentComp="project" v-model="form.thumb" v-if="visible"></upload>
      </a-form-model-item>
      <h3>排序</h3>
      <a-form-model-item>
        <a-select v-model="form.order" placeholder="分类等级">
          <a-select-option v-for="item of levelList" :key="item"> {{ item }} </a-select-option>
        </a-select>
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
import Upload from '@/components/Upload'
import { server_url } from '@/server_url'

const levelList = [1, 2, 3, 4, 5]
export default {
  components: { Upload },
  props: {
    visible: {
      type: Boolean,
      default: () => false,
    },
    form: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      confirmLoading: false,
      levelList,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    }
  },
  mounted() {
    this.form.thumb = ''
  },
  watch: {
    'form.description': function (val) {
      if (val) {
        const temp = [...val]
        let str = ''
        temp.forEach((item) => {
          str += item
        })
        this.form.desc = str
      }
    },
    'form.thumb': {
      handler (val) {
        if(val) {
          console.log('edit: '+ val);
        }
      },
      deep: true
    }
      
    
  },
  methods: {},
}
</script>

<style></style>
