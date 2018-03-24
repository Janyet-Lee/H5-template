<template>
  <div class="m-set-password">
    <div class="tips">为保障您的资金安全，请您设置登录密码</div>
    <div class="form-container">
      <div class="input-item">
        <img src="../../assets/login/lock-grey.png" alt="">
        <input v-model="password" type="password" placeholder="请设置登录密码">
        <span class="set-tips">8-20位的字符，必须包含数字加英文字母</span>
      </div>
      <div class="input-item">
        <img src="../../assets/login/lock-grey.png" alt="">
        <input v-model="confirmPass" type="password" placeholder="再次输入登录密码">
        <!-- <span class="set-tips">请确保和登录密码一致</span> -->
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
      confirmPass: '',
      phoneNumber: '',
      sending: false
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
      if (!this.$tool.regexp.pwd.test(this.password)) {
        Toast('请按小字提示设置密码');
        return false;
      }
      if (this.password !== this.confirmPass) {
        Toast('请确保两次密码一致');
        return false;
      }
      if (this.sending) {
        return false;
      }
      Indicator.open('设置中');
      const response = await loginApi.setPassword({
        password: this.password,
        confirm_password: this.confirmPass
      });
      if (response.data.status === 1) {
        window.location.href = '/';
      }
      Indicator.close();
    }
  }
};
</script>

<style lang="less">
.m-set-password {
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
