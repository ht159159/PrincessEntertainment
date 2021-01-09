<template>
  <div>
    <header-cmp :title="$t('ChangeMobile')"></header-cmp>
    <div class="container">
      <div class="input_box">
        <input
          type="text"
          :placeholder="$t('Placeholder_Mobile')"
          v-model="changeData.mobile"
        />
      </div>
      <div class="input_box">
        <input
          type="text"
          :placeholder="$t('Placeholder_Validation')"
          v-model="changeData.imgCode"
        />
        <span href="#" class="imgcode" @click.prevent="changeImg">
          <img :src="img" />
        </span>
      </div>
      <div class="input_box">
        <input
          type="text"
          :placeholder="$t('Placeholder_SMSCode')"
          v-model="changeData.smsCode"
        />
        <span
          href="#"
          class="confirm"
          @click.prevent="getSMScode"
          :class="{ dontClick: countDown }"
          >{{ SMSCodeMessage }}</span
        >
      </div>
      <a href="#" class="btn btn-round btn-blue" @click="sendChangeMobile">{{
        $t("Done")
      }}</a>
    </div>
  </div>
</template>
<script>
import { apiChangePhoneNumberBind, apiSendUpdateMobileCode } from "@/api";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      img: "",
      countDown: 0,
      changeData: {
        mobile: "",
        imgCode: "",
        smsCode: ""
      },
      SMSCodeMessage: this.$t("Send_ValidationCode")
    };
  },
  mounted() {
    this.changeImg();
  },
  methods: {
    changeImg() {
      this.img =
        process.env.VUE_APP_API_BASE_URL +
        "/Account/GetImgCode?t=" +
        Math.random();
    },
    getSMScode() {
      let { mobile, imgCode } = this.changeData;
      if (!this.$verifyData({ mobile, imgCode })) return;
      apiSendUpdateMobileCode({ mobile, imgCode }).then(res => {
        if (!res.result) this.$toast(res.message);
        else if (res.result === 1) {
          Toast(this.$t("Error_SMSCode_IsSent"));
          this.countDown = 60;
          let interval = setInterval(() => {
            this.countDown = this.countDown - 1;
            if (!this.countDown) clearInterval(interval);
          }, 1000);
        }
      });
    },
    sendChangeMobile() {
      let { mobile, smsCode } = this.changeData;
      apiChangePhoneNumberBind({ mobile, smsCode }).then(res => {
        if (res.result === 1) {
          this.$toast(res.message);
          setTimeout(() => {
            this.$router.back(-1);
          }, 3000);
        }
      });
    }
  },
  watch: {
    countDown(val) {
      this.SMSCodeMessage =
        val == 0
          ? this.$t('Send_ValidationCode')
          : `${val}${this.$t("SendSMSCodeAfterSec")}`;
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding-top: rem(85);
}
</style>
