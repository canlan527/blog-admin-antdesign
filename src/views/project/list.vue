<template>
  <div class="project-list-container">
    <a-table :data-source="tableData" :columns="columns" rowKey="id" bordered :pagination="false">
      <span slot="indexRender" slot-scope="text, record, index">{{ index + 1 }}</span>
      <div slot="thumbRender" slot-scope="text, record">
        <img class="img" :src="text" alt="" @click="handleThumb(text)" />
      </div>
      <span slot="actionRender" slot-scope="text, record">
        <a-button class="btn btn-github" shape="circle" icon="github" @click="() => goToGithub(record)"></a-button>
        <a-button class="btn" type="primary" shape="circle" icon="edit" @click="() => handelEdit(record)"></a-button>
        <a-button type="danger" shape="circle" icon="delete" @click="() => handleDel(record)"></a-button>
      </span>
    </a-table>
    <ProviewModal :imgPath="path" @imghandle="handlePreview" v-if="visible"></ProviewModal>
    <EditModal :form="editForm" :visible="edit" @ok="handleOk" @cancel="() => this.edit = false"></EditModal>
  </div>
</template>

<script>
import ProviewModal from './modal/previewModal.vue'
import EditModal from './modal/edit.vue'
import { getProjectList, deleteProject, updateProject } from '@/api/project'
import { server_url } from '@/server_url'
const columns = [
  {
    title: '序号',
    dataIndex: 'serialNumber',
    align: 'center',
    scopedSlots: {
      customRender: 'indexRender',
    },
  },
  {
    title: '项目名称',
    dataIndex: 'name',
    align: 'center',
  },
  {
    title: '项目描述',
    dataIndex: 'description',
    align: 'center',
  },
  {
    title: '预览图',
    dataIndex: 'imgUrl',
    align: 'center',
    scopedSlots: {
      customRender: 'thumbRender',
    },
  },
  {
    title: '操作',
    dataIndex: 'action',
    align: 'center',
    width: '214px',
    scopedSlots: {
      customRender: 'actionRender',
    },
  },
]
export default {
  components: { ProviewModal, EditModal },
  data() {
    return {
      visible: false,
      edit: false,
      tableData: [],
      columns,
      editForm: {},
    }
  },
  created() {
    this.getProjectList()
  },
  methods: {
    getProjectList() {
      return getProjectList().then((res) => {
        this.tableData = res
        this.tableData.forEach((item) => {
          item.imgUrl = server_url + item.thumb
        })
      })
    },
    handleThumb(url) {
      this.path = url
      this.visible = true
    },
    handlePreview(value) {
      this.visible = value
    },
    goToGithub(record) {
      window.open(record.github, '_blank')
    },
    handelEdit(record) {
      this.edit = true;
      this.editForm = {...record};
      // this.$router.push({
      //   name: '',
      //   params: {
      //     id: record.id,
      //   },
      // })
    },
    handleDel(record) {
      const that = this
      this.$confirm({
        title: '确定要删除此项目吗',
        content: '删除之后不可恢复',
        okText: '确认',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
          deleteProject(record.id).then((res) => {
            that.$message.success('删除成功', 0.5)
            that.getProjectList()
          })
        },
        onCancel() {},
      })
    },
    handleOk() {
      this.edit = false;
      // console.log(this.editForm);
       this.editForm.description = this.editForm.desc.split(',')
      const obj = {...this.editForm}

      updateProject(obj.id, obj).then(res => {
        this.getProjectList()
        this.$message.success('修改成功', 0.5)
      })
    },
  },
}
</script>

<style lang="less" scoped>
.project-list-container {
  .img {
    width: 220px;
    height: 120px;
  }
  .btn {
    margin-right: 12px;
  }
  .btn-github {
    background: #424242;
    color: #fff;
  }
}
</style>
