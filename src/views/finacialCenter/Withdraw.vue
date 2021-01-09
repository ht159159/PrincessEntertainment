<template>
  <div class="withdrawBox">
    <header-cmp :title="$t('Withdraw')"></header-cmp>
    <div class="containerBox">
      <div class="container">
        <div class="cardinfo">
          <div class="row">
            <!-- <p class="bankcardLogo">{{ bankcardInfo.bankName }}</p> -->
            <p>{{ this.personalInfo.realName }}</p>
          </div>
          <!-- <div class="row"> -->
          <!-- <h3>**** **** **** {{ bankcardInfo.cardNumber }}</h3> -->
          <picker
            class="plat"
            v-model="bankCard"
            :large="true"
            :text="$options.filters.$maskString(bankCard.cardNumber)"
            :list="personalInfo.bankList"
            :bgRed="true"
          ></picker>
          <!-- </div> -->
        </div>
        <div class="phone_id">
          <div class="pic">
            <img src="~@/assets/images/icons/phone_s.png" alt />
          </div>
          <div class="num">
            <p>{{ bankTransferData.mobile }}</p>
          </div>
        </div>
        <div class="drawal">
          <h1>{{ $t("Withdraw_Money") }}</h1>
        </div>
        <input
          class="box"
          type="tel"
          :placeholder="$t('Placeholder_WithDrawAmount')"
          v-model="amount"
        />
        <div class="article">
          <!-- <div class="tip1">
            <p>每日限額：5次</p>
          </div> -->
          <div class="tip">
            <p>
              {{ $t("SinglewithdrawalAmount") }}{{ minVal | $currency }} ，
              {{ $t("Limit_Transaction_High") }}{{ maxVal | $currency }}，每日限5次
            </p>
            <p>新台幣 1 : 遊戲幣 1 ｜ 人民幣 1 : 遊戲幣 4.2</p>
            <p>託售時間為每日12:00～18:00</p>
          </div>
          <div class="tip1 withdrawalRules">
            <p>業績託售規則說明 :</p>
            <p>
              每週可免費託售2次，超過次數將收取3%手續費(單筆最低50點) 每週一00:00系統會自動重置。
            </p>
          </div>
          <div class="tip2">
            <p>
              任何疑問請聯系 [
              <u
                ><a
                  href="https://line.me/R/ti/p/%40294wqazk"
                  target="_blank"
                  style="color:yellow;"
                  >VIP客服</a
                ></u
              >
              ]
            </p>
          </div>
        </div>
        <a
          href="#"
          class="btn btn-round btn-blue"
          @click.prevent="editWalletPasswordHandler"
          >{{ $t("Next_Step") }}</a
        >
      </div>
    </div>
    <!-- 輸入安全碼 -->
    <modal-alert
      v-if="editWalletPassword"
      imgName="alert"
      @close="editWalletPassword = false"
      :text="$t('Placeholder_WallerPassword')"
    >
      <template #content>
        <input
          type="password"
          class="alert-box-input"
          v-model="maoPayBankTransferData.sCode"
          :placeholder="$t('Placeholder_WallerPassword')"
        />
      </template>
      <template #btn>
        <div
          class="alert-box-cancel alert-box-btn"
          @click="editWalletPassword = false"
        >
          {{ $t("Cancel") }}
        </div>
        <div
          class="alert-box-cancel alert-box-btn alert-box-btn-bright"
          @click.prevent="sendBankTransfer"
        >
          {{ $t("Confirm") }}
        </div>
      </template>
    </modal-alert>
    <!-- 沒有綁定銀行卡 -->
    <modal-alert
      v-if="showAlert"
      imgName="alert"
      @close="$router.back(-1)"
      :text="$t('Bank_Card_Notset')"
    >
      <template #btn>
        <div class="alert-box-cancel alert-box-btn" @click="$router.back(-1)">
          {{ $t("Leave") }}
        </div>
        <div
          class="alert-box-cancel alert-box-btn alert-box-btn-bright"
          @click="toPage('bankcard')"
        >
          {{ $t("Goto") }}
        </div>
      </template>
    </modal-alert>
  </div>
</template>
<script>
// import bankcardMixin from "@/mixin/bankCard.js";
// import { mapState } from "vuex";
import {
  apiMaoPayBankTransfer,
  apiGetBankTransfer,
  apiGetPersonalInformation
} from "@/api";
// import { Promise } from "q";
export default {
  // mixins: [bankcardMixin],
  // computed: mapState(["personalInfo"]),
  data() {
    return {
      editWalletPassword: false,
      maxVal: 50000,
      minVal: 1000,
      bankTransferData: {},
      amount: "",
      showAlert: false,
      selectProvider: "",
      text: "",
      list: "",
      bankCard: "",
      personalInfo: "",
      maoPayBankTransferData: {
        type: 1
      }
    };
  },
  mounted() {
    // if (!this.$storage.local.get("isBindBankCard")) {
    //   this.showAlert = true;
    //   return;
    // }
    apiGetPersonalInformation().then(res => {
      if (res.result === 1) {
        this.personalInfo = res.data;
        if (res.data.bankList.length == 0) {
          this.showAlert = true;
          return;
        } else {
          this.getBankTransfer();
        }
      }
    });
  },
  methods: {
    getBankTransfer() {
      apiGetBankTransfer().then(res => {
        if (res.result === 1) {
          this.bankTransferData = res.data;
          this.maoPayBankTransferData.sCode = "";
        } else {
          this.$router.back(-1);
          return;
        }
      });
    },
    editWalletPasswordHandler() {
      if (!this.bankCard) {
        this.$toast(this.$t("NotYetSelectedBankCard"));
        return;
      }

      if (this.amount)
        this.maoPayBankTransferData.amount = Number(Math.floor(this.amount));

      if (this.bankTransferData.realAmount > 0) {
        this.$toast(
          `${this.$t("Need_More_Bet_Amount_Before")} ${
            this.bankTransferData.realAmount
          }${this.$t("Need_More_Bet_Amount_After")}`
        );
        return;
      }
      if (this.maoPayBankTransferData.amount < this.minVal) {
        this.$toast(
          `${this.$t("Error_Amount_Min")}${this.$options.filters.$currency(
            this.minVal
          )} `
        );
        return;
      } else if (this.maoPayBankTransferData.amount > this.maxVal) {
        this.$toast(
          `${this.$t("Error_Amount_Max")}${this.$options.filters.$currency(
            this.maxVal
          )} `
        );
        return;
      }
      this.editWalletPassword = true;
      // apiGetBankTransfer().then(res => {
      //   // this.editWalletPassword = false;
      //   console.log("123")
      // });
    },
    sendBankTransfer() {
      if (this.maoPayBankTransferData.sCode.length === 0) {
        this.$toast(this.$t("Error_WalletPasword_IsNull"));
        return;
      }
      this.maoPayBankTransferData.amount = Math.floor(
        this.maoPayBankTransferData.amount
      );
      this.maoPayBankTransferData.accountName = this.bankTransferData.accountName;
      this.maoPayBankTransferData.carNo = this.bankCard.cardNumber;
      apiMaoPayBankTransfer(this.maoPayBankTransferData).then(res => {
        if (res.result === 1) {
          this.$toast(res.message);
        }
        this.editWalletPassword = false;
        this.maoPayBankTransferData.sCode = "";
      });
    },
    toPage(name) {
      this.showAlert = false;
      this.$router.push({ name });
    }
  }
};
</script>

<style lang="scss" scoped>
.withdrawBox {
  height: 100%;
  .containerBox {
    height: calc(100% - 60px);
    overflow-y: scroll;
  }
}
.container {
  padding-top: rem(65);
}
.phone_id {
  margin-top: rem(5);
  display: flex;
  align-items: center;
  padding-left: rem(20);
}
.phone_id .pic {
  width: 5%;
}
.phone_id .pic img {
  width: 100%;
  display: block;
}

.phone_id .num p {
  font-size: rem(38);
  color: #0291e6;
  padding-left: rem(20);
}
.drawal {
  margin-top: rem(40);
}
.drawal h1 {
  font-size: rem(30);
  color: #fff;
}
.box {
  width: 100%;
  border: 2px #5d5d65 solid;
  border-radius: rem(10);
  height: rem(80);
  margin-top: rem(15);
  font-size: rem(28);
  background-color: transparent;
  padding: rem(10) rem(15);
  box-sizing: border-box;
  outline: none;
}
.article {
  margin-top: rem(30);
}
.tip {
  text-align: center;
}
.tip p:first-child {
  color: #abaeb9;
}
.tip p {
  color: #e40202;
  font-size: rem(28);
  margin-bottom: rem(10);
}
.tip1 {
  text-align: center;
  margin-top: rem(15);
  margin-bottom: rem(10);
}
.withdrawalRules p {
  // text-align: initial;
  line-height: rem(32);
}
.withdrawalRules p:first-child {
  text-align: center;
}
.tip1 p {
  color: #abaeb9;
  font-size: rem(28);
}
.tip2 {
  text-align: center;
  margin-top: rem(15);
}
.tip2 p {
  color: #abaeb9;
  font-size: rem(28);
}
.btn {
  margin-top: rem(80);
  margin-bottom: rem(80);
}
.plat {
  width: 70%;
  margin: 0 auto;
}
</style>
