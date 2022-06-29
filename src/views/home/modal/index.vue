<template>
   <a-modal :visible="visible" title="请编辑信息" ok-text="确认" cancel-text="取消" @ok="()=>$emit('ok')" @cancel="()=>$emit('cancel')">
      <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item label="标题">
          <a-input v-model="form.title" placeholder="请输入标题" />
        </a-form-model-item>
        <a-form-model-item label="描述">
          <a-input v-model="form.description" placeholder="请描述信息" />
        </a-form-model-item>
        <a-row >
          <a-col :span="10" push="2">
            <a-form-model-item label="中图">
              <upload v-model="form.midImg"></upload>
            </a-form-model-item>
          </a-col>
          <a-col :span="10" push="2">
            <a-form-model-item label="大图">
              <upload v-model="form.bigImg"></upload>
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
    </a-modal>
</template>

<script>
import Upload from '@/components/Upload'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    form: {
      type: Object,
      default: () => {},
    }
  },
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 16 },
      previewVisible: false,
      fileList: [],
      previewImage: '',
    }
  },
  components: {
    Upload,
  }
}
</script>

<style>

</style>