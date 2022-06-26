<template>
  <div class="upload-container">
    <!-- <div>{{ title }}</div> -->
    <div class="clearfix">
      <a-upload
        list-type="picture-card"
        :file-list="fileList"
        class="avatar-uploader"
        action="/api/upload"
        :headers="headers"
        @preview="handlePreview"
        @change="handleChange"
      >
        <div v-if="fileList.length < 1">
          <a-icon type="plus" />
        </div>
      </a-upload>
      <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
        <img alt="example" style="width: 100%" :src="previewImage" />
      </a-modal>
    </div>
  </div>
</template>
<script>
import storage from 'store'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { server_url } from '@/server_url'
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}
export default {
  props: ['value'],
  data() {
    return {
      previewVisible: false,
      loading: false,
      previewImage: '',
      fileList: [],
      temp: {},
      _imgUrl: '',
    }
  },
  created() {
    this.generateFileList(this.value)
  },
  watch: {
    value(val) {
      if (val) {
        this.fileList = []
        this.generateFileList(val)
      }
    },
  },
  computed: {
    headers() {
      return {
        Authorization: 'Bearer ' + storage.get(ACCESS_TOKEN),
      }
    },
  },
  methods: {
    handleCancel() {
      this.previewVisible = false
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj)
      }
      this.previewImage = file.url || file.preview
      this.previewVisible = true
    },
    handleChange({ file, fileList, event }) {
      this.fileList = fileList
      console.log(file)
      if (file.response && file.response.code === 0) {
        this.handleSuccess(file.response)
      }
    },
    generateFileList(url) {
      this.temp.uid = Math.random() * 100000
      this.temp.name = 'image.png'
      this.temp.status = 'done'
      this.temp.url = url
      this.fileList.push(this.temp)
    },
    handleSuccess(res) {
      this._imgUrl = server_url + res.data
      this.$emit('input',  this._imgUrl)
    },
  },
}
</script>
<style lang="less" scoped>
/* you can make up upload button and sample style by using stylesheets */
.upload-container {
  width: 126px;
  height: 126px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.avatar-uploader > .ant-upload img {
  width: 128px;
  height: 128px;
}
.ant-upload-list-picture-card .ant-upload-list-item {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
