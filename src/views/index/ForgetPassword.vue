<template>
  <div>
    <header-cmp :title="$t('Find_Password')" />
    <div class="container" v-if="stage == 'verify'">
      <div class="input_box">
        <input
          type="text"
          :placeholder="$t('Input_Your_Account')"
          v-model="memIdData.memId"
        />
        <a
          href="#"
          class="clear"
          @click.prevent="$clearInput('memIdData', 'memId')"
        ></a>
      </div>
      <div class="input_box">
        <input
          type="tel"
          :placeholder="$t('Placeholder_SMSCode')"
          v-model="memIdData.imgCode"
        />
        <a href="#" class="imgcode">
          <img :src="imgCode" @click="changeImgCode" />
        </a>
      </div>
      <a href="#" class="btn btn-round btn-blue" @click.prevent="verify">{{
        $t("Next_Step")
      }}</a>
    </div>
    <div class="container way" v-if="stage == 'foundway'">
      <div class="input_box" @click="foundway">
        <input type="text" :placeholder="$t('Find_By_Email')" disabled />
        <!-- <a href="#" class="clear"></a> -->
      </div>
      <a
        class="input_box"
        @click.stop="$APP.openByBrowerInApp('https://lin.ee/3SeRpTxuz')"
      >
        <input type="text" :placeholder="$t('Find_By_Service')" disabled />
        <!-- <a href="#" class="clear"></a> -->
      </a>
    </div>
    <div class="container" v-if="stage == 'email'">
      <div class="input_box">
        <input type="text" :placeholder="emailData.fUserName" disabled />
      </div>
      <div class="input_box">
        <input
          type="text"
          :placeholder="$t('Email')"
          v-model="emailData.fEmail"
        />
        <a
          href="#"
          class="clear"
          @click.prevent="$clearInput('emailData', 'fEmail')"
        ></a>
      </div>
      <a href="#" class="btn btn-round btn-blue" @click.prevent="submit">{{
        $t("Submit")
      }}</a>
    </div>
  </div>
</template>
<script>
import { apiForgotPasswordValid, apiForgotPasswordEmail } from "@/api";
export default {
  data() {
    return {
      stage: "verify",
      imgCode: process.env.VUE_APP_API_BASE_URL + "/Account/GetImgCode",
      memIdData: {
        memId: "",
        imgCode: ""
      },
      emailData: {
        fUserName: "",
        fEmail: ""
      }
    };
  },
  beforeRouteUpdate(to, from, next) {
    console.log("15555");
    this.stage = to.params.id;
    next();
  },
  mounted() {
    if (this.$router.currentRoute.path === "/forgetpassword/foundway") {
      this.stage = this.$router.currentRoute.params.id;
    }
  },
  methods: {
    verify() {
      if (!this.$verifyData(this.memIdData)) return;
      apiForgotPasswordValid(this.memIdData).then(res => {
        if (res.result == 1) {
          this.emailData.fUserName = this.memIdData.memId;
          this.memIdData.imgCode = "";
          this.changeImgCode();
          this.$router.push({
            name: "forgetpassword",
            params: { id: "foundway" }
          });
        }
      });
    },
    foundway() {
      this.$router.push({ name: "forgetpassword", params: { id: "email" } });
    },
    submit() {
      if (!this.$verifyData(this.emailData)) return;
      apiForgotPasswordEmail(this.emailData).then(res => {
        if (res.result == 1) {
          this.$router.push({
            name: "login"
          });
          return;
        }
      });
    },
    changeImgCode() {
      this.imgCode =
        process.env.VUE_APP_API_BASE_URL +
        "/Account/GetImgCode?o=" +
        Math.random();
    },
    goTo(name) {
      this.close();
      setTimeout(() => {
        this.$router.push({ name });
      }, 250);
    },
    close() {
      this.$emit("close");
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  margin-top: 1rem;
}

.way {
  .input_box {
    input::placeholder {
      text-align: center;
      color: #afafaf;
    }
    input:-ms-input-placeholder {
      text-align: center;
      color: #afafaf;
    }
    input::-ms-input-placeholder {
      text-align: center;
      color: #afafaf;
    }
  }
}
</style>
