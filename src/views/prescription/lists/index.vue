<template>
  <div class="app-body">
    <Navbar>
      <div slot="search">
        <el-input
          size="small"
          v-model="search.keyword"
          suffix-icon="el-icon-search"
          placeholder="姓名/手机号码/会员卡"
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
      <!-- <div slot="options">
        <el-button size="small" class="right" type="primary" @click="add">添加药品</el-button>
      </div>-->
    </Navbar>
    <div class="drugs">
      <el-table :data="data" border size="small" :height="height" v-loading="dataLoading">
        <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
        <el-table-column prop="name" label="居民姓名" width="200" align="center">
          <template slot-scope="scope">
            <div>{{scope.row.name}}</div>
            <div>
              <span>规格：</span>
              <span>{{scope.row.stockTotal}} {{scope.row.dosageUnit}} / {{scope.row.unit}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="age" label="性别" align="center"></el-table-column>
        <el-table-column prop="manufacturer" label="年龄" width="150" align="center"></el-table-column>
        <!-- <el-table-column prop="iphone" label="处方类型" align="center"></el-table-column> -->
        <el-table-column
          prop="tag"
          align="center"
          label="处方类型"
          width="150"
          :filters="[{ text: '中药处方', value: '1' }, { text: '西药处方', value: '2' }]"
          :filter-method="filterTag"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.tag === '家' ? 'primary' : 'success'"
              disable-transitions
            >{{scope.row.tag}}</el-tag>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="validDate" label="审核状态" width="150" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.validDate | dataFrm}}</span>
          </template>
        </el-table-column>-->
        <el-table-column
          prop="tag"
          align="center"
          label="审核状态"
          width="150"
          :filters="[{ text: '医师审核中', value: '1' }, { text: '药师审核中', value: '2' },{ text: '已提交', value: '3' },{ text: '已完成', value: '4' }]"
          :filter-method="filterTag"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.tag === '家' ? 'primary' : 'success'"
              disable-transitions
            >{{scope.row.tag}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="amount" width="80" label="申请时间" align="center"></el-table-column>
        <el-table-column prop="transPrice" width="80" label="会员号" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              v-if="muti == 1"
              type="primary"
              @click="pharmacyPutAway(scope.row.artId)"
            >上架</el-button>
            <el-button
              size="mini"
              v-if="muti == 0"
              type="danger"
              @click="pharmacySoldOut(scope.row.artId)"
            >下架</el-button>
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
    <!-- <costomDialog ref="dialog"/> -->
  </div>
</template>
<script>
import { Navbar } from "@/views/layout/components";
// import costomDialog from "./dialog/index";
import { mapGetters } from "vuex";
import {
  _getAllGroundingDrugs,
  _getAllUndercarriageDrugs,
  _pharmacySoldOut,
  _pharmacyPutAway
} from "@/api/drugs";
import moment from "moment";
export default {
  components: {
    Navbar
    // costomDialog
  },
  data() {
    return {
      search: {
        drugName: "",
        orgId: 1,
        pageNum: 1,
        pageSize: 20
      },
      total: 0,
      muti: "0",
      data: [],
      dataLoading: false,
      height: 600
    };
  },
  computed: {
    ...mapGetters(["token"])
  },
  mounted() {
    this.query();
    this.getHeight();
    window.onresize = () => {
      this.getHeight();
    };
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
      if (this.muti == 0) {
        _getAllGroundingDrugs(this.search).then(({ data, code }) => {
          this.dataLoading = false;
          if (code != 200) return;
          const res = data;
          // this.data = res && res.list;
          this.total = parseInt(res.total);
        });
      } else if (this.muti == 1) {
        _getAllUndercarriageDrugs(this.search).then(({ data, code }) => {
          this.dataLoading = false;
          if (code != 200) return;
          const res = data;
          this.data = res && res.list;
          this.total = parseInt(res.total);
        });
      }
    },
    handleSizeChange(val) {
      this.search.pageSize = val;
      this.query();
    },
    handleCurrentChange(val) {
      this.search.pageNum = val;
      this.query();
    },
    add() {
      this.$refs.dialog.openDialog({
        title: "添加药品",
        data: {}
      });
    },
    filterTag() {}, //商品下架
    pharmacySoldOut(artId) {
      _pharmacySoldOut({
        orgId: 1,
        artId: artId
      }).then(({ code, data, msg }) => {
        if (code == 200) {
          this.$message({ type: "success", message: "下架成功" });
        } else {
          this.$message({ type: "error", message: msg });
        }
      });
    },
    //商品上架
    pharmacyPutAway(artId) {
      _pharmacyPutAway({
        userId: parseInt(this.token.userId),
        list: [
          {
            orgId: 2,
            artId: artId
          }
        ]
      }).then(({ code, data, msg }) => {
        if (code == 200) {
          this.$message({ type: "success", message: "上架成功" });
        } else {
          this.$message({ type: "error", message: msg });
        }
      });
    }
  }
};
</script>

<style lang="scss">
$padding: 24px;
.app-body {
  .checkbox {
    position: relative;
    display: inline-block;
    top: -1px;
    margin-left: 12px;
  }
  .drugs {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 50px;
    padding: $padding;
    border: 1px solid white;
    // padding: $padding;
    // overflow: auto;
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

