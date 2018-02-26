<template>
  <div class="m-reward">
    <div class="list-container">
      <div v-for="item in rewardArray" :key="item.id" :class="{'list-item': true, 'ticket1': +item.product_type === 4, 'ticket2': +item.product_type === 3}">
        <div class="top">
          <div class="left">
            <p v-if="+item.product_type === 3" class="type">红包</p>
            <p v-if="+item.product_type === 4" class="type">加息券</p>
            <p class="detail">
              <span v-if="+item.product_type === 3">￥{{Number.parseInt(item.amount)}}</span>
              <span v-if="+item.product_type === 3" class="danwei">元</span>
              <span v-if="+item.product_type === 4">{{item.amount * 100}}%</span>
            </p>
          </div>
          <div class="right">
            <p>金额≥{{Number.parseInt(item.requiredvalue)}}元</p>
            <p>有限期{{item.validdays}}天</p>
          </div>
        </div>
        <div class="bottom">请到APP-我的优惠券中查看并使用</div>
        <!-- <div v-if="+item.product_type === 4" class="bottom">请到APP-我的余额中查看</div> -->
      </div>
      <!-- <div class="list-item ticket1">
        <div class="top">
          <div class="left">
            <p class="type">红包</p>
            <p class="detail">
              <span>￥52</span>
              <span>元</span>
            </p>
          </div>
          <div class="right">
            <p>金额≥5001元</p>
            <p>有限期150天</p>
          </div>
        </div>
        <div class="bottom">请到APP-我的优惠券中查看并使用</div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { Toast, Indicator } from 'mint-ui';

export default {
  components: {},
  data() {
    return {
      rewardArray: []
    };
  },
  created() {},
  async mounted() {
    Indicator.open('获取奖品数据中...');
    const { code, data } = await this.$request.get('/ActivityDogYear/myprize');
    Indicator.close();
    if (code === 1) {
      this.rewardArray = data;
    } else {
      Toast('您暂时还没有奖品\n参加活动可获得丰富奖品');
    }
  },
  methods: {}
};
</script>

<style lang="less" >
.m-reward {
  width: 100%;
  height: 100%;
  overflow: hidden;
  // background: linear-gradient(to top, #ebac32, #fedc29);
  background-color: #e6e6e6;

  .list-container {
    width: 100%;
    height: 100%;
    padding-top: 15px;
    box-sizing: border-box;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    .list-item {
      background-color: white;
      margin: 0 10px;
      height: 145px;
      border-radius: 5px;
      margin-bottom: 20px;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: 50% 50%;
      &.ticket1 {
        background-image: url('../assets/reward/ticket1.png');
      }

      &.ticket2 {
        background-image: url('../assets/reward/ticket2.png');
      }

      div.top {
        overflow: hidden;

        .left {
          float: left;
          padding-left: 16px;

          .type {
            margin-top: 20px;
            font-size: 20px;
            padding-left: 4px;
            color: white;
          }

          .detail {
            margin-top: 2px;
            position: relative;
            top: -5px;
            span {
              display: inline-block;
              &:first-child {
                font-size: 40px;
                font-weight: bold;
                color: white;
                text-align: left;
                margin-right: 6px;
              }

              &.danwei {
                color: white;
                font-size: 16px;
                font-weight: bold;
              }
            }
          }
        }

        .right {
          float: right;
          margin-top: 25px;
          margin-right: 20px;

          p {
            font-size: 16px;
            font-weight: bold;
            color: white;
            &:first-child {
              margin-bottom: 7px;
            }
          }
        }
      }

      div.bottom {
        font-size: 14px;
        line-height: 43px;
        color: #999999;
        text-align: center;
      }
    }
  }
}
</style>
