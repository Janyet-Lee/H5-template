<template>
  <div class="m-guide-passage">
    <div class="words">
      <p>1</p>
      <p>用户完成存管开户后即可开始投资。选择一个投资产品进行投资。</p>
    </div>
    <div class="words">
      <p>a.</p>
      <p>如果存管账户中有足够余额，则直接通过验证码的形式进行投资授权验证后以余额支付。</p>
    </div>
    <img src="../../assets/guide/investment-guide/1.png" alt="">
    <div class="words">
      <p>b.</p>
      <p>如果存管账户中余额不足，则需要先进行充值，充值之后再以余额形式完成投资。</p>
    </div>
    <img src="../../assets/guide/investment-guide/2.png" alt="">
    <div class="words">
      <p>2.</p>
      <p>进入上饶银行投资申请页面进行确认</p>
    </div>
    <img src="../../assets/guide/investment-guide/3.png" alt="">
    <div class="words">
      <p>3.</p>
      <p>完成投资</p>
    </div>
    <img src="../../assets/guide/investment-guide/4.png" alt="">
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

