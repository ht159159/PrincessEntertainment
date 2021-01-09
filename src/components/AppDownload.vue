<template>
  <!-- <transition name="pop">
    <div class="appdl" v-if="!close">
      <img src="~@/assets/images/background/appdl.jpg" usemap="#useMap" />
      <a href="#" @click.prevent="appdl" class="dl"></a>
      <a href="#" @click.prevent="closeAppdl" class="cl"></a>
    </div>
  </transition>-->
  <iframe src="https://m.linsio.cn/download/" frameborder="0"></iframe>
</template>

<script>
export default {
  data() {
    return {
      useagent: navigator.userAgent.toLocaleLowerCase(),
      isIOS: "",
      isAndroid: "",
      // isWechat: this.useagent.indexOf("micromessenger") > -1,
      close: true
    };
  },
  mounted() {
    if (!sessionStorage.getItem("showappdl")) this.close = false;
    this.isIOS = this.useagent.indexOf("iphone") > -1;
    this.isAndroid = this.useagent.indexOf("android") > -1;
  },
  methods: {
    appdl() {
      if (this.isIOS) {
        window.location.href =
          "itms-services://?action=download-manifest&url=https:///m.linsio.cn/download/CasioLive_CAM.ipa";
      }
      if (this.isAndroid) {
        console.log(2);
        window.location.href =
          "https://m.linsio.cn/download/CasioLive_07151328.apk";
      }
    },
    closeAppdl() {
      sessionStorage.setItem("showappdl", true);
      this.close = true;
    }
  }
};
</script>
<style lang="scss">
// .appdl {
//   z-index: 99999;
//   position: fixed;
//   width: 100%;
//   height: 100%;
//   top: 0;
//   left: 0;
//   background-color: #000;
//   img {
//     width: 100%;
//     height: 100%;
//   }
//   a {
//     position: absolute;
//     top: calc(100% / 1334 * 1158);
//     left: calc(100% / 750 * 61);
//     display: block;
//     width: calc(100% / 750 * (344 - 61));
//     height: calc(100% / 1334 * (1243 - 1158));
//     &.cl {
//       left: calc(100% / 750 * 400);
//     }
//   }
// }
iframe {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999;
}
</style>
