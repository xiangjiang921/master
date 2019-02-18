<template>
  <div>
    <div class="notice">
      <div class="img-container">
        <img class="img" :src="complete" alt>
      </div>
      <div class="fontStyle">新密码已设置成功,请使用新密码进行重新登陆</div>
    </div>
    <el-button
      type="primary"
      style="width:100%;height: 47px"
      @click.native.prevent="goToLogin"
    >重 新 登 陆</el-button>
  </div>
</template>

<script>
import complete from "@/assets/images/complete.png";
export default {
  data() {
    return {
      complete: complete
    };
  },
  methods: {
    goToLogin() {
      this.$router.push({ path: "/login" });
    }
  }
};
</script>

<style lang="scss" scoped>
.notice {
  .img-container {
    text-align: center;
    margin-top: 24px;
  }
  .fontStyle {
    height: 40px;
    line-height: 40px;
    color: rgb(119, 119, 119);
    text-align: center;
    margin-top: 12px;
    margin-bottom: 24px;
    font-size: 12px;
  }
}
</style>


