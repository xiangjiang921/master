<template>
  <el-form ref="from" :model="formData" :rules="rules" class="form" inline label-width="120px">
    <el-row>
      <el-col :span="12">
        <el-form-item label="药房性质:">
          <span>连锁药房</span>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="药房名称:">
          <span>老百姓大药房(东塘店)</span>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="连锁药房名称:">
          <span>老百姓大药房连锁机构</span>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="药房地址:">
          <span>湖南省 长沙市 雨花区 树木岭东双铁城15楼</span>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="药房二维码:">
          <el-button size="mini" type="primary" @click="previewQRCode" round>查看二维码</el-button>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="上传药房图片:">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-form-item label="药房电话:" prop="telephone">
        <el-input size="small" v-model="formData.telephone"></el-input>
      </el-form-item>
      <span style="margin-left: 6px;margin-right: 14px;position:relative;top: 10px;">或</span>
      <el-form-item label-width="0" prop="iphone">
        <el-input size="small" v-model="formData.iphone"></el-input>
      </el-form-item>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item style="width: 100%" label="药房公告:" prop="notice">
          <el-input size="small" v-model="formData.notice" style="width: 670px;"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="药房介绍:">
          <el-input
            size="small"
            type="textarea"
            :rows="4"
            v-model="formData.introduce"
            style="width: 670px;"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row style="text-align:center">
      <el-button style="width: 100px" size="small" type="primary">保存修改</el-button>
    </el-row>
    <Preview ref="preview"/>
  </el-form>
</template>

<script>
import Preview from "@/components/Preview";
export default {
  components: {
    Preview
  },
  data() {
    return {
      formData: {
        telephone: "0731-66161666",
        iphone: "17773737373",
        notice: "药房营业时间早8:00 - 晚18:00",
        introduce: "由北京金象复星医药股份有限公司"
      },
      rules: {},
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  methods: {
    previewQRCode() {
      const url = "/static/erwei.gif";
      this.$refs.preview.open(url, "预览二维码");
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.$refs.preview.open(file.url);
    }
  }
};
</script>

<style lang="scss" scoped>
.form {
  width: 800px;
}
</style>

