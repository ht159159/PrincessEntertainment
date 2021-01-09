<template>
  <div>
    <header-cmp :title="$t('ChooseBank')"></header-cmp>
    <div class="container">
      <div class="item-group">
        <div class="item">
          <div class="pic">
            <img src="~@/assets/images/icons/bank_1.png" alt="" />
          </div>
          <p><a href="">中国农业银行</a></p>
        </div>
        <div class="item">
          <div class="pic">
            <img src="~@/assets/images/icons/bank_2.png" alt="" />
          </div>
          <p><a href="">中国银行</a></p>
        </div>
        <div class="item">
          <div class="pic">
            <img src="~@/assets/images/icons/bank_3.png" alt="" />
          </div>
          <p><a href="">中国建设银行</a></p>
        </div>
        <div class="item">
          <div class="pic">
            <img src="~@/assets/images/icons/bank_4.png" alt="" />
          </div>
          <p><a href="">邮政储蓄银行</a></p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  padding-top: rem(65);
}
.item {
  display: flex;
  align-items: center;
  background-color: #26293b;
  margin-bottom: rem(20);
  padding: rem(20);
  height: rem(80);
}
.item .pic {
  width: 10%;
  padding-left: rem(30);
}
.item .pic img {
  width: 100%;
  display: block;
}
.item p {
  font-size: rem(25);
  padding-left: rem(30);
}
.item p a {
  color: #5d5d65;
}
</style>
