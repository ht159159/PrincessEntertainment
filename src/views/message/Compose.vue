<template>
  <div>
    <header-cmp :title="$t('Compose.title')"></header-cmp>
    <div class="container compose">
      <div class="compose_type">
        <div class="title">{{ $t("Compose.type") }}</div>
        <div class="options">
          <div class="option selected">{{ $t("Compose.withdraw") }}</div>
          <div class="option">{{ $t("Compose.deposit") }}</div>
          <div class="option">{{ $t("Compose.suggest") }}</div>
        </div>
      </div>
      <textarea class="compose_textarea" autofocus></textarea>
      <div class="btn btn-round btn-blue">{{ $t("Common.submit") }}</div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.compose {
  font-size: rem(32);
  &_type {
    padding-top: rem(70);
    margin-bottom: rem(60);
    .title {
      color: $gray;
      margin-bottom: rem(42);
    }
    .options {
      display: flex;
      justify-content: space-between;
      border-radius: rem(15);
      background-color: $bg-dark;
      padding: rem(27) rem(65);
      .option {
        color: $dark-gray;
      }
      .selected {
        color: $white;
      }
    }
  }
  &_textarea {
    width: 100%;
    height: rem(301);
    box-sizing: border-box;
    background-color: $bg-dark;
    padding: rem(20);
    outline: none;
    color: $white;
    border-radius: rem(15);
    border: rem(3) $gray solid;
    margin-bottom: rem(88);
  }
}
</style>
