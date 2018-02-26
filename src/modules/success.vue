<template>
  <div class="m-success">
    <img class="success-title" src="../assets/success/title.png" alt="">
    <img class="success-tips" src="../assets/success/tips.png" alt="">
    <button @click="$router.push('/')">我知道了</button>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style lang="less" >
.m-success {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-size: cover;
  background-position: 50% 50%;
  background-image: url('../assets/success/bg.png');

  .success-title {
    display: block;
    width: 210px;
    margin: 0 auto;
    margin-top: 60px;
  }

  .success-tips {
    display: block;
    width: 260px;
    margin: 0 auto;
    margin-top: 30px;
  }

  button {
    width: 250px;
    color: white;
    line-height: 40px;
    height: 50px;
    display: block;
    margin: 0 auto;
    margin-top: 30px;
    background-color: transparent;
    border: none;
    font-weight: bold;
    font-size: 17px;
    background-size: contain;
    background-image: url('../assets/home/btn.png');
    background-position: 50% 50%;
    background-repeat: no-repeat;
  }
}
</style>
