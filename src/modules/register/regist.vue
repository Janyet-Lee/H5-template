<template>
  <div class="m-regist">
    <div class="top-container">
      <!-- <div class="choice-container">
        <span @click="toPassregist" :class="{'choice': true, 'chosen': usePassword }">账号登录</span>
        <span @click="toValidregist" :class="{'choice': true, 'chosen': !usePassword }">短信登录</span>
      </div> -->
    </div>
    <!-- <transition name="fade" mode="out-in"> -->
    <div class="password-regist">
      <div :class="{'form-container': true, 'with-code': useInviteCode}">
        <div class="input-item">
          <input v-model="passwordregistObj.phone" type="number" placeholder="请输入您的手机号码">
        </div>
        <transition name="slide" mode="out-in">
          <div v-show="useInviteCode" class="input-item">
            <input v-model="passwordregistObj.password" type="text" placeholder="请输入邀请码">
          </div>
        </transition>
        <div @click="useInviteCode = !useInviteCode" class="change-tips">{{useInviteCode?'不使用邀请码':'我有邀请码'}}</div>
      </div>

      <button @click="registByPass" class="regist-button">注册领取现金红包</button>
      <a class="contract" href="/user/registpasswordmodify">注册即代表您已阅读并同意
        <span>《56金服注册协议》</span>
      </a>
    </div>
    <!-- </transition> -->
    <div v-show="showTips" class="bottom-tips">已有账号,
      <span @click="$router.push('/login')">立即登录</span>
    </div>
  </div>
</template>

<script>
import { Toast, Indicator } from 'mint-ui';
import registApi from '../../api/regist';
export default {
  name: 'regist',
  data() {
    return {
      codeWord: '获取验证码',
      sendingCode: false,
      useInviteCode: false,
      smsId: '',
      showTips: false,
      checkObj: {
        wrongPassPhone: false,
        wrongPassPassword: false,
        wrongPassCode: false,
        wrongValidPhone: false,
        wrongValidCode: false
      },
      passwordregistObj: {
        phone: '',
        password: '',
        code: ''
      },
      validateregistObj: {
        phone: '',
        code: ''
      }
    };
  },
  mounted() {
    let that = this;
    window.onresize = function() {
      var height = document.getElementsByClassName('m-regist')[0].clientHeight
      that.showTips = +height < 400 ? false : true;
    }
  },
  destroyed() {
    window.onresize = null;
  },
  methods: {
    showChangeTips() {
      this.showTips = !this.showTips;
    },
    checkLength(e) {
      if (this.passwordregistObj.code.toString().length > 5) {
        e.preventDefault();
      }
    },
    async registByPass() {
      this.$router.push('/regist/setPassword')
      // let check =
      //   (await this.validateFun(
      //     this.passwordregistObj.phone,
      //     this.$tool.regexp.phone,
      //     '请输入正确手机号'
      //   )) &&
      //   (await this.validateFun(
      //     this.passwordregistObj.password,
      //     this.$tool.regexp.pwdShort,
      //     // '请输入8-20位密码'
      //     '请输入6位以上字符'
      //   ));
      // if (check) {
      //   Indicator.open('登录中');
      //   const { code, addCode } = await registApi.regist({
      //     mobile: this.passwordregistObj.phone,
      //     password: this.passwordregistObj.password,
      //     regist_mode: 1,
      //     regist_type: 1
      //   });
      //   if (code === 1) {
      //     switch (+addCode) {
      //       case 1:
      //         window.location.href = '/';
      //         break;
      //       case 2: // 需要短信登录
      //         this.$store.dispatch('setPhone', {
      //           phone: this.passwordregistObj.phone
      //         });
      //         this.$router.push('/enterCode');
      //         break;
      //     }
      //   }
      //   Indicator.close();
      // }
    },
    async registByCode() {
      let check = await this.validateFun(
        this.validateregistObj.phone,
        this.$tool.regexp.phone,
        '请输入正确手机号'
      );
      if (check) {
        if (!/^\d{6}$/g.test(this.validateregistObj.code)) {
          Toast('请输入6位数字验证码');
          return false;
        }
        Indicator.open('登录中');
        const { code, addCode } = await registApi.regist({
          mobile: this.validateregistObj.phone,
          code: this.validateregistObj.code,
          regist_mode: 1,
          regist_type: 2,
          smLogId: this.smsId
        });
        if (code === 1) {
          switch (+addCode) {
            case 1:
              window.location.href = '/';
              break;
            case 3: // 需要密码登录
              this.$store.dispatch('setPhone', {
                phone: this.validateregistObj.phone
              });
              this.$router.push('/enterPassword');
              break;

            case 4: // 需要设置密码登录
              this.$store.dispatch('setPhone', {
                phone: this.validateregistObj.phone
              });
              this.$router.push('/setPassword');
              break;
            default:
              break;
          }
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
            this.passwordregistObj.phone,
            this.$tool.regexp.phone,
            '请输入正确手机号'
          )
        : await this.validateFun(
            this.validateregistObj.phone,
            this.$tool.regexp.phone,
            '请输入正确手机号'
          );
      if (!check) {
        return false;
      }
      Indicator.open('获取中');
      const response = await registApi.getSmsCode({
        msgtype: 2,
        mobile: this.validateregistObj.phone
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
.m-regist {
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

  .password-regist,
  .validate-regist {
    position: absolute;
    top: 250px;
    width: 100%;
  }

  .form-container {
    margin: 0 auto;
    margin-top: 30px;
    overflow: hidden;
    width: 308px;
    position: relative;
    height: 54px;
    transition: .5s ease;

    &.with-code {
      height: 108px;
    }

    .input-item {
      width: 308px;
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
        width: 100%;
        font-size: 14px;
        vertical-align: middle;
        text-indent: 20px;
      }

      span.regist-tips {
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

    .change-tips {
      font-size: 12px;
      color: #57bef5;
      position: absolute;
      right: 0px;
      bottom: 0px;
    }
  }

  .regist-button {
    display: block;
    overflow: hidden;
    background: #57bef5;
    border-radius: 8px;
    width: 240px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: white;
    margin: auto;
    font-size: 14px;
    margin-bottom: 19px;
    margin-top: 20px;
  }

  .contract {
    font-size: 12px;
    color: #999999;
    display: block;
    // width: 100px;
    margin: auto;
    text-align: center;
    span {
      color: #57bef5;
    }
  }

  .bottom-tips {
    position: absolute;
    // top: 650px;
    bottom: 24px;
    left: 0px;
    right: 0px;
    margin: auto;
    // margin-top: 307px;
    width: 50%;
    text-align: center;
    font-size: 14px;
    color: #cccccc;
    span {
      color: #57bef5;
    }
  }
}
</style>
