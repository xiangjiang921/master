<template>
  <div class="submission">
    <el-form>
      <el-card shadow="nerver" class="top-card">
        <div class="submission-body">
          <div class="left">
            <div class="title green">患者信息</div>
            <div class="flex-row">
              <el-form-item label="姓名:" label-width="80px" prop="cardNumber">张三</el-form-item>
              <el-form-item label="性别:" label-width="80px" prop="cardNumber">女</el-form-item>
              <el-form-item label="年龄:" label-width="80px" prop="cardNumber">12岁</el-form-item>
            </div>
            <div class="flex-row">
              <el-form-item label="既往史:" label-width="80px" prop="cardNumber">无</el-form-item>
              <el-form-item label="过敏史:" label-width="80px" prop="cardNumber">无</el-form-item>
            </div>
            <div>
              <el-form-item label="疾病描述:" label-width="80px" prop="cardNumber">
                <el-input v-model.trim="dialogData.cardNumber" size="small" placeholder></el-input>
              </el-form-item>
            </div>
            <div style="margin-top:6px;margin-bottom:12px;">
              <el-form-item label="疾病描述:" label-width="80px" prop="cardNumber">
                <el-button type="primary" size="small">选择历史处方</el-button>
                <el-button size="small">申请新处方</el-button>
              </el-form-item>
            </div>
            <div>
              <el-card shadow="hover" class="prescription">
                <el-button size="small">选择新处方</el-button>
              </el-card>
            </div>
            <div>
              <el-form-item label="处方类型:" label-width="80px" prop="cardNumber">
                <el-radio-group v-model="dialogData.type">
                  <el-radio :label="0">西药处方申请</el-radio>
                  <el-radio :label="1">中药处方申请</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
          </div>
          <div class="right">
            <div class="title red">必选事项</div>
            <el-form-item label-width="0px" prop="cardNumber">
              <el-checkbox-group v-model="dialogData.list">
                <div>
                  <el-checkbox :label="0">因慢性病患者长期在医院就诊,长期遵医嘱使用此药,未观察到药物副作用.</el-checkbox>
                </div>
                <div>
                  <el-checkbox :label="1">此前患这一疾病时,曾遵医嘱使用此药物,效果良好,未观察到药物副作用.</el-checkbox>
                </div>
                <div>
                  <el-checkbox :label="2">已办理长期慢病门诊,长期遵医嘱使用此药物,未观察到药物副作用.</el-checkbox>
                </div>
                <div>
                  <el-checkbox :label="3">根据刘艳的用药史,确保对此药不过敏.</el-checkbox>
                </div>
              </el-checkbox-group>
            </el-form-item>
          </div>
        </div>
      </el-card>
      <el-card class="card-bottom">
        <div class="title green">建议用药</div>
        <el-form label-width="80px" :inline="true" :model="drugData">
          <el-form-item label="药品名称:" label-width="80px" prop="cardNumber">
            <el-select
              v-model="drugData.cardNumber"
              multiple
              filterable
              remote
              size="small"
              reserve-keyword
              placeholder="请输入关键词"
              :remote-method="selectDrug"
              :loading="selectDrugLoading"
            >
              <el-option
                v-for="item in drugs"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="单价:" label-width="80px" prop="cardNumber">
            <el-input-number
              v-model="drugData.gandna"
              :step="1"
              :controls="false"
              :max="1000000"
              size="small"
              style="width:80;margin-right:12px;"
            ></el-input-number>元
          </el-form-item>
          <el-form-item label="单价:" label-width="80px" prop="cardNumber">
            <el-input-number
              v-model="drugData.gandna"
              :step="1"
              :controls="false"
              :max="1000000"
              size="small"
              style="width:80;margin-right:12px;"
            ></el-input-number>
            <el-select v-model="drugData.region" size="small" style="width:70px" placeholder>
              <el-option label="盒" value="shanghai">盒</el-option>
              <el-option label="只" value="beijing">只</el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" style="width:100px;">保存</el-button>
          </el-form-item>
          <div class="medication-body">
            <div class="medication-list" v-for="item in medication" :key="item.id">
              <div class="left">药品名:</div>
              <div class="center">
                <div class="flex-row" style="justify-content: space-between">
                  <span>
                    {{item.name}}
                    <svg-icon icon-class="prescription-drug" v-if="item.type == 2"/>
                    <svg-icon icon-class="no-prescription-drug" v-if="item.type == 1"/>
                  </span>
                  <span>{{item.name5}} {{item.name6}}</span>
                </div>
                <div
                  class="flex-row"
                  style="justify-content: space-between;font-size:12px;color: rgb(205,206,207)"
                >
                  <span>通用名: {{item.name1}}</span>
                  <span>剂型: {{item.name1}}</span>
                  <span>规格: {{item.name3}}</span>
                  <span>用法: {{item.name4}}</span>
                </div>
              </div>
              <div class="right">
                <span>
                  <svg-icon class="delete" icon-class="delete"/>
                </span>
              </div>
            </div>
          </div>
          <div class="flex-row" style="justify-content: center; margin-top: 24px;">
            <el-button type="success" size="small">保存</el-button>
            <el-button type="primary" size="small" @click="next">保存并提交申请</el-button>
          </div>
        </el-form>
      </el-card>
    </el-form>
  </div>
</template>
<script>
//处方申请
import { Navbar } from "@/views/layout/components";
import { _queryRegisterListForPatient } from "@/api/patient";
import moment from "moment";

import register from "./register";

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
      drugData: {},
      drugs: [],
      medication: [
        {
          id: 1,
          type: 1,
          name: "法莫替丁片(高舒达)",
          name1: "法莫替丁片",
          name2: "片剂",
          name3: "20mg*30s",
          name4: "口服",
          name5: "2",
          name6: "盒"
        },
        {
          id: 2,
          type: 2,
          name: "法莫替丁片(高舒达)",
          name1: "法莫替丁片",
          name2: "片剂",
          name3: "20mg*30s",
          name4: "口服",
          name5: "2",
          name6: "盒"
        }
      ],
      selectDrugLoading: false
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
  .submission-body {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: flex-start;
    align-items: flex-start;
    .left {
      min-width: 600px;
      width: 70%;
      font-size: 12px;
      margin-right: 24px;
      .prescription {
        text-align: center;
        margin-bottom: 12px;
      }
    }
    .right {
      flex-grow: 1;
      padding-left: $padding;
      padding-right: $padding;
      background: rgb(247, 248, 249);
    }
  }
  .title {
    color: rgb(110, 110, 110);
    // border-left: 2px solid rgb(96, 197, 153);
    border-left-style: solid;
    border-left-width: 2px;
    text-indent: 12px;
    font-size: 16px;
    margin-top: 12px;
    margin-bottom: 12px;
  }
  .green {
    border-left-color: rgb(96, 197, 153);
  }
  .red {
    border-left-color: red;
  }
  .medication-body {
    margin-top: 24px;
    .medication-list {
      margin-bottom: 5px;
      padding: 5px 0;
      border-bottom: 1px dashed rgb(217, 218, 219);
      height: 70px;
      display: flex;
      flex-direction: row;
      line-height: 30px;
      .left {
        width: 120px;
        text-align: right;
        margin-right: 6px;
      }
      .right {
        width: 120px;
        font-size: 34px;
        align-self: center;
        text-align: center;
        .delete {
          cursor: pointer;
        }
      }
      .center {
        flex-grow: 1;
      }
    }
  }
}
</style>

