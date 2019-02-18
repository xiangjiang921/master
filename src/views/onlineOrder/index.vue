<template>
  <div class="app-body">
    <Navbar>
      <div slot="search">
        <el-input
          size="small"
          v-model="search.keyword"
          suffix-icon="el-icon-search"
          placeholder="姓名/订单号"
          style="width: 300px;"
        />
        <el-date-picker
          size="small"
          v-model="search.date"
          type="datetimerange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['12:00:00']"
        ></el-date-picker>
      </div>
      <div slot="options">
        <div style="margin-top: 12px">
          <el-checkbox-group v-model="search.orderStatus" size="small" @change="query">
            <el-checkbox label="3" border>待自取</el-checkbox>
            <el-checkbox label="4" border>已完成</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
    </Navbar>
    <div class="patient">
      <el-table :data="data" border size="small" :height="height" v-loading="dataLoading">
        <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
        <el-table-column prop="orderNo" label="订单编号" width="200" align="center"></el-table-column>
        <el-table-column prop="realName" label="居民姓名" width="200" align="center"></el-table-column>
        <el-table-column prop="orderTime" label="申请时间" width="200" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.orderTime | dataFrm}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="totalAmount" label="实际付款(元)" align="center"></el-table-column>
        <el-table-column prop="orderStatus" label="交易状态" align="center">
          <template slot-scope="scope">
            <span>{{checkStatus(scope.row.orderStatus)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="toDetail(scope.row.orderNo)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="footer">
        <el-pagination
          background
          layout="total,sizes,prev, pager, next"
          :total="total"
          :current-page.sync="search.pageNum"
          :page-size="search.pageSize"
          :page-sizes="[10,20,50,100]"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          @prev-click="query"
          @next-click="query"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { Navbar } from "@/views/layout/components";
import { _getAllOrders } from "@/api/onlineOrder";
import moment from "moment";
export default {
  components: {
    Navbar
  },
  data() {
    return {
      search: {
        realName: null,
        orderNo: null,
        orgId: 9,
        beginDate: "2018-09-01",
        endDate: "2018-09-30",
        orderStatus: ["3", "4"],
        sort: "desc",
        pageNum: 1,
        pageSize: 20
      },
      total: 0,
      height: 600,
      data: [],
      dataLoading: false
    };
  },
  mounted() {
    this.getHeight();
    window.onresize = () => {
      this.getHeight();
    };
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
      const params = Object.assign({}, this.search);
      params.orderStatus = params.orderStatus.join(",");
      _getAllOrders(params).then(({ code, data: { data } }) => {
        this.dataLoading = false;
        if (code != 200) return;
        const res = data && data.orders;
        this.data = res && res.list;
        console.log(this.data);
        this.total = parseInt(res.total);
      });
    },
    handleSizeChange(val) {
      this.search.pageSize = val;
      this.query();
    },
    handleCurrentChange(val) {
      this.search.pageNum = val;
      this.query();
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
    toDetail(id) {
      this.$router.push({
        path: `/onlineOrder/detail/${id}`
      });
    }
  }
};
</script>

<style lang="scss">
$padding: 24px;
.app-body {
  .patient {
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
    .right {
      float: right;
    }
  }
}
</style>

