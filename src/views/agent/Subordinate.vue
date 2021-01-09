<template>
  <transition name="pop">
    <div class="developeSub" ref="ScreenshotArea">
      <img class="close" src="@/assets/images/icons/close.png" @click.prevent="$router.back(-1)" />
      <div class="developeSub-box">
        <div class="bgWhite">
          <canvas class="QR" ref="canvas"></canvas>
          <div class="promotionCode">{{ promotionCode }}</div>
        </div>
        <input class="url" :value="qr" />
        <div
          class="btn btn-round btn-blue"
          v-clipboard:copy="qr"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
        >{{ $t("CopyLink") }}</div>
        <div class="btn btn-round btn-green" @click="screenshot">{{ $t("PictureShare") }}</div>
      </div>
    </div>
  </transition>
</template>

<script>
import { apiReferralCode } from "@/api";
import html2canvas from "html2canvas";

export default {
  data() {
    return {
      qr: "",
      promotionCode: "",
      dataURL: "",
      userName: ""
    };
  },
  mounted() {
    this.userName = localStorage.getItem("userName")
    if (this.$route.query.QRUrl) {
      this.qr = this.$route.query.QRUrl;
      this.createQRcode();
      return;
    }
    this.promotionCode = this.$storage.local.get("PromotionCode");
    this.getQR();
  },
  methods: {
    getQR() {
      apiReferralCode().then(res => {
        if (res.result == 1) {
          if((this.userName).substring(0,2) != "09"){
            this.qr = res.data;
            this.createQRcode();
          }else{
            this.qr = res.data + "&openExternalBrowser=1"
            this.createQRcode();
          }
        }
      });
    },
    createQRcode() {
      let QRCode = require("qrcode");
      let canvas = this.$refs.canvas;
      QRCode.toCanvas(canvas, this.qr);
    },
    onCopy() {
      this.$toast(this.$t("copySuccess"));
    },
    onError() {
      this.$toast(this.$t("copyError"));
    },
    // 圖片截圖
    screenshot() {
      if (isApp) {
        this.$APP.capture();
        return;
      }
      let ref = this.$refs.ScreenshotArea; // 截图区域
      let that = this;
      html2canvas(ref, {
        // backgroundColor: '#000'
      }).then(canvas => {
        let dataURL = canvas.toDataURL("image/png");
        // console.log(dataURL)
        that.dataURL = dataURL;
        // console.log(this.dataURL)
        // that.saveFile(dataURL, "images.jpg");
        // 圖片下載
        let a = document.createElement("a");
        a.href = canvas
          .toDataURL("image/jpeg")
          .replace("image/jpeg", "image/octet-stream");
        a.download = "image.jpg";
        a.click();
        this.$toast(this.$t("copySuccess"));
      });
    }
    // saveFile(data, filename) {
    //   let a = document.createElement("a");
    //   a.href = canvas
    //     .toDataURL("image/jpeg")
    //     .replace("image/jpeg", "image/octet-stream");
    //   a.download = "image.jpg";
    //   a.click();
    // }
  }
};
</script>

<style lang="scss" scoped>
.developeSub {
  height: 100%;
  width: 100%;
  background-image: url("~@/assets/images/background/develope.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: relative;
  .close {
    width: rem(71);
    position: absolute;
    right: rem(20);
    top: rem(30);
  }
  &-box {
    width: rem(450);
    position: absolute;
    bottom: rem(50);
    margin: 0 auto;
    left: 50%;
    transform: translateX(-50%);
    .bgWhite {
      width: rem(400);
      height: rem(400);
      border-radius: rem(83);
      border: 2px solid #4db189;
      background: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
      position: relative;
      .QR {
        height: rem(350) !important;
        width: rem(350) !important;
        vertical-align: middle;
      }
      .promotionCode {
        font-size: rem(36);
        color: #000;
        font-weight: bold;
        position: absolute;
        bottom: rem(10);
      }
    }
    .url {
      width: 100%;
      background: #000;
      height: rem(57);
      border-radius: 28px;
      font-size: rem(28);
      background: rgba(1, 16, 10, 0.7);
      margin-bottom: rem(20);
      padding-left: rem(10);
    }
    .btn {
      font-size: rem(37);
      height: rem(77);
      padding: 0;
      line-height: rem(77);
    }
    .btn-green {
      background: linear-gradient(to right, #82d4b4, #65be9b, #4eb48c);
      margin-top: rem(20);
    }
  }
}

@media only screen and (min-width: 768px) and (max-width: 1023px) {
  .developeSub-box {
    width: rem(350);
    bottom: rem(70);
  }
  .developeSub-box .bgWhite {
    width: rem(300);
    height: rem(300);
  }
  .developeSub-box .bgWhite .QR {
    height: rem(250) !important;
    width: rem(250) !important;
  }
  .developeSub-box .btn[data-v-51189378] {
    font-size: rem(30);
    height: rem(60);
    line-height: rem(60);
  }
  .developeSub-box .url {
    height: rem(40);
    font-size: rem(24);
  }
}
</style>
