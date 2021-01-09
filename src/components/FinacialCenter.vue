<template>
  <div class="container">
    <div class="bg"></div>
    <img src="~@/assets/images/background/logo.png" class="logo" />
    <div class="bottom">
      <div @click.prevent="goDeposit" class="item">
        <img src="~@/assets/images/finacialcenter/deposit.png" />
        <p>{{ $t("Deposit") }}</p>
      </div>

      <!-- 推廣碼 -->
      <div @click.prevent="goTo('subordinate')" class="item">
        <img src="~@/assets/images/finacialcenter/promotionCode.png" />
        <p>{{ $t("PromotionCode") }}</p>
      </div>

      <!-- 提款 -->
      <!-- <div @click.prevent="goTo('withdraw')" class="item">
        <img src="~@/assets/images/finacialcenter/withdraw.png" />
        <p>{{ $t("Withdraw") }}</p>
      </div> -->
      <!-- VIP貴賓 -->
      <a @click.stop="$APP.openByBrowerInApp('https://lin.ee/3SeRpTxuz')" class="item">
        <img src="~@/assets/images/finacialcenter/service.png" />
        <p>{{ $t("VIPservice") }}</p>
      </a>

      <!-- 客服 -->
      <!-- <div @click.prevent="goTo('CustomerService')" class="item">
        <img src="~@/assets/images/finacialcenter/service.png" />
        <p>{{ $t("Service") }}</p>
      </div> -->

      <!-- <div @click.prevent="goTo('redeem')" class="item">
        <img src="~@/assets/images/finacialcenter/redeem.png" />
        <p>兑换码</p>
      </div> -->

      <!-- 個人資料 -->
      <!-- <div @click.prevent="goTo('personal')" class="item">
        <img src="~@/assets/images/finacialcenter/personInfo.png" />
        <p>{{ $t("Personal") }}</p>
      </div> -->

      <!-- 我的特權 -->
      <div @click.prevent="goTo('MyVip')" class="item">
        <img src="~@/assets/images/finacialcenter/privilege.png" />
        <p>{{ $t("privilege") }}</p>
      </div>

      <div @click.prevent="goTo('commissionRecord')" class="item">
        <img src="~@/assets/images/finacialcenter/traderecord.png" />
        <p>{{ $t("Trade_Record") }}</p>
      </div>
      <div @click.prevent="goTo('betrecords')" class="item">
        <img src="~@/assets/images/finacialcenter/betrecord.png" />
        <p>{{ $t("Bet_Record") }}</p>
      </div>
      <!-- 業績查詢 -->
      <div @click.prevent="goTo('query')" class="item">
        <img src="~@/assets/images/finacialcenter/performanceQuery.png" />
        <p>{{ $t("PerformanceQuery") }}</p>
      </div>
      <!-- 修改帳號密碼 -->
      <!-- <div @click.prevent="goTo('changepassword')" class="item">
        <img src="~@/assets/images/finacialcenter/loginpwd.png" />
        <p>{{ $t("Change_Password") }}</p>
      </div> -->
      <!-- App下傳 -->
      <a @click.stop="$APP.openByBrowerInApp(address)" class="item">
        <img src="~@/assets/images/finacialcenter/appDownstream.png" />
        <p>{{ $t("appDownstream") }}</p>
      </a>

      <!-- 資金密碼 -->
      <!-- <div @click.prevent="goTo('fundpasswordsetting')" class="item">
        <img src="~@/assets/images/finacialcenter/tradepwd.png" />
        <p>{{ $t("Wallet_Password") }}</p>
      </div> -->
    </div>
    <!-- <slot name="btn"></slot> -->
    <img
      src="~@/assets/images/finacialcenter/close.png"
      class="close"
      @click.prevent="close()"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      address: ""
    };
  },
  created() {
    // 變數寫在 public/config.js裡，為全域變數，用window.XXX 取值
    this.address = window.address;
  },
  methods: {
    goTo(name) {
      this.close();
      setTimeout(() => {
        this.$router.push({ name });
      }, 250);
    },
    close() {
      this.$emit("close");
    },
    prompt() {
      this.$toast({
        message: this.$t("stayTuned"),
        duration: 1500,
        className: "noticeError"
      });
    },
     goDeposit() {
      var url =
        window.location.origin +
        "/thirdpartypayment?" +
        "isFromApp=true&token=" +
        localStorage.getItem("token") +
        "&expireInMinutes=" +
        localStorage.getItem("expireInMinutes");
      if (isApp) {
        //app处理
        this.$APP.openByBrowerInApp(url);
      } else {
        //非app处理
        this.$router.push("thirdpartypayment");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  text-align: center;
  background: url("~@/assets/images/finacialcenter/background.png");
  background-size: cover;
  z-index: 10001;
  .bg {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(#000, 0.5);
    z-index: -1;
  }
  .logo {
    width: rem(500);
    position: relative;
    top: rem(90);
  }
  .bottom {
    width: 100%;
    margin-top: rem(200);
    display: flex;
    text-align: center;
    flex-wrap: wrap;
    .item {
      width: 25%;
      margin-bottom: 0.5rem;
      img {
        width: rem(118);
      }
      p {
        font-size: rem(26);
        color: #fff;
      }
    }
  }
  .close {
    margin-top: 0.5rem;
    height: rem(42);
  }
}
.mint-toast.is-placemiddle {
  z-index: 10001;
}
</style>
