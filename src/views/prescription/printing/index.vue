<template>
  <div class="app-body">
    <Navbar>
      <div slot="search">
        <el-input
          size="small"
          v-model="search.keyword"
          suffix-icon="el-icon-search"
          placeholder="姓名/手机号/会员卡"
          style="width: 300px;"
        />
      </div>
    </Navbar>
    <div class="print">
      <div class="table-card">
        <el-card
          shadow="hover"
          class="card"
          v-for="item in data"
          :key="item.id"
          @click.native="openDialog(item)"
        >
          <div class="flex-row">
            <div class="left"></div>
            <div class="right">
              <div class="flex-row justify-between line-height">
                <span style="font-size: 16px">{{item.name1}}</span>
                <span style="font-size: 12px;">{{item.name2}}</span>
                <span style="font-size: 12px;">{{item.name3}}岁</span>
                <span style="font-size:18px;">
                  <svg-icon icon-class="prescription-drug" v-if="item.type == 2"/>
                  <svg-icon icon-class="no-prescription-drug" v-if="item.type == 1"/>
                </span>
              </div>
              <div class="line-height">
                <span style="font-size: 12px">诊断: {{item.name4}}</span>
              </div>
              <div class="line-height">
                <span style="font-size: 12px">开方时间: {{item.name5}}</span>
              </div>
            </div>
          </div>
        </el-card>
      </div>
      <div class="paging">
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
    <prescription-dialog ref="dialog"/>
  </div>
</template>
<script>
import { Navbar } from "@/views/layout/components";
import { _queryRegisterListForPatient } from "@/api/patient";
import prescriptionDialog from "./dialog/index.vue";
import moment from "moment";
export default {
  components: {
    Navbar,
    prescriptionDialog
  },
  data() {
    return {
      search: {
        orgId: 12,
        name: "",
        beginDate: "2018-09-20",
        endDate: "2019-11-29",
        soft: "desc",
        pageNum: 1,
        pageSize: 20,
        businessType: 1
      },
      total: 0,
      height: 600,
      data: [
        {
          id: 1,
          name1: "刘艳",
          name2: "女",
          name3: "32",
          type: 1,
          name4: "冠心病",
          name5: "2018-02-16 8:00"
        },
        {
          id: 2,
          name1: "刘艳",
          name2: "女",
          name3: "32",
          type: 2,
          name4: "冠心病",
          name5: "2018-02-16 8:00"
        },
        {
          id: 3,
          name1: "刘艳",
          name2: "女",
          name3: "32",
          type: 2,
          name4: "冠心病",
          name5: "2018-02-16 8:00"
        },
        {
          id: 4,
          name1: "刘艳",
          name2: "女",
          name3: "32",
          type: 2,
          name4: "冠心病",
          name5: "2018-02-16 8:00"
        },
        {
          id: 5,
          name1: "刘艳",
          name2: "女",
          name3: "32",
          type: 2,
          name4: "冠心病",
          name5: "2018-02-16 8:00"
        },
        {
          id: 6,
          name1: "刘艳",
          name2: "女",
          name3: "32",
          type: 2,
          name4: "冠心病",
          name5: "2018-02-16 8:00"
        },
        {
          id: 7,
          name1: "刘艳",
          name2: "女",
          name3: "32",
          type: 2,
          name4: "冠心病",
          name5: "2018-02-16 8:00"
        },
        {
          id: 8,
          name1: "刘艳",
          name2: "女",
          name3: "32",
          type: 2,
          name4: "冠心病",
          name5: "2018-02-16 8:00"
        }
      ],
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
      _queryRegisterListForPatient(params).then(({ code, data: { data } }) => {
        this.dataLoading = false;
        if (code != 200) return;
        if (data) {
          // const res = data.lists;
          this.total = parseInt(res.total);
        }
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
    openDialog(data) {
      this.$refs.dialog.openDialog({
        title: "处方",
        data
      });
    }
  }
};
</script>

<style lang="scss">
.print {
  .el-card__body {
    padding: 12px;
  }
}
</style>


<style lang="scss" scoped>
$padding: 24px;
.app-body {
  .print {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 50px;
    padding: $padding;
    border: 1px solid white;

    .table-card {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      justify-content: flex-start;
      flex-wrap: wrap;
      .card {
        width: 200px;
        margin-right: 24px;
        margin-bottom: 24px;
        .left {
          width: 25px;
        }
        .right {
          flex-grow: 1;
        }
      }
      .table-card {
      }
    }

    .flex-row {
      display: flex;
      flex-direction: row;
    }
    .justify-between {
      justify-content: space-between;
    }
    .line-height {
      line-height: 20px;
    }
    .paging {
      position: fixed;
      bottom: 24px;
    }
  }
}
</style>

