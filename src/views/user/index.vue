<template>
  <div class="user">
    <el-tabs v-model="activeMenu" type="card" @tab-click="handleClick">
      <el-tab-pane label="药房基本信息" name="0">
        <baseInfo/>
      </el-tab-pane>
      <el-tab-pane label="药房资质信息" name="1">
        <qualificationsInfo/>
      </el-tab-pane>
      <el-tab-pane label="修改密码" name="2">
        <resetPassword/>
      </el-tab-pane>
      <el-tab-pane label="修改手机号码" name="3">
        <resetIphone/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import baseInfo from "./menu/baseInfo";
import qualificationsInfo from "./menu/qualificationsInfo";
import resetPassword from "./menu/resetPassword";
import resetIphone from "./menu/resetIphone";
export default {
  components: {
    baseInfo,
    qualificationsInfo,
    resetPassword,
    resetIphone
  },
  data() {
    return {
      activeMenu: 0
    };
  },
  methods: {
    handleClick() {}
  }
};
</script>

<style lang="scss">
.user {
  .el-tabs__content {
    border: 1px solid #e4e7ec;
    border-style: none solid solid solid;
    position: absolute;
    top: 63px;
    right: 24px;
    bottom: 24px;
    left: 24px;
    padding: 24px;
  }
}
</style>


<style lang="scss" scoped>
.user {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  padding: 24px;
  overflow: auto;
}
</style>


