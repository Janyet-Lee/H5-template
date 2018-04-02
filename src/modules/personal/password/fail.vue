<template>
  <div class="m-personal-password-fail-container">
    <div class="top">
      <img src="../../../assets/despository/fail.png" alt="">
      <div>修改失败，请稍后再试或联系客服</div>
      <a href="tel:4000855560" class="phone">4000-8555-60</a>
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
.m-personal-password-fail-container {
  width: 100%;
  height: 100%;
  background-color: white;
  overflow: hidden;

  .top {
    margin-top: 50px;

    a.phone {
      border: none;
      outline: none;
      display: block;
      width: 50%;
      margin: auto;
      margin-top: 5px;
      font-size: 15px;
      color: #FF7E0E;
      text-align: center;
    }
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
    width: 100%;
  }

  .middle {
    font-size: 12px;
    color: #999999;
    text-align: center;
    width: 250px;
    margin: auto;
    margin-top: 20px;
    font-weight: lighter;
    line-height: 25px;
  }

  .link-container {
    width: 260px;
    margin: auto;
    margin-top: 25px;
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
}
</style>
