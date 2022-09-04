<template>
  <div class="preview-modal-container" @click="handleImg">
    <div class="img-box" >
      <img :src="imgPath" alt="" @click.stop />
    </div>
  </div>
</template>

<script>
export default {
  props: ['imgPath'],
  data() {
    return {
    }
  },
  methods:{
    handleImg() {
      this.$emit('imghandle', false)
    }
  }
}
</script>

<style lang="less" scoped>
.preview-modal-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);
  .img-box {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 65%;
      z-index: 10;
    }
  }
}
</style>
