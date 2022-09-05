<template>
  <div class="personal-setting-container">
    <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
      <h3>头像</h3>
      <a-form-item>
        <Upload  v-model="form.avatar" :disabled="disabled" />
      </a-form-item>
      <h3>网站标题</h3>
      <a-form-item>
        <a-input v-model="form.siteTitle" :disabled="disabled"></a-input>
      </a-form-item>
      <h3>网站图标</h3>
      <a-form-item>
        <Upload  v-model="form.favicon" :disabled="disabled"/>
      </a-form-item>
      <h3>github 账号</h3>
      <a-form-item>
        <a-input v-model="form.githubName" :disabled="disabled"></a-input>
      </a-form-item>
      <h3>github 地址</h3>
      <a-form-item>
        <a-input v-model="form.github" :disabled="disabled"></a-input>
      </a-form-item>
      <h3>QQ号</h3>
      <a-form-item>
        <a-input v-model="form.qq" :disabled="disabled"></a-input>
      </a-form-item>
      <h3>QQ二维码</h3>
      <a-form-item>
        <Upload  v-model="form.qqQrCode" :disabled="disabled"/>
      </a-form-item>
      <h3>邮箱</h3>
      <a-form-item>
        <a-input v-model="form.mail" :disabled="disabled"></a-input>
      </a-form-item>
      <h3>微信号</h3>
      <a-form-item>
        <a-input v-model="form.weixin" :disabled="disabled"></a-input>
      </a-form-item>
      <h3>微信二维码</h3>
      <a-form-item>
        <Upload  v-model="form.weixinQrCode" :disabled="disabled"/>
      </a-form-item>
      <h3>备案号</h3>
      <a-form-item>
        <a-input v-model="form.icp" :disabled="disabled"></a-input>
      </a-form-item>
    </a-form-model>
    <br>
    <a-button type="primary" @click="handleSubmit">{{btnText}}</a-button>
  </div>
</template>

<script>
import { getSettings, saveSettings } from '@/api/settings'
import { server_url } from '@/server_url'
import Upload from '@/components/Upload'

export default {
  components: {Upload},
  data() {
    return {
      disabled:true,
      btnText: '编辑信息',
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        avatar:'',
        siteTitle:'',
        favicon:'',
        githubName:'',
        github: '',
        qq: '',
        qqQrCode:'',
        mail: '',
        weixin: '',
        weixinQrCode: '',
        icp: '',
      },
    }
  },
  created() {
    this.getSettings()
  },
  methods: {
    getSettings() {
      getSettings().then(res => {
        this.form = res;
        
      })
    },
    handleSubmit() {
      if(this.disabled) {
        this.btnText = '提交信息';
        this.disabled = false;
      }else {
        saveSettings(this.form).then(res => {
          this.disabled = true;
          this.btnText = '编辑信息';
        })
      }
      
    }
  },
}
</script>

<style>

</style>
