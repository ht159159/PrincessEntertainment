<template>
  <div class="ZhiGuanPay-page">
    <header-cmp :title="$t('ZhiGuanPay')"></header-cmp>

    <div class="ZhiGuanPay-content">
      <div>訂單編號 : {{ zhiGuanPayData.Ordernum }}</div>
      <div>超商代碼 : {{ zhiGuanPayData.StoreCode }}</div>
      <div>總金額 : {{ zhiGuanPayData.Total }}</div>
      <div>
        支付網址 :
        <a :href="zhiGuanPayData.mobileUrl">{{ zhiGuanPayData.mobileUrl }}</a>
      </div>
      <div>
        注意事項 :
        <p></p>
        <span>
          超商代碼重複列印繳費，將會造成系統異常。
          <p></p>
          為了您的權益，請勿重複繳費。
        </span>
      </div>
    </div>
    <!-- 內容 -->
  </div>
</template>
<script>
// import { apiGetPlat, apiMaoPay } from "@/api";
export default {
  data() {
    return {
      zhiGuanPayData: ""
    };
  },
  mounted() {
    // console.log(this.$route.query);
    this.zhiGuanPayData = this.$route.query;
  },
  methods: {},
  watch: {}
};
</script>
<style lang="scss">
.ZhiGuanPay-page {
  font-size: rem(40);

  .ZhiGuanPay-content {
    width: 100%;
    padding: rem(40);
    box-sizing: border-box;

    div {
      padding: rem(30) 0;
      box-sizing: border-box;
      border-bottom: 1px solid #5d5d65;
      a {
        color: #ffae01;
      }

      span {
        font-size: rem(32);
      }
    }
  }
}
</style>
