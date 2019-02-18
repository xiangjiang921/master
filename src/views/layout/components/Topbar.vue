<template>
  <div class="topbar">
    <div class="logo-container">
      <img src="/static/logo.png" alt>
      <span class="title">湘雅医院互联网医院</span>
    </div>
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img :src="avatar" class="user-avatar">
        <i class="el-icon-caret-bottom"/>
      </div>
      <el-dropdown-menu slot="dropdown" class="user-dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>首页</el-dropdown-item>
        </router-link>
        <router-link class="inlineBlock" to="/user">
          <el-dropdown-item class="user-dropdown">用户中心</el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span style="display:block;" @click="logout">登出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import avatar from "@/assets/images/doctor.png";
export default {
  data() {
    return {
      avatar: avatar
    };
  },
  computed: {
    ...mapGetters(["sidebar"])
  },
  methods: {
    logout() {
      this.$store.dispatch("LogOut").then(() => {
        location.reload(); // 为了重新实例化vue-router对象 避免bug
      });
    }
  }
};
</script>

<style lang="scss">
</style>


<style lang="scss" scoped>
$height: 50px;
.topbar {
  height: $height;
  line-height: $height;
  background: #15b08e;
  box-shadow: 1px 1px 1px 1px #52ad90;
  .logo-container {
    width: 300px;
    height: $height;
    line-height: $height;
    position: absolute;
    left: 35px;
    img {
      height: 26px;
      position: relative;
      bottom: -5px;
      margin-right: 6px;
    }
    .title {
      font-size: 24px;
      color: white;
    }
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      line-height: initial;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>


