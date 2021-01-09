// imgName圖片檔名 (圖片在) // text
<template>
  <transition name="popup">
    <div class="alert-cmp">
      <div class="alert-bg" @click.prevent="$emit('close')"></div>
      <div class="alert-box">
        <div class="alert-box-image">
          <img :src="img" />
        </div>
        <div class="alert-box-text">
          <div>{{ text }}</div>
          <slot name="content"></slot>
        </div>
        <div class="alert-box-button">
          <slot name="btn"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  props: {
    imgName: {
      type: String,
      default: "success"
    },
    text: {
      type: String,
      default: "设置成功!"
    },
    exit: {
      type: String,
      default: "离开"
    }
  },
  methods: {},
  computed: {
    img() {
      return require(`@/assets/images/modalbox/${this.imgName}.png`);
    }
  }
};
</script>

<style lang="scss">
.alert {
  &-cmp {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100%;
    z-index: 1001;
  }
  &-bg {
    position: absolute;
    width: 100vw;
    height: 100%;
    background-color: rgba(#000, 0.5);
  }
  &-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: rem(576);
    background-color: $modalbox-bg;
    &-image {
      box-sizing: border-box;
      padding-top: rem(117);
      padding-bottom: rem(25);
      img {
        display: block;
        margin: 0 auto;
        width: rem(153);
      }
    }
    &-text {
      text-align: center;
      font-size: rem(32);
      padding: 0 rem(20);
      padding-bottom: rem(133);
      color: #eee;
    }
    &-input {
      margin-top: rem(30);
      font-size: rem(32);
      background-color: transparent;
      color: #eee;
      border: 1px solid #fff;
      border-radius: rem(15);
      padding: rem(10) rem(15);
      box-sizing: border-box;
      outline: none;
    }
    &-button {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    &-btn {
      flex-grow: 1;
      min-width: 50%;
      font-size: rem(32);
      text-align: center;
      padding: rem(30) 0;
      background-color: $modalbox-btn-default;
      color: $gray;
      &:active {
        filter: brightness(0.8);
      }
      &-bright {
        background-color: $modalbox-btn-bright;
        color: $light;
      }
    }
  }
}
</style>
