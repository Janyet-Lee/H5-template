<template>
  <div class="m-login">
    <div class="top-container">
      <!-- <div @click="$router.push('/regist')" href="/user/register" class="regist-tips"> -->
      <a @click="$router.push('/regist')" href="/user/register" class="regist-tips">
        <img src="../../assets/login/red-bag.png" alt="">
        <span class="tip-word">立即注册领红包</span>
      </a>
      <div class="choice-container">
        <span @click="toValidLogin" :class="{'choice': true, 'chosen': !usePassword }">短信登录</span>
        <span @click="toPassLogin" :class="{'choice': true, 'chosen': usePassword }">账号登录</span>
      </div>
    </div>
    <transition name="slide-Y" mode="in-out">
      <div v-show="usePassword" class="password-login">
        <div class="form-container">
          <div class="input-item">
            <img class="input-logo phone" src="../../assets/login/phone.png" alt="">
            <input v-model="passwordLoginObj.phone" type="number" placeholder="请输入您的手机号码">
            <!-- <transition name="fade">
              <span v-show="checkObj.wrongPassPhone" class="login-tips">请输入正确的手机号</span>
            </transition> -->
          </div>
          <div class="input-item">
            <img class="input-logo lock" src="../../assets/login/lock.png" alt="">
            <input v-model="passwordLoginObj.password" type="password" placeholder="请输入登录密码">
            <!-- <transition name="fade">
              <span v-show="checkObj.wrongPassPassword" class="login-tips">8-20位的字符，必须包含数字加英文字母</span>
            </transition> -->
          </div>
          <!-- <div class="input-item has-code">
            <img class="input-logo validate" src="../../assets/login/validate.png" alt="">
            <input @keydown="checkLength" v-model="passwordLoginObj.code" type="number" placeholder="请输入验证码">
            <span @click="getCode" class="code">{{codeWord}}</span>
            <transition name="fade">
              <span v-show="checkObj.wrongPassCode" class="login-tips">请输入6位数字验证码</span>
            </transition>
          </div> -->
        </div>

        <button @click="loginByPass" class="login-button">登录</button>
        <a class="forget" href="/user/loginpasswordmodify">忘记密码</a>
      </div>
    </transition>

    <transition name="slide-Y" mode="in-out">
      <div v-show="!usePassword" class="validate-login">
        <div class="form-container">
          <div class="input-item">
            <img class="input-logo phone" src="../../assets/login/phone.png" alt="">
            <input v-model="validateLoginObj.phone" type="number" placeholder="请输入您的手机号码">
            <!-- <span v-show="checkObj.wrongValidPhone" class="login-tips">请输入正确的手机号</span> -->
          </div>
          <div class="input-item has-code">
            <img class="input-logo validate" src="../../assets/login/validate.png" alt="">
            <input v-model="validateLoginObj.code" type="number" placeholder="请输入验证码">
            <span @click="getCode" class="code">{{codeWord}}</span>
            <!-- <span v-show="checkObj.wrongValidCode" class="login-tips">请输入6位数字验证码</span> -->
          </div>
        </div>
        <button @click="loginByCode" class="login-button">登录</button>
      </div>

    </transition>

  </div>
</template>

<script>
import { Toast, Indicator } from 'mint-ui';
import loginApi from '../../api/login';
export default {
  name: 'login',
  data() {
    return {
      usePassword: false,
      codeWord: '获取验证码',
      sendingCode: false,
      smsId: '',
      checkObj: {
        wrongPassPhone: false,
        wrongPassPassword: false,
        wrongPassCode: false,
        wrongValidPhone: false,
        wrongValidCode: false
      },
      passwordLoginObj: {
        phone: '',
        password: '',
        code: ''
      },
      validateLoginObj: {
        phone: '',
        code: ''
      }
    };
  },
  mounted() {},
  methods: {
    toPassLogin() {
      if (this.usePassword) {
        return false;
      }
      this.usePassword = true;
      // window.clearInterval(window.counting);
      // this.codeWord = '获取验证码';
      if (this.validateLoginObj.phone && this.usePassword) {
        this.passwordLoginObj.phone = this.validateLoginObj.phone;
      }
    },
    toValidLogin() {
      if (!this.usePassword) {
        return false;
      }
      this.usePassword = false;
      if (this.passwordLoginObj.phone) {
        this.validateLoginObj.phone = this.passwordLoginObj.phone;
      }
      // window.clearInterval(window.counting);
      // this.codeWord = '获取验证码';
    },
    // checkLength(e) {
    //   if (this.passwordLoginObj.code.toString().length > 5) {
    //     e.preventDefault();
    //   }
    // },
    async loginByPass() {
      let check =
        (await this.validateFun(
          this.passwordLoginObj.phone,
          this.$tool.regexp.phone,
          '请输入正确手机号'
        )) &&
        (await this.validateFun(
          this.passwordLoginObj.password,
          this.$tool.regexp.pwdShort,
          // '请输入8-20位密码'
          '请输入6位以上字符'
        ));
      if (check) {
        Indicator.open('登录中');
        const { code, addCode } = await loginApi.login({
          mobile: this.passwordLoginObj.phone,
          password: this.passwordLoginObj.password,
          login_mode: 1,
          login_type: 1
        });
        if (code === 1) {
          switch (+addCode) {
          case 1:
            window.location.href = '/';
            break;
          case 2: // 需要短信登录
            this.$store.dispatch('setPhone', {
              phone: this.passwordLoginObj.phone
            });
            this.$router.push('/enterCode');
            break;
          }
        }
        Indicator.close();
      }
    },
    async loginByCode() {
      let check = await this.validateFun(
        this.validateLoginObj.phone,
        this.$tool.regexp.phone,
        '请输入正确手机号'
      );
      if (check) {
        if (!/^\d{6}$/g.test(this.validateLoginObj.code)) {
          Toast('请输入6位数字验证码');
          return false;
        }
        Indicator.open('登录中');
        const { code, addCode } = await loginApi.login({
          mobile: this.validateLoginObj.phone,
          code: this.validateLoginObj.code,
          login_mode: 1,
          login_type: 2,
          smLogId: this.smsId
        });
        if (code === 1) {
          switch (+addCode) {
          case 1:
            window.location.href = '/';
            break;
          case 3: // 需要密码登录
            this.$store.dispatch('setPhone', {
              phone: this.validateLoginObj.phone
            });
            this.$router.push('/enterPassword');
            break;

          case 4: // 需要设置密码登录
            this.$store.dispatch('setPhone', {
              phone: this.validateLoginObj.phone
            });
            this.$router.push('/setPassword');
            break;
          default:
            break;
          }
        } else {
          window.clearInterval(window.counting);
          this.codeWord = '获取验证码';
          this.sendingCode = false;
        }
        Indicator.close();
      }
    },
    async getCode() {
      if (this.sendingCode) {
        return false;
      }
      this.sendingCode = true;
      let check = this.usePassword
        ? await this.validateFun(
          this.passwordLoginObj.phone,
          this.$tool.regexp.phone,
          '请输入正确手机号'
        )
        : await this.validateFun(
          this.validateLoginObj.phone,
          this.$tool.regexp.phone,
          '请输入正确手机号'
        );
      if (!check) {
        return false;
      }
      Indicator.open('获取中');
      const response = await loginApi.getSmsCode({
        msgtype: 2,
        mobile: this.validateLoginObj.phone
      });
      Indicator.close();
      if (response.data.status === 1) {
        this.smsId = response.data.data;
        let start = 60;
        window.counting = window.setInterval(() => {
          if (start > 0) {
            this.codeWord = (start -= 1) + '秒';
          } else {
            this.codeWord = '重新获取';
            this.sendingCode = false;
            window.clearInterval(window.counting);
            this.coding = false;
          }
        }, 1000);
      } else {
        this.sendingCode = false;
        Toast('发送失败，请稍后再试');
      }
    },
    async validateFun(val, reg, message) {
      if (!reg.test(val)) {
        Toast(message);
      }
      return reg.test(val);
    }
  }
};
</script>


<style lang="less">
.m-login {
  height: 100%;
  width: 100%;
  overflow: hidden;
  .top-container {
    position: relative;
    background-size: cover;
    background-position: 50% 50%;
    background-image: url('../../assets/login/head_bg.png');
    height: 250px;
    width: 100%;

    .regist-tips {
      position: absolute;
      right: 0px;
      top: 14px;
      height: 30px;
      line-height: 30px;
      width: 130px;
      text-align: center;
      background-color: #f6ba24;
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;

      img {
        display: inline-block;
        width: 12px;
        height: auto;
        vertical-align: middle;
        margin-right: 1px;
      }

      .tip-word {
        display: inline-block;
        font-size: 12px;
        color: #ffffff;
        height: 20px;
        line-height: 20px;
        vertical-align: middle;
      }
    }

    .choice-container {
      position: absolute;
      width: 100%;
      bottom: 0px;
      font-size: 0px;
      .choice {
        display: inline-block;
        font-size: 14px;
        color: #ffffff;
        width: 50%;
        text-align: center;
        height: 45px;
        line-height: 45px;
        transition: all 0.5s;
        &.chosen {
          position: relative;
          &:after {
            content: '';
            position: absolute;
            bottom: 0px;
            left: 0px;
            right: 0px;
            width: 0px;
            height: 0px;
            margin: auto;
            border: 10px solid white;
            border-left-color: transparent;
            border-right-color: transparent;
            border-top-color: transparent;
          }
        }
      }
    }
  }

  .password-login,
  .validate-login {
    position: absolute;
    top: 250px;
    width: 100%;
  }

  .form-container {
    margin-top: 30px;
    overflow: hidden;

    .input-item {
      width: 280px;
      margin: auto;
      margin-bottom: 24px;
      height: 30px;
      line-height: 30px;
      position: relative;

      &.has-code {
        input {
          width: 150px;
        }

        span.code {
          display: inline-block;
          height: 35px;
          line-height: 35px;
          width: 105px;
          border: 1px solid #999;
          border-radius: 17.5px;
          font-size: 14px;
          color: #666666;
          text-align: center;
        }
      }
      .input-logo {
        display: inline-block;
        width: 12px;
        height: auto;
        vertical-align: middle;
        &.lock {
          width: 16px;
        }
        &.validate {
          width: 16px;
        }
        &.phone {
          position: relative;
          left: 2px;
        }
      }

      input {
        display: inline-block;
        border-bottom: 1px solid #f2f2f2;
        width: 260px;
        font-size: 14px;
        vertical-align: middle;
        text-indent: 20px;
      }

      span.login-tips {
        position: absolute;
        bottom: -30px;
        left: 50%;
        transform: translateX(-50%);
        width: 74%;
        font-size: 9px;
        color: #e84357;
      }

      ::-moz-placeholder {
        color: #ccc;
      }
      ::-webkit-input-placeholder {
        color: #ccc;
      }
      :-ms-input-placeholder {
        color: #ccc;
      }
    }
  }

  .login-button {
    display: block;
    overflow: hidden;
    background: #57bef5;
    border-radius: 8px;
    width: 210px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: white;
    margin: auto;
    font-size: 14px;
    margin-bottom: 35px;
    margin-top: 20px;
  }

  .forget {
    font-size: 12px;
    color: #999999;
    display: block;
    width: 100px;
    margin: auto;
    text-align: center;
  }
}
</style>
