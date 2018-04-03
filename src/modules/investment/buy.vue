<template>
  <div @mousewheel="prevent" @touchstart="changePageStart" @touchend="changePageEnd" @touchmove="changePageMove" class="m-investment">
    <div :style="{'transform': 'translateY('+(-100 * (currentPage-1)) + '%'}" class="first-page">
      <div class="top-container">
        <div class="product-name">年无忧360天</div>
        <div class="rate">
          <span class="big">9</span>
          <span>%</span>
          <span class="big">~</span>
          <span class="big">12</span>
          <span>%</span>
          <img class="question" src="../../assets/despository/question.png" alt="">
          <img class="new-user" src="../../assets/despository/new-user.png" alt="">
        </div>
        <div class="rate-desc">预期年化收益率</div>
        <div class="top-bottom">
          <div class="current-persent">剩余金额2000000元，已募资80%</div>
          <div class="bar-container">
            <div class="bar-wrapper">
              <div class="transparent"></div>
              <img :style="{'left': '40%'}" class="rocket" src="../../assets/despository/rocket.png" alt="">
              <div :style="{'width': '42%'}" class="white">
              </div>
            </div>
          </div>
          <div class="product-detail">
            <div class="detail-item">
              <div>锁定期(天)</div>
              <div>T+60</div>
            </div>
            <div class="detail-item">
              <div>融资总额(元)</div>
              <div>10000000</div>
            </div>
            <div class="detail-item">
              <div>起投金额(元)</div>
              <div>100</div>
            </div>
          </div>
        </div>
      </div>

      <div class="advantage-container">
        <div class="advantage-item">
          <img class="advantage" src="../../assets/despository/advantage-1.png" alt="">
          <span>可转让</span>
        </div>
        <div class="advantage-item">
          <img class="advantage" src="../../assets/despository/advantage-2.png" alt="">
          <span>每月结息</span>
        </div>
        <div class="advantage-item">
          <img class="advantage" src="../../assets/despository/advantage-3.png" alt="">
          <span>长持高收益</span>
        </div>
      </div>

      <div class="steps-container">
        <img src="../../assets/despository/year.png" alt="">
      </div>

      <div class="detail-container">
        <p class="first">
          <span>起息时间</span>
          <span>放款日(放款前按年化8%奖励利息)</span>
        </p>
        <a class="second" href="">
          <span>标的详情</span>
          <img class="right-arrow" src="../../assets/common/arrow-right.png" alt="">
        </a>
      </div>

      <div class="tips-container">
        向上滑动查看更多信息
      </div>

      <div class="cal-pay-container">
        <img class="cal" src="../../assets/investment/cal.png" alt="">
        <button class="pay-btn">立即投资</button>
      </div>

    </div>

    <div :style="{'transform': 'translateY('+(-100 * (currentPage-1)) + '%'}" class="second-page">
      <div class="out-wrapper">
        <div class="tabs-container">
          <div @click="changeTab(1)" :class="{'tab-item': true, 'chosen': currentTab === 1}">产品介绍</div>
          <div @click="changeTab(2)" :class="{'tab-item': true, 'chosen': currentTab === 2}">风险提示</div>
          <div @click="changeTab(3)" :class="{'tab-item': true, 'chosen': currentTab === 3}">安全保障</div>
          <span :style="{'left': (33.3*(currentTab-1)) + '%'}" class="scroll-bar"></span>
        </div>
        <div v-show="currentTab === 1" class="passage-container introduction-container">
          <h3>了解年无忧</h3>
          <p>年无忧是56金服平台推出的用户持有资金时间越长，收益也越高的理财产品。所有资金均由用户投资到平台推荐的优质中小企业经营周转借款标的中，该产品对应标的为360天，到期享有年化收益12%，标的放款满60天后用户可随时申请转让，转让成功后按相应比例结算对应收益，不退出可持续享有收益。</p>
          <img src="../../assets/investment/year-rate.png" alt="">
          <h3>投资期限</h3>
          <p>满标放款后开始正式计息和统计天数，最短持有60天，最长投资期限360天。</p>
          <h3>预期收益归责</h3>
          <p>1.满标放款前，每日按年化收益8%计算利息（此部分为平台奖励），与第⼀期投资收益⼀起发放。</p>
          <p>2.满标放款后，投资期满360天可获得年化12%的收益。</p>
          <p>3.满标放款后，投资未满360天申请转让的用户，将根据用户资金持有时间，扣除平台服务费后可获年化收益9%，锁定期后年化收益每30天递增0.5%。</p>
          <p>4.⽤户收益将于放款⽇后每隔 30 天为周期结算，本⾦及剩余收益将在⽤户投资到期或成功转让后结算到⽤户余额中，转让期间正常计息。</p>
          <h3>转让规则</h3>
          <p>1.满标放款60天后，用户可随时申请债权转让。</p>
          <p>2.转让期限为T+3个自然日，转让本金在转让期间仍计息，转让成功当日不计息。当⽇22点前转让成功的当⽇回款。</p>
        </div>
        <div v-show="currentTab === 2" class="passage-container danger-tips">
          <h3>1、政策风险</h3>
          <p>因宏观政策、财政政策、货币政策、监管导向、行业政策、地区发展政策等因素引起的风险。</p>
          <h3>2、市场风险</h3>
          <p>因市场资金面紧张或利率波动、行业不景气、企业效益下滑等因素引起的风险。</p>
          <h3>3、信用风险</h3>
          <p>资金出借期间，借款企业可能因自身原因或外部原因导致短期或长期丧失还款能力，或者借款企业的还款意愿发生改变，致使出借资金可能无法按时回收。</p>
          <h3>4、技术风险</h3>
          <p>因不可预测或无法控制的系统故障、设备故障、电力故障、网络故障、黑客或计算机病毒攻击，以及其他因素，可能导致平台出现非正常运行或者瘫痪，由此导致您无法及时进行查询、充值、投资、提现等操作。</p>
          <h3>5、不可抗力</h3>
          <p>因自然灾害、动乱、战争等不可抗力因素的出现而可能导致出借资金损失的风险。</p>
        </div>
        <div v-show="currentTab === 3" class="passage-container secure-guarantee">
          <img src="../../assets/investment/secure.png" alt="">
        </div>
      </div>
      <div class="cal-pay-container">
        <img class="cal" src="../../assets/investment/cal.png" alt="">
        <button class="pay-btn">立即投资</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentTab: 1,
      touchStartY: 0,
      touchEndY: 0,
      distance: 0,
      currentPage: 1
    };
  },
  methods: {
    prevent(e) {
      e.preventDefault();
    },
    stopPro(e) {
      e.stopPropagation();
    },
    changePageStart(e) {
      this.touchStartY = e.touches[0].clientY;
    },
    changePageMove(e) {
      this.touchEndY = e.touches[0].clientY;
    },
    changePageEnd(e) {
      if (this.touchEndY === 0) {
        this.touchEndY = this.touchStartY;
      }
      this.distance = this.touchEndY - this.touchStartY;
      let secondPageScroll = (document.getElementsByClassName(
        'out-wrapper'
      )[0].scrollTop = 0);
      if (+secondPageScroll !== 0) {
        return false;
      }

      if (Math.abs(this.distance) < 50) {
        this.clearAll();
        return false;
      }
      let secScrollTop3 = document.getElementsByClassName('secure-guarantee')[0]
        .scrollTop;
      let secScrollTop1 = document.getElementsByClassName(
        'introduction-container'
      )[0].scrollTop;
      if ((this.currentTab === 3 && secScrollTop3 !== 0) || (this.currentTab === 1 && secScrollTop1 !== 0)) {
        this.clearAll();
        return false;
      }

      if (this.distance < 0) {
        this.currentPage = 2;
      }
      if (this.distance > 0) {
        this.currentPage = 1;
      }
      this.clearAll();
      // document.getElementsByClassName('secure-guarantee')[0].scrollTop = 0;
      // document.getElementsByClassName('introduction-container')[0].scrollTop = 0;
    },
    changeTab(val) {
      this.currentTab = val;
    },
    clearAll() {
      this.touchStartY = 0;
      this.touchEndY = 0;
      this.distance = 0;
    }
  }
};
</script>

<style lang="less">
.m-investment {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  position: relative;
  overflow: hidden;
  .first-page {
    width: 100%;
    height: 100%;
    position: absolute;
    transition: all 0.6s ease;
    top: 0px;
    .top-container {
      position: relative;
      background-color: #fe5812;
      height: 255px;
      overflow: hidden;
      box-sizing: border-box;
      background-size: cover;
      background-position: 50% 50%;
      background-image: url('../../assets/despository/top-bg.png');
      .product-name {
        position: absolute;
        top: 15px;
        left: 15px;
        width: 85px;
        height: 28px;
        line-height: 28px;
        background-image: url('../../assets/despository/name-bg.png');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: 50% 50%;
        font-size: 12px;
        text-align: center;
        color: white;
      }

      .rate {
        text-align: center;
        position: relative;
        margin: 50px 22px 0px 22px;
        span {
          color: white;
          font-weight: bold;
        }
        .big {
          font-size: 34px;
          font-family: PingFangSC-Semibold;
        }

        img.new-user {
          position: absolute;
          width: 62px;
          height: auto;
          right: 78px;
          top: -13px;
        }

        img.question {
          width: 18px;
          height: auto;
          display: inline-block;
          margin-left: 3px;
        }
      }

      .top-bottom {
        .current-persent {
          text-align: right;
          color: white;
          margin: 25px 22px 0px 22px;
          font-size: 10px;
          font-family: PingFangSC-Medium;
          font-weight: 500;
        }

        .bar-container {
          position: relative;
          margin: 5px 0px 12px 0px;
          height: 20px;
          overflow: hidden;

          .bar-wrapper {
            margin-left: 22px;
            margin-right: 22px;
            height: 100%;
            position: relative;
          }
          .rocket {
            position: absolute;
            width: 24px;
            height: auto;
            left: 49%;
            top: 0px;
            bottom: 0px;
            margin: auto;
            z-index: 4;
            transition: 1s all ease;
          }

          .transparent {
            height: 5px;
            width: 330px;
            border-radius: 10px;
            position: absolute;
            top: 0px;
            bottom: 0px;
            margin: auto;
            // margin-top: 1px;
            z-index: 2;
            background-color: rgba(255, 255, 255, 0.2);
          }

          .white {
            position: absolute;
            top: 0px;
            bottom: 0px;
            margin: auto;
            transition: 1s all ease;
            width: 50%;
            height: 7px;
            z-index: 3;
            background-color: rgba(255, 255, 255, 1);
            border-radius: 10px;
          }
        }

        .product-detail {
          font-size: 0px;

          .detail-item {
            display: inline-block;
            font-size: 12px;
            width: 33.3%;
            div {
              text-align: center;
              color: #f2f2f2;
              &:last-child {
                font-weight: bold;
                margin-top: 3px;
              }
            }
          }
        }
      }
    }

    .rate-desc {
      font-family: PingFangSC-Regular;
      text-align: center;
      font-size: 12px;
      color: #f2f2f2;
      margin-top: 5px;
    }

    .advantage-container {
      display: flex;
      height: 40px;
      line-height: 40px;
      background-color: white;
      .advantage-item {
        flex: 1;
        text-align: center;
        img {
          display: inline-block;
          vertical-align: middle;
          width: 18px;
          height: auto;
          margin-right: 10px;
        }
        span {
          display: inline-block;
          vertical-align: middle;
          font-size: 12px;
          color: #666666;
        }
      }
    }

    .steps-container {
      margin-top: 5px;
      img {
        display: block;
        width: 100%;
        height: auto;
      }
    }

    .detail-container {
      margin-top: 4px;
      .first {
        background-color: white;
        padding-left: 29px;
        height: 43px;
        line-height: 43px;
        position: relative;
        margin-bottom: 2px;

        span {
          &:first-child {
            font-size: 12px;
            color: #666666;
          }
          &:last-child {
            font-size: 10px;
            color: #666666;
            position: absolute;
            right: 20px;
            top: 0px;
            bottom: 0px;
            margin: auto;
          }
        }
      }

      a {
        display: block;
        background-color: white;
        padding-left: 29px;
        height: 43px;
        line-height: 43px;
        position: relative;

        span {
          font-size: 12px;
          color: #666666;
        }

        .right-arrow {
          position: absolute;
          width: 8px;
          height: auto;
          top: 0px;
          right: 18px;
          bottom: 0px;
          margin: auto;
        }
      }
    }

    .tips-container {
      font-size: 10px;
      text-align: center;
      margin-top: 20px;
      color: #cccccc;
    }
  }

  .second-page {
    position: absolute;
    top: 100%;
    width: 100%;
    height: 100%;
    transition: all 0.6s ease;
    background-color: white;

    .tabs-container {
      display: flex;
      height: 40px;
      line-height: 40px;
      border-bottom: 2px solid #f2f2f2;
      box-sizing: border-box;
      position: relative;
      .tab-item {
        flex: 1;
        text-align: center;
        font-size: 13px;
        color: #999999;
        transition: 0.5s all ease;

        &.chosen {
          color: #ee852a;
        }
      }

      .scroll-bar {
        position: absolute;
        transition: 0.5s all ease;
        bottom: -1.5px;
        width: 33.3%;
        height: 3px;
        background-color: #ee852a;
        left: 0px;
      }
    }

    .out-wrapper {
      height: 100%;
      overflow: scroll;
    }

    .passage-container {
      padding: 30px 22.5px;
    }

    .danger-tips {
      h3 {
        font-size: 13px;
        color: #666666;
        margin-bottom: 10px;
      }

      p {
        font-size: 12px;
        color: #999999;
        margin-bottom: 20px;
        text-indent: 20px;
        text-align: justify;
      }
    }

    .secure-guarantee {
      padding: 0px;
      padding-bottom: 90px;
      background-color: #f5f5f5;
      height: 100%;
      overflow: scroll;
      img {
        display: block;
        width: 100%;
        height: auto;
      }
    }

    .introduction-container {
      padding-bottom: 90px;
      height: 100%;
      overflow: scroll;
      h3 {
        font-size: 13px;
        color: #666666;
        margin-bottom: 10px;
      }
      p {
        font-size: 12px;
        color: #999999;
        margin-bottom: 15px;
        text-indent: 20px;
        text-align: justify;
      }
      img {
        display: block;
        width: 100%;
        margin: 10px 0px;
      }
    }
  }

  .cal-pay-container {
    position: fixed;
    bottom: 5px;
    padding: 0px 5px;

    img.cal {
      width: 45px;
      height: auto;
      display: inline-block;
      vertical-align: top;
    }

    button {
      display: inline-block;
      height: 45px;
      width: 315px;
      background-color: #fd6327;
      vertical-align: top;
      border-radius: 6px;
      font-size: 18px;
      color: white;
    }
  }
}
</style>
