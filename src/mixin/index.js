import { Toast } from "mint-ui";
export default {
  methods: {
    /**
     * @name 清除input的內容
     * @param {string} obj vue data object的名字
     * @param {string} val 要清除輸入框的vue data
     */
    $clearInput(obj, val) {
      if (!val) {
        this[obj] = "";
        return;
      }
      this[obj][val] = "";
    },
    /**
     * @name 密碼顯示開關
     * @param {string} dom vue ref的前綴
     */
    $togglePassword(dom) {
      this.$refs[`${dom}Input`].type =
        this.$refs[`${dom}Input`].type === "text" ? "password" : "text";
      if (this.$refs[`${dom}Button`].classList[0] === "hide") {
        this.$refs[`${dom}Button`].classList.remove("hide");
        this.$refs[`${dom}Button`].classList.add("show");
      } else {
        this.$refs[`${dom}Button`].classList.remove("show");
        this.$refs[`${dom}Button`].classList.add("hide");
      }
    },
    /**
     * @name input選項驗證
     * @param {object} obj 要驗證的表單
     */
    $verifyData(obj) {
      let keys = Object.keys(obj);
      for (let i = 0; i < keys.length; i++) {
        switch (keys[i]) {
          case "memId":
            if (!obj[keys[i]]) {
              Toast(this.$t("Error_Account_IsNull"));
              return false;
            }
            if (obj[keys[i]].length > 15 || obj[keys[i]].length < 6) {
              Toast(this.$t("Error_Account_Length"));
              return false;
            }

            if (!/^[a-zA-Z0-9]*$/.test(obj[keys[i]])) {
              Toast(this.$t("Error_Account_NotValid"));
              return false;
            }
            break;
          // case "referralCode":
          //   if (!obj[keys[i]]) {
          //     Toast(this.$t("Error_ReferralCode_IsNull"));
          //     return false;
          //   }
          //   break;
          // case "lineID":
          //   if (!obj[keys[i]]) {
          //     Toast(this.$t("Error_LineId_IsNull"));
          //     return false;
          //   }
          //   break;
          case "mobile":
            if (!obj[keys[i]]) {
              Toast(this.$t("Error_Mobile_IsNull"));
              return false;
            }
            break;
          case "smsCode":
            if (!obj[keys[i]]) {
              Toast(this.$t("Error_SMSCode_IsNull"));
              return false;
            }
            break;
            case "email":
              if (!obj[keys[i]]) {
                Toast(this.$t("Error_Email_IsNull"));
                return false;
              }
              if (!/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(obj[keys[i]])) {
                Toast(this.$t("Error_Account_Email"));
                return false;
              }
              break;
          case "imgCode":
            if (!obj[keys[i]]) {
              Toast(this.$t("Error_Validation_IsNull"));
              return false;
            }
            break;
          case "password":
            if (!obj[keys[i]]) {
              Toast(this.$t("Error_Password_IsNull"));
              return false;
            } else if (
              !/^[a-zA-Z0-9]{8,16}$/.test(obj.password) &&
              !obj.isNullWallet
            ) {
              Toast(this.$t("Error_Password_NotValid"));
              return false;
            }
            break;
          case "newPassword":
            if (!obj[keys[i]]) {
              Toast(this.$t("Error_NewPassword_IsNull"));
              return false;
            }
            break;
          case "confirmNewPassword":
            if (!obj[keys[i]]) {
              Toast(this.$t("Error_ConfirmPassword_IsNull"));
              return false;
            }
            if (obj.newPassword !== obj.confirmNewPassword) {
              Toast(this.$t("Error_ConfirmPassword_IsDifferent"));
              return false;
            }
            break;
          // case "confirmPassword":
          //   if (!obj[keys[i]]) {
          //     Toast(this.$t("Error_ConfirmPassword_IsNull"));
          //     return false;
          //   }
          //   if (obj.password !== obj.confirmPassword) {
          //     Toast(this.$t("Error_ConfirmPassword_IsDifferent"));
          //     return false;
          //   }
          //   break;
          case "fEmail":
            if (!obj[keys[i]]) {
              Toast(this.$t("Error_Email_IsNull"));
              return false;
            }
            if (!/@/.test(obj[keys[i]])) {
              Toast(this.$t("Error_Email_NotValid"));
              return false;
            }
            break;
        }
      }
      return true;
    },
    // 預設搜尋時間
    $defaultSearch() {
      // 預設時間 本月
      if (this.$store.state.filterDate.startDate != "") return;
      let time = new Date();
      // utc相差
      let dif = -((time.getTimezoneOffset() / 60) * 3600 * 1000);
      // time = new Date(+new Date() + dif);
      let endDate = time.toISOString();
      let year = time.getFullYear();
      let month = time.getMonth();
      let date = time.getDate();
      time = new Date(year, month, date);
      time = time.getTime();
      let sec = 86400000 * -31; //預設時間
      let startDate = new Date(+time + sec + dif).toISOString();
      // 7天

      // let endDate = time.toISOString();
      // let startDate = new Date(+new Date(year, month, 1) + dif);
      // 初始開始時間本月1號
      // startDate = startDate.toISOString();
      this.$store.dispatch("updateFilterDate", {
        startDate,
        endDate
      });
    },
    $playBtnAudio() {
      this.$store.state.audio.play();
    },
    $formatValue(e, amount) {
      if (Number(amount) > Number.MAX_SAFE_INTEGER)
        amount = Number.MAX_SAFE_INTEGER.toString();
      amount = amount.replace(/[^0-9]/g, "");
      if (this.$options.filters.$currency(amount) != 0)
        this.amount = this.$options.filters.$currency(amount);
      else this.amount = "";
    },
    $setValue(e, amount) {
      if (!e.target.value) return;
      if (Number(amount) > Number.MAX_SAFE_INTEGER)
        amount = Number.MAX_SAFE_INTEGER.toString();
      this.amount = amount.replace(/[^0-9]/g, "");
    }
  },
  filters: {
    $currency2(val, f = 3) {
      let res =
        Number(val) / 1000 < 1
          ? val
          : val / 1000000 < 1
          ? `${(val / 1000).toFixed(f)}k`
          : `${(val / 1000000).toFixed(f)}M`;
      return res;
    },
    $currency(val) {
      if (isNaN(val)) {
        return;
      }
      let c = new Intl.NumberFormat("zh-CN").format(val);
      return c;
    },
    $maskPhone(val) {
      if (!val) return;
      let stars = "";
      val = typeof val === "string" ? val : val.toString();
      for (let i = 0; i < val.length - 5; i++) stars += "*";
      return (
        val.substring(0, 3) + stars + val.substring(val.length - 2, val.length)
      );
    },
    $maskString(val) {
      if (!val) return;
      return `*** *** **** ${val.substring(val.length - 4, val.length)}`;
    }
  }
};
