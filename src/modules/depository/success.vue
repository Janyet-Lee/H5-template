<template>
  <div class="m-cunguan-success-container">
    <div class="top">
      <img src="../../assets/despository/success.png" alt="">
      <div>恭喜！已开通银行存管账户</div>
    </div>
    <div class="middle">
      <div>为了向您提供更优质的服务，保护您的合法权益请您配合完成风险评测问卷</div>
    </div>
    <div class="link-container">
      <a href="/PingceActivity/index">开始评测</a>
      <a href="/">我是保守型，跳过评测</a>
    </div>
    <!-- <div class="tips">您可以随时通过首页广告再次进行评测</div> -->
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
.m-cunguan-success-container {
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
    border-bottom: 1px solid #d8d8d8;
    width: 65%;
  }

  .middle {
    font-size: 12px;
    color: #999999;
    text-align: center;
    width: 250px;
    margin: auto;
    margin-top: 20px;
    // font-weight: lighter;
    line-height: 25px;
  }

  .link-container {
    width: 260px;
    margin: auto;
    margin-top: 30px;
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
