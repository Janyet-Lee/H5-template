<template>
  <div class="m-regist-setpassword">
    <transition name="fade-rotate-Y" mode="out-in">
      <div @click="hasSend = !hasSend" v-show="!hasSend" class="tips">为保障您的资金安全，请您设置登录密码</div>
    </transition>
    <transition name="fade-rotate-Y" mode="out-in">
      <div @click="hasSend = !hasSend" v-show="hasSend" class="send-tips-container">
        <div class="send-tips">已发送短信验证码到</div>
        <div class="phone-number">159****7644</div>
      </div>
    </transition>
    <div class="form-container">
      <div class="input-item">
        <input v-model="code" type="number" placeholder="请输入验证码">
        <span @click="getCode" class="code">{{codeWord}}</span>
      </div>
      <div class="input-item">
        <input v-model="password" :type="inputType" placeholder="请设置登录密码">
        <transition name="fade-rotate-X" mode="out-in">
          <img @click="eyeOpen = !eyeOpen" v-show="eyeOpen" class="eye-img" src="../../assets/regist/eye-open.png" alt="">
        </transition>
        <transition name="fade-rotate-X" mode="out-in">
          <img @click="eyeOpen = !eyeOpen" v-show="!eyeOpen" class="eye-img" src="../../assets/regist/eye-close.png" alt="">
        </transition>
        <span class="set-tips">8-20位的字符，必须包含数字加英文字母</span>
      </div>
      <button @click="confirm" class="confirm-button">完成注册</button>
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
      sending: false,
      hasSend: false,
      codeWord: '获取验证码',
      eyeOpen: false,
      inputType: 'password'
    };
  },
  created() {
    // if (!this.$store.state.loginModule.phoneNumber) {
    //   this.$router.replace('/login');
    // }
    // this.phoneNumber = this.$store.state.loginModule.phoneNumber;
  },
  watch: {
    eyeOpen() {
      this.inputType = this.eyeOpen ? 'text' : 'password';
    }
  },
  methods: {
    async confirm() {
      if (!this.$tool.regexp.pwd.test(this.password)) {
        Toast('请正确设置密码');
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
    },
    async getCode() {
      if (this.coding) {
        return false;
      }
      this.coding = true;
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
    }
  }
};
</script>

<style lang="less">
.m-regist-setpassword {
  width: 100%;
  height: 100%;
  background-color: #fafafa;
  overflow: hidden;

  .tips {
    font-size: 11px;
    color: #666666;
    text-align: center;
    top: 45px;
    left: 0px;
    right: 0px;
    margin: auto;
    position: absolute;
  }

  .send-tips-container {
    position: absolute;
    top: 30px;
    left: 0px;
    right: 0px;
    margin: auto;

    .send-tips {
      font-size: 11px;
      color: #666666;
      text-align: center;
      margin: auto;
    }

    .phone-number {
      font-size: 23px;
      color: #333333;
      text-align: center;
      margin-top: 14px;
    }
  }

  .form-container {
    margin-top: 121px;
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

      input {
        display: inline-block;
        vertical-align: middle;
        height: 20px;
        border-left: 1px solid #ccc;
        text-indent: 22px;
        font-size: 14px;
        margin-left: 6px;
        box-sizing: border-box;
        border-left: none;
      }

      .eye-img {
        width: 20px;
        height: auto;
        position: absolute;
        right: 20px;
        top: 0px;
        bottom: 0px;
        margin: auto;
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

      span.code {
        position: absolute;
        height: 20px;
        line-height: 20px;
        width: 100px;
        right: 0px;
        top: 0px;
        bottom: 0px;
        margin: auto;
        text-align: center;
        font-size: 14px;
        border-left: 1px solid #999;
        color: #666666;
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
