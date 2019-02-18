<template>
  <div class="finish">
    <el-card shadow="nerver">
      <div style="text-align:center">
        <img :src="submitComplite" alt>
      </div>
      <div style="text-align:center;color:rgb(237,114,132);margin-top:24px;">申请提交已完成,请耐心等待</div>
    </el-card>
  </div>
</template>
<script>
//处方申请
import { Navbar } from "@/views/layout/components";
import { _queryRegisterListForPatient } from "@/api/patient";
import moment from "moment";
import submitComplite from "@/assets/images/submit-complite.png";

import register from "./register";

export default {
  components: {
    Navbar,
    register
  },
  data() {
    return {
      submitComplite: submitComplite
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

<style lang="scss" scoped>
$padding: 24px;
.finish {
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
}
</style>

