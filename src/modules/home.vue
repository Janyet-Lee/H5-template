<template>
  <div class="m-home">
    <img class="bg-img" src="../assets/home/bg.png" alt="">
    <div class="redbag-container">
      <p class="amount-display">抵用后投资金额{{actualPayMoney}}元</p>
      <img class="title-img" src="../assets/home/redbag-title.png" alt="">

      <img v-show="money<5000 || !productId" class="redbag" src="../assets/home/0.png" alt="">
      <img v-show="productId === 4 && money>=5000 && money<10000" class="redbag" src="../assets/home/5.png" alt="">
      <!-- <img v-show="money<10000 && money >= 5000" class="redbag" src="../assets/home/10.png" alt=""> -->
      <img v-show="productId === 4 && money<20000 && money >= 10000" class="redbag" src="../assets/home/10.png" alt="">
      <img v-show="productId === 4 && money<30000 && money >= 20000" class="redbag" src="../assets/home/20.png" alt="">
      <img v-show="productId === 4 && money<40000 && money >= 30000" class="redbag" src="../assets/home/30.png" alt="">
      <img v-show="productId === 4 && money >= 30000" class="redbag" src="../assets/home/50.png" alt="">

      <img v-show="productId === 2 && money<10000 && money>=5000" class="redbag" src="../assets/home/8.png" alt="">
      <img v-show="productId === 2 && money<20000 && money >= 10000" class="redbag" src="../assets/home/15.png" alt="">
      <img v-show="productId === 2 && money<30000 && money >= 20000" class="redbag" src="../assets/home/25.png" alt="">
      <img v-show="productId === 2 && money<40000 && money >= 30000" class="redbag" src="../assets/home/35.png" alt="">
      <img v-show="productId === 2 && money >= 30000" class="redbag" src="../assets/home/60.png" alt="">

      <div class="input-container">
        <div class="input-item">
          <span class="label">投资金额</span>
          <input id="amount-input" @input="turnIntoInt" v-model="money" placeholder="请输入金额(100起)" type="number">
          <span class="label-last">元</span>
        </div>
        <div class="input-item">
          <span class="label">选择产品</span>
          <select @change="changeProduct">
            <option value="1" disabled selected>请选择</option>
            <option value="季无忧">季无忧</option>
            <option value="年无忧">年无忧</option>
          </select>
        </div>
        <img @click="toRecharge" class="pay-button" src="../assets/home/button.png" alt="">
      </div>
    </div>
    <div class="ticket-container">
      <img class="title-img" src="../assets/home/ticket-title.png" alt="">
      <p class="time-tips">剩余刮奖
        <span>{{remainTimes}}</span>次
      </p>
      <div id="canvas-container" class="canvas-container">
        <canvas id="mask"></canvas>
        <p class="reward-tips">恭喜您<br>中奖啦！</p>
      </div>
      <button @click="toReward" class="pay-button"></button>
      <div class="tips-container">tips:用户累计年化投资金额每满5000元，可玩1次旺财刮刮卡</div>
      <div class="rewards-container">
        <h3 class="title">
          <span>奖品展示</span>
        </h3>
        <div class="rewards-wrapper">
          <div class="rewards-item">
            <img src="../assets/home/one.png" alt="">
            <p>一等奖</p>
          </div>
          <div class="rewards-item">
            <img src="../assets/home/redbag-reward.png" alt="">
            <p>二等奖</p>
          </div>
          <div class="rewards-item">
            <img src="../assets/home/redbag-50.png" alt="">
            <p>三等奖</p>
          </div>
          <div class="rewards-item">
            <img src="../assets/home/intrest-reward.png" alt="">
            <p>特等奖</p>
          </div>
        </div>
      </div>
    </div>
    <div class="rules-container">
      <h3>
        <span>活动规则</span>
      </h3>
      <p>1.活动时间：2018.2.26-3.4</p>
      <p>2.活动期间,用户单笔投资金额满足相应条件(5000元起),即可返一定比例的现金券,可直接投资抵扣。(如投资10000；现金券：100,您就只需要支付9900元)</p>
      <p>3.活动期间,用户累计年化投资金额每满5000元,可玩1次旺财刮刮卡,随机获得1种奖品。</p>
      <p>4.奖品在获得后立即发放,现金券在您投资时自动抵用。</p>
      <p>5.最终解释权归56理财所有。</p>
    </div>
    <div class="service-container">
    </div>

    <transition name="fade">
      <div @touchmove="preMove" v-if="showRedBag || showFail || showLogin" class="black-model"></div>
    </transition>
    <transition name="bounce">
      <div @touchmove="preMove" v-show="showRedBag" class="success-container">
        <img @click="showRedBag = false" class="close-btn" src="../assets/home/close.png" alt="">
        <p class="amount">获得{{redBagMoney}}</p>
        <button @click="$router.push('/reward')">马上查看</button>
      </div>
    </transition>

    <transition name="bounce">
      <div @touchmove="preMove" v-show="showFail" class="fail-container">
        <img @click="showFail = false" class="close-btn" src="../assets/home/close.png" alt="">
        <p class="tips">每投资(年 季)满5000元<br>获得一次刮奖机会</p>
        <button @click="focusInput">去充值</button>
      </div>
    </transition>

    <transition name="bounce">
      <div @touchmove="preMove" v-show="showLogin" class="login-container">
        <img @click="showLogin=false" class="close-btn" src="../assets/home/close.png" alt="">
        <div class="form-container">
          <div class="input-container">
            <img src="../assets/home/phone.png">
            <input v-model="userObj.phoneNumber" type="text" placeholder="请输入手机号码">
          </div>
          <div class="input-container">
            <img class='lock' src="../assets/home/lock.png" alt="">
            <input v-model="userObj.validateCode" class="validate" type="text" placeholder="请输入验证码">
            <button @click="getCode" class="validate">{{codeWord}}</button>
          </div>
        </div>
        <button @click="loginRegist" class="login-btn">登录</button>
      </div>
    </transition>
  </div>
</template>

<script>
import tool from '@/utils/tools';
import homeApi from '@/api/home.js';
import { Toast } from 'mint-ui';
import canvasModel from '../assets/home/canvas-model.png';
require('@/utils/bridge');

export default {
  name: 'HelloWorld',
  data() {
    return {
      ifLogin: false,
      requesting: false,
      money: '',
      coding: false,
      actualPayMoney: '0',
      remainTimes: 0,
      showFail: false,
      showRedBag: false,
      showLogin: false,
      codeWord: '获取验证码',
      productId: '',
      userObj: {
        phoneNumber: '',
        validateCode: ''
      }
    };
  },
  watch: {
    productId() {
      switch (this.productId) {
      case 2:
        if (this.money < 5000) {
          this.actualPayMoney = this.money;
        }
        if (this.money < 10000 && this.money >= 5000) {
          this.actualPayMoney = this.money - 8;
        }
        if (this.money < 20000 && this.money >= 10000) {
          this.actualPayMoney = this.money - 15;
        }
        if (this.money < 30000 && this.money > 20000) {
          this.actualPayMoney = this.money - 25;
        }
        if (this.money < 40000 && this.money >= 30000) {
          this.actualPayMoney = this.money - 35;
        }
        if (this.money >= 40000) {
          this.actualPayMoney = this.money - 60;
        }
        break;
      case 4:
        if (this.money < 5000) {
          this.actualPayMoney = this.money;
        }
        if (this.money < 10000 && this.money >= 5000) {
          this.actualPayMoney = this.money - 5;
        }
        if (this.money < 20000 && this.money >= 10000) {
          this.actualPayMoney = this.money - 10;
        }
        if (this.money < 30000 && this.money > 20000) {
          this.actualPayMoney = this.money - 20;
        }
        if (this.money < 40000 && this.money >= 30000) {
          this.actualPayMoney = this.money - 30;
        }
        if (this.money >= 40000) {
          this.actualPayMoney = this.money - 50;
        }
        break;
      }
    },
    money: function() {
      switch (this.productId) {
      case 2:
        if (this.money < 5000) {
          this.actualPayMoney = this.money;
        }
        if (this.money < 10000 && this.money >= 5000) {
          this.actualPayMoney = this.money - 8;
        }
        if (this.money < 20000 && this.money >= 10000) {
          this.actualPayMoney = this.money - 15;
        }
        if (this.money < 30000 && this.money > 20000) {
          this.actualPayMoney = this.money - 25;
        }
        if (this.money < 40000 && this.money >= 30000) {
          this.actualPayMoney = this.money - 35;
        }
        if (this.money >= 40000) {
          this.actualPayMoney = this.money - 60;
        }
        break;
      case 4:
        if (this.money < 5000) {
          this.actualPayMoney = this.money;
        }
        if (this.money < 10000 && this.money >= 5000) {
          this.actualPayMoney = this.money - 5;
        }
        if (this.money < 20000 && this.money >= 10000) {
          this.actualPayMoney = this.money - 10;
        }
        if (this.money < 30000 && this.money > 20000) {
          this.actualPayMoney = this.money - 20;
        }
        if (this.money < 40000 && this.money >= 30000) {
          this.actualPayMoney = this.money - 30;
        }
        if (this.money >= 40000) {
          this.actualPayMoney = this.money - 50;
        }
        break;
      }
    }
  },
  async created() {
    const { code, data } = await homeApi.checkLogin();
    console.log(11111, code, data);
    if (code === 200) {
      this.ifLogin = true;
    }
    if (code === 0) {
      if (window.$LeeBridge.checkWebview()) {
        window.$LeeBridge.appLogin('56lc://login?returnUrl=' + window.location.href);
        return false;
      }
    }
  },
  mounted() {
    // this.money = this.$store.state.money || '';
    // this.productId = this.$store.state.productId || '';
    // if(+this.productId === 1) {
    //   document.getElementsByTagName('select')[0].value = '年无忧';
    //   document.getElementsByTagName('select')[0].value = '季无忧';
    // }
    var _vue = this;
    var canvas = document.getElementById('mask');
    var context = canvas.getContext('2d');
    var ERASER_SIZE = 20; // 橡皮擦的大小
    var dragging = false; // 是否处在拖动状态

    /**
     * 转换坐标值
     * 将鼠标点击或移动时获取的坐标值，减去 canvas 相对窗口的坐标值，就是在 canvas 画布中的坐标值
     * @param {Obj} e 手指当前相对窗口的坐标位置
     */
    function windowToCanvas(e) {
      let x = e.targetTouches[0].clientX;
      let y = e.targetTouches[0].clientY;
      let bbox = canvas.getBoundingClientRect();

      return {
        x: x - bbox.left,
        y: y - bbox.top
      };
    }

    /**
     * 绘制剪辑区域，并清除该区域中的内容
     * @param {Obj} loc 手指当前相对 canvas 画布中的坐标位置
     */
    function drawEraser(loc) {
      context.save();
      context.beginPath();
      context.arc(loc.x, loc.y, ERASER_SIZE, 0, Math.PI * 2, false);
      context.clip();
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.restore();
    }

    /**
     * 页面加载时，绘制一个铺满 canvas 画布的矩形
     * 该矩形用于被擦除
     */
    // window.onload = function(e) {
    var imageObj = new Image();
    // imageObj.src = 'https://www.html5canvastutorials.com/demos/assets/darth-vader.jpg';
    imageObj.src = canvasModel;
    imageObj.onload = function() {
      context.save();
      context.fillStyle = '#ccc';
      context.beginPath();
      // context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(imageObj, 0, 0);
      context.restore();
    };
    // context.save();
    // context.fillStyle = '#ccc';
    // context.beginPath();
    // context.fillRect(0, 0, canvas.width, canvas.height);
    // context.restore();
    // };

    /**
     * ① 手指按下时，开启 dragging 状态，并绘制剪辑区域
     */
    // canvas.addEventListener('touchstart', function(e) {
    // var loc = windowToCanvas(e);
    // dragging = true;
    // drawEraser(loc);
    // });

    /**
     * ② 手指移动时，不断进行剪辑区域的绘制，以及路径更新，实现擦除的效果
     */
    canvas.addEventListener('touchmove', function(e) {
      if (_vue.ifLogin === false) {
        _vue.showLogin = true;
        return false;
      }
      if (_vue.remainTimes === 0) {
        _vue.showFail = true;
        return false;
      }
      var loc;
      dragging = true;
      if (dragging) {
        loc = windowToCanvas(e);
        drawEraser(loc);
      }
      e.preventDefault();
    });

    /**
     * ③ 手指离开，结束擦除过程
     */
    canvas.addEventListener('touchend', async function(e) {
      var imgData = context.getImageData(0, 0, canvas.width, canvas.height); // 获取画布中的所有像素
      var data = imgData.data; // 得到像素的字节数据
      var length = data.length; // 获取该数据的长度
      var transparent = 0; // 设置一个变量来记录已经变为透明的像素点的数量
      for (var i = 0; i < length; i += 4) {
        // 循环遍历每一个像素
        var alpha = data[i + 3]; // 获取每个像素的透明度数值
        if (alpha < 10) {
          // 当透明度小于10时，认为它已经被擦除，transparent数值加1
          transparent += 1;
        }
      }
      var percentage = transparent / (length / 4); // 计算透明像素在所有像素点中所占比例
      if (percentage > 0.3) {
        // 当比例大于90%时，显示刮奖结束字样
        if (_vue.requesting) {
          return false;
        }
        _vue.requesting = true;
        const {code, data} = await _vue.$request.post('/ActivityDogYear/drawPrizeAjax');
        if (code === 1) {
          _vue.redBagMoney = data.prize_name;
          _vue.remainTimes -= 1;
          _vue.showRedBag = true;
          _vue.requesting = false;
        } else {
          Toast('哎呀，服务器开小差啦');
          _vue.requesting = false;
        }
        dragging = false;
        // context.save();
        // context.fillStyle = '#ccc';
        // context.beginPath();
        // context.fillRect(0, 0, canvas.width, canvas.height);
        // context.restore();
        var imageObj = new Image();
        imageObj.src = canvasModel;
        imageObj.onload = function() {
          context.save();
          context.fillStyle = '#ccc';
          context.beginPath();
          // context.fillRect(0, 0, canvas.width, canvas.height);
          context.drawImage(imageObj, 0, 0);
          context.restore();
        };
      }
    });
  },
  methods: {
    /** 防止滚动穿透
     */
    preMove(e) {
      e.preventDefault();
    },
    /** 验证码倒计时
     */
    async getCode() {
      if (this.coding) {
        return false;
      }
      if (!tool.regexp.phone.test(this.userObj.phoneNumber)) {
        Toast('请填写正确手机号');
        return false;
      }
      this.coding = true;
      const SMSCode = await this.$request.spePost(
        '/User/smcode',
        {
          mobile: this.userObj.phoneNumber,
          msgtype: 9
        }
      );
      if (SMSCode.data.status === 1) {
        this.messageId = SMSCode.data.data;
        let start = 60;
        window.counting = window.setInterval(() => {
          if (start > 0) {
            this.codeWord = (start -= 1) + '秒';
          } else {
            this.codeWord = '获取验证码';
            window.clearInterval(window.counting);
            this.coding = false;
          }
        }, 1000);
      } else {
        Toast('网络异常');
        this.coding = false;
      }
    },
    async loginRegist() {
      if (!tool.regexp.phone.test(this.userObj.phoneNumber)) {
        Toast('请填写正确手机号');
        return false;
      }
      if (!this.userObj.validateCode) {
        Toast('请填写验证码');
        return false;
      }
      const loginData = await this.$request.spePost(
        '/ActivityDogYear/loginRegister',
        {
          mobile: this.userObj.phoneNumber,
          verifyCode: this.userObj.validateCode,
          smLogId: this.messageId
        },
      );
      if (loginData.data.status === 1) {
        clearInterval(window.counting);
        this.ifLogin = true;
        this.showLogin = false;
        this.getTimes();
      }
    },
    async getTimes() {
      const { code, data } = await this.$request.post('/ActivityDogYear/index');
      if (code === 1) {
        this.remainTimes = data.userSurplusChance;
      }
    },
    toRecharge() {
      if (!this.ifLogin) {
        this.showFail = false;
        this.showLogin = true;
        return false;
      }
      if (!this.money) {
        Toast('请输入投资金额');
        return false;
      }
      if (this.money < 100) {
        Toast('100元起投哦');
        return false;
      }
      if (!this.productId) {
        Toast('请先选择投资产品');
        return false;
      }
      this.$store.commit('increment', this.money);
      this.$store.commit('setProductId', this.productId);
      this.$router.push('/recharge');
    },
    focusInput() {
      this.showFail = false;
      document.getElementById('amount-input').focus();
    },
    toReward() {
      if (!this.ifLogin) {
        this.showFail = false;
        this.showLogin = true;
        return false;
      }
      this.$router.push('/reward');
    },
    changeProduct(e) {
      let value = document.getElementsByTagName('select')[0].value;
      if (value === '季无忧') {
        this.productId = 2;
      }
      if (value === '年无忧') {
        this.productId = 4;
      }
    },
    turnIntoInt() {
      if (this.money.toString().length > 10) {
        this.money = +this.money.slice(0, 10);
      }
      this.money = Number.parseInt(+this.money, 10);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.flower-enter-active,
.flower-leave-active {
  transition: all 0.3s ease;
}
.flower-enter,
.flower-leave-to {
  transform: scale(2);
}

.bounce-enter-active {
  animation: bounce-in 0.6s;
}
.bounce-leave-active {
  animation: bounce-in 0.6s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }

  40% {
    transform: scale(1.2);
  }

  70% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}
.m-home {
  height: 100%;
  width: 100%;
  padding: 0px 20px;
  position: relative;
  box-sizing: border-box;
  padding-top: 415px;

  .bg-img {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    z-index: -1;
  }

  .redbag-container {
    background-color: #ffede5;
    border-radius: 20px;
    height: 610px;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
    margin-bottom: 30px;

    .amount-display {
      position: absolute;
      top: 125px;
      width: 100%;
      text-align: center;
      z-index: 2;
      color: #666;
      font-size: 15px;
    }

    .title-img {
      position: absolute;
      left: 50%;
      top: 18px;
      transform: translateX(-50%);
      width: 240px;
      height: auto;
    }

    img.redbag {
      position: absolute;
      left: 50%;
      top: 90px;
      transform: translateX(-50%);
      width: 95%;
      height: auto;
    }

    .input-container {
      width: 100%;
      left: 50%;
      top: 360px;
      transform: translateX(-50%);
      position: absolute;
      z-index: 1;

      .input-item {
        // margin: 0 60px;
        margin-left: 60px;
        text-align: left;
        margin-bottom: 20px;
        * {
          display: inline-block;
          vertical-align: middle;
        }
        .label,
        .label-last {
          color: white;
          font-size: 16px;
        }
        input,
        select {
          border-radius: 5px;
          margin: 0 5px;
          height: 30px;
          border: none;
          width: 120px;
          // color: #ffa49f;
          text-indent: 6px;
          color: #f33030;
        }
      }

      ::-moz-placeholder {
        // color: #ffa49f;
        color: #f33030;
      }
      ::-webkit-input-placeholder {
        // color: #ffa49f;
        color: #f33030;
      }
      :-ms-input-placeholder {
        // color: #ffa49f;
        color: #f33030;
      }

      .pay-button {
        overflow: hidden;
        display: block;
        margin: 0 auto;
        margin-top: 25px;
        width: 210px;
        height: auto;
      }
    }
  }

  .ticket-container {
    background-color: #ffede5;
    border-radius: 20px;
    // height: 880px;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
    margin-bottom: 30px;
    padding: 0px 6%;

    .title-img {
      display: block;
      margin: 0 auto;
      margin-top: 18px;
      width: 240px;
      height: auto;
    }

    .time-tips {
      font-size: 15px;
      color: #666;
      text-align: center;
      margin: 0 auto;
      margin-top: 10px;
      border-bottom: 1px solid #ecc8a1;
      padding-bottom: 15px;
      span {
        color: red;
        margin: 0 3px;
      }
    }

    .canvas-container {
      background-size: contain;
      background-repeat: no-repeat;
      background-position: 50% 50%;
      background-image: url('../assets/home/ticket-bg.png');
      height: 136px;
      margin-top: 20px;
      padding: 10px;
      position: relative;
      box-sizing: border-box;

      canvas {
        // background-color: grey;
        width: 275px;
        height: 120px;
        position: absolute;
        z-index: 5;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      .reward-tips {
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 4;
        transform: translate(-50%, -50%);
        font-size: 30px;
        color: red;
      }
    }

    button.pay-button {
      display: block;
      background-color: transparent;
      width: 150px;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: 50% 50%;
      background-image: url('../assets/home/ticket-button.png');
      height: 50px;
      margin: 15px auto 0 auto;
    }

    .tips-container {
      color: #e1b3b0;
      font-size: 10px;
      margin-top: 10px;
      padding-bottom: 10px;
      text-align: center;
      border-bottom: 1px solid #ecc8a1;
    }

    .rewards-container {
      margin-top: 15px;
      margin-bottom: 30px;

      h3.title {
        margin-bottom: 20px;
        text-align: center;
        &:before {
          content: '';
          width: 60px;
          height: 2px;
          display: inline-block;
          vertical-align: middle;
          background: linear-gradient(to left, #e45f64, transparent);
        }
        &:after {
          content: '';
          width: 60px;
          height: 2px;
          display: inline-block;
          vertical-align: middle;
          background: linear-gradient(to right, #e45f64, transparent);
        }
        span {
          color: #e14a4e;
          font-size: 18px;
          display: inline-block;
          margin: 0 5px;
          vertical-align: middle;
        }
      }

      .rewards-wrapper {
        font-size: 0px;
        text-align: left;

        .rewards-item {
          display: inline-block;
          margin-bottom: 10px;
          width: 45%;
          height: auto;
          font-size: 16px;
          &:nth-child(2n + 1) {
            margin-right: 26px;
          }

          img {
            display: block;
            width: 100%;
          }

          p {
            text-align: center;
            margin-top: 10px;
            color: #e1b3b0;
          }
        }
      }
    }
  }

  .rules-container {
    h3 {
      text-align: center;
      margin-bottom: 10px;
      span {
        font-size: 16px;
        color: white;
        display: inline-block;
        vertical-align: middle;
        margin: 0px 10px;
      }
      &:before,
      &:after {
        content: '';
        display: inline-block;
        width: 30px;
        height: 2px;
        background-color: white;
        vertical-align: middle;
      }
    }
    p {
      color: white;
      text-align: justify;
      line-height: 24px;
      font-weight: bold;
    }
  }

  .service-container {
    width: 85%;
    height: 160px;
    margin: 0 auto;
    margin-top: 30px;
    background-size: contain;
    background-position: 50% 50%;
    background-image: url('../assets/home/service.png');
    background-repeat: no-repeat;
  }

  .black-model {
    position: fixed;
    z-index: 9;
    top: 0px;
    bottom: 0px;
    right: 0px;
    left: 0px;
    background-color: rgba(0, 0, 0, 0.6);
  }

  .fail-container,
  .success-container {
    margin: auto;
    position: fixed;
    z-index: 10;
    top: 0%;
    left: 0px;
    width: 100%;
    height: 500px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 50% 50%;

    .amount {
      margin-top: 245px;
      text-align: center;
      font-size: 18px;
      color: #ff4f4f;
    }

    .close-btn {
      position: absolute;
      width: 25px;
      height: auto;
      right: 50px;
      top: 100px;
    }

    button {
      width: 230px;
      color: white;
      line-height: 40px;
      height: 40px;
      display: block;
      margin: 0 auto;
      background-color: transparent;
      border: none;
      font-size: 16px;
      background-size: contain;
      // background-image: url("../assets/btn.png");
      background-position: 50% 50%;
      background-repeat: no-repeat;
    }
  }

  .fail-container {
    background-image: url('../assets/home/fail.png');
    .tips {
      color: #898989;
      margin-top: 245px;
      text-align: center;
      font-size: 18px;
      width: 100%;
    }

    button {
      overflow: hidden;
      margin-top: 40px;
      background-image: url('../assets/home/btn1.png');
    }
  }

  .success-container {
    background-image: url('../assets/home/success.png');
    button {
      margin-top: 40px;
      background-image: url('../assets/home/btn.png');
    }
  }

  .login-container {
    margin: auto;
    position: fixed;
    z-index: 10;
    top: 23%;
    left: 40px;
    right: 40px;
    height: auto;
    box-sizing: border-box;
    padding: 20px 12px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 10px;

    .close-btn {
      position: absolute;
      width: 25px;
      height: auto;
      right: 0px;
      top: -36px;
    }

    div.form-container {
      background-color: white;
      border-radius: 10px;
      padding: 10px 10px 5px 10px;
    }

    div.input-container {
      height: 23px;
      background-color: white;
      padding: 10px;
      height: 30px;
      padding-right: 0px !important;
      &:first-child {
        border-bottom: 1px solid #e6e6e6;
      }
      img {
        display: inline-block;
        width: 18px;
        height: auto;
        vertical-align: middle;
        margin-right: 15px;
        &.lock {
          width: 22px;
          position: relative;
          left: -2px;
        }
      }

      input::-webkit-input-placeholder {
        color: #c9c9c9 !important;
      }
      input:-moz-placeholder {
        color: #c9c9c9 !important;
      }
      input::-moz-placeholder {
        color: #c9c9c9 !important;
      }
      input:-ms-input-placeholder {
        color: #c9c9c9 !important;
      }
      input {
        display: inline-block;
        vertical-align: middle;
        height: 100%;
        font-size: 14px;
        color: grey;

        &.validate {
          width: 90px;
        }
      }

      button {
        display: inline-block;
        vertical-align: middle;

        &.validate {
          padding: 5px 6px;
          border: 1px solid #ffcc1b;
          border-radius: 7px;
          background-color: white;
          color: #ffcc1b;
          font-size: 14px;
          margin-left: 16px;
          text-align: center;
          width: 88px;
        }
      }
    }

    .login-btn {
      margin-top: 20px;
      display: block;
      width: 100%;
      height: 45px;
      color: white;
      font-size: 19px;
      font-weight: bold;
      background-image: url('../assets/home/purple-login.png');
      background-size: contain;
      background-position: 50% 50%;
      background-color: transparent;
      background-repeat: no-repeat;
    }
  }
}
</style>
