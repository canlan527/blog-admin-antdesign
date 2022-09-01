<template>
  <div class="bloglist-container">
    <a-table ref="table" :columns="columns" :data-source="data" bordered rowKey="id">
      <span slot="indexRender" slot-scope="text, record, index">{{ index + 1 }}</span>
      <template slot="titleRender" slot-scope="text, record">
        <a-popover :title="text">
          <template slot="content">
            <img :style="imgThumb" :src="record.thumb_server_url" alt="">
          </template>
          <h1>{{text}}</h1>
        </a-popover>
      </template>
      <span slot="cateRender" slot-scope="text, record">{{ text.name }}</span>
      <span slot="dateRender" slot-scope="text, record">{{ formatDate(text) }}</span>
      <span slot="btnRender" slot-scope="text, record, index" class="btn-action">
        <a-button type="primary" shap="circle" icon="edit"></a-button>
      </span>
    </a-table>
  </div>
</template>

<script>
import { getBlogList } from '@/api/blog'
import formatDate from '@/utils/formatDate'
import {server_url} from '@/server_url'
const columns = [
  {
    title: '序号',
    dataIndex: 'serialNumber',
    scopedSlots: {
      customRender: 'indexRender',
    },
  },
  {
    title: '文章名称',
    dataIndex: 'title',
    scopedSlots: { customRender: 'titleRender'}
  },
  {
    title: '文章描述',
    dataIndex: 'description',
  },
  {
    title: '浏览数',
    dataIndex: 'scanNumber',
  },
  {
    title: '评论量',
    dataIndex: 'commentNumber',
  },
  {
    title: '所属分类',
    dataIndex: 'category',
    scopedSlots: { customRender: 'cateRender' },
  },
  {
    title: '创建日期',
    dataIndex: 'createDate',
    scopedSlots: { customRender: 'dateRender' },
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
      data: [],
    }
  },
  created() {
    this.getBlogList()
  },
  computed: {
    imgThumb() {
      return {
        width: '144px',
        // height: '100px'
      }
    }
  },
  methods: {
    formatDate,
    getBlogList() {
      getBlogList().then(({ rows, total }) => {
        this.data = rows
        this.total = total
        for(let i = 0; i < this.data.length; i++) {
          this.data[i].thumb_server_url = server_url + this.data[i].thumb;
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.bloglist-container {
  .table-img-thumb {
    width: 100px;
    height: 100px;
    object-fit: contain;
  }
}
</style>
