<template>
  <div>
    <header-cmp :title="$t('Bank_Card_Setting')"></header-cmp>
    <div>
      <div class="container">
        <div class="cardinfo" v-if="isBankCard">
          <div class="row">
            <p class="bankcardLogo">{{ bankcardInfo.bankName }}</p>
            <p>{{ bankcardInfo.accountName }}{{ bankcardInfo.accountNameMask }}</p>
          </div>
          <div class="row">
            <h3>**** **** **** {{ bankcardInfo.cardNumber }}</h3>
          </div>
          <p class="alert">{{ $t("Not_Allow_Change_Personal") }}。</p>
        </div>
        <div class="add" v-if="!isBankCard">
          <a href="#" @click.prevent="toEditBankCard">
            <img src="~@/assets/images/icons/add.png" />
          </a>
        </div>
      </div>
    </div>
    <!-- 沒有綁定銀行卡 -->
    <modal-alert
      v-if="showAlert"
      imgName="alert"
      @close="$router.back(-1)"
      :text="$t('Bank_Card_Notset')"
    >
      <template #btn>
        <div class="alert-box-cancel alert-box-btn" @click="$router.back(-1)">{{ $t("Leave") }}</div>
        <div
          class="alert-box-cancel alert-box-btn alert-box-btn-bright"
          @click.prevent="toPage('bankcardedit')"
        >{{ $t("Goto") }}</div>
      </template>
    </modal-alert>
  </div>
</template>
<script>
import bankcardMixin from "@/mixin/bankCard.js";
export default {
  data() {
    return {
      showAlert: ""
    };
  },
  mixins: [bankcardMixin],
  mounted() {
    if (!this.$storage.local.get("isBindBankCard")) {
      this.showAlert = true;
      return;
    }
  },
  methods: {
    toEditBankCard() {
      this.$router.push({ name: "bankcardedit" });
    },
    toPage(name) {
      this.showAlert = false;
      this.$router.push({ name });
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding-top: rem(85);
}

.alert {
  font-size: rem(22);
  text-align: center;
  color: $font-alert;
  padding-top: rem(20);
  padding-bottom: rem(40);
}

.add {
  margin: 0 auto;
  margin-top: rem(500);
  width: rem(100);
}
.add img {
  width: 100%;
}
</style>
