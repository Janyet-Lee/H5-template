<template>
  <div class="m-withdraw-success-container">
    <div class="top">
      <img src="../../../assets/despository/success.png" alt="">
      <div>提现成功</div>
    </div>
    <div class="link-container">
      <a href="/">返回</a>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
.m-withdraw-success-container {
  width: 100%;
  height: 100%;
  background-color: white;
  overflow: hidden;

  .top {
    margin-top: 50px;
  }

  .top img {
    display: block;
    margin: auto;
    width: 50px;
    height: auto;
  }

  .top div {
    text-align: center;
    font-size: 15px;
    color: #999999;
    margin: auto;
    margin-top: 15px;
    padding-bottom: 10px;
    width: 65%;
  }

  .link-container {
    width: 260px;
    margin: auto;
    margin-top: 50px;
  }

  a {
    display: block;
    width: 100%;
    margin-bottom: 20px;
    background-color: #fd6327;
    color: white;
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    border-radius: 5px;
  }
}
</style>
