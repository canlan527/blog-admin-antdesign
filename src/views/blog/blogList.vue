<template>
  <div class="bloglist-container">
    <a-table
      ref="table"
      :columns="columns"
      :data-source="data"
      bordered
      rowKey="id"
      :pagination="pagination"
      @change="handleChange"
    >
      <span slot="indexRender" slot-scope="text, record, index">{{ index + 1 + (pagination.current - 1)  * pagination.defaultPageSize }}</span>
      <template slot="titleRender" slot-scope="text, record">
        <a-popover :title="text">
          <template slot="content">
            <img :style="imgThumb" :src="record.thumb_server_url" alt="" />
          </template>
          <h1>{{ text }}</h1>
        </a-popover>
      </template>
      <span slot="cateRender" slot-scope="text, record">{{ text.name }}</span>
      <span slot="dateRender" slot-scope="text, record">{{ formatDate(text) }}</span>
      <span slot="btnRender" slot-scope="text, record, index" class="btn-action" >
        <a-button class="cell-btn" type="primary" shape="circle" icon="edit" ></a-button>
        <a-button type="danger" shape="circle" icon="delete" @click="() => handleDel(record)"></a-button>
      </span>
    </a-table>
  </div>
</template>

<script>
import { getBlogList, deleteOneBlog } from '@/api/blog'
import formatDate from '@/utils/formatDate'
import { server_url } from '@/server_url'
import Upload from '@/components/Upload'

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
    scopedSlots: { customRender: 'titleRender' },
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
      limit: 1,
      pagination: {
        current: 1,
        defaultPageSize: 10,
        total: 1,
      },
    }
  },
  created() {
    this.getBlogList()
  },
  computed: {
    imgThumb() {
      return {
        width: '124px',
        objectFit: 'cover',
      }
    },
  },
  components: {
    Upload,
  },
  methods: {
    formatDate,
    getBlogList(page) {
      return getBlogList(page).then(({ rows, total }) => {
        this.data = rows
        this.pagination.total = total

        for (let i = 0; i < this.data.length; i++) {
          this.data[i].thumb_server_url = server_url + this.data[i].thumb

        }
      })
    },
    handleChange(pagination, filters, sorter, { currentDataSource }) {
      console.log(pagination, filters, sorter, currentDataSource)
      this.pagination.current = pagination.current;
      const page = pagination.current;
      this.getBlogList(page)
    },
    handleDel(record) {  
      deleteOneBlog(record.id).then(res => {
        this.getBlogList()
      })
    }
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
  .btn-action {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .cell-btn {
    margin-right: 12px;
  }
}
</style>
