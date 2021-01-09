<template>
  <div class="register">
    <header-cmp :title="$t('Register')">
      <template #btn>
        <div class="introVideoBtn" @click.prevent="introVideo = true">
          {{ $t("introVideo") }}
        </div>
      </template>
    </header-cmp>
    <div class="container">
      <!-- 推廣碼 -->
      <div class="input_box">
        <input
          type="text"
          :placeholder="$t('ReferralCode')"
          v-model="registerData.referralCode"
        />
      </div>

      <!-- <div class="input_box">
        <input type="text" :placeholder="$t('teamCode')" v-model="registerData.teamCode" />
      </div> -->

      <!-- 用戶名 -->
      <div class="input_box">
        <input
          type="text"
          :placeholder="$t('Placehoder_AccountNumber')"
          v-model="registerData.memId"
        />
        <span
          href="#"
          class="clear"
          @click.prevent="$clearInput('registerData', 'memId')"
        ></span>
      </div>

      <!-- LINE IG -->
      <!-- <div class="input_box">
        <input
          type="text"
          :placeholder="$t('lineID')"
          v-model="registerData.lineID"
        />
      </div> -->

      <!-- 手機號碼 -->
      <!-- <div class="input_box" >
        <input
          type="tel"
          :placeholder="$t('Placehoder_Mobile')"
          v-model="registerData.mobile"
        />
      </div> -->

      <!-- 圖形驗證碼 -->
      <div class="input_box">
        <input
          type="text"
          :placeholder="$t('Placeholder_Validation')"
          v-model="registerData.imgCode"
        />
        <span href="#" class="imgcode" @click.prevent="changeImg">
          <img :src="img" />
        </span>
      </div>

      <!-- 信箱 -->
      <div class="input_box" >
        <input
          :placeholder="$t('Placeholder_Email')"
          v-model="registerData.email"
        />
      </div>
      <!-- 信箱驗證碼 -->
      <div class="input_box emailSMSCode">
        <input
          type="tel"
          :placeholder="$t('Placeholder_SMSCode')"
          v-model="registerData.smsCode"
        />
        <span
          href="#"
          class="confirm border"
          @click.prevent="getSMScode"
          :class="{ dontClick: countDown }"
          >{{ SMSCodeMessage }}</span
        >
      </div>
      <!-- 手機驗證碼 -->
      <!-- <div class="input_box">
        <input
          type="tel"
          :placeholder="$t('Placeholder_SMSCode')"
          v-model="registerData.smsCode"
        />
        <span
          href="#"
          class="confirm border"
          @click.prevent="getSMScode"
          :class="{ dontClick: countDown }"
          >{{ SMSCodeMessage }}</span
        >
      </div> -->

      <div class="input_box">
        <input
          class="password"
          type="password"
          :placeholder="$t('Placeholder_Password_Min')"
          ref="passwordInput"
          v-model="registerData.password"
        />
        <span
          href="#"
          class="hide"
          ref="passwordButton"
          @click.prevent="$togglePassword('password')"
        ></span>
        <!-- <div class="alert" v-if="alert.password">{{ alert.password }}</div> -->
      </div>

      <!-- 再次確認密碼 -->
      <!-- <div class="input_box">
        <input
          type="password"
          :placeholder="$t('Placeholder_ConfirmPassword')"
          ref="confirmpasswordInput"
          v-model="registerData.confirmPassword"
        />
        <span
          href="#"
          ref="confirmpasswordButton"
          class="hide"
          @click.prevent="$togglePassword('confirmpassword')"
        ></span>
      </div> -->
      <div class="agreeAgreementBox">
        <input
          type="checkbox"
          id="checkbox"
          :checked="agreeAgreement"
          v-model="agreeAgreement"
        />
        <label for="checkbox">我已年滿18周歲，並且同意接受</label>
        <div class="agreementBox" @click.prevent="agreementBoxShow = true">
          《開戶協議》
        </div>
      </div>
      <a
        href="#"
        class="btn btn-round btn-blue"
        @click.prevent="sendRegisterData"
        >{{ $t("Start") }}</a
      >
      <div class="existingAccount" @click="existingAccount">我已有帳號</div>
    </div>

    <!-- 影片彈窗 -->
    <div class="video-wrap" v-if="introVideo">
      <div class="close" @click.prevent="introVideo = false"></div>
      <iframe
        class="video-main"
        src="https://www.youtube.com/embed/gncPgqqwChY?autoplay=1"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>

    <!-- 開戶協議彈窗 -->
    <!-- <div class="agreement" v-if="agreementBoxShow">
      <div class="close" @click.prevent="agreementBoxShow = false"></div>
        <div class="agreement-title">用戶協議</div>
        <div class="agreement-content">
          <p>•	為避免於本站遊戲時之爭議，請會員務必於進入網站前詳閱本站所定之各項規則，會員一經「我同意」進入本站進行遊戲時，即被為已接受本站的所有協議與規則。</p>
  <p>•	會員有責任確保自己的帳戶以及登入資料的保密性，以會員帳號及密碼進行的任何遊戲，將被視為有效。敬請不定時做密碼變更之動作。若帳號密碼被盜用，本公司一概不負賠償責任。</p>
	<p>•	本公司保留不定時更改本協定或遊戲規則或保密條例，更改之條款將從更改發生後指定之日起生效，並保留一切有爭議事項及最後的決策權。</p>
	<p>•	會員須達到居住地國家法律規定之合法年齡方可使用本站服務。</p>
	<p>•	凡玩家於遊戲途中且尚無結果前自動或強制斷線時，並不影響比賽之結果。</p>
	<p>•	如遇發生不可抗拒之災害，駭客入侵，網絡問題造成資料丟失的情況，以本公司公告為最終方案。</p>
	<p>•	特此聲明，本公司將會對所有的電子交易進行記錄，如有任何爭議，本公司將會以電腦記錄為準。</p>
	<p>•	本公司保留更改、修改現有條款或增加任何適當條款的權利！</p>
	<p>•	無風險套利：為了更好的完善長久合作關係，公司將嚴厲禁止個人/團體無風險套利。</p>
	<p>•	若本公司發現會員有重複申請帳號行為時，保留取消、收回會員所有優惠紅利，以及優惠紅利所產生的盈利之權利。每位玩家、每一電子郵箱、每一電話號碼、相同銀行卡，以及共用電腦環境 (例如:網咖、其他公共用電腦等)只能夠擁有一個會員帳號，各項優惠只適用於每位會員在本公司唯一的帳戶。若本公司發現會員有重復申請帳號行為時，保留取消、收回會員所有優惠紅利，以及優惠紅利所產生的盈利之權利。</p>
	
        </div>
    </div> -->
    <transition name="pop">
      <div class="agreement" v-if="agreementBoxShow">
        <!-- <div class="agreement-main"> -->
        <!-- <img
            class="agreementClose"
            src="../../assets/images/icons/close-white.png"
            alt
            @click.prevent="agreementBoxShow = false"
          /> -->
        <div class="agreement-title">用戶協議</div>
        <div class="agreement-content">
          <p>
            •
            為避免於本站遊戲時之爭議，請會員務必於進入網站前詳閱本站所定之各項規則，會員一經「我同意」進入本站進行遊戲時，即被為已接受本站的所有協議與規則。
          </p>
          <p>
            •
            會員有責任確保自己的帳戶以及登入資料的保密性，以會員帳號及密碼進行的任何遊戲，將被視為有效。敬請不定時做密碼變更之動作。若帳號密碼被盜用，本公司一概不負賠償責任。
          </p>
          <p>
            •
            本公司保留不定時更改本協定或遊戲規則或保密條例，更改之條款將從更改發生後指定之日起生效，並保留一切有爭議事項及最後的決策權。
          </p>
          <p>• 會員須達到居住地國家法律規定之合法年齡方可使用本站服務。</p>
          <p>
            • 凡玩家於遊戲途中且尚無結果前自動或強制斷線時，並不影響比賽之結果。
          </p>
          <p>
            •
            如遇發生不可抗拒之災害，駭客入侵，網絡問題造成資料丟失的情況，以本公司公告為最終方案。
          </p>
          <p>
            •
            特此聲明，本公司將會對所有的電子交易進行記錄，如有任何爭議，本公司將會以電腦記錄為準。
          </p>
          <p>• 本公司保留更改、修改現有條款或增加任何適當條款的權利！</p>
          <p>
            •
            無風險套利：為了更好的完善長久合作關係，公司將嚴厲禁止個人/團體無風險套利。
          </p>
          <p>
            •
            若本公司發現會員有重複申請帳號行為時，保留取消、收回會員所有優惠紅利，以及優惠紅利所產生的盈利之權利。每位玩家、每一電子郵箱、每一電話號碼、相同銀行卡，以及共用電腦環境
            (例如:網咖、其他公共用電腦等)只能夠擁有一個會員帳號，各項優惠只適用於每位會員在本公司唯一的帳戶。若本公司發現會員有重復申請帳號行為時，保留取消、收回會員所有優惠紅利，以及優惠紅利所產生的盈利之權利。
          </p>
          <!-- </div> -->
          <div
            class="agreement-close"
            @click.prevent="agreementBoxShow = false"
          >
            關閉
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { apiRegister, apiSendRegisterEmailCode } from "@/api";
export default {
  data() {
    return {
      registerData: {
        referralCode: "",
        memId: "",
        password: "",
        imgCode: "",
        email: "",
        smsCode: ""
        // confirmPassword: ""
        // teamCode: "",
      },
      img: "",
      SMSCodeMessage: this.$t("Send_EmailValidationCode"),
      countDown: 0,
      showAlert: false,
      introVideo: false,
      agreeAgreement: true,
      agreementBoxShow: false,
    };
  },
  created() {
    //回车提交信息
    let that = this;
    document.onkeypress = function(e) {
      var keycode = document.all ? event.keyCode : e.which;
      if (keycode == 13) {
        that.sendRegisterData();
        return false;
      }
    };

    this.changeImg();
    this.$route.query.ReferralCode
      ? (this.registerData.referralCode = this.$route.query.ReferralCode)
      : (this.registerData.referralCode = "");
  },
  // mounted() {
  //   // this.registerData.referralCode = this.$route.query.referralCode || "";
  // },
  methods: {
    getSMScode() {
      let { email, imgCode } = this.registerData;
      let code = imgCode
      // if (!this.$verifyData({ email })) return;

      //發送信箱驗證
      apiSendRegisterEmailCode({ email, code }).then(res => {
        if (!res.result) {
          this.$toast(res.message)
          if(res.message == "圖形驗證碼不正確"){
            this.registerData.imgCode = "";
            this.changeImg();
          }
        } else if (res.result === 1) {
          this.$toast(this.$t("Error_SMSCode_IsSent"));
          this.countDown = 60;
          let interval = setInterval(() => {
            this.countDown = this.countDown - 1;
            if (!this.countDown) clearInterval(interval);
          }, 1000);
        }
      });
    },
    sendRegisterData() {
      if (!this.$verifyData(this.registerData)) return;
      if (!this.agreeAgreement) {
        this.$toast(this.$t("Error_agreeAgreement"));
        return;
      }
      apiRegister(this.registerData).then(res => {
        if (!res.result) this.$toast(res.message);
        else if (res.result === 1) {
          this.$toast(this.$t("RegisterDone"));
          setTimeout(() => {
            this.$router.push({ name: "login" });
          }, 3000);
        }
      });
    },
    //圖形驗證碼
    changeImg() {
      this.img =
        process.env.VUE_APP_API_BASE_URL +
        "/Account/GetImgCode?t=" +
        Math.random();
    },
    existingAccount() {
      this.$router.push("login");
    }
  },
  watch: {
    countDown(val) {
      this.SMSCodeMessage =
        val == 0
          ? this.$t("Send_EmailValidationCode")
          : `${val}${this.$t("SendSMSCodeAfterSec")}`;
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  padding-top: rem(85);
}
.register {
  height: 100%;
  // position: relative;
  background-color: $bg-primary;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  .introVideoBtn {
    font-size: rem(28);
    background: #d0b78c;
    color: #82561f;
    padding: 5px;
    box-sizing: border-box;
    border-radius: rem(8);
  }
  .close {
    width: rem(60);
    height: rem(60);
    background: url("~@/assets/images/icons/close-white.png");
    background-size: 100% 100%;
    position: absolute;
    top: rem(-40);
    right: rem(10);
  }

  .video-wrap {
    width: 100%;
    height: auto;
    background-color: #000;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .video-main {
    width: 90%;
    height: rem(515);
  }
}

.emailSMSCode::after{
  content: "若未收到驗證碼，請注意查看垃圾郵件!";
  position: absolute;
   bottom: rem(-40);
  font-size: 12px;
}
.password::placeholder {
  font-size: rem(28);
}

.agreeAgreementBox {
  display: flex;
  align-items: center;
  margin-bottom: rem(55);
  font-size: rem(28);
  input {
    margin-right: rem(20);
  }
  label {
    color: gray;
  }
}

.existingAccount {
  font-size: rem(26.5);
  color: #3ec1fe;
  margin-top: rem(55);
  text-align: center;
}

.agreement {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  z-index: 99;
  padding: rem(40);
  box-sizing: border-box;
  background-color: #000;

  &-title {
    border: rem(4) solid #d0b78c;
    border-radius: rem(10);
    text-align: center;
    font-size: rem(64);
    padding: rem(20);
    box-sizing: border-box;
    color: #d0b78c;
  }

  &-content {
    margin-top: rem(30);
    height: calc(100% - #{rem(102)});
    overflow-y: scroll;
    // padding: 15px 0;
    // box-sizing: border-box;
    p {
      font-size: rem(36);
      margin-bottom: rem(20);
      line-height: rem(50);
    }
  }

  &-close {
    margin: 0 auto;
    width: 90%;
    color: #fff;
    background: linear-gradient(to right, #18cffe, #0fb4f4, #018ee5);
    border-radius: 0.5rem;
    text-align: center;
    font-size: rem(36);
    padding: rem(20);
    box-sizing: border-box;
    margin-bottom: rem(30);
  }
}
</style>
