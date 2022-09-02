<template>
  <div class="blogtype-container">
    <div class="search-box">
      <a-input-group compact>
        <a-select ref="selectRef" :default-value="defaultValue" placeholder="分类等级" @change="handleChange">
          <a-select-option v-for="item of levelList" :key="item"> {{ item }} </a-select-option>
        </a-select>
        <a-input style="width: 30%" placeholder="请输入要添加分类名称" v-model="inputValue" />
        <a-button type="primary" @click="handleAddType">添 加</a-button>
      </a-input-group>
    </div>
    <a-table :data-source="data" :columns="columns" bordered rowKey="id">
      <span slot="serial" slot-scope="text, record, index">{{ index + 1 }}</span>
      <div slot="action" slot-scope="text, record, index" class="btn-action">
        <a-button class="btn" type="primary" shape="circle" icon="edit" @click="() => handleEdit(record)"></a-button>
        <a-button type="danger" shape="circle" icon="delete" @click="() => handleDel(record)"></a-button>
      </div>
    </a-table>

    <a-modal
      title="编辑文章分类"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item label="分类名称">
          <a-input v-model="form.name" />
        </a-form-model-item>
        <a-form-model-item label="排序等级">
          <a-select v-model="form.order">
            <a-select-option v-for="item of levelList" :key="item"> {{ item }} </a-select-option>
          </a-select>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import { getBlogType, addBlogType, updateBlogType, findOneBlogType, deleteBlogType } from '@/api/blogType'
const options = []
const data = []
const columns = [
  {
    title: '序号',
    dataIndex: 'serialNumber',
    width: '100px',
    align: 'center',
    scopedSlots: {
      customRender: 'serial',
    },
  },
  {
    title: '博客类别',
    dataIndex: 'name',
    align: 'center',
  },
  {
    title: '文章数量',
    dataIndex: 'articleCount',
    align: 'center',
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: '200px',
    align: 'center',
    scopedSlots: {
      customRender: 'action',
    },
  },
]
const levelList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
export default {
  data() {
    return {
      inputValue: '',
      data,
      columns,
      options,
      level: 1,
      levelList,
      dataSource: [],
      defaultValue: 1,
      form: {
        name: '',
        order: 1,
      },
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      visible: false,
      confirmLoading: false,
    }
  },
  created() {
    this.getBlogType()
  },
  methods: {
    getBlogType() {
      getBlogType().then((res) => {
        this.data = res
      })
    },
    handleAddType() {
      const value = this.inputValue
      if (value) {
        const info = {
          name: value,
          order: this.level,
        }
        addBlogType(info).then((res) => {
          this.$message.loading('Action in progress..', 0.2).then(() => this.$message.success('添加成功', 0.5))
          this.getBlogType()
          this.inputValue = ''
          // this.$refs.selectRef.$el.innerText = this.defaultValue;
        })
      } else {
        this.$message.warn('请输入要添加分类名称', 0.5)
      }
    },
    handleChange(value) {
      this.level = value
    },
    handleDel(record) {
      const that = this
      this.$confirm({
        title: '确定要删除此条记录吗',
        onOk() {
          deleteBlogType(record.id).then((res) => {
            that.$message.loading('Action in progress..', 0.3).then(() => that.$message.success('删除成功', 0.5))
            that.getBlogType()
          })
        },
        onCancel() {},
      })
    },
    handleOk() {
      this.confirmLoading = true;
      updateBlogType(this.form).then(res => {
        // console.log(this.form);
        this.$message.success('更新成功', 0.5)
        this.getBlogType()
        this.confirmLoading = false;
        this.visible = false;
      })
    },
    handleEdit(record) {
      this.visible = true;
      findOneBlogType(record.id).then(res => {
        // console.log(res);
        this.form = res
      })
    },
    handleCancel() {
      this.visible = false
    },
  },
}
</script>

<style lang="less" scoped>
.blogtype-container {
  // text-align: center;
}
.search-box {
  margin-bottom: 20px;
}
.btn {
  margin-right: 20px;
}
</style>
