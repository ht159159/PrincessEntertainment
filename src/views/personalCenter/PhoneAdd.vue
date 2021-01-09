<template>
  <div>
    <header-cmp :title="$t('Add_Mobile')"></header-cmp>
    <div class="container">
      <div class="input_box">
        <input type="text" :placeholder="$t('Placeholder_Mobile')" />
        <a href="#" class="clear"></a>
      </div>
      <div class="input_box">
        <input type="text" :placeholder="$t('Placeholder_SMSCode')" />
        <a href="#" class="confirm">{{ $t("Placeholder_SMSCode") }}</a>
      </div>
      <a href="#" class="btn btn-round btn-blue">{{ $t("Done") }}</a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  padding-top: rem(85);
}
</style>
