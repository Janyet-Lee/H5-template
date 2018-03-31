<template>
  <div class="m-guide-passage">
    <div class="words">
      <p>1</p>
      <p>用户在投资时如果余额不足，则需要先行充值(余额足够则可直接支付，不足时跳转充值页面)</p>
    </div>
    <div class="words">
      <p>a.</p>
      <p>投资页充值，余额不足时投资按钮将转换为充值按钮，点击进入充值页面</p>
    </div>
    <img src="../../assets/guide/recharge-guide/1.png" alt="">
    <div class="words">
      <p>b.</p>
      <p>点击个人中心页充值按钮，进入充值页面</p>
    </div>
    <div class="words">
      <p>2.</p>
      <p>快捷充值，确认充值金额，点击确认充值跳转上饶银行充值页</p>
    </div>
    <img src="../../assets/guide/recharge-guide/2.png" alt="">
    <div class="words">
      <p>3.</p>
      <p>验证交易密码，完成充值</p>
    </div>
    <img src="../../assets/guide/recharge-guide/3.png" alt="">
    <div class="words">
      <p>4.</p>
      <p>充值完成</p>
    </div>
    <img src="../../assets/guide/recharge-guide/4.png" alt="">
  </div>
</template>

<script>
export default {};
</script>


<style lang="less">
.m-guide-passage {
  padding: 35px 37.5px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow: scroll;

  .words {
    margin-bottom: 25px;
  }

  div.words p {
    display: inline-block;
    font-size: 12px;
    color: #666666;
    vertical-align: top;
    text-align: justify;
    &:first-child {
      width: 3%;
    }
    &:last-child {
      width: 94%;
    }
  }

  img {
    display: block;
    width: 220px;
    margin: 26px auto;
  }
}
</style>

