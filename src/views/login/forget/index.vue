<template>
  <div class="forget-container">
    <div class="header">忘记密码 > ></div>
    <el-steps class="step" space="30%" :active="active" finish-status="success" simple>
      <el-step title="确认信息"></el-step>
      <el-step title="重置密码"></el-step>
      <el-step title="完成"></el-step>
    </el-steps>
    <div class="step-bars">
      <transition name="el-fade-in-linear" mode="out-in">
        <div class="step-bar" v-if="active == 0" key="0">
          <confirmPersonal :finish="next"/>
        </div>
        <div class="step-bar" v-if="active == 1" key="1">
          <resetPassword :finish="next"/>
        </div>
        <div class="step-bar" v-if="active == 2" key="2">
          <resetPasswordComplete/>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
//忘记密码
import confirmPersonal from "./steps/confirmPersonal";
import resetPassword from "./steps/resetPassword";
import resetPasswordComplete from "./steps/resetPasswordComplete";
export default {
  name: "forget",
  components: {
    confirmPersonal,
    resetPassword,
    resetPasswordComplete
  },
  data() {
    return {
      active: 0
    };
  },
  methods: {
    next(val) {
      if (val > 2) {
        this.active = 2;
      } else {
        this.active = ++val;
      }
    }
  }
};
</script>

<style lang='scss'>
$light_gray: #eee;
$bg: #2d3a4b;
$inputHeight: 52px;
.forget-container {
  .el-steps--simple {
    // box-shadow: 4px 4px 0 0;
    background: none;
  }
  .el-step.is-simple .el-step__title {
    font-size: 14px;
  }
  .el-step__title.is-process {
    color: rgb(90, 161, 138);
  }
  .is-process {
    border-color: rgb(90, 161, 138);
  }
  .el-input__inner {
    height: $inputHeight;
    text-indent: 5px;
  }
  .el-input__prefix {
    line-height: $inputHeight;
    margin-left: 8px;
  }
  .el-input__suffix {
    line-height: $inputHeight;
    margin-right: 8px;
  }
  .button {
    height: 52px;
  }
  .tips {
    font-size: 16px;
    color: #057c61;
    margin-top: 12px;
    margin-bottom: 10px;
    text-align: center;
  }
}
</style>

<style  lang="scss" scoped>
.forget-container {
  margin: 0 24px;
  padding-top: 12px;
  height: 100%;
  color: white;
  display: flex;
  flex-direction: column;
  .header {
    color: rgb(80, 80, 80);
    height: 60px;
    font-size: 20px;
    line-height: 60px;
    text-indent: 24px;
  }
  .step {
    // border: 1px solid red;
  }
  .step-bars {
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    // align-items: center;
    // margin-top: 12px;
    .step-bar {
      padding: 22px 24px;
      width: 100%;
    }
  }
}
</style>
