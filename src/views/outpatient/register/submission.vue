<template>
  <div class="submission">
    <el-card shadow="nerver">
      <div slot="header" class="clearfix">
        <span class="header">XXX互联网医院</span>
      </div>
      <div>
        <div class="title green">
          <span>已选条件:</span>
          <el-tag
            v-for="tag in tags"
            :key="tag.name"
            closable
            :type="tag.type"
            class="tag"
          >{{tag.name}}</el-tag>
        </div>
        <div class="condition">
          <div class="list">
            <div class="left">
              <div class="line">科室选择:</div>
            </div>
            <div class="right">
              <div class="tag" v-for="tag in Departments" :key="tag">{{tag}}</div>
            </div>
          </div>
          <div class="list">
            <div class="left">
              <div class="line">医生职称:</div>
            </div>
            <div class="right">
              <div class="tag" v-for="tag in doctors" :key="tag">{{tag}}</div>
            </div>
          </div>
          <div class="list">
            <div class="left">
              <div class="line">地区选择:</div>
            </div>
            <div class="right"></div>
          </div>
        </div>
      </div>
      <div class="result">
        <div style="text-align:center;">
          <div class="card" :style="{background:`url(${morning})`}">
            <div class="line" style="margin-top: 40px;">医生人数: 16人</div>
            <div class="line" style="margin-top: 6px;">候诊人数: 3人</div>
          </div>
          <el-button
            type="primary"
            plain
            size="small"
            style="width:150px; margin-top:12px;"
            @click="next"
          >挂 号</el-button>
        </div>
        <div style="text-align:center;">
          <div class="card" :style="{background:`url(${afternoon})`}">
            <div class="line" style="margin-top: 40px;">医生人数: 16人</div>
            <div class="line" style="margin-top: 6px;">候诊人数: 3人</div>
          </div>
          <el-button
            type="primary"
            plain
            size="small"
            style="width:150px; margin-top:12px;"
            @click="next"
          >挂 号</el-button>
        </div>
        <div style="text-align:center;">
          <div class="card" :style="{background:`url(${night})`}">
            <div class="line" style="margin-top: 40px;">医生人数: 16人</div>
            <div class="line" style="margin-top: 6px;">候诊人数: 3人</div>
          </div>
          <el-button
            type="primary"
            plain
            size="small"
            style="width:150px; margin-top:12px;"
            @click="next"
          >挂 号</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
//处方申请
import { Navbar } from "@/views/layout/components";
import { _queryRegisterListForPatient } from "@/api/patient";
import moment from "moment";

import register from "./register";
import morning from "@/assets/images/morning.png";
import afternoon from "@/assets/images/afternoon.png";
import night from "@/assets/images/night.png";

export default {
  components: {
    Navbar,
    register
  },
  data() {
    return {
      active: 0,
      dialogData: {
        list: []
      },
      morning: morning,
      afternoon: afternoon,
      night: night,
      drugData: {},
      drugs: [],
      tags: [
        { name: "血液科", type: "" },
        { name: "主任医生", type: "success" }
      ],
      Departments: [
        "儿科",
        "儿科",
        "儿科",
        "儿科",
        "儿科",
        "儿科",
        "儿科",
        "儿科",
        "儿科",
        "儿科",
        "儿科",
        "儿科",
        "儿科",
        "儿科",
        "儿科",
        "儿科",
        "儿科",
        "儿科",
        "儿科",
        "儿科",
        "儿科",
        "儿科",
        "儿科",
        "儿科",
        "儿科",
        "儿科",
        "儿科",
        "儿科",
        "儿科"
      ],
      doctors: ["主任医师", "副主任医师", "主治医生"]
    };
  },
  methods: {
    next(step) {
      this.$emit("next", 2);
    },
    selectDrug() {}
  }
};
</script>
<style lang="scss">
.submission {
  .el-form-item {
    margin-bottom: 0;
  }
  .top-card {
    width: 100%;
    border-style: solid;
    border-radius: 4px 4px 0 0;
  }
  .card-bottom {
    width: 100%;
    border-style: none solid solid solid;
    border-radius: 0 0 4px 4px;
  }
}
</style>


<style lang="scss" scoped>
$padding: 24px;
.submission {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0px;
  padding: $padding;
  border: 1px solid white;
  overflow: auto;
  .flex-row {
    display: flex;
    flex-direction: row;
  }
  .title {
    color: rgb(110, 110, 110);
    // border-left: 2px solid rgb(96, 197, 153);
    border-left-style: solid;
    border-left-width: 2px;
    text-indent: 12px;
    font-size: 14px;
    margin-bottom: 12px;
  }
  .tag {
    text-indent: 0;
    margin-left: 12px;
  }
  .green {
    border-left-color: rgb(96, 197, 153);
  }
  .red {
    border-left-color: red;
  }
  .header {
    font-size: 16px;
  }
  .condition {
    border: 1px solid rgb(227, 227, 227);
    .list {
      border-bottom: 1px solid rgb(227, 227, 227);
      display: flex;
      flex-direction: row;
      .left {
        width: 20%;
        min-width: 100px;
        max-width: 100px;
        flex-grow: 0;
        // border-right: 1px solid red;
        text-align: right;
        padding-right: 12px;
      }
      .right {
        display: flex;
        flex-grow: 1;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: flex-start;
        padding: 5px 0;
        .tag {
          display: inline-block;
          height: 30px;
          line-height: 30px;
          border-radius: 3px;
          padding: 0px 6px;
          cursor: pointer;
          &:hover {
            background-color: rgb(105, 197, 148);
            color: white;
          }
        }
      }
      &:last-child {
        border-bottom-style: none;
      }
      .line {
        height: 40px;
        line-height: 40px;
      }
    }
  }
  .result {
    margin-top: 24px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .card {
      width: 300px;
      height: 124px;
      background: rgb(97, 208, 211);
      border-radius: 5px;
      background-size: 100% 100%;
      .time {
        color: white;
        font-size: 12px;
        line-height: 30px;
        text-align: left;
        text-indent: 12px;
      }
      .line {
        display: inline-block;
        width: 150px;
        height: 30px;
        line-height: 30px;
        background: white;
        border-radius: 3px;
      }
    }
  }
}
</style>

