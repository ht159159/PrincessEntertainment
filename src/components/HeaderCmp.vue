<template>
  <header class="header-cmp">
    <slot name="back">
      <a href="#" class="back" @click.prevent="back()">
        <img src="~@/assets/images/icons/back.png" v-if="isBack" />
      </a>
    </slot>
    <h1 class="title">{{ title }}</h1>
    <div class="space">
      <slot name="btn"></slot>
    </div>
  </header>
</template>
<script>
export default {
  props: {
    title: {
      type: String
    },
    isBack: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    back() {
      if (this.$route.name == "ZhiGuanPay") {
        this.$router.push({ name: "main" });
      } else {
        this.$router.go(-1);
      }
    }
  }
};
</script>

<style lang="scss">
$back-icon-padding: 10;
.header-cmp {
  position: relative;
  z-index: 99;
  top: 0;
  left: 0;
  padding: rem(40);
  // padding-top: rem(60-$back-icon-padding);
  // padding-bottom: rem(18-$back-icon-padding);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: $bg-dark;
  a {
    height: rem(39);
    // padding: rem($back-icon-padding);
    position: absolute;
    left: rem(30);
    top: rem(40);
    img {
      display: block;
      height: 100%;
    }
  }
  .title {
    color: $light;
    font-weight: 500;
    font-size: rem(34);
  }
  .space {
    position: absolute;
    right: rem(40);

    .records {
      font-size: rem(32);
    }
    .icon {
      width: rem(31);
      height: rem(31);
      padding: 0 rem(10);
      display: block;
      &-write {
        background-image: url("~@/assets/images/icons/write.png");
        background-repeat: no-repeat;
        background-position: center;
        background-size: rem(31);
      }
    }
  }
}
</style>
