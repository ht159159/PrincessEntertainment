import axios from "axios";
import qs from "qs";
// import router from "@/router";
import errorAction from "./errorAction";
import { Toast, Indicator } from "mint-ui";
import tokenValid from "@/utils/tokenValid";

axios.defaults.retry = 3;
axios.defaults.retryDelay = 20000;

let service = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 20000
});
service.interceptors.request.use(
  config => {
    // // 判斷重新取得token
    // if (config.isRefreshToken) {
    //   config.headers.Authorization = `Bearer ${JSON.parse(
    //     localStorage.getItem("token")
    //   )}`;
    //   return config;
    // }
    if (config.needAuth) {
      config.headers.Authorization = "Bearer " + JSON.parse(localStorage.token);
      // //token有效性处理
      // tokenValid()
      //   .then(() => {
      //   })
      //   .catch(() => {
      //     return;
      //   });
    }
    // 語言
    config.headers["Accept-Language"] = "zh-TW"

    if (config.methods === "post") qs.stringify(config.data);
    if (!config.noLoading) {
      Indicator.open({
        text: "Loading...",
        spinnerType: "triple-bounce"
      });
    }

    return config;
  },
  error => {
    Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
    Indicator.close();
    const data = response.data;
    if (data.result === 0 && data.message) {                      
      Toast({
          message: data.message,
          className: "expand"
      })
    }
    return data;
  },
  error => {
    Indicator.close();
    return new Promise(res => {
      errorAction(error, service).catch(err => {
        res(err);
      });
    });
  }
);

export default service;
