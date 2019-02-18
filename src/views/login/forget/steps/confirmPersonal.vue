<template>
  <el-form
    :model="confirmPersonal"
    :rules="confirmPersonalRules"
    class="comfirmPersonal"
    auto-complete="on"
    label-position="left"
  >
    <el-form-item prop="iphone">
      <el-input
        v-model="confirmPersonal.iphone"
        name="iphone"
        type="text"
        auto-complete="on"
        placeholder="请输入手机号码"
      >
        <span slot="prefix">
          <svg-icon icon-class="iphone"/>
        </span>
      </el-input>
    </el-form-item>
    <el-form-item prop="verificationCode">
      <el-input
        v-model="confirmPersonal.verificationCode"
        name="password"
        auto-complete="on"
        placeholder="请输入右侧验证码"
      >
        <span slot="prefix">
          <svg-icon icon-class="verificationCode"/>
        </span>
        <span
          slot="suffix"
          class="verificationCode"
          v-loading="verificationCodeLoading"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          @click="getVerificationCode"
        >
          <img :src="verificationCode && verificationCode.url" alt>
        </span>
      </el-input>
    </el-form-item>
    <el-form-item prop="iphoneVerificationCode">
      <div class="iphoneVerificationCodeContainer">
        <el-input
          v-model="confirmPersonal.iphoneVerificationCode"
          name="password"
          auto-complete="on"
          placeholder="请输入右侧验证码"
          style="flex-grow:1"
        >
          <span slot="prefix">
            <svg-icon icon-class="iphoneVerificationCode"/>
          </span>
        </el-input>
        <el-button
          type="primary"
          :disabled="comfirmDisable"
          style="width:240px;margin-left:12px;"
          @click="getIphoneVerificationCode"
          plain
        >{{this.comfirmDisable?`${this.countDown} s`:"获取验证码"}}</el-button>
      </div>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        style="width:100%;"
        class="button"
        @click.native.prevent="finish(0)"
      >下 一 步</el-button>
    </el-form-item>
    <div class="tips">
      <router-link to="/login">去登陆？</router-link>
    </div>
  </el-form>
</template>

<script>
const intervalTime = 180;

import { _getVerificationCode } from "@/api/login";
export default {
  name: "confirmPersonal",
  props: ["finish"],
  data() {
    return {
      confirmPersonal: {},
      confirmPersonalRules: {},
      verificationCode: null,
      verificationCodeLoading: false,
      comfirmDisable: false,
      countDown: 0
    };
  },
  mounted() {
    this.getVerificationCode();
  },
  methods: {
    //获取验证码
    getVerificationCode() {
      this.verificationCodeLoading = true;
      _getVerificationCode().then(({ code, data }) => {
        this.verificationCodeLoading = false;
        if (code != 200) return;
        this.verificationCode = data;
      });
    },
    //获取手机验证码
    getIphoneVerificationCode() {
      // _getVerificationCode().then(({ code, data }) => {
      //   this.verificationCodeLoading = false;
      //   if (code != 200) return;
      //   this.verificationCode = data;
      // });
      this.comfirmDisable = true;
      this.wait();
    },
    wait() {
      this.countDown = intervalTime;
      const timeHandle = setInterval(() => {
        if (this.countDown > 0) {
          this.countDown--;
        } else {
          this.countDown == 0;
          this.comfirmDisable = false;
          clearInterval(timeHandle);
        }
      }, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
.verificationCode {
  width: 150px;
  height: 40px;
  // border: 1px solid red;
  border: 1px solid #ccc;
  position: relative;
  top: 7px;
  right: -7px;
  display: inline-block;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
  }
}
.iphoneVerificationCodeContainer {
  display: flex;
  flex-direction: row;
}
</style>

