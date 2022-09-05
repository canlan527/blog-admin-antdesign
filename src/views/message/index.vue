<template>
  <div class="message-container">
    <a-table
      rowKey="id"
      :columns="columns"
      :data-source="tableData"
      bordered
      :pagination="pagination"
      @change="handleChange"
    >
      <span slot="serialRender" slot-scope="text, record, index">{{ index + 1 + (pagination.current - 1) * pagination.defaultPageSize}}</span>
      <div slot="avatarRender" slot-scope="text">
        <img class="img" :src="text" alt="" />
      </div>
      <template slot="action" slot-scope="text, record">
        <a-button type="danger" shape="circle" icon="delete" @click="handleDel(record)"></a-button>
      </template>
    </a-table>
  </div>
</template>

<script>
import { getMessage, delMessage, addMessage } from '@/api/message'
import { server_url } from '@/server_url'
import formatDate from '@/utils/formatDate'
const columns = [
  {
    title: '序号',
    dataIndex: 'serialIndex',
    align: 'center',
    scopedSlots: {
      customRender: 'serialRender',
    },
  },
  {
    title: '头像',
    dataIndex: 'imgUrl',
    align: 'center',
    scopedSlots: {
      customRender: 'avatarRender',
    },
  },
  {
    title: '昵称',
    dataIndex: 'nickname',
    align: 'center',
  },
  {
    title: '留言内容',
    dataIndex: 'content',
    align: 'center',
    width: '40%',
  },
  {
    title: '留言日期',
    dataIndex: 'time',
    align: 'center',
  },
  {
    title: '操作',
    dataIndex: 'action',
    align: 'center',
    scopedSlots: {
      customRender: 'action',
    },
  },
]

export default {
  data() {
    return {
      columns,
      tableData: [],
      pagination: {
        current: 1,
        defaultPageSize: 10,
        total: 1,
      },
    }
  },
  created() {
    this.getMessageList()
  },
  methods: {
    getMessageList(page) {
      getMessage(page).then(({ rows, total }) => {
        this.tableData = rows
        this.pagination.total = total
        this.tableData.forEach((item) => {
          item.imgUrl = server_url + item.avatar
          item.time = formatDate(item.createDate)
        })
      })
    },
    handleDel(record) {
      const that = this
      this.$confirm({
        title: '确定要删除此项评论吗',
        content: '删除后数据不可恢复',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
          delMessage(record.id).then((res) => {
            that.$message.success('删除成功', 0.5)
            that.getMessageList()
          })
        },
        onCancel() {},
      })
    },
    handleChange(pagination) {
      this.pagination.current = pagination.current
      const page = pagination.current
      console.log(page);
      this.getMessageList(page)
    },
  },
}
</script>

<style lang="less" scoped>
.img {
  width: 56px;
  height: 56px;
  border-radius: 50%;
}
</style>
