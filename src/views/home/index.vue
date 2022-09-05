<template>
  <div class="home-container">
    <a-row>
      <a-button @click="handleAdd" type="primary" class="btn-add">新增一行</a-button>
    </a-row>
    <a-table ref="table" :columns="columns" :data-source="bannerlist" bordered rowKey="id">
      <span slot="indexRender" slot-scope="text, record, index">{{ index + 1 }}</span>
      <span slot="imgRender" slot-scope="record" class="img-span">
        <img :src="record" alt="" />
      </span>
      <span slot="btnRender" slot-scope="text, record, index" class="btn-action">
        <a-button type="primary" shape="circle" icon="edit" @click="() => handleEdit(record, index)" />
        <a-button type="danger" shape="circle" icon="delete" @click="() => handleDel(record, index)" />
      </span>
    </a-table>
    <x-modal ref="modal" :visible="visible" :form="form" @submit="handleOk" @cancel="handleCancel"></x-modal>
  </div>
</template>

<script>
import Upload from '@/components/Upload'
import { getBannerList, setBannerList } from '@/api/banner'
import XModal from './modal'
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
    dataIndex: 'midImg2',
    className: 'img-td',
    scopedSlots: { customRender: 'imgRender' },
  },
  {
    title: '中图预览',
    dataIndex: 'bigImg2',
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
      form: {},
    }
  },
  computed: {
    marginStyle() {
      return {
        marginRight: '12px',
      }
    },
  },
  components: {
    Upload,
    XModal,
  },
  async created() {
    await this.fetchData()
  },
  methods: {
    async fetchData() {
      this.bannerlist = await getBannerList()
      this.bannerlist.forEach((item) => {
        item.midImg2 = server_url + item.midImg
        item.bigImg2 = server_url + item.bigImg
      })
      console.log(this.bannerlist)
    },
    handleAdd() {
      this.form = {}
      this.visible = true
      if (this.$refs.modal) {
        this.$refs.modal.title = '请添加信息'
      }
    },
    handleEdit(record, index) {
      this.form = { ...record }
      this.$refs.modal.title = '请编辑信息'
      this.showModal()
    },
    showModal() {
      this.visible = true
    },
    hideModal() {
      this.visible = false
    },
    async handleOk() {
      const tempList = [...this.bannerlist]
      let tipText = '添加成功'
      if (this.form.id) {
        // 编辑 可以获取到id
        for (let i = 0; i < tempList.length; i++) {
          if (tempList[i].id === this.form.id) {
            tempList[i] = this.form
          }
        }
        tipText = '修改成功'
      } else {
        tempList.push(this.form)
      }

      await setBannerList(tempList)
      this.visible = false
      await this.fetchData()
      this.$message.success(tipText)
    },
    handleDel(record, index) {
      const that = this
      this.$confirm({
        title: '你确定要删除本条信息吗',
        content: '删除之后，数据不可恢复，确定删除吗',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        async onOk() {
          const tempList = that.bannerlist.filter((item, index) => {
            return item.id !== record.id
          })
          await setBannerList(tempList)
          that.visible = false
          await that.fetchData()
          that.$message.success('删除成功')
        },
        onCancel() {},
      })
    },
    handleCancel() {
      this.visible = false
    },
  },
}
</script>

<style lang="less" scoped>
.upload-container {
  margin-left: 10px;
}
.btn-add {
  margin-bottom: 20px;
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
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
}
</style>
