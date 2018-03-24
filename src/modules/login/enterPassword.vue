<template>
  <div class="m-enter-password">
    <div class="tips">为保障您的账户登录安全，请输入您的登录密码</div>
    <div class="form-container">
      <div class="input-item">
        <img src="../../assets/login/lock-grey.png" alt="">
        <input v-model="password" type="password" placeholder="请输入登录密码">
      </div>
      <button @click="confirm" class="confirm-button">确定</button>
    </div>
  </div>
</template>

<script>
import { Toast, Indicator } from 'mint-ui';
import loginApi from '../../api/login';

export default {
  data() {
    return {
      password: '',
      phoneNumber: ''
    };
  },
  created() {
    if (!this.$store.state.loginModule.phoneNumber) {
      this.$router.replace('/login');
    }
    this.phoneNumber = this.$store.state.loginModule.phoneNumber;
  },
  methods: {
    async confirm() {
      // if (!this.$tool.regexp.pwd.test(this.password)) {
      //   Toast('密码为8-20位的字符');
      //   return false;
      // }
      if (this.password.length < 6) {
        Toast('密码为6为以上的字符');
        return false;
      }
      Indicator.open('登录中');
      const { code } = await loginApi.login({
        mobile: this.phoneNumber,
        password: this.password
      });
      if (code === 1) {
        Indicator.open('登录中');
        window.location.href = '/';
      }
      Indicator.close();
    }
  }
};
</script>

<style lang="less">
.m-enter-password {
  width: 100%;
  height: 100%;
  background-color: #fafafa;
  overflow: hidden;

  .tips {
    font-size: 11px;
    color: #666666;
    text-align: center;
    margin-top: 30px;
  }

  .form-container {
    margin-top: 52px;
    .input-item {
      position: relative;
      width: 275px;
      margin: auto;
      height: 40px;
      line-height: 40px;
      margin-bottom: 30px;
      background-color: white;
      border-radius: 22px;
      border: 1px solid #ccc;

      img {
        display: inline-block;
        vertical-align: middle;
        width: 16px;
        height: auto;
        margin-left: 19px;
        margin-right: 14px;
      }

      input {
        display: inline-block;
        vertical-align: middle;
        height: 20px;
        line-height: 20px;
        border-left: 1px solid #ccc;
        text-indent: 22px;
        font-size: 14px;
      }

      .set-tips {
        position: absolute;
        width: 100%;
        bottom: -33px;
        left: 0px;
        font-size: 9px;
        color: #ccc;
        text-align: center;
      }
    }
  }

  .confirm-button {
    width: 275px;
    height: 40px;
    line-height: 40px;
    margin: auto;
    display: block;
    background: #57bef5;
    border-radius: 8px;
    font-size: 14px;
    color: #ffffff;
  }
}
</style>
