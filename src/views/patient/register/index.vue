<template>
  <div class="app-body">
    <Navbar>
      <div slot="options">
        <el-button size="small" type="primary" @click="goToPatientLists">查看列表</el-button>
      </div>
    </Navbar>
    <div class="patient">
      <el-card shadow="nerver">
        <el-form :model="dialogData" :rules="rules" ref="ruleForm" label-width="80px">
          <div class="card-tab">
            <div class="title">患者信息</div>
            <el-form-item label="会员号:" prop="cardNumber">
              <div class="flex-row">
                <el-input
                  v-model.trim="dialogData.cardNumber"
                  size="small"
                  class="input"
                  placeholder
                ></el-input>
                <el-button
                  type="primary"
                  style="margin-left:12px;align-self:center"
                  size="small"
                >刷会员卡</el-button>
              </div>
            </el-form-item>
            <div class="flex-row">
              <el-form-item label="姓名:" prop="cardNumber">
                <el-input
                  v-model.trim="dialogData.cardNumber"
                  size="small"
                  class="input"
                  placeholder
                ></el-input>
              </el-form-item>
              <el-form-item label="手机号:" prop="cardNumber" style="margin-left: 24px;">
                <el-input
                  v-model.trim="dialogData.cardNumber"
                  size="small"
                  class="input"
                  placeholder
                ></el-input>
              </el-form-item>
            </div>
            <div class="flex-row">
              <el-form-item label="身份证:" prop="cardNumber">
                <div class="flex-row">
                  <el-input
                    v-model.trim="dialogData.cardNumber"
                    size="small"
                    class="input"
                    placeholder
                  ></el-input>
                  <el-button
                    type="primary"
                    style="margin-left:12px;align-self:center"
                    size="small"
                  >刷身份证</el-button>
                </div>
              </el-form-item>
              <el-form-item label="患者性别:" label-width="120px" prop="cardNumber">
                <el-radio-group v-model="dialogData.gandna">
                  <el-radio :label="0">男</el-radio>
                  <el-radio :label="1">女</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="患者年龄:" label-width="120px" prop="cardNumber">
                <el-input-number
                  v-model="dialogData.gandna"
                  :step="1"
                  :controls="false"
                  :max="100"
                  size="small"
                  style="width:80;margin-right:12px;"
                ></el-input-number>岁
              </el-form-item>
            </div>
            <div class="flex-row address">
              <el-form-item label="地址:" prop="provinces">
                <el-select
                  size="small"
                  style="width:150px;"
                  :options="region"
                  :loading="regionLoading"
                  loading-text="正在加载数据..."
                  v-model="dialogData.province"
                  @visible-change="getProvinces"
                  @change="proviceChange"
                  placeholder="清选择所在省"
                >
                  <el-option
                    v-for="item in region.provinces"
                    :key="item.zoneCode"
                    :label="item.zoneName"
                    :value="item.zoneCode"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="citys" label-width="12px" v-if="dialogData.province">
                <el-select
                  size="small"
                  style="width:150px;"
                  :options="region"
                  :loading="regionLoading"
                  loading-text="正在加载数据..."
                  v-model="dialogData.city"
                  @visible-change="getCitys"
                  @change="cityChange"
                  placeholder="请选择所市"
                >
                  <el-option
                    v-for="item in region.citys"
                    :key="item.zoneCode"
                    :label="item.zoneName"
                    :value="item.zoneCode"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="areas" label-width="12px" v-if="dialogData.city">
                <el-select
                  size="small"
                  style="width:150px;"
                  :options="region"
                  :loading="regionLoading"
                  loading-text="正在加载数据..."
                  v-model="dialogData.area"
                  @visible-change="getAreas"
                  placeholder="请选择所在区"
                >
                  <el-option
                    v-for="item in region.areas"
                    :key="item.zoneCode"
                    :label="item.zoneName"
                    :value="item.zoneCode"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="areas" label-width="12px" v-if="dialogData.area">
                <el-input
                  v-model.trim="dialogData.address"
                  style="width: 150px;"
                  size="small"
                  placeholder="街道/镇(乡)"
                ></el-input>
              </el-form-item>
            </div>
            <div v-if="dialogData.area" class="address">
              <el-form-item prop="areas">
                <el-input
                  v-model.trim="dialogData.address"
                  style="width: 635px;"
                  size="small"
                  placeholder="详细地址"
                ></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="card-tab">
            <div class="title">诊前信息</div>
            <div class="flex-row">
              <el-form-item label="过敏史:" prop="cardNumber">
                <el-radio-group v-model="dialogData.gandna">
                  <el-radio :label="0">有</el-radio>
                  <el-radio :label="1">无</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item prop="cardNumber" label-width="24px">
                <el-input
                  v-model.trim="dialogData.cardNumber"
                  size="small"
                  style="width:700px;"
                  placeholder
                ></el-input>
              </el-form-item>
            </div>
            <div class="flex-row">
              <el-form-item label="既往史:" prop="cardNumber">
                <el-radio-group v-model="dialogData.gandna">
                  <el-radio :label="0">有</el-radio>
                  <el-radio :label="1">无</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item prop="cardNumber" label-width="24px">
                <el-input
                  v-model.trim="dialogData.cardNumber"
                  size="small"
                  style="width:700px;"
                  placeholder
                ></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="card-tab">
            <div class="title">就诊信息</div>
            <div class="flex-row">
              <el-form-item label="就诊类型:" prop="cardNumber">
                <el-radio-group v-model="dialogData.gandna">
                  <el-radio :label="0">复诊</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
          </div>
          <div class="card-tab buttonStyle">
            <el-button type="primary" size="small" style="width: 120px;">处方申请</el-button>
            <el-button type="success" size="small" style="width: 120px;">远程门诊挂号</el-button>
          </div>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
<script>
import { _getZones, _getTowns } from "@/api/patient";
import { Navbar } from "@/views/layout/components";

const formatRegionSearch = (val, type) => {
  let code = val.toString();
  if (type == "city") {
    let res = "";
    for (let i = 0; i < code.length; i++) {
      let temp = code[i];
      if (i == 2 || i == 3) {
        temp = "_";
      }
      res += temp;
    }
    return res;
  }
  if ((type = "area")) {
    let res = "";
    for (let i = 0; i < code.length; i++) {
      let temp = code[i];
      if (i == 4 || i == 5) {
        temp = "_";
      }
      res += temp;
    }
    return res;
  }
};

export default {
  components: {
    Navbar
  },
  data() {
    return {
      dialogData: {},
      rules: {},
      region: {
        provinces: [],
        citys: [],
        areas: []
      },
      regionLoading: false
    };
  },
  mounted() {
    this.getZones();
  },
  methods: {
    getProvinces() {
      this.regionLoading = true;
      this.getZones("__0000").then(res => {
        this.regionLoading = false;
        this.region.provinces = res.data;
      });
    },
    proviceChange() {
      this.dialogData.city = null;
      this.dialogData.area = null;
    },
    getCitys() {
      this.regionLoading = true;
      this.getZones(formatRegionSearch(this.dialogData.province, "city")).then(
        res => {
          this.regionLoading = false;
          this.region.citys = res.data.filter((item, index) => index != 0);
        }
      );
    },
    cityChange() {
      this.dialogData.area = null;
    },
    getAreas() {
      this.regionLoading = true;
      this.getZones(formatRegionSearch(this.dialogData.city, "area")).then(
        res => {
          this.regionLoading = false;
          this.region.areas = res.data.filter((item, index) => index != 0);
        }
      );
    },
    getZones(code) {
      return _getZones({
        userId: "",
        zoneCode: code,
        zoneId: ""
      });
    },
    goToPatientLists() {
      this.$router.push({
        path: "patientLists"
      });
    }
  }
};
</script>

<style lang="scss">
.patientRegister {
  .el-card__body {
    padding: 0;
  }
}
</style>


<style lang="scss" scoped>
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
    overflow: auto;
    .card-tab {
      border-bottom: 1px solid #ebeef5;
      padding: $padding;
      .title {
        color: rgb(110, 110, 110);
        border-left: 2px solid rgb(96, 197, 153);
        text-indent: 12px;
        font-size: 16px;
        margin-bottom: 24px;
      }
      .input {
        width: 300px;
      }
      .flex-row {
        display: flex;
        flex-direction: row;
      }
      .address {
        .el-form-item {
          margin-bottom: 12px;
        }
      }
    }
    .buttonStyle {
      display: flex;
      flex-direction: row;
      justify-content: center;
    }
  }
}
</style>

