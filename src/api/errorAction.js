import Router from "@/router";
import storage from "@/utils/storage";
import { Toast, Indicator } from "mint-ui";
import i18n from "@/lang";
export default function(error, connect) {
  //响应错误处理
  var config = error.config;
  let err = JSON.parse(JSON.stringify(error));
  window.console.log("config");
  window.console.log(config);
  config.__retryCount = config.__retryCount || 0;
  // 有錯誤訊息
  if (err.response) {
    Indicator.close();
    if (err.response.status == 600) {
      Router.push({ name: "maintenance" });
      return Promise.reject(err);
    }
    if (err.response.status == 401) {
      storage.local.remove("userInfo");
      storage.local.remove("token");
      Toast({
        message: err.response.statusText
      });
      Router.push({ name: "index" });
      return Promise.reject(err);
    }

    //500
    if (err.response.status == 500 && err.response.status == 404) {
      Toast({
        message: err.response.statusText
      });
      return Promise.reject(err);
    }
    //没有消息
    if (!err.response.statusText) {
      Toast({
        message: i18n.messages[i18n.locale].Network_Error,
        duration: 20000
      });
    }
    return Promise.reject(err);
  }

  // 重新連線超過次數
  if (config.__retryCount >= config.retry) {
    Indicator.close();
    Toast({
      message: i18n.messages[i18n.locale].Network_Error,
      duration: 20000
    });
    return Promise.reject(err);
  }
  // Increase the retry count
  config.__retryCount += 1;
  if (err.code == "ECONNABORTED") {
    Toast({
      message: i18n.messages[i18n.locale].Request_Time_Out,
      duration: 3000
    });
  }
  // Create new promise to handle exponential backoff
  var backoff = new Promise(function(resolve) {
    setTimeout(function() {
      resolve();
    }, config.retryDelay);
  });
  // Return the promise in which recalls axios to retry the request
  backoff.then(function() {
    connect(config);
  });

  return Promise.reject(config.__retryCount);
}
