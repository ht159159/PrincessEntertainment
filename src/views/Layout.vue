<template>
  <div id="layout">
    <transition :name="transitionName">
      <keep-alive include="mainPage">
        <router-view></router-view>
      </keep-alive>
    </transition>
    <navigator class="nav" @openFinacialCenter="openFinacialCenter" :unreadMessage="unreadMessage"></navigator>
    <transition name="pop">
      <finacialcenter class="finacial" v-if="isFinacialcenter" @close="isFinacialcenter = false" />
    </transition>
    <modal-alert
      v-if="showAlert"
      imgName="alert"
      @close="showAlert = ''"
      :text="$t('Please_Login')"
    >
      <template #btn>
        <div class="alert-box-cancel alert-box-btn" @click="showAlert = false">{{ $t("Cancel") }}</div>
        <div
          class="alert-box-cancel alert-box-btn alert-box-btn-bright"
          @click="toPage()"
        >{{ $t("Confirm") }}</div>
      </template>
    </modal-alert>
  </div>
</template>
<script>
import finacialcenter from "@/components/FinacialCenter.vue";
import navigator from "@/components/Navigator.vue";
// import { apiGetPersonalInformation } from "@/api";
import { mapState } from "vuex";
export default {
  components: { finacialcenter, navigator },
  data() {
    return {
      isFinacialcenter: false,
      transitionName: "",
      showAlert: false,
      timer: null
    };
  },
  mounted() {
    if (!this.$storage.local.get("isGuest")) {
      this.$store.dispatch("getPersonalInfo");
      this.$store.dispatch("getMaoGetBalanceAsync");
      this.$store.dispatch("getUnreadMessage");
      this.timer = setInterval(() => {
        this.$store.dispatch("getUnreadMessage");
      }, 60000);
    }
  },
  computed: mapState(["personalInfo", "unreadMessage"]),
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    // getPersonalInfo() {
    //   apiGetPersonalInformation().then(res => {
    //     if (res.result == 1) {
    //       this.$storage.local.set(
    //         "isBindBankCard",
    //         res.data.cardNumber ? true : false
    //       );
    //       this.unreadMessage = res.data.unreadMessage;
    //       this.$storage.local.set("isNullWallet", res.data.isNullWallet);
    //       this.$storage.local.set("canEdit", res.data.canEdit);
    //       if (!this.$storage.local.set("canEdit", res.data.canEdit)) {
    //         this.$storage.local.set("realName", res.data.realName);
    //       }
    //     }
    //   });
    // },
    // 打開財務中心
    openFinacialCenter(finacial) {
      // 判定遊客
      if (this.$storage.local.get("isGuest")) {
        this.showAlert = true;
        return;
      }
      this.isFinacialcenter = finacial;
    },
    toPage() {
      this.$storage.local.remove("token");
      let lang = this.$storage.local.get("lang");
      localStorage.clear();
      this.$storage.local.set("lang", lang);
      this.$router.push({ name: "login" });
    },
    checkGuest() {}
  },
  beforeRouteUpdate(to, from, next) {
    // 判定遊客
    if (this.$storage.local.get("isGuest")) {
      if (to.name == "center") {
        this.showAlert = true;
        return;
      }
    }
    next();
  },
  watch: {
    $route(to) {
      // 過廠動畫 頁面名稱:動畫名稱
      const AnimeObj = {
        main: "R-Slide-horizontal",
        promotion: "Slide-vertical",
        CustomerService: "Slide-horizontal",
        center: "Slide-horizontal"
      };
      this.transitionName = AnimeObj[to.name];
    }
  }
};
</script>

<style lang="scss">
#layout {
  height: 100%;
  overflow: hidden;
}
.finacial {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  height: 100%;
}
// .nav {
//   // z-index: 9999;
// }
</style>
