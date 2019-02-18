<template>
  <el-dialog
    :title="title"
    width="600px"
    :visible.sync="dialogFormVisible"
    :close-on-click-modal="false"
  >
    <div class="form-container">
      <el-form :model="dialogData" class="form" :rules="rules" ref="ruleForm" label-width="100px">
        <el-row type="flex" justify="space-between">
          <el-col :span="24">
            <el-form-item label="药品名:" prop="artId">
              <el-select
                v-model="dialogData.artId"
                filterable
                style="width:100%"
                remote
                placeholder="药品名/药品编码"
                :remote-method="query"
                :loading="loading"
                size="small"
              >
                <el-option
                  v-for="item in drugs"
                  :key="item.artId"
                  :label="item.name"
                  :value="item.artId"
                >{{item.name}}-{{item.code}}-{{item.dfTypeName}}-{{item.manufacturer}}</el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12">
            <el-form-item label="厂家:" prop="cardNumber">
              <el-input v-model.trim="dialogData.cardNumber" size="small" placeholder></el-input>
            </el-form-item>
          </el-col>-->
        </el-row>
        <el-row type="flex" justify="space-between">
          <el-col :span="12">
            <el-form-item label="数量:" prop="amount">
              <el-input-number
                size="small"
                v-model="dialogData.amount"
                style="width:100%"
                :controls="false"
                :min="0"
                :max="10000000"
              ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结算价(元):" prop="transPrice">
              <el-input-number
                size="small"
                v-model="dialogData.transPrice"
                :precision="2"
                style="width:100%"
                :controls="false"
                :min="0"
                :max="100000"
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between">
          <el-col :span="12">
            <el-form-item label="零售(元):" prop="salePrice">
              <el-input-number
                size="small"
                v-model="dialogData.salePrice"
                :precision="2"
                style="width:100%"
                :controls="false"
                :min="0"
                :max="100000"
              ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="有效期:" prop="validDate">
              <el-date-picker
                size="small"
                style="width:100%"
                v-model="dialogData.validDate"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
      <el-button type="primary" @click="submitForm" :loading="loading" size="small">保 存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { _seachDrugsFormDist, _addPharmacy } from "@/api/drugs";
import moment from "moment";

export default {
  components: {},
  data() {
    return {
      dialogFormVisible: false,
      loading: false,
      title: "",
      defaultData: {
        artId: null,
        amount: 0,
        transPrice: 0,
        salePrice: 0,
        validDate: null
      },
      dialogData: {},
      rules: {
        artId: [{ required: true, message: "必须选择一个药品" }],
        validDate: [
          {
            required: true,
            message: "有限期不能为空"
          }
        ]
      },
      drugs: []
    };
  },
  mounted() {
    this.query("");
  },
  methods: {
    query(val) {
      this.loading = true;
      _seachDrugsFormDist({
        pageNum: 1,
        pageSize: 20,
        drugName: val
      }).then(({ data, code }) => {
        this.loading = false;
        if (code != 200) return;
        this.drugs = data.list;
      });
    },
    //打开
    openDialog(config, fn) {
      this.loading = false;
      this.dialogFormVisible = true;
      this.title = config.title;

      let rowData = config.data ? Object.assign({}, config.data) : null;
      if (rowData.postRules) {
        this.defaultData.deptId = rowData.postRules[0].groupId;
      }
      let defaultData = Object.assign({}, this.defaultData);

      this.$nextTick(() => {
        this.$refs["ruleForm"] && this.$refs["ruleForm"].resetFields();
        if (rowData) {
          this.dialogData = Object.assign(defaultData, rowData);
        } else {
          this.dialogData = defaultData;
        }
      });

      this.callback = fn;
    },
    //关闭
    closeDialog() {
      this.dialogFormVisible = false;
    },
    //保存
    submitForm() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          this.loading = true;
          const params = Object.assign({}, this.dialogData);
          params.validDate = moment(params.validDate).format(
            "YYYY-MM-DD HH:mm:ss"
          );
          _addPharmacy({
            ...params,
            orgId: 2
          }).then(({ data, code, msg }) => {
            this.loading = false;
            if (code != 200) {
              this.$message({
                type: "error",
                message: msg
              });
            } else {
              this.$confirm("添加药品成功！是否继续？", "提示", {
                confirmButtonText: "退出",
                cancelButtonText: "继续",
                type: "success"
              })
                .then(() => {
                  this.dialogFormVisible = false;
                })
                .catch(() => {});
            }
          });
        } else {
          return false;
        }
      });
    },
    // 上传图片
    //  图片上传时候的钩子函数
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
};
</script>
<style lang="scss" scoped>
.form-container {
  overflow: auto;
  padding-top: 12px;
  .form {
    .title {
      border-bottom: 1px solid #80c197;
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 24px;
      text-indent: 12px;
    }
  }
}
</style>
