<template>
  <div class="agentJoin">
    <header-cmp :title="$t('Agent_Join')"></header-cmp>
    <ul class="menu">
      <li class="list">
        <div class="list-l">
          <div class="list-l-icon">
            <img src="~@/assets/images/icons/user.png" />
          </div>
          <div class="list-l-text">{{ $t("Agent_Account") }}</div>
        </div>
        <div class="list-r">
          <input
            type="text"
            :placeholder="$t('Placeholder_Agent_Account')"
            v-model="agentData.memId"
          />
        </div>
      </li>
      <li class="list">
        <div class="list-l">
          <div class="list-l-icon">
            <img src="~@/assets/images/icons/password.png" />
          </div>
          <div class="list-l-text">{{ $t("Agent_Password") }}</div>
        </div>
        <div class="list-r">
          <input
            type="password"
            :placeholder="$t('Placeholder_Agent_Password')"
            v-model="agentData.password"
          />
        </div>
      </li>
      <li class="list">
        <div class="list-l">
          <div class="list-l-icon">
            <img src="~@/assets/images/icons/confirmPassword.png" />
          </div>
          <div class="list-l-text">{{ $t("Agent_Confirm_Password") }}</div>
        </div>
        <div class="list-r">
          <input
            type="password"
            :placeholder="$t('Placeholder_Agent_ConfirmPassword')"
            v-model="agentData.confirmPassword"
          />
        </div>
      </li>
    </ul>
    <ul class="menu">
      <li class="list">
        <div class="list-l">
          <div class="list-l-icon">
            <img src="~@/assets/images/icons/realName.png" />
          </div>
          <div class="list-l-text">{{ $t("Mobile") }}</div>
        </div>
        <div class="list-r">
          <input
            type="list-r-text"
            :placeholder="$t('Placeholder_Agent_Mobile')"
            v-model="agentData.mobile"
          />
        </div>
      </li>
      <li class="list">
        <img class="imgCode" :src="img" @click="changeImg()" />
        <div class="list-r">
          <input
            type="list-r-text"
            :placeholder="$t('Placeholder_Validation')"
            v-model="imgCode"
          />
        </div>
      </li>

      <li class="list">
        <div class="list-l">
          <span
            class="smsCode"
            v-if="isSMSSend == false"
            @click.prevent="getSMScode"
            >{{ $t("SendSMSCode") }}</span
          >
          <span class="smsCode" v-else>{{ count }}</span>
        </div>

        <div class="list-r">
          <input
            type="list-r-text"
            :placeholder="$t('Placeholder_SMSCode')"
            v-model="agentData.smsCode"
          />
        </div>
      </li>
      <li class="list">
        <div class="list-l">
          <div class="list-l-icon">
            <img src="~@/assets/images/icons/mail.png" />
          </div>
          <div class="list-l-text">{{ $t("Referer") }}</div>
        </div>
        <div class="list-r">
          <input
            type="list-r-text"
            :placeholder="$t('Referer')"
            v-model="agentData.referralCode"
          />
        </div>
      </li>
    </ul>
    <div class="agentJoin-container container">
      <a href="#" class="btn btn-round btn-blue" @click.prevent="submit">{{
        $t("Submit")
      }}</a>
    </div>
  </div>
</template>
<script>
import { apiRegisterAgent, apiGetSMSCode } from "@/api";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      isSMSSend: false,
      img:
        process.env.VUE_APP_API_BASE_URL +
        "/Account/GetImgCode?t=" +
        Math.random(),
      imgCode: "",
      agentData: {
        memId: "",
        password: "",
        confirmPassword: "",
        mobile: "",
        smsCode: "",
        referralCode: ""
      },
      count: 60
    };
  },
  methods: {
    changeImg() {
      this.img =
        process.env.VUE_APP_API_BASE_URL +
        "/Account/GetImgCode?t=" +
        Math.random();
    },
    getSMScode() {
      let params = { mobile: this.agentData.mobile, imgCode: this.imgCode };
      if (!this.$verifyData(params)) return;
      apiGetSMSCode(params).then(res => {
        if (res.result == 1) {
          this.isSMSSend = true;
          this.countDown();
        }
      });
    },
    submit() {
      if (!this.$verifyData(this.agentData)) return;
      apiRegisterAgent(this.agentData).then(res => {
        if (res.result == 1) {
          Toast(this.$t("AgentJoinedDone"));
          setTimeout(() => {
            this.$router.back(-1);
          }, 500);
        }
      });
    },
    countDown() {
      let down;
      down = setInterval(() => {
        this.count--;
        if (this.count < 1) {
          this.isSMSSend = false;
          clear();
          return;
        }
      }, 1000);
      let clear = function() {
        clearInterval(down);
      };
    }
  }
};
</script>

<style lang="scss">
.agentJoin {
  height: 100%;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
}
.smsCode {
  border: 1px solid #d6d6d6;
  padding: 3px;
  border-radius: 5px;
  color: #d6d6d6;
}
.imgCode {
  width: rem(130);
}
.agentJoin-container {
  padding-top: rem(85);
}
</style>
