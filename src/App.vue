<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view />
    </transition>

    <!-- // 判斷竖屏横屏 -->
    <!-- <div class="screenPrompt" v-if="screenPrompt"> -->
    <!-- 请竖屏浏览 以获得更好的体验  -->
    <!-- </div> -->

    <!-- 「添加桌面」的提示說明 -->
    <div class="shortcutExplanation" v-if="explanationShow">
      <!-- <img
        class="closeExplanation"
        src="../src/assets/images/icons/close-white.png"
        alt=""
        @click="closeExplanation"
      /> -->
      <div class="iconBox">
        <img src="../src/assets/images/icons/iconExport.png" alt="" />
      </div>
      <div>
        <p class="title">添加到桌面</p>
      </div>
      <div class="separateLine">|</div>
      <div class="title" @click="closeExplanation">關閉</div>
      <!-- <p class="title">免下載安裝APP</p>
      <p class="content">操作體驗就像APP一樣順暢</p>
      <div class="explanationIconBox">
        <div class="iconBox">
          <img src="../src/assets/images/icons/iconClickOn.png" alt="" />
          點擊
        </div>
        <div class="right-arrow"></div>
        <div class="iconBox">
          <img src="../src/assets/images/icons/iconAdd.png" alt="" />
          添加到主螢幕
        </div>
        <div class="right-arrow"></div>
        <div class="iconBox">
          <img src="../src/assets/images/icons/iconAppThumbnail.png" alt="" />
          新增APP
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      transitionName: "",
      input: [],
      explanationShow: false,
      screenPrompt: false,
      isWebApp: "",
      isApp: "",
      isIOS: "",
      routeName: "",
      isGuest: ""
    };
  },
  created() {
    this.isWebApp = window.navigator.standalone;
    this.isApp = u.toLocaleLowerCase().indexOf("html5plus") > -1;
    this.isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    window.addEventListener("beforeunload", this.beforePageDestroyed);
    // 判斷裝置語系 設定語系
    this.$storage.local.set("lang", { name: "繁体中文", tag: "zh-TW" });    
    
    // function rotate() {

    //   if (window.orientation == 180 || window.orientation == 0) {
    //   alert('竖屏')
    //   }
    //   if (window.orientation == 90 || window.orientation == -90) {
    //   alert('横屏')
    //   }
    // }
    // window.addEventListener("load", rotate, false);
    // window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", rotate, false);
  },
  mounted() {
    // var __this = this;

    // 判斷竖屏横屏
    // var rotate = () => {
    //   if (window.orientation == 180 || window.orientation == 0) {
    //     // console.log("竖屏了");
    //     this.screenPrompt = false;
    //   }
    //   if (window.orientation == 90 || window.orientation == -90) {
    //     this.screenPrompt = true;
    //     // console.log("横屏了");
    //   }
    // };
    // // window.addEventListener("load", rotate, true);
    // window.addEventListener(
    //   "onorientationchange" in window ? "orientationchange" : "resize",
    //   rotate,
    //   false
    // );

    // window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", () => {
    //   if (window.screen.orientation.angle === 180 || window.screen.orientation.angle === 0) {
    //     this.screenPrompt = false;
    //     // console.log("竖屏了");
    //   }
    //   if (window.screen.orientation.angle === 90 || window.screen.orientation.angle === -90 ){
    //     this.screenPrompt = true;
    //     // console.log("横屏了");
    //   }
    // }, false);

    if (isApp) {
      this.$APP.handelVersion();
      this.$APP.handelBack();
      plus.screen.lockOrientation("portrait-primary"); // 把屏幕方向改变成竖屏正方向
      window.addEventListener(
        "onorientationchange" in window ? "orientationchange" : "resize",
        function() {
          if (window.orientation === 180 || window.orientation === 0) {
            // 设置应用非全屏显示！
            plus.navigator.setFullscreen(true);
            // console.log("竖屏了");
          }
          if (window.orientation === 90 || window.orientation === -90) {
            // alert('横屏状态！');
            // console.log("横屏了");
            // 设置应用全屏显示！
            plus.navigator.setFullscreen(true);
          }
        },
        false
      );
      //移动端的浏览器一般都支持window.orientation这个参数，通过这个参数可以判断出手机是处在横屏还是竖屏状态。
    }
  },
  methods: {
    blurInput(el) {
      el.target.blur();
    },
    // 判定是否遊客登出
    beforePageDestroyed: function() {
      if (this.$storage.local.get("isGuest")) {
        // localStorage.clear();
      }
    },

    // 關閉「添加桌面」的提示說明
    closeExplanation() {
      // this.$storage.session.set("explanationShow",0)
      // this.explanationShow = false
      if (this.$storage.local.get("isGuest")) {
        this.$storage.session.set("YkexplanationShow", 1);
        this.explanationShow = false;
      }
      if (!this.$storage.local.get("isGuest")) {
        this.$storage.session.set("explanationShow", 1);
        this.explanationShow = false;
      }
    }
  },
  watch: {
    $route(to, from) {
      // 過廠動畫 頁面名稱:動畫名稱
      const AnimeObj = {
        index: "R-Slide-vertical",
        login: "Slide-vertical",
        register: "Slide-vertical",
        forgetpassword: "Slide-horizontal",
        main: "R-Slide-horizontal",
        childGame: "Slide-vertical",
        center: "R-Slide-horizontal",
        thirdpartypayment: "Slide-horizontal",
        withdraw: "Slide-horizontal",
        transfermoney: "Slide-horizontal",
        personal: "Slide-horizontal",
        gamebalance: "Slide-horizontal",
        message: "Slide-horizontal",
        records: "Slide-horizontal",
        agent: "Slide-horizontal",
        betrecords: "Slide-horizontal",
        bankcardsetting: "Slide-horizontal",
        changepassword: "Slide-horizontal",
        fundpasswordsetting: "Slide-horizontal",
        address: "Slide-horizontal",
        agentjoin: "Slide-horizontal",
        phonechange: "Slide-horizontal",
        redeem: "Slide-horizontal",
        traderecord: "Slide-horizontal",
        bankcardedit: "Slide-horizontal",
        CustomerService: "Slide-horizontal",
        bankcard: "Slide-horizontal",
        commissionRecord: "Slide-horizontal",
        MyVip: "Slide-horizontal",
        safe: "Slide-horizontal",
        FlowReport: "Slide-horizontal",
        
      };

      // 「添加桌面」的提示說明
      if (this.isIOS && !this.isApp && !this.isWebApp) {
        if (to.name === "main") {
          // if (this.$storage.local.get("token")) {
          //   this.explanationShow = true
          //   console.log("token")
          // }

          if (this.$storage.local.get("isGuest")) {
            if (!this.$storage.session.get("YkexplanationShow")) {
              this.explanationShow = true;
            }
          }

          if (!this.$storage.local.get("isGuest")) {
            if (!this.$storage.session.get("explanationShow")) {
              this.explanationShow = true;
            }
          }
          // this.explanationShow = true
        } else {
          this.explanationShow = false;
        }
      }

      //判斷從首頁到註冊頁是否帶ReferralCode參數
      if(to.name == "register" && from.name == "index"){
        from.query.ReferralCode ? (to.query.ReferralCode = from.query.ReferralCode) : (to.query.ReferralCode = "");
      }

      if (from.name == "mynews" && to.name == "message") {
        this.transitionName = "R-Slide-horizontal";
        return;
      }
      if (to.name == "mynews") {
        this.transitionName = "Slide-horizontal";
        return;
      }
      this.transitionName = AnimeObj[to.name];
    }
  }
};
</script>

<style lang="scss">
@import "~@/style/_reset.scss";
body {
  background-color: $bg-primary;
  font-family: "Microsoft Yahei", "STHeiti Light", serif;
}
#app {
  height: 100%;
  overflow: hidden;
}
.screenPrompt {
  z-index: 1000;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  margin: 0 auto;
  background-image: url("../src/assets/images/background/screenPrompt.jpg");
  // background-size: cover;
  background-size: 100% 100%;
}

.shortcutExplanation {
  width: 65%;
  background-color: rgba(34, 44, 83, 0.9);
  position: absolute;
  left: 50%;
  bottom: rem(50);
  z-index: 10000;
  padding: rem(20);
  box-sizing: border-box;
  border-radius: rem(20);
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  transform: translate(-50%, 0%);
  border: 1px solid #181744;

  .closeExplanation {
    width: rem(60);
    position: absolute;
    top: 0;
    right: 0;
  }

  .iconBox{
    width: rem(80);
    height: rem(80);
    position: relative;
    margin-right: rem(10);

    img {
      width: 90%;
      position: absolute;
      top: 0;
      left: 0;
      background-color: #fff;
      border-radius: 10px;
      padding: 5px;
      box-sizing: border-box;
    }
  }

  .content {
    font-size: rem(36);
    margin-bottom: rem(20);
  }

  .title {
    color: #d8a925;
    font-size: rem(40);
    // margin-bottom: rem(20);
  }

  .separateLine{
    font-size: rem(40);
    margin: 0 rem(20);
  }
  .explanationIconBox {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .iconBox {
      width: 25%;
      font-size: rem(24);
      display: flex;
      flex-flow: column;
      align-items: center;
      img {
        width: 100%;
      }
    }
  }

  .iconDownArrow {
    position: absolute;
    bottom: rem(-48);
    width: rem(90);
  }
}
.right-arrow {
  display: inline-block;
  position: relative;
  width: rem(28);
  height: rem(28);
  transition: transform 0.3s;
}

.right-arrow::after {
  display: inline-block;
  content: " ";
  height: rem(28);
  width: rem(28);
  position: absolute;
  top: 0px;
  left: rem(-10);
  border-width: rem(4) rem(4) 0 0;
  border-color: #23affa;
  border-style: solid;
  border-radius: rem(6);
  transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
}
.mint-toast.is-placemiddle.noticeError {
  .mint-toast-text {
    font-size: rem(40);
    font-weight: 500;
  }
}
// @media screen and (orientation: portrait) {
//   //竖屏
//   .screenPrompt {
//     display: none;
//   }
// }
// @media screen and (orientation: landscape) {
//   //横屏
// }
.expand {
  padding: 20px !important;
  line-height: 18px;
}
</style>
