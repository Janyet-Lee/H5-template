<template>
  <div class="m-investment">
    <div class="first-page">
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
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
.m-investment {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  .first-page {
    .top-container {
      position: relative;
      background-color: #fe5812;
      height: 255px;
      overflow: hidden;
      // padding: 0px 22px;
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
  }
}
</style>
