<template>
  <div class="m-guide-passage">
    <div class="words">
      <p>1</p>
      <p>点击个人中心提现按钮</p>
    </div>
    <img src="../../assets/guide/withdraw-guide/1.png" alt="">
    <div class="words">
      <p>2.</p>
      <p>输入提现金额，确定提交</p>
    </div>
    <img src="../../assets/guide/withdraw-guide/2.png" alt="">
    <div class="words">
      <p>3.</p>
      <p>跳转上饶存管系统进行提现验证</p>
    </div>
    <img src="../../assets/guide/withdraw-guide/3.png" alt="">
    <div class="words">
      <p>4.</p>
      <p>提现完成</p>
    </div>
    <img src="../../assets/guide/withdraw-guide/4.png" alt="">
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

