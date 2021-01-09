<template>
  <div class="thirdpartypayment">
    <header-cmp :title="$t('Deposit')"></header-cmp>
    <main>
      <div class="payment">
        <div class="swiper-container ways">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide way"
              :class="{ selected: selectedType.id === p.id }"
              v-for="p in payType"
              :key="p.id"
              @click.prevent="typeSelectHandler(p)"
            >
              <img :src="imgUrl + p.imgUrl" class="img" />
              <p>{{ p.name }}</p>
            </div>
          </div>
          <div class="swiper-pagination"></div>
        </div>
      </div>
      <!-- 內容 -->
      <div v-if="selectedType.id">
        <manual v-if="selectedType.id === 14"></manual>
        <thirdparty v-else :selectedType="selectedType"></thirdparty>
      </div>
    </main>
  </div>
</template>
<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
import manual from "@/components/deposit/Manual.vue";
import thirdparty from "@/components/deposit/Thirdparty.vue";
import { apiGetPayType } from "@/api";
// import { isIP } from "net";

export default {
  components: { manual, thirdparty },
  data() {
    return {
      paymentType: "thirdparty",
      payType: [],
      imgUrl: process.env.VUE_APP_IMG_BASE_URL,
      selectedType: {}
    };
  },
  mounted() {
    if (this.$route.query.isFromApp) {
      localStorage.setItem("token", this.$route.query.token);
      localStorage.setItem("expireTime", this.$route.query.expireTime);
    }
    apiGetPayType().then(res => {
      if (res.result === 1) {
        this.payType = res.data;
        this.typeSelectHandler(res.data[0]);
        this.$nextTick(() => {
          new Swiper(".ways", {
            slidesPerView: 3,
            spaceBetween: 10,
            pagination: {
              el: ".swiper-pagination"
            }
          });
        });
      }
    });
  },
  methods: {
    typeSelectHandler(item) {
      if (this.selectedType.id === item.id) return;
      this.selectedType = item;
    }
  },
  watch: {}
};
</script>

<style lang="scss" scoped>
input {
  display: block;
  margin-bottom: rem(40);
}
.alert {
  font-size: rem(26);
  color: $red;
  // padding-left: rem(20);
  margin-top: rem(-20);
  margin-bottom: rem(40);
}
.clip_row {
  display: flex;
  align-items: center;
  a {
    display: block;
    box-sizing: border-box;
    font-size: rem(28);
    background: linear-gradient(to right, #18cffe, #0fb4f4, #018ee5);
    color: #fff;
    margin-left: rem(20);
    padding: rem(10) rem(30);
    margin-bottom: rem(40);
    border-radius: rem(10);
  }
}
.small {
  padding: rem(20) rem(40);
}
.bankinfo {
  font-size: rem(28);
  padding: 0 rem(10);
  box-sizing: border-box;
  padding-top: rem(15);
  &-title {
    color: #ffae01;
    padding-right: rem(10);
    padding-bottom: rem(5);
  }
  &-value {
    padding-left: rem(10);
    color: #dddddd;
  }
}
.thirdpartypayment {
  height: 100%;
  padding-bottom: rem(40);
  box-sizing: border-box;

  main {
    height: calc(100% - #{rem(77)});
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }
}
.payment {
  padding: rem(25) rem(30);
  box-sizing: border-box;
  background-color: #2b2d3d;
  color: $gray;
  .ways {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: rem(40);
    .way {
      width: rem(176);
      height: rem(173);
      font-size: rem(27);
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      &.selected {
        background-color: $bg-primary;
        border-radius: rem(15);
        box-shadow: 0 0 5px rgba(#000, 0.4);
      }
      .img {
        margin: 0 auto;
        width: rem(90);
        height: rem(90);
        background-position: center;
        background-size: 100%;
        background-repeat: no-repeat;
      }
      p {
        margin-top: rem(20);
      }
    }
  }
  .swiper-pagination {
    bottom: rem(-10);
  }
}
input {
  border-radius: rem(15);
  border: rem(2) $gray solid;
  background-color: transparent;
  width: 100%;
  padding: rem(30) rem(40);
  font-size: rem(27);
  box-sizing: border-box;
  outline: none;
  color: #fff;
}
.options {
  margin-top: rem(65);
  display: flex;
  align-items: center;
  border-radius: rem(15);
  margin-bottom: rem(48);
  padding: rem(15) 0;
  font-size: rem(32);
  color: $gray;
  .option {
    width: 25%;
    text-align: center;
    padding: rem(35) 0;
    background-color: #222434;
    &:nth-child(1) {
      border-top-left-radius: rem(15);
      border-bottom-left-radius: rem(15);
    }
    &:nth-child(4) {
      border-top-right-radius: rem(15);
      border-bottom-right-radius: rem(15);
    }
    &.selected {
      border-radius: rem(15);
      padding: rem(50) 0;
      margin: rem(-50) 0;
      background-color: #232330;
      box-shadow: 0 0 5px rgba(#000, 0.3);
    }
  }
}
.tips {
  font-size: rem(27);
  color: $gray;
  margin-bottom: rem(64);
  // text-align: center;
  span {
    color: #ffae01;
  }
}
</style>
