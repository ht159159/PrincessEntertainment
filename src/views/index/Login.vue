<template>
  <div class="bg" style="overflow: auto;">
    <header-cmp :title="$t('Login')" />
    <img class="logo" src="../../assets/images/background/logo.png" alt />
    <div class="container">
      <div class="input_box">
        <input
          type="text"
          :placeholder="$t('Placehoder_Accout')"
          v-model="loginData.memId"
        />
        <span
          href="#"
          class="clear"
          @click.prevent="$clearInput('loginData', 'memId')"
        ></span>
        <!-- <div class="alert" v-if="alert.memId">{{ alert.memId }}</div> -->
      </div>
      <div class="input_box">
        <input
          type="password"
          :placeholder="$t('Placeholder_Password')"
          v-model="loginData.password"
          ref="passwordInput"
        />
        <span
          href="#"
          ref="passwordButton"
          class="hide"
          @click.prevent="$togglePassword('password')"
        ></span>

        <!-- <div class="alert" v-if="alert.password">{{ alert.password }}</div> -->
      </div>
      <div class="input_box">
        <input
          type="tel"
          :placeholder="$t('Placeholder_Validation')"
          v-model="loginData.imgCode"
        />
        <span href="#" class="imgcode">
          <img :src="imgCode" @click.prevent="changeImgCode" />
        </span>

        <!-- <div class="alert" v-if="alert.imgCode">{{ alert.imgCode }}</div> -->
      </div>
      <div class="rememberPasswordBox">
        <input
          type="checkbox"
          id="checkbox"
          :checked="rememberPassword"
          v-model="rememberPassword"
        />
        <label for="checkbox">記住密碼</label>
      </div>
      <a href="#" class="btn btn-round btn-blue" @click.prevent="login">
        {{ $t("Login") }}
      </a>
      <p class="pwd-box">
        <a href="#" class="pwd" @click.prevent="register">{{
          $t("Register")
        }}</a
        ><span> | </span
        ><a href="#" class="pwd" @click.prevent="pwd">{{
          $t("Forget_Password")
        }}</a>
      </p>
    </div>
  </div>
</template>
<script>
import { apiGetToken } from "@/api";
export default {
  data() {
    return {
      loginData: {
        memId: "",
        password: "",
        imgCode: ""
      },
      // alert: {
      //   memId: "",
      //   password: "",
      //   imgCode: ""
      // },
      imgCode: process.env.VUE_APP_API_BASE_URL + "/Account/GetImgCode",
      rememberPassword: true
    };
  },
  created() {
    //回车提交信息
    let that = this;
    document.onkeypress = function(e) {
      var keycode = document.all ? event.keyCode : e.which;
      if (keycode == 13) {
        that.login();
        return false;
      }
    };
  },
  mounted() {
    this.changeImgCode();
    this.getLogininfo();
  },
  methods: {
    login() {
      if (!this.$verifyData(this.loginData)) return;

      // if (err.length) {
      //   const alertKeys = Object.keys(this.alert);
      //   console.log(alertKeys);

      //   for (let i = 0; i < alertKeys.length; i++) {
      //     this.alert[alertKeys[i]] = "";
      //   }
      //   for (let i = 0; i < err.length; i++) {
      //     this.alert[err[i].key] = err[i].message;
      //   }
      //   return;
      // }

      //是否記住密碼
      if (this.rememberPassword == true) {
        this.setLogininfo(this.loginData.memId, this.loginData.password);
      } else {
        this.clearLogininfo();
      }

      apiGetToken(this.loginData).then(res => {
        if (res.result == 1) {
          this.$storage.local.set("token", res.data.accessToken);
          this.$storage.local.set("isGuest", false);
          this.$storage.local.set(
            "expireInMinutes",
            Date.now() + res.data.expireInMinutes * 60 * 1000
          );
          this.$storage.local.set("logintime", new Date().getTime());
          this.$router.push({ name: "main" });

          // if (isApp) {
          //   this.$router.push({ name: "main" });
          // } else {
          //   location.href = `/download/index.html?v=${new Date().getTime()}`;
          // }

          return;
        } else {
          this.changeImgCode();
        }
      });
    },
    register() {
      this.$router.push({ name: "register" });
    },
    pwd() {
      this.$router.push({ name: "forgetpassword", params: { id: "verify" } });
    },
    changeImgCode() {
      this.imgCode =
        process.env.VUE_APP_API_BASE_URL +
        "/Account/GetImgCode?o=" +
        Math.random();
    },

    //设置記住密碼Logininfo
    setLogininfo(c_name, c_pwd) {
      localStorage.setItem("userName", c_name);
      localStorage.setItem("userPwd", c_pwd);
    },
    //读取Logininfo
    getLogininfo() {
      this.loginData.memId = localStorage.getItem("userName");
      this.loginData.password = localStorage.getItem("userPwd");
    },
    //清除cookie
    clearLogininfo() {
      localStorage.setItem("userName", "");
      localStorage.setItem("userPwd", "");
    }
  }
};
</script>
<style lang="scss" scoped>
.bg {
  width: 100%;
  height: 100%;
  background: #20212f;
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: top center;
  font-size: 0.35rem;
  text-align: center;

  .logo {
    width: 75%;
    vertical-align: middle;
    margin-top: 0.5rem;
  }

  .container {
    text-align: center;
    .input_box:nth-child(1) {
      margin-top: 1rem;
    }
    a:nth-child(4) {
      margin-top: 0.8rem;
    }
    .pwd-box {
      margin-top: 0.5rem;
    }

    .pwd {
      width: 100%;
      font-size: 0.25rem;
      color: #3ec1fe;
      margin: 0 rem(20);
    }
  }

  .rememberPasswordBox {
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
}

@media screen and (min-width: 768px) {
  .bg {
    .logo {
      width: 50%;
    }
    .container .input_box[data-v-1c5921a2]:nth-child(1) {
      margin-top: 0;
    }
  }
}
</style>
