<template>
  <div>
    <div>
      <header-cmp title="建议"></header-cmp>
    </div>
    <div class="con">
      <div class="row">
        <div class="container top">
          <div class="box">
            <div class="input_box">
              <input
                type="text"
                :placeholder="$t('Placehoder_YourPromotPlan')"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <a href="#" class="btn btn-round btn-blue">{{ $t("Done") }}</a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.top {
  padding-top: rem(65);
  background-color: #1b1b28;
  padding-bottom: rem(65);
}
.row {
  padding-top: rem(85);
  background-color: #1f212f;
}
.box {
  border: 2px #5d5d65 solid;
  border-radius: 20px;
  height: rem(300);
}
.input_box {
  border-bottom: none;
}

.btn {
  margin-top: rem(85);
}
.input_box {
  font-size: rem(28);
}
</style>
