import { apiRefreshToken } from "@/api";
import storage from "./storage";
export default function() {
  return new Promise((resolve, reject) => {
    if (!storage.local.get("expireInMinutes")) {
      logout();
      reject();
    }
    let date = storage.local.get("expireInMinutes") - Date.now(); // 過期時間跟現在時間差(毫秒)
    if (date > 172800000) {
      resolve();
    } else if (date <= 172800000 && date > 0) {
      // 刷新token
      apiRefreshToken().then(res => {
        if (res.result === 1) {
          storage.local.set("token", res.data.accessToken);
          storage.local.set(
            "expireInMinutes",
            Date.now() + res.data.expireInMinutes * 60000
          );
          resolve();
        } else {
          logout();
          reject();
        }
      });
    } else if (date <= 0) {
      logout();
      reject();
    }
  });
}

function logout() {
  storage.local.remove("token");
  storage.local.remove("expireInMinutes");
  router.push({ name: "index" });
}
