import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "@/lang"; // 語言切換
import "mint-ui/lib/style.css"; // mint ui
import Mint from "mint-ui"; // mint ui
import Datetime from "vue-datetime"; // 日期選擇
import "vue-datetime/dist/vue-datetime.css"; // 日期選擇
import "@/components/globalComponents"; // 全域元件註冊
import mixins from "./mixin/index"; // mixin
import storage from "@/utils/storage"; //storage工具
import "@/style/common.scss";
import VueClipboard from "vue-clipboard2";
import H5Plus from "@/utils/h5plus";

import { apiRefreshToken } from "@/api";

Vue.mixin(mixins);
Vue.use(Datetime);

VueClipboard.config.autoSetContainer = true;
Vue.use(VueClipboard);

Vue.use(Mint);
Vue.prototype.$storage = storage;
Vue.prototype.$APP = H5Plus;
Vue.config.productionTip = false;

//判斷API是否過期 每10分一次
setInterval(refresh, 600000);

function refresh() {
  let nowDate = new Date().getTime();
  // console.log(nowDate);
  let logintime = localStorage.getItem("logintime");
  // console.log(logintime);
  // console.log(nowDate - logintime);
  if (nowDate - logintime > 172800000) {
    // let data = {
    //     refreshToken: localStorage.getItem("RefreshToken")
    // };
    storage.local.set("logintime", nowDate);
    // console.log("nowDate");
    if (storage.local.get("token")) {
      // console.log("token");
      apiRefreshToken().then(res => {
        storage.local.set("logintime", nowDate);
        if (res.result) {
          storage.local.set("token", res.data.accessToken);
          // localStorage.setItem("RefreshToken", res.RefreshToken);
          // localStorage.setItem("logintime",nowDate);
        }
      });
    }
  }
}

window.v = new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
})

window.v.$mount("#app");
