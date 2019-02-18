<template>
  <el-form ref="from" :model="formData" :rules="rules" class="form" inline label-width="140px">
    <el-row>
      <el-col :span="12">
        <el-form-item label="营业执照:">
          <div class="image-container">
            <img :src="imgSrc" class="preview" alt>
            <div class="options">
              <div class="enlarge" @click="preview(imgSrc)">
                <svg-icon icon-class="enlarge"/>
              </div>
            </div>
          </div>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="药品许可证:">
          <div class="image-container">
            <img :src="imgSrc" class="preview" alt>
            <div class="options">
              <div class="enlarge" @click="preview(imgSrc)">
                <svg-icon icon-class="enlarge"/>
              </div>
            </div>
          </div>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="驻店药师姓名:">
          <span>张三</span>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="药房法人代表姓名:">
          <span>李四</span>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="法人联系方式:">
          <span>17773111111</span>
        </el-form-item>
      </el-col>
    </el-row>
    <Preview ref="preview"/>
  </el-form>
</template>

<script>
//药房资质信息
import Preview from "@/components/Preview";
import imgSrc from "@/assets/images/ya.jpg";
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
      dialogVisible: false,
      imgSrc: imgSrc
    };
  },
  methods: {
    preview(url) {
      this.$refs.preview.open(url);
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
$imgWidth: 148px;
.form {
  margin-top: 18px;
  width: 800px;
  .image-container {
    width: 220px;
    height: $imgWidth;
    border: 1px solid #c0ccda;
    border-radius: 6px;
    position: relative;
    overflow: hidden;
    & > img {
      width: 100%;
      height: 100%;
    }
    &:hover {
      .options {
        visibility: visible;
      }
    }
    .options {
      visibility: hidden;
      background: rgba(50, 50, 50, 0.8);
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      .enlarge {
        font-size: 20px;
        height: 24px;
        line-height: 24px;
        color: white;
        &:hover {
          svg {
            color: red;
          }
        }
      }
      .enlarge:hover {
        color: red;
      }
    }
  }
}
</style>

