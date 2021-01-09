<template>
  <div>
    <header-cmp :title="$t('Change_Password')" />
    <div class="container">
      <div class="input_box">
        <input
          type="password"
          ref="passwordInput"
          :placeholder="$t('Placeholder_Password')"
          v-model="passwordData.password"
        />
        <a
          href="#"
          ref="passwordButton"
          class="hide"
          @click.prevent="$togglePassword('password')"
        ></a>
      </div>
      <div class="input_box">
        <input
          type="password"
          ref="newpasswordInput"
          :placeholder="$t('Placeholder_NewPassword')"
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
          ref="confirmnewpasswordInput"
          :placeholder="$t('Placeholder_ConfirmNewPassword')"
          v-model="passwordData.confirmNewPassword"
        />
        <a
          href="#"
          class="hide"
          ref="confirmnewpasswordButton"
          @click.prevent="$togglePassword('confirmnewpassword')"
        ></a>
      </div>
      <div class="btn btn-round btn-blue" @click.prevent="sendChangePassword">
        {{ $t("Submit") }}
      </div>
    </div>
  </div>
</template>
<script>
import { apiChangePassword } from "@/api";
import { setTimeout } from "timers";
export default {
  data() {
    return {
      passwordData: {
        password: "",
        newPassword: "",
        confirmNewPassword: ""
      }
    };
  },
  methods: {
    sendChangePassword() {
      if (!this.$verifyData(this.passwordData)) return;
      let data = {
        password: this.passwordData.password,
        newPassword: this.passwordData.newPassword,
        confirmPassword: this.passwordData.confirmNewPassword
      };
      apiChangePassword(data).then(res => {
        this.$toast(res.message);
        if (res.result === 1) {
          setTimeout(() => {
            this.$router.back(-1);
          }, 1000);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  margin-top: 1rem;
}
</style>
