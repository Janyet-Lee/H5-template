<template>
  <div class="m-depository-guide">
    <div class="top-container">
      <div class="slogan">
        <span>对接上饶银行资金存管</span>
        <span>|</span>
        <span>让您的投资更放心</span>
      </div>
      <img src="../../assets/guide/bank.png" alt="">
    </div>
    <div class="guide-item-container">
      <div v-for="item in questionArray" :key="item.id" class="guide-item">
        <div class="head">
          <img :src="item.imgLink" alt="">
          <span>{{item.title}}</span>
        </div>
        <div v-for="subItem in item.subArray" :key="subItem.id" class="detail-item">
          <div class="item-title" @click="changeStatus(subItem)">{{subItem.title}}</div>
          <div v-if="subItem.hide && !subItem.isLink" v-html="subItem.content" :class="{'item-content': true, 'hide' : !subItem.hide}"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import img1 from '../../assets/guide/item-4.png';
import img2 from '../../assets/guide/item-2.png';
import img3 from '../../assets/guide/item-3.png';
import img4 from '../../assets/guide/item-1.png';

export default {
  data() {
    return {
      questionArray: [
        {
          id: 1,
          title: '存管业务介绍',
          imgLink: img1,
          subArray: [
            {
              id: 11,
              title: '什么是银行存管',
              content:
                '银行存管是由银行管理资金，平台管理交易，做到资金与交易的分离，使得平台无法直接接触资金，避免用户资金被直接挪用。',
              hide: false
            },
            {
              id: 12,
              title: '对用户有什么好处',
              content:
                '1、银行存管用户资金，保障安全<br>银行管理和监督投资者的资金、划付。平台只负责匹配借贷双方的信息，不能直接接触到资金，可避免资金被挪用的风险。<br>2、银行内资金流转，更快到账<br>上饶银行会对用户转账进行核实、管理并登记用户资金流动情况，保证交易笔笔清晰透明、真实可查，同时用户资金将存放于上饶银行账户内，充值、提现即时到账。<br>3、投资先授权，交易有凭有据<br>用户开户后需设立交易密码保障账户安全，同时账户信息将由上饶银行备份管理，上饶银行凭用户授权进行资金划拨。',
              hide: false
            }
          ]
        },
        {
          id: 2,
          title: '相关业务流程',
          imgLink: img2,
          subArray: [
            {
              id: 21,
              title: '开户流程',
              isLink: true,
              link: '/guide/account-guide'
            },
            {
              id: 22,
              title: '充值流程',
              isLink: true,
              link: '/guide/recharge-guide'
            },
            {
              id: 23,
              title: '投资流程',
              isLink: true,
              link: '/guide/investment-guide'
            },
            {
              id: 24,
              title: '提现流程',
              isLink: true,
              link: '/guide/withdraw-guide'
            }
          ]
        },
        {
          id: 3,
          title: '上饶银行介绍',
          imgLink: img3,
          subArray: [
            {
              id: 31,
              title: '上饶银行',
              content:
                '上饶银行，是江西省上饶市首家具有独立法人资格的股份制商业银行。2007年6月，经中国银行业监督管理委员会批准，在原上饶市城市信用社的基础上改制组建成城市商业银行；2009年9月经中国银监会批准、工商行政管理部门登记，更名为上饶银行，全称"上饶银行股份有限公司"。',
              hide: false
            }
          ]
        },
        {
          id: 4,
          title: '常见问题',
          imgLink: img4,
          subArray: [
            {
              id: 41,
              title: '开通存管对老用户有何影响',
              content:
                '存管银行上线后，公司将进行老用户数据迁移，会有公告提醒。老用户在平台的数据将无缝对接至上饶银行，用户仅需重新设置交易密码即可。上线存管银行后不影响任何提现、充值、回款等操作。',
              hide: false
            },
            {
              id: 42,
              title: '存管后怎样投资',
              content:
                '为保障资金安全，存管后需要先进行充值操作，将资金充值至上饶银行电子账户余额，然后进行投资；在余额充足时可以直接进行投资支付。',
              hide: false
            },
            {
              id: 43,
              title: '存管后怎样回款',
              content:
                '存管后投资的项目到期后，将回款至用户的上饶银行电子账户余额，用户可以选择继续投资或者提现。',
              hide: false
            },
            {
              id: 44,
              title: '充值需不需要手续费',
              content:
                '快捷充值不收取手续费，跨行转账是否收取费取决于转出方银行和支付宝的转账收费规则。',
              hide: false
            },
            {
              id: 45,
              title: '提现到账时间',
              content:
                '5万内2小时快速到帐，7*24小时均可提现；5万以上（含5万）大额提现需使用人民银行大额支付系统，到账时间取决于银行处理的速度，具体到账时间以银行处理结果为准。',
              hide: false
            },
            {
              id: 46,
              title: '支持哪些银行卡',
              content:
                '存管银行上线后，公司将进行老用户数据迁移，会有公告提醒。老用户在平台的数据将无缝对接至上饶银行，用户仅需重新设置交易密码即可。上线存管银行后不影响任何提现、充值、回款等操作。',
              hide: false
            }
          ]
        }
      ]
    };
  },
  methods: {
    changeStatus(obj) {
      if (obj.isLink) {
        this.$router.push(obj.link);
        return false;
      }
      obj.hide = !obj.hide;
    }
  }
};
</script>

<style lang="less">
.m-depository-guide {
  height: 100%;
  width: 100%;
  .top-container {
    height: 128px;
    background-color: #ff5006;
    overflow: hidden;

    .slogan {
      margin-top: 26px;
      text-align: center;

      span {
        font-size: 15px;
        color: #ffffff;
        margin-right: 2px;
        &:first-child {
          font-weight: 400;
        }
      }
    }

    img {
      display: block;
      width: 200px;
      height: auto;
      margin: auto;
      margin-top: 19px;
    }
  }

  .guide-item-container {
    background-color: #f5f5f5;
    .guide-item {
      background-color: white;
      margin-bottom: 5px;
      padding: 0px 25px 0px 25px;
      .head {
        height: 40px;
        line-height: 40px;
        box-sizing: border-box;
        border-bottom: 1px solid #eeeeee;
        font-size: 0px;
        img {
          display: inline-block;
          width: 14px;
          height: auto;
          margin-right: 10px;
          vertical-align: middle;
        }
        span {
          font-size: 13px;
          color: #333333;
          font-weight: bold;
          display: inline-block;
          vertical-align: middle;
        }
      }

      .detail-item {
        padding-left: 24px;
        border-bottom: 1px solid #eeeeee;
        &:last-child {
          border-bottom: none;
        }

        .item-title {
          font-size: 12px;
          color: #666666;
          height: 38px;
          line-height: 38px;
          position: relative;
          &:before {
            content: '';
            position: absolute;
            left: -18px;
            top: 0px;
            bottom: 0px;
            margin: auto;
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background-color: #ffa37f;
          }
        }

        .item-content {
          font-size: 12px;
          color: #999999;
          padding-bottom: 14px;
          &.hide {
            padding-bottom: 0px;
          }
        }
      }
    }
  }
}
</style>
