<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger
      :toggle-click="toggleSideBar"
      :is-active="sidebar.opened"
      class="hamburger-container"
    />
    <breadcrumb/>
    <div class="search-bar">
      <slot name="search"/>
    </div>
    <div class="options-bar">
      <slot name="options"/>
    </div>
  </el-menu>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters(["sidebar"])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("ToggleSideBar");
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  display: flex;
  flex-direction: row;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .search-bar {
    align-self: center;
    flex-grow: 1;
    margin-left: 24px;
    margin-right: 24px;
    height: 50px;
  }
  .options-bar {
    align-self: center;
    margin-right: 24px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
}
</style>

