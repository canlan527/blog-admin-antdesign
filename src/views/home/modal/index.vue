<template>
  <a-modal
    :visible="visible"
    :title="title"
    ok-text="确认"
    cancel-text="取消"
    @ok="handleOk"
    @cancel="() => $emit('cancel')"
  >
    <a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-model-item label="标题" prop="title">
        <a-input v-model="form.title" placeholder="请输入标题" />
      </a-form-model-item>
      <a-form-model-item label="描述" prop="description">
        <a-input v-model="form.description" placeholder="请描述信息" />
      </a-form-model-item>
      <a-row>
        <a-col :span="10" push="2">
          <a-form-model-item label="中图" prop="midImg" :label-col="{ span: 6 }">
            <upload parentComp="home" v-model="form.midImg" v-if="visible"></upload>
          </a-form-model-item>
        </a-col>
        <a-col :span="10" push="2">
          <a-form-model-item label="大图" prop="bigImg" :label-col="{ span: 6 }">
            <upload parentComp="home" v-model="form.bigImg" v-if="visible"></upload>
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
    },
    // title: {
    //   type: String,
    //   default: ""
    // }
  },
  data() {
    let validateMidImage = (rule, value, callback) => {
      if (!this.form.midImg) {
        callback(new Error('请上传中图'))
      } else {
        callback()
      }
    }

    let validateBigImage = (rule, value, callback) => {
      if (!this.form.bigImg) {
        callback(new Error('请上传大图'))
      } else {
        callback()
      }
    }
    const rules = {
      title: [
        { required: true, message: '请输入标题', trigger: 'blur' },
        { min: 2, max: 8, message: '标题需要2-8个字', trigger: 'blur' },
      ],
      description: [
        { required: true, message: '请输入描述', trigger: 'blur' },
        { min: 10, message: '请输入至少10个字以上的描述', trigger: 'blur' },
      ],
      midImg: [{ validator: validateMidImage, trigger: 'change' }],
      bigImg: [{ validator: validateBigImage, trigger: 'change' }],
    }
    return {
      rules,
      title: '',
      labelCol: { span: 4 },
      wrapperCol: { span: 16 },
      previewVisible: false,
      fileList: [],
      previewImage: '',
    }
  },
  components: {
    Upload,
  },
  methods: {
    handleOk() {
      const that = this
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          that.$emit('submit')
        } else {
          return false;
        }
      })
    },
  },
}
</script>

<style></style>
