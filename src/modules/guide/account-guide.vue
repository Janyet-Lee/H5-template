<template>
  <div class="m-guide-passage">
    <div class="words">
      <p>1</p>
      <p>未开通存管账户的用户，登录后以及充值、购买等涉及资金的操作均会出现提示弹窗，点击【立即开通】</p>
    </div>
    <img src="../../assets/guide/account-guide/1.png" alt="">
    <div class="words">
      <p>2</p>
      <p>进入上饶银行存管开户页面填写个人信息</p>
    </div>
    <img src="../../assets/guide/account-guide/2.png" alt="">
    <div class="words">
      <p>3</p>
      <p>完成开户（为了您的财产安全，建议完成风险评测）</p>
    </div>
    <img src="../../assets/guide/account-guide/3.png" alt="">
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
    margin: 0px auto;
    margin-bottom: 25px;
  }
}
</style>

