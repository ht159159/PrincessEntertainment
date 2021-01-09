import axios from "axios";

/*
H5+帮助类
*/
let H5Plus = {
  screenOrientation: "portrait-primary", //屏幕屏幕方向
  //"portrait-primary" : 竖屏正方向
  //"landscape-primary”: 横屏正方向
  unlockOrientation: true, //是否启用屏幕旋转
  createWebview(url, gameId, title) {
    plus.screen.unlockOrientation(); // 启用旋转屏幕
    var webview = plus.webview.create(url, "appFrame", {
      hardwareAccelerated: true,
      titleNView: {
        backgroundColor: "#333333",
        titleColor: "#FFFFFF",
        titleText: title,
        progress: { color: "#00FF00" },
        titleSize: 25,
        buttons: [
          {
            type: "home",
            float: "left",
            onclick: function () {
              plus.nativeUI.confirm(
                "确认结束吗？",
                function (e) {
                  //alert("Close confirm: "+e.index);
                  if (e.index == 0) {
                    webview.close("zoom-fade-in", 350);
                    plus.screen.lockOrientation("portrait-primary"); //屏幕方向强制改变成竖屏正方向
                  }
                },
                {
                  buttons: ["确认", "取消"]
                }
              );
            }
          },
          {
            text: "refresh",
            float: "right",
            fontSize: 14,
            width: 60,
            onclick: function () {
              webview.reload();
            }
          }
          // {
          //     text: "转账",
          //     float: "right",
          //     fontSize: 14,
          //     width: 40,
          //     onclick: function (event) {
          //         var wvTransfer = plus.webview.create("ptaccount/transfer?gameId=" + gameId + "&parentName=" + title + "&isWebView=true", "transferFrame");
          //         wvTransfer.show("zoom-fade-out", 350);
          //         plus.screen.lockOrientation("portrait-primary"); //屏幕方向强制改变成竖屏正方向
          //     }
          // }
        ]
      }
    });

    webview.show("zoom-fade-out", 350);
  },

  createView(url, title) {
    plus.screen.unlockOrientation(); // 启用旋转屏幕
    var webview = plus.webview.create(url, "appFrame", {
      hardwareAccelerated: true,
      titleNView: {
        backgroundColor: "#333333",
        titleColor: "#FFFFFF",
        titleText: title,
        progress: { color: "#00FF00" },
        titleSize: 25,
        buttons: [
          {
            type: "home",
            float: "left",
            onclick: function () {
              plus.nativeUI.confirm(
                "确认返回吗？",
                function (e) {
                  //alert("Close confirm: "+e.index);
                  if (e.index == 0) {
                    webview.close("zoom-fade-in", 350);
                    plus.screen.lockOrientation("portrait-primary"); //屏幕方向强制改变成竖屏正方向
                  }
                },
                {
                  buttons: ["确认", "取消"]
                }
              );
            }
          }
        ]
      }
    });

    webview.show("zoom-fade-out", 350);
  },
  // autoHandel(url, gameId, title) {
  autoHandel(url) {
    //app，新建webview方式游戏
    if (isApp) {
      //this.createWebview(url, gameId, title);
      window.location.href = url;
    } else {
      window.location.href = url;
    }
  },
  autoHandelAPP(url) {
    //app，新建webview方式
    if (isApp) {
      //this.createView(url, title);
      window.location.href = url;
    } else {
      window.location.href = url;
    }
  },
  openByBrowerInApp(url) {
    if (isApp) {
      //this.createView(url, title);
      plus.runtime.openURL(encodeURI(url), function (res) {
        console.log(res);
      });
    } else {
      window.open(url);
    }
  },
  handelBack() {
    document.addEventListener('plusready', function () {
      var webview = plus.webview.currentWebview();
      plus.key.addEventListener('backbutton', function () {
        webview.canBack(function (e) {
          if (e.canBack) {
            webview.back();
          } else {
            webview.close();//hide,quit
          }
        })
      });
    });
  },
  /**
   * APP版本更新處理
   */
  handelVersion() {

    if (!isApp) return

    var versionLocal = localStorage.getItem("version")
    if (!versionLocal) {
      localStorage.setItem("version", process.env.VUE_APP_VERSION)
      versionLocal = localStorage.getItem("version")
    }

    document.addEventListener('plusready', function () {
      setInterval(function () {
        var url = "/version.json?t=" + (new Date()).getTime();
        axios.get(url).then(res => {
          if (versionLocal != res.data.version) {
            var allStorage = {}
            Object.assign(allStorage, localStorage)
            plus.cache.clear(function () {
              plus.nativeUI.alert("系統已更新,請重啟暢玩~", function () {
                Object.assign(localStorage, allStorage)
                localStorage.setItem("version", res.data.version)
                plus.runtime.restart();
              }, "公主娛樂", "OK");

            })
          }
        })
      }, 1000 * 10)
    })
  },
  /**
   * 圖片截圖 
   * */
  capture() {
    var wc = null, bitmap = null;
    wc = plus.webview.currentWebview();
    bitmap = new plus.nativeObj.Bitmap("test");
    // 将webview内容绘制到Bitmap对象中
    wc.draw(bitmap, function () {
      bitmap.save(`_doc/${Math.ceil(Math.random()*100000)}.jpg`
        , { quality: 100 }
        , function (i) {
          plus.gallery.save(i.target, function () {
            v.$toast(v.$t("picSaveSuccess"));
            bitmap.clear();
          });
        }
        , function (e) {
          v.$toast(v.$t("copyError"));
        });
    }, function (e) {
      v.$toast(v.$t("copyError"));
    });
  }
};

export default H5Plus;
