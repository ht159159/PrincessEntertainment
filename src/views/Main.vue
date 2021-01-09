<template>
  <div class="main">
    <div class="stickyTop">
      <div class="swiper-container banners" id="Banner">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide"
            data-hash="slide1"
            v-for="(b, i) in banner"
            :key="`${b.link}${i}`"
          >
            <img :src="b.imageUrl" />
          </div>
          <div v-if="banner.length === 0" class="swiper-loading">
            <div class="loading"></div>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
      <div class="announcement" @click="showMarqueeDetail">
        <div class="img">
          <img src="~@/assets/images/icons/announcement.png" alt />
        </div>
        <div class="text" ref="marquee">{{ marquee.currentMessage }}</div>
      </div>
    </div>

    <div class="games_area" @scroll="game_add($event)">
      <div
        class="games_area_box"
        v-for="(item,i) in gameData"
        :key="i"
        @click.prevent="playGame(item.gameId, item.gameCode, item.gameName)"
      >
        <!-- <div class="game_title">
          {{item.gameName}}
          <div></div>
        </div>-->
        <!-- <img class="testClass" :src="'../assets/images/game/test_1.jpg'" alt /> -->
        <div
          class="game_img"
          :style="{
            background:
              'url(' + imgUrl + item.gameImg + ') no-repeat center center',
            'background-size': '100% 100%',
            margin: '0 auto',
            'background-size': 'contain'
          }"
        ></div>
        <!-- <div class="game_img" :style="{ 'background': 'url(' + imgUrl + item.gameImg +') no-repeat center center', 'background-size': '100% 100%', 'margin': '0 auto', 'background-size' : 'contain'}"></div> -->

        <!-- <img :src=item.imgUrl alt=""> -->
      </div>
      <!-- <div
        class="game"
        :class="{ unfold: game.open }"
        v-for="(game, index) in gameLists"
        :key="game.typeImg"
      >
        <div class="full" @click.prevent="OpenHandler(index)"></div>
        <div class="bg">
          <img
            :src="
              game.open
                ? require('@/assets/images/game/' +
                    game.typeImg +
                    '/bg-unfold.png')
                : require('@/assets/images/game/' +
                    game.typeImg +
                    '/bg.png')
            "
          />
        </div>
        <div class="content">
          <div class="icon">
            <img
              :src="
                game.open
                  ? require('@/assets/images/game/' +
                      game.typeImg +
                      '/icon-unfold.png')
                  : require('@/assets/images/game/' +
                      game.typeImg +
                      '/icon.png')
              "
            />
          </div>
          <div class="text">
            <div class="title">
              <div class="name">{{ game.name }}</div>
              <div class="subname">{{ game.englishName }}</div>
            </div>
            <div class="tags">
              <div class="tag"></div>
              <div class="name" v-for="tag in game.tagList.slice(0, 3)" :key="tag">{{ tag }}</div>
              <div class="name" v-if="game.tagList.length > 3">......</div>
            </div>
          </div>
          <div class="swiper-games" :class="'swiper-games-' + game.typeId">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="model in game.gameModel" :key="model.gameName">
                <img
                  :src="`${imgUrl}${localUrl}${model.gameImg}`"
                  alt
                  @click.prevent="
                    playGame(
                      model.gameId,
                      model.gameCode,
                      model.gameName,
                      model.isChildGame
                    )
                  "
                />
              </div>
            </div>
          </div>
        </div>
        <div class="btn-unfold" @click.prevent="OpenHandler(index)"></div>
      </div>-->
    </div>
    <transition name="pop">
      <div class="marquee-detail" v-show="marquee.show">
        <header-cmp :title="$t('Marquee_Message')">
          <template #back>
            <a href="#" class="back" @click.prevent="marquee.show = false">
              <img src="~@/assets/images/icons/back.png" />
            </a>
          </template>
        </header-cmp>
        <div class="top_area">
          <!-- <a
            href="#"
            class="toggle_btn left"
            :class="{ active: marquee.detailPage === 3 }"
            @click.prevent="marquee.detailPage = 3"
          >{{ $t("Maintain") }}</a>
          <a
            href="#"
            class="toggle_btn right"
            :class="{ active: marquee.detailPage === 4 }"
            @click.prevent="marquee.detailPage = 4"
          >{{ $t("Pay") }}</a> -->
            <a
            href="#"
            class="toggle_btn right"
            v-for="(marqueeTitle, i) in marquee.title"
            :key="i"
            :class="{ active: marquee.detailPage === marquee.title[i].type }"
            @click.prevent="marquee.detailPage = marquee.title[i].type"
          >{{ marquee.title[i].name }}</a>
        </div>
        <div class="marquees">
          <div class="marquee" v-for="m in marquee.shownDetail" :key="m.id">
            <div v-if="m.type === marquee.detailPage">
              <!-- <div class="date" v-if="m.type === marquee.detailPage">
                <div class="dayBox">
                  <div class="day">{{ m.beginYMD | marqueeDate(1) }}</div>
                  <div class="day">{{ m.beginT | marqueeDate(1) }}</div>
                </div>
                <img class="iconDateArrow" src="../assets/images/icons/iconDateArrow.png" alt />
                <div class="otherBox">
                  <div class="other">{{ m.endYMD | marqueeDate }}</div>
                  <div class="other">{{ m.endT | marqueeDate }}</div>
                </div> -->
                <!-- <div class="space"></div> -->
                <!-- <div class="triangle"></div> -->
              <!-- </div> -->
              <div class="content">{{ m.noticeContent }}</div>
            </div>
          </div>
          <div class="noData" v-show="marquee.shownDetail.length == 0">{{ $t("NoData") }}</div>
        </div>
      </div>
    </transition>
    <!-- <transition name="pop">
      <div class="autoPromptBg" v-if="isPrompt">
        <div class="autoPrompt" v-if="autoPromptOne == '1'">
          <div class="playMahjong" @click="playMahjong"></div>
          <img
            class="autoPromptClose"
            src="../assets/images/icons/close-white.png"
            alt
            @click.prevent="oneClose()"
          />
        </div>

        <div class="autoPrompt autoPromptTwo" v-if="autoPromptTwo == '1'">
          <div class="addFriend" @click="addFriend"></div>
          <img
            class="autoPromptClose"
            src="../assets/images/icons/close-white.png"
            alt
            @click.prevent="twoClose"
          />
        </div>
      </div> -->
    <!-- </transition> -->

    <modal-alert
      v-if="showAlert"
      imgName="alert"
      @close="showAlert = ''"
      :text="$t('Please_Login')"
    >
      <template #btn>
        <div class="alert-box-cancel alert-box-btn" @click="showAlert = false">{{ $t("Cancel") }}</div>
        <div
          class="alert-box-cancel alert-box-btn alert-box-btn-bright"
          @click="toPage()"
        >{{ $t("Confirm") }}</div>
      </template>
    </modal-alert>
    <!-- 免下載安裝APP -->
    <!-- <div class="shortcutExplanation" v-if="explanationShow">
      <img class="closeExplanation" src="../assets/images/icons/close-white.png" alt="" @click="closeExplanation">
      <p class="title">免下載安裝APP</p>
      <p class="content">操作體驗就像APP一樣順暢</p>
      <div class="explanationIconBox">
        <div class="iconBox">
          <img src="../assets/images/icons/iconClickOn.png" alt="">
          點擊
        </div>
        <div class="right-arrow"></div>
        <div class="iconBox">
          <img src="../assets/images/icons/iconAdd.png" alt="">
          添加到主螢幕
        </div>
        <div class="right-arrow"></div>
        <div class="iconBox">
          <img src="../assets/images/icons/iconAppThumbnail.png" alt="">
          新增APP
        </div>
      </div>
    </div>-->
  </div>
</template>
<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
import {
  apiGetBanner,
  apiMarqueeScrollContent,
  // apiGameTypeList,
  apiShowScrollMessage,
  apiStartGame,
  apiGetGames,
  apiGetPersonalInformation
  // apiUpdatePrompt
} from "@/api";
export default {
  name: "mainPage",
  data() {
    return {
      sportOpen: true,
      isFinacialcenter: false,
      banner: [],
      gameLists: [],
      marquee: {
        currentMessage: "",
        show: false,
        detailPage: 0,
        detail: [],
        shownDetail: [],
        title:[]
      },
      imgUrl: process.env.VUE_APP_IMG_BASE_URL + "child/53/",
      showAlert: false,
      aud: "",
      timeout: null,
      gameData: [],
      getGamesData: {
        typeId: 6,
        pageIndex: 1,
        pageSize: 50
      },
      moreGames: false,
      totalPages: "",
      // isPrompt: "", //自動彈窗提示
      autoPromptOne: "",
      autoPromptTwo: ""
    };
  },
  watch: {
    "marquee.detailPage"(val) {
      this.marquee.shownDetail = [];
      if (this.marquee.detail == 0) return;
      let i = 0;
      this.marquee.detail.forEach(data => {
        if (data.type == val) {
          this.$set(this.marquee.shownDetail, i, data);
          i++;
        }
      });
    }
  },
  created() {
    // console.log(this.$storage.local.get("token"))
    // 提示免下載安裝APP
    // if (this.$storage.local.get("token")) {
    //   // console.log(this.$storage.session.get("explanationShow"))
    //   // if (!this.$storage.session.get("explanationShow")) {
    //   //   this.$storage.session.set("explanationShow",1)
    //   //   this.explanationShow = true
    //   //   }
    //   if (this.$storage.local.get("isGuest")) {
    //     if (!this.$storage.session.get("YkexplanationShow")) {
    //       this.$storage.session.set("YkexplanationShow",1)
    //       this.explanationShow = true
    //       }
    //   }
    //   if (!this.$storage.local.get("isGuest")) {
    //     if (!this.$storage.session.get("explanationShow")) {
    //       this.$storage.session.set("explanationShow",1)
    //       this.explanationShow = true
    //       }
    //   }
    // }
  },
  mounted() {
    if(sessionStorage.getItem("boxid")){
      let params = {
        gameId : 53,
        childId : sessionStorage.getItem("gid"),
        title : "麻將好友廳",
        boxid : sessionStorage.getItem("boxid")
      };
      apiStartGame(params).then(res => {
        if (res.result == 1) {
          //app处理
          this.$APP.autoHandel(res.data, params.gameId, params.title);
          //window.location =   process.env.VUE_APP_API_BASE_URL + "/load.html?url="+res.data
        }
      });
    }
    //自動彈窗提示
    // apiGetPersonalInformation().then(res => {
    //   this.isPrompt = res.data.isPrompt;
    //   if (this.isPrompt) {
    //     if (!this.$storage.local.get("autoPromptOne")) {
    //       this.$storage.local.set("autoPromptOne", "1");
    //       this.autoPromptOne = this.$storage.local.get("autoPromptOne");
    //       this.autoPromptTwo = this.$storage.local.get("autoPromptTwo");
    //     } else this.autoPromptOne = this.$storage.local.get("autoPromptOne");
    //     this.autoPromptTwo = this.$storage.local.get("autoPromptTwo");
    //   }
    // });

    // 取得跑馬燈資訊 之後MarqueeScroll重複顯示
    let params = {
      lang: this.$storage.local.get("lang").tag
    };
    apiMarqueeScrollContent(params).then(res => {
      if (res.result === 1 && res.data.length) {
        this.$nextTick(() => {
          this.MarqueeScroll(res.data, 0);
        });
      }
    });
    this.createBannerSwiper();
    // this.getGameTypeList();
    this.getGames();
  },
  computed: {
    localUrl() {
      return `${this.$storage.local.get("lang").tag}/`;
    }
  },
  methods: {
    OpenHandler(i) {
      this.gameLists[i].open = this.gameLists[i].open ? false : true;
      new Swiper(".swiper-games-" + this.gameLists[i].typeId, {
        slidesPerView: 2.5,
        spaceBetween: 5
      });
    },
    // 打開財務中心
    openFinacialCenter(finacial) {
      this.isFinacialcenter = finacial;
    },
    // 跑馬燈重複跑
    MarqueeScroll(data = [], i) {
      this.marquee.currentMessage = data[i];
      let dur = 15000;
      let marquee = this.$refs.marquee;
      marquee.style.transitionDuration = `0s`;
      marquee.style.left = "";
      setTimeout(() => {
        marquee.style.transitionDuration = `${dur / 1000}s`;
        marquee.style.left = `${-marquee.clientWidth}px`;
      }, 10);
      this.timeout = setTimeout(() => {
        this.MarqueeScroll(data, (i + 1) % data.length);
      }, 16000);
    },
    // 取得banner資訊
    async createBannerSwiper() {
      let bannerRes = await apiGetBanner({ projectType: 2 });
      this.banner = bannerRes.data.banners;
      let _this = this;
      this.$nextTick(() => {
        new Swiper("#Banner", {
          loop: true,
          pagination: {
            el: ".swiper-pagination",
            bulletClass: "bullet",
            bulletActiveClass: "active-bullet"
          },
          nextButton: ".swiper-button-next",
          prevButton: ".swiper-button-prev",
          scrollbar: ".swiper-scrollbar",
          autoplay: {
            delay: 3000,
            disableOnInteraction: false
          },
          on: {
            click() {
              _this.$router.push({ name: "promotion" });
            }
          }
        });
      });
    },
    // 取得主遊戲列表
    // getGameTypeList() {
    //   apiGameTypeList().then(res => {
    //     let games = [];
    //     for (let i = 0; i < res.data.length; i++) {
    //       res.data[i].open = false;
    //       for (let j = 0; j < res.data[i].gameModel.length; j++) {
    //         const element = res.data[i].gameModel[j];
    //         games.push({ id: element.gameId, name: element.gameName });
    //       }
    //     }
    //     this.$storage.local.set("games", games);
    //     this.gameLists = res.data;
    //   });
    // },
    getGames() {
      apiGetGames(this.getGamesData).then(res => {
        this.gameData = res.data.list;

        //总共页数
        this.totalPages = Math.ceil(res.data.count / 50);
      });
    },
    showMarqueeDetail() {
      let params = {
        lang: this.$storage.local.get("lang").tag
      };
      apiShowScrollMessage(params).then(res => {

        this.marquee.show = true;
        this.marquee.detail = res.data;
        let marqueeTitle

        //過濾信息類別
        for(let i = 0; this.marquee.detail.length > i; i++){
          this.marquee.title.push({type:this.marquee.detail[i].type,name:this.marquee.detail[i].name})
        }
        const set = new Set();
        this.marquee.title = this.marquee.title.filter(item => !set.has(item.type) ? set.add(item.type) : false);
        this.marquee.title.sort(function(a, b) {
          return a.type - b.type; // a - b > 0
        });
        //預設第一個訊息
        this.marquee.detailPage = this.marquee.title[0].type;

        for (let i = 0; this.marquee.detail.length > i; i++) {
          this.marquee.detail[i].beginYMD = this.marquee.detail[
            i
          ].beginTime.substr(0, this.marquee.detail[i].beginTime.indexOf("T"));
          this.marquee.detail[i].beginT = this.marquee.detail[
            i
          ].beginTime.substr(
            this.marquee.detail[i].beginTime.indexOf("T") + 1,
            this.marquee.detail[i].beginTime.length
          );
          this.marquee.detail[i].endYMD = this.marquee.detail[i].endTime.substr(
            0,
            this.marquee.detail[i].endTime.indexOf("T")
          );
          this.marquee.detail[i].endT = this.marquee.detail[i].endTime.substr(
            this.marquee.detail[i].endTime.indexOf("T") + 1,
            this.marquee.detail[i].endTime.length
          );
        }
      });
    },
    // 玩遊戲或是轉到子遊戲頁面
    playGame(gameId, childId, title) {
      // 判定遊客
      if (this.$storage.local.get("isGuest")) {
        this.showAlert = true;
        return;
      }
      // 如果有子遊戲 轉頁面
      // if (isChild > 0) {
      //   this.$toast('not open...')
      //   //this.$router.push({ name: "childGame",query:{ title:title,gameId:gameId } });

      //   return;
      // }
      // 開始遊戲
      if (childId === "999") {
        return;
      }
      let params = {
        gameId,
        childId,
        title
      };
      console.log(params)
      apiStartGame(params).then(res => {
        if (res.result == 1) {
          //app处理
          this.$APP.autoHandel(res.data, gameId, title);
          //window.location =   process.env.VUE_APP_API_BASE_URL + "/load.html?url="+res.data
        }
      });
    },
    // pageChange(link) {
    //   location.href = link;
    // },
    toPage() {
      this.$storage.local.remove("token");
      this.$router.push({ name: "login" });
    },
    // 無限下滑加載
    game_add(e) {
      // let wrapheight = document.querySelector('.games_area').clientHeight// 容器的高度
      // let wrapheight1 = document.querySelector('.games_area').scrollHeight// 容器的高度
      // let scrolltop = document.querySelector('.games_area').scrollTop// 滚动条的scrolltop

      let wrapheight = e.target.clientHeight; // 容器的高度
      let wrapheight1 = e.target.scrollHeight; // 容器的高度
      let scrolltop = e.target.scrollTop; // 滚动条的scrolltop

      // let scrollheight = document.querySelector('.AllOrder').prop('scrollHeight')// 内容的高度

      if (wrapheight1 - scrolltop <= wrapheight + 10) {
        // 判斷是否滑到底
        this.getGamesData.pageIndex++;
        this.moreGames = true;
        if (this.totalPages !== "") {
          // 判斷頁數是超出總頁數
          if (this.getGamesData.pageIndex > this.totalPages) {
            this.moreGames = false;
            return;
          }
        }

        apiGetGames(this.getGamesData).then(res => {
          // this.gameData = res.data.list
          if (res.data.list < 1) {
            this.getGamesData.pageIndex--;
            return;
          }

          for (let i = 0; i < res.data.list.length; i++) {
            this.gameData.push(res.data.list[i]);
          }
        });
      }
    },

    //自動彈窗提示
    // playMahjong() {
    //   this.oneClose();
    //   this.playGame(53, 201, "台湾麻将");
    // },
    // addFriend() {
    //   this.isPrompt = false;
    //   //非app处理
    //   // if (!isApp) {
    //   //   var newWin = window.open("about:blank");
    //   // }
    //   // apiUpdatePrompt().then(res => {
    //   //   // window.console.log(res);
    //   //   if (res.result == 1) {
    //   //     if (!isApp) {
    //   //       //非app处理
    //   //       newWin.location = "https://lin.ee/3SeRpTxuz";
    //   //     } else {
    //   //       //app处理
    //   //       this.$APP.openByBrowerInApp("https://lin.ee/3SeRpTxuz");
    //   //     }
    //   //   }
    //   // });
    // },
    // oneClose() {
    //   this.$storage.local.set("autoPromptOne", "0");
    //   this.autoPromptOne = this.$storage.local.get("autoPromptOne");
    //   this.$storage.local.set("autoPromptTwo", "1");
    //   this.autoPromptTwo = this.$storage.local.get("autoPromptTwo");
    // },
    // // twoClose() {
    // //   this.isPrompt = false;
    // //   apiUpdatePrompt().then(res => {
    // //     // window.console.log(res);
    // //   });
    // // }
    //自動彈窗提示...........

    // 關閉提示說明
    // closeExplanation() {
    //   // this.$storage.session.set("explanationShow",0)
    //   this.explanationShow = false
    // }
  },
  beforeDestroy() {
    clearTimeout(this.timeout);
  },
  filters: {
    marqueeDate(val) {
      // val = new Date(val);
      // if (isDay) {
      //   let day = val.getDate() > 10 ? val.getDate() : "0" + val.getDate();
      //   return day;
      // }
      // let year = val.getFullYear();
      // let month = val.getMonth() + 1;
      // return year + "-" + (month > 10 ? "" : "0") + month;
      return val;
    }
  }
};
</script>
<style lang="scss">
.main {
  padding-bottom: rem(121);
  height: 100%;
  position: relative;

  // .shortcutExplanation{
  //   width: 90%;
  //   background-color: rgba(34,44,83,0.9);
  //   position: absolute;
  //   left: 5%;
  //   bottom: rem(40);
  //   z-index: 1000;
  //   padding: rem(40);
  //   box-sizing: border-box;
  //   border-radius: rem(40);
  //   text-align: center;

  //   .closeExplanation{
  //     width: rem(60);
  //     position: absolute;
  //     top: 0;
  //     right: 0;
  //   }

  //   .content{
  //     font-size: rem(36);
  //     margin-bottom: rem(20);
  //   }

  //   .title{
  //     color: #d8a925;
  //     font-size: rem(48);
  //     margin-bottom: rem(20);
  //   }

  //   .explanationIconBox{
  //     display: flex;
  //     align-items: center;
  //     justify-content: center;
  //     .iconBox{
  //       width: 25%;
  //       font-size: rem(24);
  //       display: flex;
  //       flex-flow: column;
  //       align-items: center;
  //       img{
  //         width: 100%;
  //       }
  //     }
  //   }
  // }

  // .right-arrow {
  //   display: inline-block;
  //   position: relative;
  //   width: rem(28);
  //   height: rem(28);
  //   transition: transform .3s;
  // }

  // .right-arrow::after {
  //   display: inline-block;
  //   content: " ";
  //   height: rem(28);
  //   width: rem(28);
  //   position: absolute;
  //   top: 0px;
  //   left: -rem(10);
  //   border-width: rem(4) rem(4) 0 0;
  //   border-color: #23affa;
  //   border-style: solid;
  //   border-radius: rem(6);
  //   transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
  // }
}

.stickyTop {
  position: sticky;
  top: 0;
  z-index: 99;
  background: #20212f;
}
.banners {
  // height: rem(360);
  .swiper-slide {
    img {
      width: 100%;
      object-fit: cover;
    }
  }

  .swiper-pagination {
    width: rem(159);
    left: initial !important;
    right: rem(22) !important;
    display: flex;
    justify-content: space-between;

    .bullet {
      width: rem(22);
      height: rem(22);
      border-radius: rem(22) / 2;
      background-color: $blue;
      opacity: 0.3;
      transition: 0.3s;
    }
    .active-bullet {
      width: rem(62);
      opacity: 1;
    }
  }
}
.swiper-loading {
  width: 100%;
  height: rem(350);
  display: flex;
  align-items: center;
  .loading {
    margin: 0 auto;
    border: 3px solid rgb(24, 27, 24);
    border-right: 3px solid #818181;
    // border-bottom: 3px solid #d6d6d6;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    animation: loading 1s infinite linear;
  }
}
@keyframes loading {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.announcement {
  margin: 0 rem(20);
  padding: rem(20) 0;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  height: rem(20);
  .img {
    width: rem(41);
    padding-right: rem(16);
    background-color: $bg-primary;
    z-index: 99;
    img {
      display: block;
      width: 100%;
      object-fit: cover;
    }
  }
  .text {
    position: absolute;
    left: 100%;
    font-size: rem(30);
    color: $gray;
    transition-timing-function: linear;
    white-space: nowrap;
  }
}
.games_area {
  height: calc(100% - #{rem(200)});
  padding: rem(17) rem(20);
  padding-bottom: rem(400);
  box-sizing: border-box;
  width: 100%;
  display: flex;
  overflow-y: auto;
  flex-flow: wrap;
  -webkit-overflow-scrolling: touch;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .game {
    position: relative;
    margin-bottom: rem(35);
    height: rem(186);
    transition: 0.3s;
    -webkit-transform: translateZ(0px);
    &.unfold {
      height: rem(376);
      z-index: 1;
      .full {
        display: none;
      }
      .bg {
        width: 100%;
      }
      .btn-unfold {
        z-index: 2;
        position: absolute;
        display: block;
        top: rem(26);
        right: rem(20);
        width: rem(42);
        height: rem(42);
        background-image: url("~@/assets/images/game/unfold.png");
        background-repeat: no-repeat;
        background-size: cover;
        opacity: 1;
      }
      .content {
        padding-top: rem(22);
        align-items: center;
      }
      .icon {
        margin-left: rem(47);
        margin-right: rem(18);
        padding-top: 0;
        width: rem(77);
        height: rem(77);
      }
      .title {
        padding-top: 0;
        margin-bottom: 0;
        .name {
          font-size: rem(29);
          margin-bottom: rem(8);
          white-space: nowrap;
        }
        .subname {
          font-size: rem(19);
          color: $white;
        }
      }
      .tags {
        display: none;
      }
      .swiper-games {
        height: rem(203);
      }
    }
    .full {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 1;
    }
    .bg {
      z-index: -1;
      position: absolute;
      right: 0;
      width: calc(100% * 675 / 710);
      height: 100%;
      border-radius: rem(20);
      overflow: hidden;
    }
    .btn-unfold {
      transition: 0.3s;
      opacity: 0;
    }
    .content {
      display: flex;
      align-items: center;
    }
    .icon {
      transition: 0.8s;
      padding-top: rem(12);
      width: rem(165);
      height: rem(161);
      margin-right: rem(35);
      img {
        display: block;
      }
    }
    .title {
      transition: 0.8s;
      padding-top: rem(17);
      margin-bottom: rem(40);
      .name {
        font-size: rem(40);
        margin-bottom: rem(6);
        color: $white;
        white-space: nowrap;
      }
      .subname {
        font-size: rem(28);
        color: $light-gray;
      }
    }
    .tags {
      display: flex;
      align-items: center;
      position: absolute;
      .tagGroup {
        display: flex;
        align-items: center;
      }
      .tag {
        background-image: url("~@/assets/images/icons/tag.png");
        background-size: cover;
        width: rem(24);
        height: rem(24);
        margin-right: rem(13);
      }
      .name {
        font-size: rem(22);
        color: $light-blue;
        margin-right: rem(20);
        white-space: nowrap;
      }
    }
    .swiper-games {
      position: absolute;
      bottom: rem(32);
      width: 100%;
      font-size: 0;
      height: 0;
      overflow: hidden;
      transition: height 0.2s;
      .swiper-wrapper {
        margin-right: rem(60);
        width: 100%;
      }
      .swiper-slide {
        img {
          display: block;
          height: 100%;
          width: 100%;
          object-fit: contain;
        }
      }
    }
  }
  .games_area_box {
    width: 29%;
    margin: 0.5% 2%;
    height: rem(255);
    font-size: rem(25);
    padding: 3px;
    box-sizing: border-box;
    position: relative;
    // background-image: url('../assets/images/game/games_area_bg.jpg');
    background-repeat: no-repeat;
    background-size: cover;

    .game_title {
      width: 95%;
      padding: rem(14.5) rem(5);
      box-sizing: border-box;
      // background-image: url('../assets/images/game/games_title_bg.png');
      background-repeat: no-repeat;
      background-size: contain;
      position: absolute;
      left: calc(2%);
      // border-radius: 50%;
      // top: 0%;
      bottom: -9%;
      // margin: 0 auto;
      text-align: center;
      border-radius: 5px;
      // border: 2px solid #ffd37a;
      color: #fff;
    }

    img {
      width: 100%;
      height: auto;
    }
    .game_img {
      width: 100%;
      // border: 2px solid #ffd37a;
      box-sizing: border-box;
      width: 100%;
      height: -webkit-fill-available;
      border-radius: 3px;
    }
  }
}
.marquee-detail {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: $bg-primary;
  z-index: 99999;
  .top_area {
    margin-top: rem(21);
    font-size: rem(32);
    display: flex;
    width: 100%;
    text-align: center;
    border: rem(2) solid #343852;
    border-right: none;
    border-left: none;
    .toggle_btn {
      transition: color 0s;
      transition: border 0.8s;
      width: 50%;
      box-sizing: border-box;
      background-color: #171723;
      padding: rem(24) 0;
      color: #4e5164;
      font-weight: bold;
      &.active {
        color: #fff;
        position: relative;
        overflow: hidden;
        &::before {
          content: "";
          width: rem(180);
          height: rem(120);
          background-color: rgba(#7777a5, 0.4);
          border-radius: 100%;
          position: absolute;
          top: 95%;
          left: 50%;
          transform: translateX(-50%);
          box-shadow: 0 rem(-5) rem(80) #7777a5;
        }
      }
    }
  }
  .marquees {
    height: calc(100% - #{rem(198)});
    padding: rem(18) rem(26);
    box-sizing: border-box;
    overflow-y: scroll;
    .marquee {
      height: rem(218);
      background-color: $bg-dark;
      border-radius: rem(10);
      overflow: hidden;
      display: flex;
      align-items: center;
      // margin-bottom: rem(20);
      .date {
        width: 100%;
        display: flex;
        align-items: flex-end;
        background-color: #27283b;
        font-size: rem(30);
        padding: rem(20) rem(28);
        box-sizing: border-box;
        align-items: center;

        .day {
          // padding: rem(7) rem(10);
          // font-size: rem(42);
          // background-color: #9292b6;
          // color: #000;
          color: #666779;
        }

        .day:last-child {
          margin-top: rem(4);
          color: #94c6e8;
        }
        .other {
          // font-size: rem(24);
          // padding-bottom: rem(7);
          // padding-left: rem(6);
          color: #666779;
        }

        .other:last-child {
          margin-top: rem(4);
          color: #7fce72;
        }

        .iconDateArrow {
          margin: 0px rem(40);
        }
        .space {
          flex-grow: 1;
        }
        .triangle {
          float: right;
          border-color: transparent $bg-dark $bg-dark transparent;
          border-style: solid;
          border-width: rem(28);
          height: 100%;
        }
      }
      .content {
        font-size: rem(32);
        padding: rem(20) rem(22);
      }
    }
    .marquee:nth-child(odd){
        background-color: #27283b;
      }
  }
}
// 自動提示
// .autoPromptBg {
//   width: 100%;
//   height: 100%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   position: absolute;
//   top: 0;
//   background-color: rgba(0, 0, 0, 0.5);
//   z-index: 1000;

//   .autoPrompt {
//     background-image: url("~@/assets/images/prompt/autoPrompt_one.png");
//     .playMahjong {
//       width: rem(230);
//       height: rem(110);
//       position: absolute;
//       bottom: rem(116);
//       left: rem(46);
//       // border: rem(2) solid #000;
//     }
//   }
//   .autoPromptTwo {
//     background-image: url("~@/assets/images/prompt/autoPrompt_two.png");
//     .addFriend {
//       width: rem(300);
//       height: rem(140);
//       position: absolute;
//       bottom: rem(164);
//       right: rem(28);
//       // border: rem(2) solid #000;
//     }
//   }
//   .autoPrompt,
//   .autoPromptTwo {
//     width: 80%;
//     height: rem(600);
//     position: relative;

//     background-size: 100% 100%;
//     margin-top: rem(-120);

//     .autoPromptClose {
//       position: absolute;
//       width: 40px;
//       bottom: -15px;
//       right: -25px;
//     }
//     @media only screen and (min-width: 768px) and (max-width: 1023px) {
//       .playMahjong {
//         width: rem(330);
//       }
//       .addFriend {
//         width: rem(400);
//       }
//     }
//   }
// }
// 自動提示...................
</style>
