<template>
  <div class="addbankcard">
    <header-cmp :title="$t('AddBankCard')"></header-cmp>
    <ul class="menu">
      <li class="list">
        <div class="list-l">
          <div class="list-l-icon">
            <img src="~@/assets/images/icons/add1.png" alt="登录名" />
          </div>
          <div class="list-l-text">{{ $t("AddBankCard") }}</div>
        </div>
        <div class="list-r">
          <div class="list-r-icon"></div>
        </div>
      </li>
    </ul>
    <p class="addbankcard-alert">{{ $t("Not_Allow_Change_Personal") }}</p>
  </div>
</template>
<style lang="scss">
.addbankcard {
  &-alert {
    font-size: rem(24);
    text-align: center;
    color: $font-alert;
    padding-top: rem(25);
    padding-bottom: rem(40);
  }
}
</style>
