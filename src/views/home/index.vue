<template>
  <div class="home-container">
    <a-table :columns="columns" :data-source="bannerlist" bordered rowKey="id">
        <span slot="indexRender" slot-scope="text, record, index">{{ index + 1 }}</span>
        <span slot="imgRender" slot-scope="record" class="img-span">
          <img :src="record" alt="">
        </span>
    </a-table>
  </div>
</template>

<script>
import { getBannerList } from '@/api/banner'
import {server_url} from '@/server_url'
// 构造表格表头
const columns = [
  {
    title: '序号',
    dataIndex: 'serialNumber',
    scopedSlots: { 
      customRender: 'indexRender'
    }
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
    scopedSlots: { customRender: 'imgRender'}
  },
  {
    title: '中图预览',
    dataIndex: 'bigImg',
    scopedSlots: { customRender: 'imgRender'}
  },
  {
    title: '操作',
    dataIndex: 'action',
    scopedSlots: { customRender: 'btnRender'}
  },
]
export default {
  data() {
    return {
      columns,
      bannerlist: [],
    }
  },
  async created() {
    await this.fetchData()
  },
  methods: {
    async fetchData() {
      this.bannerlist = await getBannerList()
      this.bannerlist.forEach(item => {
        item.midImg  = server_url + item.midImg;
        item.bigImg  = server_url + item.bigImg;
      })
      console.log(this.bannerlist)
    },
  },
}
</script>

<style lang="less" scoped>
.home-container{
  .img-span {
    display: inline-block;
    width: 100px;
    img {
      width: 100%;
    }
  }
}
</style>
