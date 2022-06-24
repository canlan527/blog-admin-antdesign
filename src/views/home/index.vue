<template>
  <div class="home-container">
    <a-table :columns="columns" :data-source="bannerlist" bordered rowKey="id">
      <span slot="indexRender" slot-scope="text, record, index">{{ index + 1 }}</span>
      <span slot="imgRender" slot-scope="record" class="img-span">
        <img :src="record" alt="" />
      </span>
      <span
        slot="btnRender"
        slot-scope="text, record, index"
        class="btn-action"
        @click="() => editBanner(record, index)"
      >
        <a-button type="primary" shape="circle" icon="edit" />
      </span>
    </a-table>
    <a-modal v-model="visible" title="请编辑信息" ok-text="确认" cancel-text="取消" @ok="hideModal">
      <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item label="标题">
          <a-input v-model="form.fieldA" placeholder="请输入标题" />
        </a-form-model-item>
        <a-form-model-item label="描述">
          <a-input v-model="form.fieldB" placeholder="请描述信息" />
        </a-form-model-item>
        <a-row >
          <a-col :span="10" push="2">
            <a-form-model-item label="中图">
              <upload :imageUrl="form.midImg"></upload>
            </a-form-model-item>
          </a-col>
          <a-col :span="10" push="2">
            <a-form-model-item label="大图">
              <upload :imageUrl="form.bigImg"></upload>
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import Upload from '@/components/Upload'
import { getBannerList } from '@/api/banner'
import { server_url } from '@/server_url'
// 构造表格表头
const columns = [
  {
    title: '序号',
    dataIndex: 'serialNumber',
    scopedSlots: {
      customRender: 'indexRender',
    },
  },
  {
    title: '标题',
    dataIndex: 'title',
  },
  {
    title: '描述',
    dataIndex: 'description',
  },
  {
    title: '中图预览',
    dataIndex: 'midImg',
    className: 'img-td',
    scopedSlots: { customRender: 'imgRender' },
  },
  {
    title: '中图预览',
    dataIndex: 'bigImg',
    scopedSlots: { customRender: 'imgRender' },
  },
  {
    title: '操作',
    dataIndex: 'action',
    scopedSlots: { customRender: 'btnRender' },
  },
]
export default {
  data() {
    return {
      columns,
      bannerlist: [],
      visible: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 16 },
      form: {
        id: '',
      },
      previewVisible: false,
      fileList: [],
      previewImage: '',
    }
  },
  computed: {
    marginStyle() {
      return {
        marginRight: '12px'
      }
    }
  },
  components: {
    Upload,
  },
  async created() {
    await this.fetchData()
  },
  methods: {
    async fetchData() {
      this.bannerlist = await getBannerList()
      this.bannerlist.forEach((item) => {
        item.midImg = server_url + item.midImg
        item.bigImg = server_url + item.bigImg
      })
      console.log(this.bannerlist)
    },
    editBanner(record, index) {
      console.log(record, index)
      this.form = { ...record }
      console.log(this.form)
      this.showModal()
    },
    showModal() {
      this.visible = true
    },
    hideModal() {
      this.visible = false
    },
    confirm() {
      this.$confirm({
        title: 'Confirm',
        content: 'Bla bla ...',
        okText: '确认',
        cancelText: '取消',
      })
    },
  },
}
</script>

<style lang="less" scoped>
/deep/ .upload-container {
    margin-left: 10px;
  }
.home-container {
  
  .img-span {
    display: inline-block;
    width: 100px;
    img {
      width: 100%;
    }
  }
  .btn-action {
    display: inline-block;
  }
  
}
</style>
