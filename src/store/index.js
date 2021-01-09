import Vue from "vue";
import Vuex from "vuex";
import { apiGetPersonalInformation, apiGetUnreadMessage, apiMaoGetBalanceAsync } from "@/api";
import storage from "../utils/storage.js";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // recordfilter 的時間
    filterDate: {
      startDate: "",
      endDate: "",
      gameIds: ""
    },
    personalInfo: {},
    unreadMessage: 0,
    maoBalanceStore: '',
    audio: new Audio(require("@/assets/audio/btnClick.mp3"))
  },
  actions: {
    updateFilterDate(context, status) {
      context.commit("UPDATEFILTER", status);
    },
    getPersonalInfo(context) {
      apiGetPersonalInformation().then(res => {
        if (res.result == 1) {
          context.commit("personalData", res.data);
          storage.local.set(
            "isBindBankCard",
            res.data.cardNumber ? true : false
          );
          storage.local.set("bankList", res.data.bankList);
          storage.local.set("PromotionCode", res.data.referralCode);
          storage.local.set("isNullWallet", res.data.isNullWallet);
          storage.local.set("canEdit", res.data.canEdit);
          storage.local.set("realName", res.data.realName);
          storage.local.set("nickName", res.data.nickName);
          storage.local.set("walletLock", res.data.walletLock);
          if (!storage.local.get("canEdit")) {
            storage.local.set("realName", res.data.realName);
          }
        }
      });
    },
    getUnreadMessage(context) {
      apiGetUnreadMessage().then(res => {
        context.commit("unreadMessage", res);
      });
    },
    getMaoGetBalanceAsync(context) {
      apiMaoGetBalanceAsync().then(res => {
        context.commit("maoBalanceData", res.data);
        storage.local.set("maoBalance", res.data);
      });
    }
  },
  mutations: {
    UPDATEFILTER(state, status) {
      state.filterDate.startDate = status.startDate;
      state.filterDate.endDate = status.endDate;
      state.filterDate.gameIds = status.gameIds ? status.gameIds : "";
    },
    personalData(state, status) {
      state.personalInfo = status;
    },
    unreadMessage(state, status) {
      state.unreadMessage = status;
    },
    maoBalanceData(state, status) {
      state.maoBalanceStore = status;
    }
  }
});
