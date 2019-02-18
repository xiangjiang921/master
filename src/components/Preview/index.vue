<template>
  <el-dialog top="5vh" :visible.sync="dialogVisible" :title="title">
    <div class="img-comtainer">
      <img width="100%" :src="dialogImageUrl" alt>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      dialogImageUrl: null,
      title: ""
    };
  },
  methods: {
    open(url, title) {
      this.title = "";
      this.dialogVisible = true;
      this.dialogImageUrl = url;
      this.title = title || "图片预览";
    }
  }
};
</script>

<style lang="scss" scoped>
.img-comtainer {
  height: 70vh;
  img {
    height: 100%;
  }
}
</style>


