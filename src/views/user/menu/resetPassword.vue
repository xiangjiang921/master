<template>
  <div>
    <div class="resetPassword">
      <div class="container">
        <el-form ref="form" :model="formData" :rules="rules">
          <el-form-item>
            <el-input v-model="formData.password" name="password" placeholder="新密码">
              <span slot="prefix">
                <svg-icon icon-class="password"/>
              </span>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="formData.confirmPassword" placeholder="再次输入新密码">
              <span slot="prefix">
                <svg-icon icon-class="password"/>
              </span>
            </el-input>
          </el-form-item>
          <div>
            <el-button type="primary" style="width: 100%">确 认 修 改</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formData: {},
      rules: {}
    };
  }
};
</script>

<style lang="scss">
.el-input__prefix {
  margin-left: 6px;
  margin-right: 4px;
}
</style>


<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.resetPassword {
  margin-top: 60px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  .container {
    width: 500px;
  }
}
</style>


