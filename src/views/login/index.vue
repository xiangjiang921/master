<template>
  <div class="login-container" :style="{'background-image':backgroundImg}">
    <div class="header">
      <div>
        <span>
          <img :src="logo" class="logoImg" alt>
        </span>
        <span class="font-style">湘雅医院互联网医院</span>
      </div>
    </div>
    <div class="login-body">
      <div class="loginBodyLeft" :style="{'background-image': backgroundImg2}"></div>
      <div class="loginBodyRight">
        <transition name="el-zoom-in-center">
          <router-view/>
        </transition>
      </div>
    </div>
    <div class="footer">
      <span>
        <img :src="footerLeft" alt>
      </span>
      <span class="footerFontStyle">深圳网通兴科技发展有限公司</span>
      <span>
        <img :src="footerRight" alt>
      </span>
    </div>
  </div>
</template>

<script>
import logo from "@/assets/images/logo2.png";
import backgroundImg from "@/assets/images/login-background.png";
import backgroundImg2 from "@/assets/images/login-background2.png";
import footerLeft from "@/assets/images/footer-left.png";
import footerRight from "@/assets/images/footer-right.png";

import waves from "@/directive/waves";

export default {
  name: "Login",
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
      backgroundImg: `url(${backgroundImg})`,
      backgroundImg2: `url(${backgroundImg2})`,
      logo: logo,
      footerLeft: footerLeft,
      footerRight: footerRight,
      loginForm: {
        loginName: "lbx002",
        loginPwd: "123456",
        type: "1",
        clintType: "pharmacy",
        way: "1"
      },
      loginRules: {
        loginName: [
          { required: true, trigger: "blur", message: "用户名不能为空" },
          {
            validator: validateUsername,
            trigger: "blur"
          }
        ],
        loginPwd: [{ required: true, trigger: "blur", validator: validatePass }]
      },
      loading: false,
      pwdType: "password",
      redirect: undefined
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === "password") {
        this.pwdType = "";
      } else {
        this.pwdType = "password";
      }
    },
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

<style rel="stylesheet/scss" lang="scss">
/* reset element-ui css */
// .login-container {
//   .el-form-item__content {
//     border: 1px solid rgb(220, 220, 220);
//     border-radius: 5px;
//   }
//   .el-input {
//     display: inline-block;
//     height: 47px;
//     width: 85%;
//     input {
//       background: transparent;
//       border: 0px;
//       -webkit-appearance: none;
//       border-radius: 0px;
//       padding: 12px 5px 12px 15px;
//       // color: $light_gray;
//       height: 47px;
//       // &:-webkit-autofill {
//       //   box-shadow: 0 0 0px 1000px $bg inset !important;
//       //   -webkit-text-fill-color: #fff !important;
//       // }
//     }
//   }
//   .el-form-item {
//     // border: 1px solid rgba(255, 255, 255, 0.1);
//     // background: rgba(0, 0, 0, 0.1);
//     // border-radius: 5px;
//     // color: #454545;
//     margin-bottom: 28px;
//   }
//   .el-form-item__error {
//     padding-top: 8px;
//   }
// }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
.login-container {
  // position: fixed;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  .header {
    height: 80px;
    line-height: 80px;
    width: 100%;
    .logoImg {
      position: relative;
      top: 5px;
      margin-left: 24px;
    }
    .font-style {
      font-size: 28px;
      margin-left: 3px;
      color: #15b08e;
      font-weight: 600;
    }
  }
  .login-body {
    width: 1000px;
    height: 500px;
    background: white;
    border-radius: 20px;
    box-shadow: 0px 7px 27px 0px rgba(133, 169, 231, 0.5);
    display: flex;
    flex-direction: row;
    overflow: hidden;
    .loginBodyLeft {
      width: 50%;
      background-size: 100% 100%;
      box-shadow: 4px 0px 8px 1px rgba(7, 150, 115, 0.4);
    }
    .loginBodyRight {
      width: 50%;
    }
  }
  .footer {
    height: 80px;
    line-height: 80px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .footerFontStyle {
      font-size: 14px;
      color: #00a281;
      margin-left: 12px;
      margin-right: 12px;
    }
    img {
      position: relative;
      top: -2px;
    }
  }
}
</style>
