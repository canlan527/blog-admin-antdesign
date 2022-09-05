<template>
  <div class="page-header-index-wide">
    <a-card :bordered="false" :bodyStyle="{ padding: '16px 0', height: '100%' }" :style="{ height: '100%' }">
      <div class="account-settings-info-main">
        <a-form-model ref="ruleForm" :rules="rules" :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-form-model-item label="用户名">
            <a-input v-model="form.name"></a-input>
          </a-form-model-item>
          <a-form-model-item has-feedback label="旧密码" prop="oldLoginPwd">
            <a-input v-model="form.oldLoginPwd" type="password"></a-input>
          </a-form-model-item>
          <a-form-model-item has-feedback label="新密码" prop="loginPwd">
            <a-input v-model="form.loginPwd" type="password"></a-input>
          </a-form-model-item>
          <a-form-model-item has-feedback label="确认密码" prop="loginPwdConfirm">
            <a-input v-model="form.loginPwdConfirm" type="password"></a-input>
          </a-form-model-item>
          <a-form-model-item :wrapper-col="{ span: 4, offset: 2 }">
            <a-button class="btn" type="primary" @click="onSubmit('ruleForm')"> 修改 </a-button>
            <a-button style="margin-left: 10px" @click="resetForm"> 重置 </a-button>
          </a-form-model-item>
        </a-form-model>
        <br />
      </div>
    </a-card>
  </div>
</template>

<script>
import { updateInfo, getInfo } from '@/api/login'
import { baseMixin } from '@/store/app-mixin'
import { mapActions } from 'vuex'

export default {
  components: {
    // RouteView
  },
  mixins: [baseMixin],
  data() {
    let validateOldPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入旧密码'))
      } else {
        callback()
      }
    }

    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else {
        callback()
      }
    }
    let validatePass2 = (rule, value, callback) => {
      if (value !== this.form.loginPwd) {
        callback(new Error('两次密码不匹配，请检查正确后重新输入!'))
      } else {
        callback()
      }
    }
    const rules = {
      username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
      oldLoginPwd: [
        { required: true, message: '请输入旧密码', trigger: 'blur' },
        { validator: validateOldPass, trigger: 'change' },
      ],
      loginPwd: [
        { required: true, message: '请输入新密码', trigger: 'blur' },
        { validator: validatePass, trigger: 'change' },
      ],
      loginPwdConfirm: [
        { required: true, message: '请再次确认密码', trigger: 'blur' },
        { validator: validatePass2, trigger: 'change' },
      ],
    }

    return {
      rules,
      labelCol: { span: 2 },
      wrapperCol: { span: 4 },
      form: {
        id: '',
        loginId: '',
        name: '',
        oldLoginPwd: '',
        loginPwd: '',
        loginPwdConfirm: '',
      },
    }
  },
  created() {
    this.getInfo()
  },
  methods: {
    ...mapActions(['Logout']),
    getInfo() {
      getInfo().then((res) => {
        this.form = res
      })
    },
    onSubmit() {
      this.$refs.ruleForm.validate((valid, obj) => {
        if (valid) {
          if (this.form.name && this.form.loginPwd && this.form.oldLoginPwd) {
            console.log(this.form)
            updateInfo(this.form).then((res) => {
              if(res.id) { // 代表了成功的返回
                this.$message.success('设置成功', 0.5)
                this.resetForm()
                this.getInfo()
                // 路由跳转到登录页面
                this.Logout().then(res => {
                  this.$router.push({
                    path: `/login`
                  })
                })
              }else {
                this.$message.warn('密码错误，请重新输入')
                this.resetForm()
              }
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm() {
      this.$refs.ruleForm.resetFields()
      this.form = {
        name: '',
        oldLoginPwd: '',
        loginPwd: '',
        loginPwdConfirm: '',
      }
    },
  },
}
</script>

<style lang="less" scoped>
.account-settings-info-main {
  width: 100%;
  height: 100%;
  .btn-box {
    width: 200px;
    margin-left: 170px;
    .btn {
      margin-right: 12px;
    }
  }
  &.mobile {
    display: block;
  }
}
</style>
