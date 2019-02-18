<template>
  <div class="app-body">
    <Navbar>
      <div slot="options">
        <el-button type="primary" size="small" @click="toLists">
          <svg-icon icon-class="back"></svg-icon>
          <span>返回</span>
        </el-button>
      </div>
    </Navbar>
    <div class="onlineOrderDetail">
      <el-card shadow="hover">
        <el-row>
          <el-col :span="6">
            <div class="item">
              <span class="label">姓名:</span>
              <span class="value">{{detailData.realName || '--'}}</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="item">
              <span class="label">电话号码:</span>
              <span
                class="value"
              >{{ detailData.orderAddr ? detailData.orderAddr.contactPhone : '--'}}</span>
            </div>
          </el-col>
        </el-row>
        <el-row style="margin-top:24px;">
          <div>
            <span class="label">取货码:</span>
            <el-input class="value" style="width:300px;" size="small" placeholder="请输入订单取货码"></el-input>
            <span>
              <svg-icon icon-class="barCode" class="barCode"></svg-icon>
            </span>
            <el-button type="primary" size="small" style="position:relative;top:-1px;">确认</el-button>
          </div>
        </el-row>
      </el-card>
      <el-card shadow="hover" style="margin-top: 24px;">
        <div slot="header" class="card-header">
          <div>
            <span style="color: #3EC78F; font-size: 18px;">药品订单</span>
            <span>
              (共
              <span style="color:red">{{detailData.totalAmount || 0}}</span> 种药品)
            </span>
          </div>
          <div>
            <span>订单编号:</span>
            <span>{{detailData.orderNo || '--'}}</span>
          </div>
          <div>
            <span>
              <svg-icon icon-class="date"></svg-icon>
              <span>{{detailData.orderDate | dataFrm}}</span>
            </span>
          </div>
        </div>
        <el-table
          border
          :data="detailData.orderDetails"
          size="small"
          :span-method="objectSpanMethod"
        >
          <el-table-column label="药品信息" width="300" align="center">
            <template slot-scope="scope">
              <div class="name-container">
                <div class="img">
                  <img src alt>
                </div>
                <div class="details">
                  <div>{{scope.row.article.name || '--'}}</div>
                  <div>
                    <span>规格:</span>
                    <span>{{scope.row.article.code}}</span>
                    <span>{{scope.row.article.spec}}</span>
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="realName" label="药品厂家" width="200" align="center">
            <template slot-scope="scope">
              <div>{{scope.row.article.manufacturer}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="amount" label="数量" width="200" align="center"></el-table-column>
          <el-table-column prop="price" label="单价(元)" align="center"></el-table-column>
          <el-table-column prop="totalAmount" label="实际付款(元)" align="center"></el-table-column>
          <el-table-column prop="orderStatus" label="交易状态" align="center">
            <template slot-scope="scope">
              <span>{{checkStatus(scope.row.orderStatus)}}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>
<script>
import { Navbar } from "@/views/layout/components";
import { _getOrderDetailsByOrderId } from "@/api/onlineOrder";
import moment from "moment";
export default {
  components: {
    Navbar
  },
  data() {
    return {
      search: {
        orderNo: null
      },
      total: 0,
      height: 600,
      detailData: {
        orderNo: "001181012172933762",
        orderId: 105,
        orderStatus: 3,
        userId: 24,
        orgId: 9,
        orderDetails: [
          {
            total: 2,
            amount: 2,
            artId: 1,
            orderId: 105,
            totalAmount: 2121,
            orderStatus: 1,
            price: 1,
            displayOrder: 2,
            article: {
              unit: "盒",
              code: "a",
              name: "头孢颗粒",
              spec: "50mg/次",
              manufacturer: "阿里制造"
            }
          },
          {
            total: 2,
            amount: 2,
            artId: 2,
            orderId: 105,
            price: 1,
            displayOrder: 3,
            article: {
              unit: "瓶",
              code: "b",
              name: "霉素酸灵阵",
              spec: "150ml/瓶",
              manufacturer: "阿里制造"
            }
          },
          {
            total: 2,
            amount: 2,
            artId: 3,
            orderId: 105,
            price: 1,
            displayOrder: 4,
            article: {
              unit: "瓶",
              code: "c",
              name: "霉素酸灵阵",
              spec: "150ml/瓶",
              manufacturer: "阿里制造"
            }
          },
          {
            total: 2,
            amount: 2,
            artId: 4,
            orderId: 105,
            price: 1,
            displayOrder: 1,
            article: {
              unit: "盒",
              code: "e",
              name: "头孢颗粒",
              spec: "50mg/次",
              manufacturer: "辉瑞制药有限公司"
            }
          }
        ],
        totalAmount: 9,
        realName: "test",
        deliveryFee: 1,
        rcpSeqid: 1,
        srcId: 1,
        rushStatus: 0,
        zoneId: 887,
        orderDate: "Oct 12, 2018 12:00:00 AM",
        payStatus: 0,
        orderAddr: {
          address: "??? ??? ???????10?802",
          contactPerson: "test",
          contactPhone: "15901038240"
        }
      },
      dataLoading: false
    };
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      this.search.orderNo = parseInt(this.$route.params.id);
    } else {
      this.toLists();
    }
  },
  mounted() {
    this.query();
  },
  filters: {
    dataFrm(val) {
      return moment(val).format("YYYY-MM-DD HH:mm");
    }
  },
  methods: {
    getHeight() {
      const bodyHeight = document
        .querySelector(".app-main")
        .getBoundingClientRect().height;
      this.height = bodyHeight - 50 - 100;
    },
    query() {
      this.dataLoading = true;
      _getOrderDetailsByOrderId(this.search).then(
        ({ code, data: { data } }) => {
          this.dataLoading = false;
          if (code != 200) return;
          // const res = data && data.orders;
          // this.data = res && res.list;
          // console.log(this.data);
          // this.total = parseInt(res.total);
        }
      );
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 4) {
        return [4, 1];
      }
      if (columnIndex == 5) {
        return [5, 1];
      }
    },
    //确认订单状态
    checkStatus(val) {
      switch (val) {
        case 1:
          return "待付款";
        case 2:
          return "待发货";
        case 3:
          return "待自取";
        case 4:
          return "配送中";
        case 5:
          return "已完成";
        default:
          return "";
      }
    },
    toLists() {
      this.$router.push({
        path: `/onlineOrder`
      });
    }
  }
};
</script>

<style lang="scss" scoped>
$padding: 24px;
.app-body {
  .onlineOrderDetail {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 50px;
    padding: $padding;
    border: 1px solid white;

    .header {
      margin-bottom: $padding;
    }
    .footer {
      margin-top: $padding;
    }
  }
  .value {
    margin-left: 12px;
  }
  .barCode {
    font-size: 36px;
    position: relative;
    top: 7px;
    color: #3ec78f;
    cursor: pointer;
    &:hover {
      color: rgb(101, 210, 165);
    }
  }

  .card-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    & > div {
      line-height: 26px;
    }
  }
  .name-container {
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    .img {
      border: 1px solid #ccc;
      height: 100%;
      width: 60px;
    }
    .details {
      flex-grow: 1;
      margin-left: 12px;
      font-size: 12px;
      & > div {
        height: 25px;
        line-height: 25px;
        text-align: left;
      }
    }
  }
}
</style>

