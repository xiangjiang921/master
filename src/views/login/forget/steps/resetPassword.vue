<template>
  <el-form
    :model="form"
    :rules="formRules"
    class="resetPassword"
    auto-complete="on"
    label-position="left"
  >
    <el-form-item prop="password">
      <el-input type="password" v-model="form.password" name="password" placeholder="请输入新密码">
        <span slot="prefix">
          <svg-icon icon-class="resetPassword"/>
        </span>
      </el-input>
    </el-form-item>
    <el-form-item prop="confirmPassword">
      <el-input
        type="password"
        v-model="form.confirmPassword"
        name="confirmPassword"
        placeholder="再次确认密码"
      >
        <span slot="prefix">
          <svg-icon icon-class="comfirmPassword"/>
        </span>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        class="button"
        style="width:100%"
        @click.native.prevent="finish(1)"
      >下 一 步</el-button>
    </el-form-item>
    <div class="tips">
      <router-link to="/login">去登陆？</router-link>
    </div>
  </el-form>
</template>

<script>
export default {
  name: "resetPassword",
  props: ["finish"],
  data() {
    const confirmPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      form: {
        password: "",
        confirmPassword: ""
      },
      formRules: {
        password: [
          { required: true, message: "新密码不能为空", trigger: "blur" }
        ],
        confirmPassword: [
          {
            validator: confirmPassword,
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {}
};
</script>

<style lang='scss' scoped>
</style>

