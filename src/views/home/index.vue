<template>
  <div class="home-container">
    <!-- <a-row>
      <a-button @click="handleAdd" type="primary" style="marginBottom: 20px" >新增一行</a-button>
    </a-row> -->
    <a-table ref="table" :columns="columns" :data-source="bannerlist" bordered rowKey="id">
      <span slot="indexRender" slot-scope="text, record, index">{{ index + 1 }}</span>
      <span slot="imgRender" slot-scope="record" class="img-span">
        <img :src="record" alt="" />
      </span>
      <span
        slot="btnRender"
        slot-scope="text, record, index"
        class="btn-action"
        @click="() => handleEdit(record, index)"
      >
        <a-button type="primary" shape="circle" icon="edit" />
      </span>
    </a-table>
    <x-modal ref="modal" :visible="visible" :form="form" @ok="handleOk" @cancel="handleCancel"></x-modal>
  </div>
</template>

<script>
import Upload from '@/components/Upload'
import { getBannerList, setBannerList } from '@/api/banner'
import XModal from './modal'
// import { server_url } from '@/server_url'
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
      form: {
      },
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
      // this.bannerlist.forEach((item) => {
      //   item.midImg = server_url + item.midImg
      //   item.bigImg = server_url + item.bigImg
      // })
      console.log(this.bannerlist)
    },
    handleAdd() {
      this.form = {}
      this.visible = true
      // this.bannerlist // 数据
      // bigImg: "http://localhost:7001/static/upload/2022-6-26-18-38-10-802-a13e6.jpg"
      // description: "白日的时光寂静缓慢，我们注视前方，努力不使其偏向"
      // id: "62b84025d57acf485151f633"
      // midImg: "http://localhost:7001/static/upload/2022-6-26-18-34-44-680-c2178.jpg"
      // title: "琥珀"
    },
    handleEdit(record, index) {
      // console.log(record, index)
      this.form = { ...record }
      // console.log(this.form)
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
      for (let i = 0; i < tempList.length; i++) {
        if (tempList[i].id === this.form.id) {
          tempList[i] = this.form
        }
      }
      await setBannerList(tempList)
      this.visible = false
      await this.fetchData()
      this.$message.success('修改成功')
    },
    handleCancel() {
      this.visible = false
    }
  },
}
</script>

<style lang="less" scoped>
.upload-container {
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
