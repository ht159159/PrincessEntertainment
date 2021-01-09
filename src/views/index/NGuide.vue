<template>
  <div id="guide">
    <div class="logo"></div>
    <div class="avatar"></div>
    <div class="banner"></div>
    <div class="video" @click="open = !open"></div>
    <div class="btn-wrap">
      <a href="https://lin.ee/3SeRpTxuz"><div class="service"></div></a>
      <div class="start" @click="goStart()"></div>
      <div class="download-wrap" v-if="isdisplayBtn">
        <a :href="androidUrl">
          <div class="android"></div>
        </a>
        <a :href="appleUrl">
          <div class="apple"></div>
        </a>
      </div>
      <div class="tips"></div>

      <!-- 影片彈窗 -->
      <div class="video-wrap" v-if="open">
        <div class="close" @click="close()"></div>
        <iframe
          class="video-main"
          src="https://www.youtube.com/embed/gncPgqqwChY"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      open: false,
      androidUrl: "",
      appleUrl: "",
      urlParams: "",
      isdisplayBtn: true
    };
  },
  created() {
    // window.android 與 window.apple 變數寫在 public/config.js裡，為全域變數，用window.XXX 取值
    this.androidUrl = window.android;
    this.appleUrl = window.apple;

    this.isUrlParams();
  },
  methods: {
    goStart() {
      // localStorage.setItem("ReferalCode", this.urlParams);
      this.$router.push({path:'/nregister',query: {ReferralCode: this.urlParams}});
    },
    close() {
      this.open = false;
    },
    
    // 判斷網址是否有帶參數
    isUrlParams() {
      // 接網址參數
      this.urlParams = this.$route.query.ReferralCode;
      if(this.urlParams) {
        this.isdisplayBtn = false
        console.log(this.urlParams)
      }
    }
  }
};
</script>
<style lang="scss" scoped>
#guide {
  width: 100%;
  height: 100%;
  background: url("../../assets/images/guide/bg.jpg") no-repeat center;
  background-size: 100% 100%;
  padding: rem(28) 0;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.logo {
  width: 50%;
  height: rem(165);
  background: url("~@/assets/images/guide/logo.png") no-repeat center;
  background-size: contain;
  margin: 0 auto;
}

.avatar {
  width: rem(446);
  height: rem(865);
  background: url("~@/assets/images/guide/avatar.png") no-repeat center;
  background-size: contain;
  position: absolute;
  top: 15%;
  left: 0;
  z-index: 1;
}
.banner {
  width: rem(450);
  height: rem(210);
  background: url("~@/assets/images/guide/banner.png") no-repeat center;
  background-size: 100% 100%;
  position: absolute;
  top: 31%;
  right: 0;
}
.video {
  width: rem(153);
  height: rem(153);
  background: url("~@/assets/images/guide/btnVideo.png") no-repeat center;
  background-size: 100% 100%;
  position: absolute;
  top: 50%;
  right: 18%;
}
.btn-wrap {
  width: 100%;
  // height: 38%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  z-index: 2;
  .start {
    width: rem(475);
    height: rem(129);
    background: url("~@/assets/images/guide/btnStart.png") no-repeat center;
    background-size: 100% 100%;
  }
  .download-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    .android {
      width: rem(232);
      height: rem(80);
      background: url("~@/assets/images/guide/btnAndroid.png") no-repeat center;
      background-size: 100% 100%;
    }
    .apple {
      width: rem(232);
      height: rem(80);
      background: url("~@/assets/images/guide/btnApple.png") no-repeat center;
      background-size: 100% 100%;
    }
  }
  .service {
    width: rem(281);
    height: rem(97);
    background: url("~@/assets/images/guide/btnService.png") no-repeat center;
    background-size: 100% 100%;
  }
  .tips {
    width: rem(613);
    height: rem(169);
    background: url("~@/assets/images/guide/tips.png") no-repeat center;
    background-size: 100% 100%;
  }
  .close {
    width: rem(71);
    height: rem(71);
    background: url("~@/assets/images/icons/close-white.png");
    background-size: 100% 100%;
    position: absolute;
    top: rem(-40);
    right: 0;
  }
  .video-wrap {
    width: 100%;
    height: auto;
    background-color: #000;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .video-main {
    width: 90%;
    height: rem(515);
  }
}
// ipad 橫
@media screen and (min-width: 1024px) {
  .video {
    top: 49%;
    right: 3%;
  }
}
</style>
