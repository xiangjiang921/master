<template>
  <div class="Prescription">
    <el-card shadow="nerver">
      <div class="title">陈云兰诊所远程门诊处方笺</div>
      <div class="list flex-row justify-between font12 bottom-solid">
        <span>费用: 自费</span>
        <span>处方编号: A120459000</span>
      </div>
      <div class="font12 bottom-solid">
        <div class="list">
          <span>姓名: 张思</span>
          <span style="margin-left:24px;">年龄: 22</span>
          <span style="margin-left:24px;">性别: 女</span>
        </div>
        <div class="list flex-row justify-between">
          <span>诊断: 支气管炎</span>
          <span>就诊日期: 2018-02-15</span>
        </div>
      </div>
      <div class="tag">Rp</div>
      <div class="mark bottom-solid">
        <div class="list flex-row justify-between">
          <span>甘草 5g</span>
          <span>艾叶 3g</span>
          <span>百花蛇舌草 1包(冲服)</span>
        </div>
        <div class="list flex-row justify-between">
          <span>甘草 5g</span>
          <span>艾叶 3g</span>
          <span>百花蛇舌草 1包(冲服)</span>
        </div>
        <div class="list flex-row justify-between">
          <span>甘草 5g</span>
          <span>艾叶 3g</span>
          <span>百花蛇舌草 1包(冲服)</span>
        </div>
        <div class="footer">
          <div class="list">
            <span>
              共
              <i style="color: red">8</i>
              剂
            </span>
            <span>水煎服</span>
            <span>每日2次</span>
          </div>
          <div class="list">
            <span>医嘱: 多饮水, 摄入富含维生素的食物,适当休息</span>
          </div>
        </div>
      </div>
      <div class="bottom-solid">
        <div class="list">
          <span>*注:</span>
          <span>因慢性病患者常年在医院就诊,长期遵医嘱使用此药,未观察到药物副作用</span>
        </div>
        <div class="list">
          <span>*注:</span>
          <span>该处方仅限程云兰诊所使用</span>
        </div>
      </div>
      <div style="margin-top:12px">
        <div class="list flex-row justify-between">
          <span>医生签名: 程兰</span>
          <span>药品金额: 120.00元</span>
          <span>审核药师: 李四</span>
          <span>核对,发药药师: 王二</span>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {}
};
</script>

<style lang="scss" scoped>
.Prescription {
  .title {
    text-align: center;
    line-height: 60px;
    color: rgb(55, 55, 55);
    font-size: 18px;
  }
  .flex-row {
    display: flex;
    flex-direction: row;
  }
  .justify-between {
    justify-content: space-between;
  }
  .font12 {
    font-size: 12px;
  }
  .bottom-solid {
    border-bottom: 1px solid rgb(225, 225, 225);
  }
  .list {
    line-height: 35px;
    padding: 0 24px;
  }
  .tag {
    font-size: 24px;
    font-weight: 600;
    color: rgb(56, 56, 56);
    padding: 12px;
  }
  .mark {
    padding: 6px 24px;
    .footer {
      margin-top: 12px;
    }
  }
}
</style>


