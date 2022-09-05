<template>
  <div class="about-container">
    <h3>关于我： 设置超链</h3>

    <a-input v-model="value" style="width: 50%" :disabled="disabled"></a-input>
    <br>
    <br>
    <a-button type="primary" @click="handleClick">
      {{text}}
    </a-button>
  </div>
</template>

<script>
import {getAbout, setAbout} from '@/api/about'

export default {
  data() {
    return {
      value: '',
      disabled: true,
      text: '设置超链',
    }
  },
  created() {
    this.getAbout()
  },
  methods: {
    getAbout() {
      getAbout().then(res => {
        console.log(res);
        this.value = res;
      })
    },
    handleClick() {
      if(this.disabled) {
        this.disabled = false;
        this.text = '提交链接';
        
      } else {
        if(this.value) {
          setAbout({url: this.value}).then(res => {
            this.$message.success('设置成功',0.5);
            this.disabled = true;
            this.text = '设置超链'
          })
        } else {
          this.$message.warn('请填入超链',0.5);
          this.disabled = false;
        }
        this.disabled = true;
      }
    }
  }
}
</script>

<style>

</style>
