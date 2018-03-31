<template>
  <div class="m-transfer-list">
    <div class="top">
      <p class="top-words">投资【债权转让】资金由系统智能匹配到当前转让的债权中，点击债权标的名称可查看标的详情。</p>
    </div>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th class="num">序号</th>
            <th class="owner">转让人</th>
            <th class="amount">转让金额(元)</th>
            <th class="company-name">债权标的名称</th>
            <th class="date">债权到期时间</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in tableData" :key="item.id">
            <td class="num">{{index + 1}}</td>
            <td class="owner">{{item.owner}}</td>
            <td class="amount">{{item.amount}}</td>
            <td class="company-name">{{item.name}}</td>
            <td class="date">{{item.date}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'transfer-claim-list',
  data() {
    return {
      tableData: [
        {
          owner: '李小白',
          amount: '1,625,738',
          name: '广州唯厘信息科技有限公司',
          date: '2018.2.3'
        },
        {
          owner: '李小白',
          amount: '1,625,738',
          name: '广州唯厘信息科技有限公司',
          date: '2018.2.3'
        },
        {
          owner: '李小白',
          amount: '1,625,738',
          name: '广州唯厘信息科技有限公司',
          date: '2018.2.3'
        },
        {
          owner: '李小白',
          amount: '1,625,738',
          name: '广州唯厘信息科技有限公司',
          date: '2018.2.3'
        },
        {
          owner: '李小白',
          amount: '1,625,738',
          name: '广州唯厘信息科技有限公司',
          date: '2018.2.3'
        },
        {
          owner: '李小白',
          amount: '1,625,738',
          name: '广州存货贷',
          date: '2018.2.3'
        }
      ]
    };
  },
  created() {
    console.log('heyta');
  }
};
</script>

<style lang="less">
.m-transfer-list {
  height: 100%;
  width: 100%;
  overflow: scroll;
  .top {
    height: 80px;
    background-color: #ff7e0e;
    position: relative;

    .top-words {
      padding: 0px 35px;
      box-sizing: border-box;
      font-size: 12px;
      height: 45px;
      color: #ffffff;
      line-height: 22px;
      position: absolute;
      top: 0px;
      bottom: 0px;
      margin: auto;
      &:before {
        position: absolute;
        content: '';
        width: 5px;
        height: 5px;
        background-color: white;
        border-radius: 50%;
        left: 20px;
        top: 8px;
      }
    }
  }

  .table-container {
    padding: 0px 20px;
    margin-top: 15px;

    table {
      width: 100%;
      border-collapse: collapse;

      th,
      td {
        text-align: center;
        font-size: 10px;
        color: #666666;
        padding: 0px;
      }

      thead {
        tr {
          height: 40px;
          line-height: 40px;
          border-bottom: 1px solid #e4e4e4;
          th {
            font-weight: bold;
            line-height: 20px;

            &.num {
              width: 30px;
            }

            &.owner {
              width: 60px;
            }

            &.amount {
              width: 80px;
            }

            &.date {
              width: 80px;
            }
          }
        }
      }

      tbody {
        tr {
          border-bottom: 1px solid #e4e4e4;
          height: 57px;
          line-height: 57px;

          td {
            line-height: 18px;
            padding: 0px 5px;
            &.company-name {
              color: #ff4e03;
            }
          }
        }
      }
    }
  }
}
</style>
