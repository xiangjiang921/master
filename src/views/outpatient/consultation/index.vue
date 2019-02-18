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
        <el-radio-group v-model="muti" size="small" @change="query">
          <el-radio label="0" border>候诊中</el-radio>
          <el-radio label="1" border>就诊中</el-radio>
          <el-radio label="2" border>已完成</el-radio>
        </el-radio-group>
      </div>
      <div slot="options">
        <el-select style="width:80px" size="small" v-model="time" placeholder="请选择">
          <el-option v-for="item in times" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </div>
    </Navbar>
    <div class="consultation">
      <div class="consultation-body">
        <el-card shadow="hover" v-for="item in consultations" :key="item.id">
          <div class="card">
            <div class="body" :style="{background: `url(${bg})`}">
              <div class="left">
                <div class="portrait" :style="{backgroundImage: `url(${userUrl})`}"></div>
              </div>
              <div class="right">
                <div style="font-size:14px;">姓名: 王小菲</div>
                <div>
                  <span>23岁</span>
                  <span>女</span>
                </div>
                <div>2018/02/08</div>
              </div>
            </div>
            <div class="footer">
              <el-button type="text">查看信息</el-button>
            </div>
          </div>
        </el-card>
      </div>
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
import { mapGetters } from "vuex";
import {
  _getAllGroundingDrugs,
  _getAllUndercarriageDrugs,
  _pharmacySoldOut,
  _pharmacyPutAway
} from "@/api/drugs";
import moment from "moment";
import bgUrl from "@/assets/images/65.png";
import userUrl from "@/assets/images/56.png";
export default {
  components: {
    Navbar
  },
  data() {
    return {
      search: {
        drugName: "",
        orgId: 1,
        pageNum: 1,
        pageSize: 20
      },
      bg: bgUrl,
      userUrl,
      time: null,
      times: ["上午", "下午", "晚上"],
      total: 0,
      muti: "0",
      data: [],
      dataLoading: false,
      height: 600,
      consultations: [{}]
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
          this.data = res && res.list;
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
    //商品下架
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
  .consultation {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 50px;
    padding: $padding;
    border: 1px solid white;
    display: flex;
    flex-direction: column;
    .el-card__body {
      padding: 0;
    }
    .consultation-body {
      flex-grow: 1;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: flex-start;
      .card {
        border-radius: 5px;
        width: 300px;
        height: 150px;
        display: flex;
        flex-direction: column;
        .body {
          flex-grow: 1;
          background-size: 100% 100%;
          display: flex;
          flex-direction: row;
          .left {
            width: 80px;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            .portrait {
              border: 1px solid white;
              border-radius: 50%;
              width: 60px;
              height: 60px;
              background-repeat: no-repeat;
              background-size: 100% 100%;
            }
          }
          .right {
            flex-grow: 1;
            color: white;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            padding: 12px 0;
            font-size: 12px;
          }
        }
        .footer {
          text-align: center;
          height: 40px;
          border-top: 1px solid rgb(236, 236, 236);
        }
      }
    }
    // padding: $padding;
    // overflow: auto;
    .header {
      margin-bottom: $padding;
    }
    .right {
      float: right;
    }
  }
}
</style>

