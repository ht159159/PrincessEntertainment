<template>
  <div>
    <header-cmp :title="title"></header-cmp>
    <div class="container">
      <div class="input_box">
        <input
          type="password"
          ref="passwordInput"
          :placeholder="isSetfundPassword"
          v-model="passwordData.password"
        />
        <a
          href
          class="hide"
          @click.prevent="$togglePassword('password')"
          ref="passwordButton"
        ></a>
      </div>
      <div class="input_box">
        <input
          type="password"
          ref="newpasswordInput"
          :placeholder="$t('Placeholder_WallerPassword')"
          v-model="passwordData.newPassword"
        />
        <a
          href="#"
          class="hide"
          ref="newpasswordButton"
          @click.prevent="$togglePassword('newpassword')"
        ></a>
      </div>
      <div class="input_box">
        <input
          type="password"
          ref="confirmNewPasswordInput"
          :placeholder="$t('Placeholder_ConfirmWallterPassword')"
          v-model="passwordData.confirmNewPassword"
        />
        <a
          href="#"
          class="hide"
          ref="confirmNewPasswordButton"
          @click.prevent="$togglePassword('confirmNewPassword')"
        ></a>
      </div>
      <p class="alert">{{ $t("passwordHint") }}</p>
      <a href="#" class="btn btn-round btn-blue" @click.prevent="submit">
        {{ $t("Submit") }}
      </a>
      <div
        class="alert forgetPassword"
        @click.prevent="goTo('CustomerService')"
      >
        {{ $t("Forget_Password") }}
      </div>
    </div>
  </div>
</template>
<script>
import { apiUpdateWalletPwd } from "@/api";
// import { apiUpdateWalletPwd, apiGetPersonalInformation } from "@/api";
export default {
  data() {
    return {
      // 密碼
      passwordData: {
        password: "",
        newPassword: "",
        confirmNewPassword: "",
        isNullWallet: false
      },
      isSetfundPassword: "",
      title: ""
    };
  },
  mounted() {
    this.passwordData.isNullWallet = this.$storage.local.get("isNullWallet");
    this.isSetfundPassword = this.passwordData.isNullWallet
      ? this.$t("Placeholder_OldWalletPassword")
      : this.$t("Placeholder_LoginPassword");
    this.title = this.passwordData.isNullWallet
      ? this.$t("Placeholder_ChangeWalletPassword")
      : this.$t("Placeholder_SetWalletPassword");
  },
  methods: {
    submit() {
      if (!this.$verifyData(this.passwordData)) return;
      let data = {
        password: this.passwordData.password,
        newPassword: this.passwordData.newPassword,
        confirmPassword: this.passwordData.confirmNewPassword,
        isNullWallet: this.passwordData.isNullWallet
      };
      apiUpdateWalletPwd(data).then(res => {
        if (res.result == 1) {
          this.$toast(res.message);
          this.$storage.local.set("isNullWallet", true);
          setTimeout(() => {
            this.$router.back(-1);
          }, 2000);
        }
      });
    },
    goTo(name) {
      this.$router.push({ name });
    }
  }
};
</script>

<style lang="scss" scoped>
.alert {
  font-size: rem(28);
  color: red;
  text-align: center;
  padding-bottom: rem(30);
}
.forgetPassword {
  color: #7e8089;
  width: max-content;
  margin: 0 auto;
  margin-top: rem(30)
}
.container {
  padding-top: rem(85);
}
</style>
