<template>
  <div>
    <input
      href="#"
      :class="{ editable, large, bgRed }"
      @click.prevent="showPicker"
      :value="text"
      :disabled="!editable"
      :placeholder="placeholderStr"
      readonly
      unselectable="on"
      onfocus="this.blur()"
    />
    <transition name="popup">
      <div class="picker" v-if="show">
        <div class="bg" @click.prevent="show = false"></div>
        <div class="content">
          <div class="options">
            <div
              class="option"
              v-for="item in list"
              :key="item.id"
              :class="{ picked: selected === item }"
              @click="selected = item"
            >
              <span v-if="item.name">{{ item.name }}</span>
              <span v-if="item.text">{{ item.text }}</span>
              <div class="withdrawCardNumber" v-if="item.cardNumber">
                <span>{{ item.bankName }}</span>
                <span>{{ item.cardNumber | $maskString }}</span>
              </div>
            </div>
          </div>
          <div class="bottom">
            <div class="confirm" @click.prevent="show = false">Cancel</div>
            <div class="confirm" @click.prevent="confirm">Ok</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  props: {
    editable: {
      type: Boolean,
      default: true
    },
    large: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array
    },
    firstList: {
      type: Object
    },
    text: {
      type: String
    },
    placeholder: {
      type: String
    },
    bgRed: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selected: {},
      show: false
    };
  },
  computed: {
    placeholderStr() {
      return this.placeholder || `-- ${this.$t("Select")} --`;
    }
  },
  methods: {
    confirm() {
      this.$emit(
        "inputselected",
        this.selected.rule ? this.selected.rule[2] : null
      );
      this.$emit("input", this.selected);
      this.show = false;
    },
    showPicker() {
      if (this.list.length > 0) {
        this.show = true;
      } else {
        this.$toast(this.$t("NoData"));
      }
    }
  },
  watch: {
    firstList() {
      this.selected = this.firstList;
      this.confirm();
    }
  }
};
</script>

<style lang="scss" scoped>
.editable {
  color: $white !important;
  &::placeholder {
    color: $white !important;
  }
}
input.large {
  width: 100%;
  box-sizing: border-box;
  background-color: $bg-primary;
  font-size: rem(28);
  padding: rem(30) rem(40);
  color: #ffae01 !important;
  border-radius: rem(15);
  border: rem(2) $gray solid;
  outline: none;
  // margin-bottom: rem(40);
  &.bgRed {
    background-image: linear-gradient(135deg, #a83439 20%, #b6455d 90%);
  }
}
.picker {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;

  .bg {
    width: 100vw;
    height: 100vh;
    position: absolute;
    left: 0;
    top: 0;
  }
  .content {
    box-sizing: border-box;
    z-index: 1;
    position: fixed;
    max-height: 80vh;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    max-width: calc(100% - #{rem(60)});
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
    color: #444;
    line-height: 1.18;
    background: $bg-primary;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    .options {
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      max-height: 60vh;
    }
    .option {
      color: $light;
      font-size: rem(32);
      padding: 0 rem(50);
      &.picked {
        background-color: #3f51b5;
      }
      .withdrawCardNumber {
        display: flex;
        flex-flow: column;
        padding: rem(40) 0;
        box-sizing: border-box;
        border-bottom: rem(2) solid #5d5d65;

        span:last-child {
          margin-top: rem(10);
        }
      }
    }

    .option:last-child .withdrawCardNumber {
      border-bottom: none;
    }
    .bottom {
      padding: 0 rem(40) rem(20) rem(60);
      text-align: right;
      display: flex;
      justify-content: flex-end;
    }
    .confirm {
      border: none;
      padding: rem(20) rem(40);
      background: transparent;
      font-size: rem(32);
      color: #3f51b5;
      // color: $light;
      cursor: pointer;
      -webkit-transition: color 0.3s;
      transition: color 0.3s;
    }
  }
}
</style>
