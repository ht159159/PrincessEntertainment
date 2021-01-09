<template>
  <div>
    <header-cmp :title="$t('Bank_Card_Setting')"></header-cmp>
    <div class="container">
      <div class="input_box">
        <picker
          class="bankPicker"
          v-model="bankName"
          :text="bankName ? bankName.text : ''"
          :list="bankData"
          :placeholder="$t('Placeholder_Bank')"
        ></picker>
      </div>
      <!-- //支行信息
      <div class="input_box">
        <input type="text" :placeholder="$t('Placeholder_Bank_Branch')" v-model="bankBranch" />
      </div>
      -->
      <div class="input_box">
        <input
          type="text"
          :placeholder="$t('Placeholder_BankAccount_Name')"
          v-model="accountName"
          disabled
        />
      </div>
      
      <div class="input_box">
        <input type="text" :placeholder="$t('Placeholder_BankAccount_No')"  v-model="cardNumber" />
      </div>
      <div class="input_box">
        <input type="text" :placeholder="$t('Placeholder_Note')" v-model="remark" />
      </div>
      <a
        href="#"
        class="btn btn-round btn-blue"
        @click.prevent="sendBindBankNoHandler"
      >{{ $t("AddBankCard") }}</a>
    </div>
    <!-- 沒有綁定資金密碼 -->
    <modal-alert
      v-if="showAlert"
      imgName="alert"
      @close="$router.back(-1)"
      :text="$t('Wallet_Password_Notset')"
    >
      <template #btn>
        <div class="alert-box-cancel alert-box-btn" @click="$router.back(-1)">{{ $t("Leave") }}</div>
        <div
          class="alert-box-cancel alert-box-btn alert-box-btn-bright"
          @click="toPage('fundpasswordsetting')"
        >{{ $t("Goto") }}</div>
      </template>
    </modal-alert>
    <!-- 沒有綁定個人資料 -->
    <modal-alert
      v-if="showPersonAlert"
      imgName="alert"
      @close="$router.back(-1)"
      :text="$t('PersonalNotSet')"
    >
      <template #btn>
        <div class="alert-box-cancel alert-box-btn" @click="$router.back(-1)">{{ $t("Leave") }}</div>
        <div
          class="alert-box-cancel alert-box-btn alert-box-btn-bright"
          @click="toPage('personal')"
        >{{ $t("Goto") }}</div>
      </template>
    </modal-alert>
  </div>
</template>
<script>
// import bankNameData from "@/utils/bankData";
import {
  apiBindBankNo,
  apiGetBankInfo,
  apiGetPersonalInformation
} from "@/api";
import { mkdir } from "fs";
export default {
  data() {
    return {
      bankData: [],
      bankName: {
        text: "",
        value: ""
      },
      //bankBranch: "",
      cardNumber: "",
      accountName: "",
      remark: "",
      showAlert: "",
      showPersonAlert: ""
    };
  },
  mounted() {
    if (this.$storage.local.get("canEdit")) {
      this.showPersonAlert = true;
    }
    if (!this.$storage.local.get("isNullWallet")) {
      this.showAlert = true;
      return;
    }

    this.getBankInfo();
    this.accountName = this.$storage.local.get("realName");
  },
  methods: {
    getBankInfo() {
      apiGetBankInfo().then(res => {
        if (res.result === 1) {
          this.bankData = res.data;
        }
      });
    },
    sendBindBankNoHandler() {
      let data = {
        bankType: this.bankName.value,
        //bankBranch: this.bankBranch,
        cardNumber: this.cardNumber,
        accountName: this.accountName,
        remark: this.remark
      };
      if(this.bankName.value === ''){
         this.$toast(this.$t("BankNameNull"));
         return
      }
      if(this.cardNumber.trim().length<6||this.cardNumber.trim().length>21){
         this.$toast(this.$t("BankcardMinMax"));
         return
      }
      // if (Object.values(data).indexOf("") !== -1) {
      //   this.$toast(this.$t("Error_Message_IsNull"));
      //   return;
      // }
      apiBindBankNo(data).then(res => {
        if (res.result === 1) {
          this.$toast(res.message);
          this.$store.dispatch("getPersonalInfo");
          setTimeout(() => {
            this.$router.back(-1);
          }, 3000);
        }
      });
    },
    toPage(name) {
      this.showAlert = false;
      this.$router.push({ name });
    }
  },
  computed: {
    bankNameData() {
      return bankNameData;
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding-top: rem(85);
  .input_box {
    .bankPicker {
      width: 100%;
    }
  }
}
.btn {
  margin-top: rem(200);
}
</style>
