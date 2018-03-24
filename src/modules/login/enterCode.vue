<template>
  <div class="m-enter-code">
    <div class="tips">为保障您的账户登录安全，请获取验证码后登陆</div>
    <div class="form-container">
      <div class="input-item">
        <!-- <img src="../../assets/login/lock-grey.png" alt=""> -->
        <input v-model="code" type="number" placeholder="请输入验证码">
        <span @click="getCode" class="code">{{codeWord}}</span>
      </div>
      <button @click="confirm" class="confirm-button">确定</button>
    </div>
  </div>
</template>

<script>
import { Toast, Indicator } from 'mint-ui';
import loginApi from '@/api/login';

export default {
  data() {
    return {
      code: '',
      codeWord: '获取验证码',
      phoneNumber: '',
      coding: false,
      smsId: ''
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
      if (!this.$tool.regexp.validate.test(this.code)) {
        Toast('请输入6位数字验证码');
        return false;
      }
      Indicator.open('登录中');
      const { code } = await loginApi.login({
        mobile: this.phoneNumber,
        code: this.code,
        login_mode: 1,
        login_type: 2,
        smLogId: this.smsId
      });
      if (code === 1) {
        window.location.href = '/';
      } else {
        Indicator.close();
      }
    },
    async getCode() {
      if (this.coding) {
        return false;
      }
      this.coding = true;
      Indicator.open('获取中');
      const response = await loginApi.getSmsCode({
        msgtype: 2,
        mobile: this.phoneNumber
      });
      if (response.data.status === 1) {
        this.smsId = response.data.data;
        let start = 60;
        window.counting = window.setInterval(() => {
          if (start > 0) {
            this.codeWord = (start -= 1) + '秒';
          } else {
            this.codeWord = '重新获取';
            window.clearInterval(window.counting);
            this.coding = false;
          }
        }, 1000);
      } else {
        this.coding = false;
      }
      Indicator.close();
    }
  }
};
</script>

<style lang="less">
.m-enter-code {
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
        width: 150px;
        margin-left: 10px;
        border: none;
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

  span.code {
    display: inline-block;
    height: 20px;
    line-height: 20px;
    width: 100px;
    text-align: center;
    font-size: 14px;
    border-left: 1px solid #999;
    color: #666666;
    text-align: center;
  }
}
</style>
