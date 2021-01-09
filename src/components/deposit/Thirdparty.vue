<template>
  <div class="thirdparty container">
    <picker
      class="plat"
      v-model="selectedPlay"
      :large="true"
      :text="selectedPlay.text"
      :list="payPlat"
      :firstList="firstPayPlat"
      :placeholder="$t('Placeholder_ChooseGate')"
      @inputselected="inputselected"
    ></picker>
    <input
      v-if="selectedType.id != 1017"
      class="thirdparty-input"
      type="tel"
      :placeholder="$t('Placeholder_DepositAmout')"
      v-model="amount"
    />
    <div class="thirdparty-options" v-if="selectedType.id != 1017">
      <div
        class="option"
        v-for="(rule, index) in selectedPlay.rule"
        :key="index"
        :class="{ selected: amount == rule }"
        @click="amount = rule"
      >
        {{ rule }}
      </div>
      <!-- <div class="option" :class="{ selected: amount == 100 }" @click="amount = 100">100</div>
      <div class="option" :class="{ selected: amount == 500 }" @click="amount = 500">500</div>
      <div class="option" :class="{ selected: amount == 1000 }" @click="amount = 1000">1000</div>
      <div class="option" :class="{ selected: amount == 5000 }" @click="amount = 5000">5000</div>-->
    </div>
    <input
      v-if="selectedType.id == 1017"
      class="thirdparty-input cardCode"
      type="text"
      :placeholder="$t('Placeholder_CardCode')"
      v-on:keyup="btKeyUp"
      v-model="cardCode"
    />
    <p class="thirdparty-tips" v-if="selectedType.id != 1017">
      <span v-if="selectedPlay.value == 2005">新台幣</span>
      <span v-else>人民幣 (1 : 4.2)</span>
      {{ $t("MinimumDeposit") }}{{ selectedPlay.min | $currency }}，上限
      <span class="playMax">{{ selectedPlay.max | $currency }}</span>
    </p>
    <div class="btn btn-round btn-blue" @click.prevent="sendPay">充值</div>
    <div class="reminder">
      溫馨提示：在Line等軟體打開儲值如有異常，請下傳APP即可
      <a @click.stop="$APP.openByBrowerInApp(address)">「APP下傳」</a>
      或觀看 Line 裡儲值<a
        @click.stop="$APP.openByBrowerInApp('https://youtu.be/vsvhg19ni-M')"
        >「影片教學」</a
      >
    </div>
  </div>
</template>
<script>
import { apiGetPlat, apiMaoPay } from "@/api";
export default {
  props: {
    selectedType: Object
  },
  data() {
    return {
      payPlat: [],
      firstPayPlat: {},
      selectedPlay: {
        rule: "",
        text: "",
        value: 0
      },
      amount: "",
      address: "",
      cardCode: ""
    };
  },
  created() {
    // 變數寫在 public/config.js裡，為全域變數，用window.XXX 取值
    this.address = window.address;
  },
  mounted() {
    this.getChannel();
  },
  methods: {
    inputselected(defaultV) {
      // console.log(this.firstPayPlat.rule[2]);
      this.amount = defaultV;
      this.cardCode = "";
    },
    sendPay() {
      let params;
      // 將format過的金額還原成數字字串
      //   this.amount = this.amount.toString().replace(/[^0-9]/g, "");
      // 確認是否輸入進額
      if (this.selectedType.id != 1017) {
        if (!this.amount) {
          this.$toast("尚未输入金额");
          return;
        }
        //   輸入金額介於
        if (
          this.amount < this.selectedPlay.min ||
          this.amount > this.selectedPlay.max
        ) {
          this.$toast(
            `存款金額請介於${this.$options.filters.$currency(
              this.selectedPlay.min
            )} ~ ${this.$options.filters.$currency(this.selectedPlay.max)} `
          );
          return;
        }
        params = {
          type: Number(this.selectedType.id),
          payPlatId: this.selectedPlay.value,
          amount: Number(this.amount)
          // isJoinActivity: this.isJoinActivity,
          // data: ""
        };
        var newWin = window.open("about:blank");
      } else {
        if (!this.cardCode) {
          this.$toast("請輸入您的禮品序號");
          return;
        }
        params = {
          type: Number(this.selectedType.id),
          payPlatId: this.selectedPlay.value,
          cardCode: this.cardCode
          // isJoinActivity: this.isJoinActivity,
          // data: ""
        };
      }
      //   有無選擇渠道
      if (!this.selectedPlay.value) {
        this.$toast("请选择渠道");
        return;
      }

      // let params = {
      //   type: Number(this.selectedType.id),
      //   payPlatId: this.selectedPlay.value,
      //   amount: Number(this.amount)
      //   // isJoinActivity: this.isJoinActivity,
      //   // data: ""
      // };
      //   params.data = `${this.selectProvider.value},${this.cardNumber},${
      //     this.serialNumber
      //   },${this.amount}`;

      // 送出充值
      // var newWin = window.open("about:blank");
      apiMaoPay(params).then(res => {
        if (res.result === 1) {
          if (this.selectedType.id == 1017) {
            this.$toast("充值成功");
            this.cardCode = "";
          } else {
            if (res.data.isHtml) {
              newWin.document.write(res.data.url);
            } else {
              newWin.location = res.data.url;
            }
          }
        } else {
          if (this.selectedType.id == 1017) {
            this.$toast(res.message);
          } else {
            newWin.close();
            this.$toast(res.message);
          }
        }
      });
    },
    openWindowWithPost(res) {
      let newWindow = window.open();
      if (!newWindow) return false;
      let html = res.data.url;
      newWindow.document.write(html);
      return newWindow;
    },
    getChannel() {
      let param = {
        channelId: this.selectedType.id
      };
      apiGetPlat(param).then(res => {
        if (res.result === 1 && res.data.length > 0) {
          this.payPlat = res.data;
          this.firstPayPlat = this.payPlat[0];
          this.amount = this.firstPayPlat.rule[0];
        } else {
          this.initialData();
        }
      });
    },
    initialData() {
      this.payPlat = [];
      this.selectedPlay = {};
      this.amount = "";
    },

    //限制特殊符號
    btKeyUp(e) {
      e.target.value = e.target.value.replace(/[`~!@#$%^&*()_\-+=<>?:"{}|,. \/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g,"");
      this.cardCode = e.target.value;
    }
  },
  watch: {
    selectedType() {
      this.getChannel();
      this.initialData();
    }
  }
};
</script>
<style lang="scss">
.thirdparty {
  &-input {
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
  &-options {
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
        z-index: 1;
      }
    }
  }
  &-tips,
  .reminder {
    font-size: rem(27);
    color: $gray;
    margin-bottom: rem(64);
    text-align: center;
    span {
      color: #818181;
    }
    .playMax {
      color: #ffae01;
    }
  }
  .reminder {
    margin-top: rem(20);
    line-height: rem(40);
    a {
      color: #ffae01;
    }
  }

  .cardCode {
    margin-bottom: rem(30);
  }
}
</style>
