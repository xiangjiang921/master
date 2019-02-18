<template>
  <el-form
    ref="loginForm"
    :model="loginForm"
    :rules="loginRules"
    class="login-form"
    auto-complete="on"
    label-position="left"
  >
    <h5 class="title">药房端登陆</h5>
    <el-form-item prop="loginName">
      <el-input
        v-model="loginForm.loginName"
        name="username"
        auto-complete="on"
        placeholder="请输入您的账号"
      >
        <span slot="prefix">
          <svg-icon icon-class="user"/>
        </span>
      </el-input>
    </el-form-item>
    <el-form-item prop="loginPwd">
      <el-input
        v-model="loginForm.loginPwd"
        type="password"
        name="password"
        auto-complete="on"
        placeholder="请输入您的密码"
        @keyup.enter.native="handleLogin"
      >
        <span slot="prefix">
          <svg-icon icon-class="password"/>
        </span>
        <span slot="suffix">
          <el-tooltip content="新用户登陆后请及时修改密码,初始密码为888888" placement="bottom-start" effect="dark">
            <svg-icon icon-class="tip"/>
          </el-tooltip>
        </span>
      </el-input>
    </el-form-item>
    <el-button
      v-waves
      :loading="loading"
      type="primary"
      class="login"
      style="width:100%;"
      @click.native.prevent="handleLogin"
    >登 陆</el-button>
    <div class="tips">
      <a @click="goToForget">忘记密码?</a>
    </div>
  </el-form>
</template>

<script>
import { isvalidUsername } from "@/utils/validate";
import waves from "@/directive/waves";

export default {
  directives: {
    waves
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error("请输入正确的用户名"));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error("密码不能小于5位"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        loginName: "lbx002",
        loginPwd: "123456",
        type: "1",
        clintType: "pharmacy",
        way: "1"
      },
      loginRules: {
        loginName: [
          { required: true, trigger: "blur", message: "用户名不能为空" }
          // {
          //   validator: validateUsername,
          //   trigger: "blur"
          // }
        ],
        loginPwd: [{ required: true, trigger: "blur", message: "密码不能为空" }]
      },
      loading: false
    };
  },
  methods: {
    goToForget() {
      this.$router.push({
        path: "/forget"
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("Login", this.loginForm)
            .then(() => {
              this.loading = false;
              this.$router.push({ path: this.redirect || "/" });
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss">
$inputHeight: 52px;
.login-form {
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
}
</style>

<style lang="scss" scoped>
.login-form {
  margin: 0 48px;
  height: 100%;
  padding-top: 70px;
  .tips {
    font-size: 16px;
    color: #057c61;
    margin-top: 12px;
    margin-bottom: 10px;
    text-align: right;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    // color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title {
    font-size: 34px;
    font-weight: 400;
    color: #057c61;
    margin: 0px auto 40px auto;
    text-align: center;
  }
  .login {
    height: 54px;
  }
}
</style>


