<template>
  <div class="m-recharge">
    <img class="title" src="../assets/recharge/title.png" alt="">
    <div class="recharge-container">
      <div class="top">
        <p class="buy">购买金额</p>
        <input disabled @input="changeVal" v-model="rechargeAmount" :placeholder="'亲，你还可以存入' + remainMoney + '元'" class="amount-input" type="number">
        <div class="tips">
          <p>当前标的：剩余
            <span>{{remainMoney}}</span>元可投</p>
          <p>下一标的可投金额为{{nextbidsmoney}}万</p>
        </div>
      </div>
      <div v-show="productId === 2" class="product-list">
        <span class="name">季无忧</span>
        <span class="tags">10.00%年化</span>
        <span class="tags">锁定期:90天</span>
      </div>
      <div v-show="productId === 4" class="product-list">
        <span class="name">年无忧</span>
        <span class="tags">年化8.60%起</span>
        <span class="tags">锁定期:30天</span>
      </div>
      <div @click="payType = 1" :class="{'bank-container': true, 'chosen': payType === 1}">
        <img class="banklogo" :src="bankLogo" alt="">
        <div class="detail-container">
          <p>{{bankName}}(尾号{{bankNum}})</p>
          <p>每日单笔限额{{bankMax}}</p>
        </div>
      </div>
      <div @click="payType = 0" :class="{'remain-container': true, 'chosen': payType === 0}">
        <img class="banklogo" src="../assets/recharge/money.png" alt="">
        <span>账户余额</span>
        <span class="amount">{{userRemain}}</span>
      </div>
      <button @click="enterPass" class="recharge-btn">马上存入</button>
    </div>
    <keyboard ref="pay" @pas-end="getPass" @close="closeKeyboard" :is-pay="showKeyboard">
      <!-- <div slot="loading-ani">
        支付成功
      </div> -->
    </keyboard>
  </div>
</template>

<script>
import keyboard from '../components/keyboard';
import { Indicator, Toast } from 'mint-ui';

export default {
  components: {
    keyboard
  },
  data() {
    return {
      rechargeAmount: '',
      showKeyboard: false,
      password: '',
      bankLogo: '',
      bankName: '',
      bankNum: '',
      bankMax: 0,
      remainMoney: 0,
      minMoney: 0,
      userRemain: 0,
      nextbidsmoney: 0,
      payType: 0,
      bcid: '',
      productId: 0,
      productName: ''
    };
  },
  // async mounted() {
  //   if (!this.$store.state.money) {
  //     // alert('未检测到输入金额，即将返回活动页面');
  //     this.$router.replace('/');
  //   }
  //   this.productId = this.$store.state.productId;
  //   this.rechargeAmount = this.$store.state.money;
  // },
  destroyed() {
    Indicator.close();
  },
  async created() {
    if (!this.$store.state.money) {
      // alert('未检测到输入金额，即将返回活动页面');
      this.$router.replace('/');
    }
    this.productId = this.$store.state.productId;
    this.rechargeAmount = this.$store.state.money;

    Indicator.open('获取用户数据中...');
    const { code } = await this.$request.get('/ActivityDogYear/isLogin');
    if (code !== 1) {
      Indicator.close();
      this.$router.replace('/');
    }

    const response = await this.$request.spePost('/ActivityDogYear/buy', {
      bids_id: this.productId,
      bidsmoney: this.rechargeAmount
    });
    if (response.data.status.errCode === 101) {
      window.location.href =
        response.data.data.location +
        '?ReturnUrl=' +
        response.data.data.returnUrl;
      Indicator.close();
      // window.location.href = "/user/card_auth/";
    }
    if (response.data.status.errCode === 1) {
      Indicator.close();
      this.nextbidsmoney = response.data.data.nextbidsmoney;
      this.userRemain = Number.parseFloat(
        response.data.data.wxuser.account_balance,
        10
      ).toFixed(2);
      this.bankLogo = response.data.data.bank.bank_img;
      this.bankName = response.data.data.bank.bank_name;
      this.bankNum = response.data.data.bank_account_sub;
      this.bankMax = response.data.data.bank.maximum;
      this.remainMoney = response.data.data.maxremainmoney;
      this.minMoney = response.data.data.minMoney;
      this.bcid = response.data.data.bcid;
    }
  },
  watch: {
    rechargeAmount() {
      this.$store.commit('increment', this.rechargeAmount);
    }
  },
  methods: {
    closeKeyboard() {
      this.showKeyboard = false;
    },
    enterPass() {
      if (!+this.rechargeAmount) {
        Toast('请输入购买金额');
        return false;
      }
      if (+this.rechargeAmount < 100) {
        Toast('100元起投哦');
        return false;
      }
      if (this.payType === '') {
        Toast('请选择支付方式');
        return false;
      }
      if (+this.rechargeAmount > +this.userRemain && +this.payType === 0) {
        Toast('超出账户余额啦');
        return false;
      }
      if (this.payType === 0) {
        this.showKeyboard = true;
      } else {
        this.getPass();
      }
    },
    async getPass(val) {
      this.password = val;
      const orderObj = await this.$request.post(
        '/ActivityDogYear/createOrder',
        {
          money: this.rechargeAmount,
          bcid: this.bcid,
          tradepassword: this.password,
          paytype: this.payType
        }
      );
      if (orderObj.code === 1) {
        if (this.payType === 1) {
          const orderNum = orderObj.data.order_id;
          const returnUrl = orderObj.data.ReturnUrl;
          this.showKeyboard = false;
          window.location.href =
            '/Payment/index/orderid/' +
            orderNum +
            '?ReturnUrl=' +
            returnUrl +
            '/orderid/' +
            orderNum;
        } else {
          const orderNum = orderObj.data.order_id;
          const returnUrl = orderObj.data.ReturnUrl;
          // this.$refs.pay.$payStatus(true);
          window.location.href =
            '/Payment/index/orderid/' +
            orderNum +
            '?ReturnUrl=' +
            returnUrl +
            '/orderid/' +
            orderNum;
        }
      } else {
        this.$refs.pay.$payStatus(false);
      }
    },
    changeVal() {
      this.rechargeAmount = Number(this.rechargeAmount).toFixed(0);
    }
  }
};
</script>

<style lang="less" >
.m-recharge {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-size: cover;
  background-image: url('../assets/recharge/bg.png');
  background-position: 50% 50%;

  img.title {
    display: block;
    margin: 0 auto;
    margin-top: 5px;
    width: 88%;
  }

  .recharge-container {
    background-image: url('../assets/recharge/amount-bg.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    height: 414px;
    width: 92%;
    margin: 0 auto;
    box-sizing: border-box;

    .top {
      padding: 15px 40px 20px 40px;

      p.buy {
        color: #f38b10;
        font-size: 15px;
        font-weight: bold;
        margin-bottom: 10px;
      }

      input::-webkit-input-placeholder {
        color: #999 !important;
      }
      input:-moz-placeholder {
        color: #999 !important;
      }
      input::-moz-placeholder {
        color: #999 !important;
      }
      input:-ms-input-placeholder {
        color: #999 !important;
      }

      input.amount-input {
        line-height: 40px;
        width: 98%;
        border-radius: 6px;
        border: 1px solid #d8d8d8;
        text-indent: 10px;
        margin-bottom: 10px;
        font-size: 15px;

        &[disabled] {
         background-color: #e8e8e8; 
        }
      }

      .tips {
        p {
          color: #808080;
          font-size: 13px;
          font-weight: bold;
          &:first-child {
            margin-bottom: 8px;
          }

          span {
            color: #f38b10;
          }
        }
      }
    }

    .product-list {
      padding: 15px 40px;
      padding-right: 20px;
      span {
        display: inline-block;
        font-size: 18px;
        color: #333333;
        vertical-align: middle;
        &.name {
          margin-right: 40px;
        }
        &.tags {
          color: white;
          border-radius: 4px;
          background-color: #f8bd30;
          height: 21px;
          padding: 0px 6px;
          line-height: 21px;
          font-size: 13px;
          margin-right: 3px;
        }
      }
    }

    .bank-container {
      margin: 0px;
      border: none;
      box-sizing: border-box;
      padding-left: 17px;
      padding-top: 12px;
      padding-bottom: 12px;
      box-sizing: border-box;
      border-bottom: 1px solid #d8d8d8;
      &.chosen {
        background-color: #f2f2f2;
      }

      img.banklogo {
        display: inline-block;
        width: 27px;
        height: auto;
        vertical-align: middle;
        margin-right: 10px;
      }

      div.detail-container {
        display: inline-block;
        vertical-align: middle;

        p:first-child {
          font-size: 15px;
          color: #666666;
        }

        p:last-child {
          color: #999999;
          margin-top: 1px;
          letter-spacing: 0.1px;
        }
      }
    }

    .remain-container {
      padding: 0px 19px;
      height: 56px;
      line-height: 56px;
      margin: 0px;
      box-sizing: border-box;
      position: relative;
      // top: -1px;

      &.chosen {
        // background-color: #f2f2f2;
        border-radius: 0px 0px 8px 8px;
        background: #f2f2f2;
        // background:radial-gradient(10px at left bottom,transparent 50%,blue 50%);
        // background:
        // radial-gradient(
        //       circle at top left,
        //       transparent 0px,
        //       #f2f2f2 0
        //     )
        //     top left,
        //   radial-gradient(circle at top right, transparent 0px, #f2f2f2 0) top
        //     right,
        //   radial-gradient(circle at bottom right, transparent 6px, #f2f2f2 0)
        //     bottom right,
        //   radial-gradient(circle at bottom left, transparent 6px, #f2f2f2 0)
        //     bottom left;
        // background-size: 50% 50%;
        // background-repeat: no-repeat;
        // &:before {
        //   content: '';
        //   position: absolute;
        //   top: 0px;
        //   left: 0px;
        //   width: 100%;
        //   height: 30px;
        //   background-color: #f2f2f2;
        // }

        // &:after {
        //   content: '';
        //   position: absolute;
        //   top: 22px;
        //   left: 30px;
        //   width: 70%;
        //   height: 30px;
        //   background-color: #f2f2f2;
        // }

        span {
          color: #666;
        }
      }

      img,
      span {
        display: inline-block;
        vertical-align: middle;
        position: relative;
        z-index: 5;
      }

      img {
        width: 27px;
        margin-right: 10px;
      }

      span {
        font-size: 16px;
        color: #333333;
        &:first-child {
        }
        &.amount {
          color: #999;
          // margin-left: 93px;
          float: right;
          margin-top: 3px;
        }
      }
    }

    .recharge-btn {
      display: block;
      width: 240px;
      height: 45px;
      line-height: 45px;
      margin: 0 auto;
      margin-top: 15px;
      font-size: 23px;
      color: white;
      background-color: transparent;
      background-size: contain;
      background-position: 50% 50%;
      background-repeat: no-repeat;
      // background-image: url('../assets/recharge/recharge-btn.png');
    }
  }
}
</style>
