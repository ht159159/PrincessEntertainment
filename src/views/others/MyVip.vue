<template>
  <div class="myVip">
    <header-cmp :title="$t('privilege')">
      <template #btn>
        <div class="vipDetailBtn" @click.prevent="vipDetailShow = true">
          {{ $t("vipDetail") }}
        </div>
      </template>
    </header-cmp>
    <main>
      <div class="card">
        <div class="card-title">
          <div class="card-title-mugShot"></div>
          <div class="card-title-content">
            <div class="card-title-levelBg">
              <div class="card-title-level">V{{ nowRankName }}</div>
            </div>
            <!-- <img src="../../assets/images/vip/vip-img.png" alt /> -->
            <div>{{ nickName }}</div>
          </div>
          <div class="stored" @click="gostored">儲值</div>
        </div>
        <div class="card-content">
          <!-- 進度條 -->
          <div class="progressBox">
            <div class="nowLevelBg">
              <span>V{{ levelNumber }}</span>
              <!-- <span v-if="isMax">MAX</span> -->
            </div>
            <div class="progressContainer">
              <div class="progress" :style="{ width: progreess + '%' }">
                <b v-if="!isMax">{{ progreess | $currency }}%</b>
                <b v-if="isMax">100%</b>
              </div>
            </div>
            <div class="nextLevelBg">
              <span v-if="!isMax">V{{ levelNumber + 1 }}</span>
              <span v-if="isMax">MAX</span>
            </div>
          </div>
          <div class="card-content-text">
            距下級還差 {{ rechargeAmountShort | $currency }} 儲值點數、{{ BetAmountShort | $currency }}投注，晉級到 VIP{{ levelNumber + 1 }} 獲得
            {{ nowBaseBonus | $currency }} 點晉級禮金。<br>
            達到VIP等級條件後，於每日00:00~01:00進行升級
          </div>
        </div>
      </div>

      <div class="pageChange">
        <div class="lastLevelBtn" @click="lastLevel">上一個等級</div>
        <div class="levelText">V{{ getMemRankData.rankName2 }}</div>
        <div class="nextLevelBtn" @click="nextLevel">下一個等級</div>
      </div>

      <div class="mission">
        <div class="mission-box">
          <div class="mission-tilte">
            <img src="../../assets/images/vip/bonus-ordinary.png" alt />
            <div class="mission-tilte-text">晉級彩金</div>
          </div>
          <div class="mission-reward">
            <p>
              {{ getMemRankData.baseBonus | $currency }}
              <span>點</span>
            </p>
          </div>
          <div class="mission-content">當前等級可領取</div>
          <div class="mission-btn">
            <div class="received">
              <div
                class="receivedText"
                v-if="getMemRankData.canGetBaseAmount == 2"
              >
                已領取
              </div>
              <div
                class="notAvailable"
                v-if="getMemRankData.canGetBaseAmount == 0"
              >
                不可領取
              </div>
              <div
                class="available"
                v-if="getMemRankData.canGetBaseAmount == 1"
                @click="receive('canGetBaseAmount')"
              >
                立即領取
              </div>
            </div>
            <!-- <div
              class="notAvailable"
              v-if="
                getMemRankData.baseBonus < 0 && !getMemRankData.canGetBaseAmount
              "
            >
              立即領取
            </div>-->
          </div>
        </div>

        <div class="mission-box">
          <div class="mission-tilte">
            <img src="../../assets/images/vip/bonus-day.png" alt />
            <div class="mission-tilte-text">簽到金</div>
          </div>
          <div class="mission-reward">
            <p>
              {{ getMemRankData.dayBonus | $currency }}
              <span>點</span>
            </p>
          </div>
          <div class="mission-content">一天後可再領取</div>
          <div class="mission-btn">
            <div class="received">
              <div
                class="receivedText"
                v-if="getMemRankData.canGetDayAmount == 2"
              >
                已領取
              </div>
              <div
                class="notAvailable"
                v-if="getMemRankData.canGetDayAmount == 0"
              >
                不可領取
              </div>
              <div
                class="available"
                v-if="getMemRankData.canGetDayAmount == 1"
                @click="receive('canGetDayAmount')"
              >
                立即領取
              </div>
            </div>
            <!-- <div
              class="notAvailable"
              v-if="
                getMemRankData.dayBonus < 0 && !getMemRankData.canGetBaseAmount
              "
            >
              立即領取
            </div>-->
          </div>
        </div>

        <div class="mission-box">
          <div class="mission-tilte">
            <img src="../../assets/images/vip/bonus-week.png" alt />
            <div class="mission-tilte-text">周彩金</div>
          </div>
          <div class="mission-reward">
            <p>
              {{ getMemRankData.weekBonus | $currency }}
              <span>點</span>
            </p>
          </div>
          <div class="mission-content">當前等級可領取</div>
          <div class="mission-btn">
            <div class="received">
              <div
                class="receivedText"
                v-if="getMemRankData.canGetWeekAmount == 2"
              >
                已領取
              </div>
              <div
                class="notAvailable"
                v-if="getMemRankData.canGetWeekAmount == 0"
              >
                不可領取
              </div>
              <div
                class="available"
                v-if="getMemRankData.canGetWeekAmount == 1"
                @click="receive('canGetWeekAmount')"
              >
                立即領取
              </div>
            </div>
            <!-- <div
              class="notAvailable"
              v-if="
                getMemRankData.weekBonus < 0 && !getMemRankData.canGetBaseAmount
              "
            >
              立即領取
            </div>-->
          </div>
        </div>
        <div class="mission-box">
          <div class="mission-tilte">
            <img src="../../assets/images/vip/bonus-month.png" alt />
            <div class="mission-tilte-text">月彩金</div>
          </div>
          <div class="mission-reward">
            <p>
              {{ getMemRankData.monthBonus | $currency }}
              <span>點</span>
            </p>
          </div>
          <div class="mission-content">當前等級可領取</div>
          <div class="mission-btn">
            <div class="received">
              <div
                class="receivedText"
                v-if="getMemRankData.canGetMonthAmount == 2"
              >
                已領取
              </div>
              <div
                class="notAvailable"
                v-if="getMemRankData.canGetMonthAmount == 0"
              >
                不可領取
              </div>
              <div
                class="available"
                v-if="getMemRankData.canGetMonthAmount == 1"
                @click="receive('canGetMonthAmount')"
              >
                立即領取
              </div>
            </div>
            <!-- <div
              class="notAvailable"
              v-if="
                getMemRankData.monthBonus < 0 &&
                  !getMemRankData.canGetBaseAmount
              "
            >
              立即領取
            </div>-->
          </div>
        </div>
      </div>
    </main>
    <transition name="pop">
      <div class="vipDetail" v-if="vipDetailShow">
        <div class="vipDetail-main">
          <img
            class="vipDetailClose"
            src="../../assets/images/icons/close-white.png"
            alt
            @click.prevent="vipDetailShow = false"
          />
          <div class="vipDetail-main-title">VIP特權說明</div>
          <div class="vipDetail-main-content">
            <div>1.晉級彩金在晉級後可立即領取，只可領取一次。</div>
            <p></p>
            <div>2.簽到金每天簽到每天發放。</div>
            <p></p>
            <div>3.周彩金在每週一發放（一周之內，如逾期不領將收回）</div>
            <p></p>
            <div>4.月彩金在每個月的1號發放（一個月之內，如逾期不領將收回）</div>
            <p></p>
          </div>
          <div class="vipDetail-main-remind">
            溫馨提示：
            <p></p>
            發送的彩金必須達到規定額度才能託售，此活動只適用於一個獨立賬戶的玩家，若發現違規行為，將會被扣除彩金以及盈利。
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
// import axios from "axios";
import {
  apiGetMemRank,
  apiGetRanks,
  apiGetBaseBonus,
  apiGetDayBonus,
  apiGetWeekBonus,
  apiGetMonthBonus
} from "@/api";
export default {
  data() {
    return {
      nickName: "",
      getMemRankData: "",
      getRanksData: "",
      progreess: 0,
      levelNumber: "",
      shortBf: "",
      nowBetAmountShort: "",
      BetAmountShort: "",
      nowRankName: "",
      nowBaseBonus: "",
      maxRank: "",
      rechargeAmountShort: "",
      // changeRankName: "",
      changeLevel: "",
      // changeBaseBonus: "",
      receiveData: {
        rankId: ""
      },
      isMax: false,
      vipDetailShow: false
    };
  },
  // created() {
  //   // this.serviceData[0].dataList = serviceInfo.Data
  // },
  mounted() {
    this.nickName = this.$storage.local.get("nickName");
    this.rank();
  },
  methods: {
    rank() {
      apiGetMemRank().then(res => {
        // window.console.log(res.data.id % 10);
        this.levelNumber = parseInt(res.data.rankName2);
        // window.console.log(this.levelNumber);
        this.getMemRankData = res.data;
        // this.getMemRankData.baseBonus = this.getMemRankData.baseBonus;
        // this.getMemRankData.dayBonus = this.getMemRankData.dayBonus;
        // this.getMemRankData.weekBonus = this.getMemRankData.weekBonus;
        // this.getMemRankData.monthBonus = this.getMemRankData.monthBonus;

        // this.changeRankName = res.data.rankName;
        // this.changeBaseBonus = res.data.baseBonus;

        this.nowRankName = res.data.rankName2;
        // this.nowBaseBonus = res.data.baseBonus;
        this.nowBetAmountShort = res.data.betAmountShort;
        this.BetAmountShort = res.data.betAmountShort;
        this.rechargeAmountShort =res.data.rechargeAmountShort;
        this.changeLevel = parseInt(res.data.rankName2);
        this.receiveData.rankId = this.getMemRankData.id;
        this.shortBf = res.data.shortBf

        this.shortBf >= 1 ? this.progreess = 1 : this.progreess = parseInt((this.shortBf * 100 ) );
        

        apiGetRanks().then(res => {
          // window.console.log(res);
          this.getRanksData = res.data.ranks;

          // for (let i = 0; this.getRanksData.length > i; i++) {
          //   this.getRanksData[i].baseBonus = this.getRanksData[i].baseBonus;
          //   this.getRanksData[i].dayBonus = this.getRanksData[i].dayBonus;
          //   this.getRanksData[i].weekBonus = this.getRanksData[i].weekBonus;
          //   this.getRanksData[i].monthBonus = this.getRanksData[i].monthBonus;
          // }

          // window.console.log(this.getMemRankData.rankName2);
          this.maxRank = this.getRanksData[
            this.getRanksData.length - 1
          ].rankName2;
          if (this.levelNumber !== this.maxRank) {
            this.betAmountAll = this.getRanksData[this.levelNumber].betAmount;
            this.nowBaseBonus = this.getRanksData[this.levelNumber].baseBonus;
          }

          // window.console.log(this.betAmountAll);
          // window.console.log(this.nowBetAmount);
          // window.console.log(this.progreess);
          // window.console.log(this.maxRank);
          if (this.getMemRankData.rankName2 == this.maxRank) this.isMax = true;
        });
      });
    },
    nextLevel() {
      // window.console.log(this.changeLevel);
      // window.console.log("2222222");
      if (this.changeLevel < this.maxRank) {
        this.changeLevel = this.changeLevel + 1;
        // window.console.log(this.changeLevel);
        if (this.changeLevel > this.maxRank) {
          // window.console.log("this.changeLevel");
          return;
        } else {
          this.getMemRankData = this.getRanksData[this.changeLevel - 1];
          this.receiveData.rankId = this.getMemRankData.id;
          // this.changeBaseBonus = this.getRanksData[
          //   this.changeLevel - 1
          // ].baseBonus;
          // this.getMemRankData.dayBonus = this.getRanksData[
          //   this.changeLevel - 1
          // ].dayBonus;
          // this.getMemRankData.weekBonus = this.getRanksData[
          //   this.changeLevel - 1
          // ].weekBonus;
          // this.getMemRankData.monthBonus = this.getRanksData[
          //   this.changeLevel - 1
          // ].monthBonus;
          // this.changeRankName = this.getRanksData[
          //   this.changeLevel - 1
          // ].rankName;
          // this.receiveData.rankId = this.getRanksData[this.changeLevel - 1].id;
        }
      }
    },
    lastLevel() {
      // window.console.log("33333333333");
      // this.changeLevel = this.changeLevel - 1;
      // window.console.log(this.changeLevel);

      if (this.changeLevel > 0) {
        this.changeLevel = this.changeLevel - 1;
        // window.console.log(this.changeLevel);
        if (this.changeLevel < 1) {
          this.changeLevel = this.changeLevel + 1;
          // window.console.log("this.changeLevel");
          return;
        } else {
          this.getMemRankData = this.getRanksData[this.changeLevel - 1];
          this.receiveData.rankId = this.getMemRankData.id;
          // this.changeBaseBonus = this.getRanksData[
          //   this.changeLevel - 1
          // ].baseBonus;
          // this.getMemRankData.dayBonus = this.getRanksData[
          //   this.changeLevel - 1
          // ].dayBonus;
          // this.getMemRankData.weekBonus = this.getRanksData[
          //   this.changeLevel - 1
          // ].weekBonus;
          // this.getMemRankData.monthBonus = this.getRanksData[
          //   this.changeLevel - 1
          // ].monthBonus;
          // this.changeRankName = this.getRanksData[
          //   this.changeLevel - 1
          // ].rankName;
          // this.receiveData.rankId = this.getRanksData[this.changeLevel - 1].id;
        }
      }
    },
    reRank() {
      apiGetRanks().then(res => {
        this.getRanksData = res.data.ranks;
        this.getMemRankData = res.data.ranks[this.changeLevel - 1];
      });
    },
    receive(v) {
      // window.console.log(v);
      // window.console.log(this.receiveData.rankId);
      switch (v) {
        case "canGetBaseAmount":
          // window.console.log(v);
          apiGetBaseBonus(this.receiveData).then(res => {
            // window.console.log(res);
            this.$toast(this.$t(res.message));
            this.reRank();
          });
          break;

        case "canGetDayAmount":
          // window.console.log(v);
          apiGetDayBonus().then(res => {
            // window.console.log(res);
            this.$toast(this.$t(res.message));
            this.reRank();
          });
          break;

        case "canGetWeekAmount":
          // window.console.log(v);
          apiGetWeekBonus().then(res => {
            // window.console.log(res);
            this.$toast(this.$t(res.message));
            this.reRank();
          });
          break;

        case "canGetMonthAmount":
          // window.console.log(v);
          apiGetMonthBonus().then(res => {
            // window.console.log(res);
            this.$toast(this.$t(res.message));
            this.reRank();
          });
          break;
      }
    },
    gostored() {
      var url =
        window.location.origin +
        "/thirdpartypayment?" +
        "isFromApp=true&token=" +
        localStorage.getItem("token") +
        "&expireInMinutes=" +
        localStorage.getItem("expireInMinutes");
      if (isApp) {
        //app处理
        this.$APP.openByBrowerInApp(url);
      } else {
        //非app处理
        this.$router.push("thirdpartypayment");
      }
    }

    // 千分號
    // toThousands(num) {
    //   let result = "",
    //     counter = 0;
    //   num = (num || 0).toString();
    //   for (let i = num.length - 1; i >= 0; i--) {
    //     counter++;
    //     result = num.charAt(i) + result;
    //     if (!(counter % 3) && i != 0) {
    //       result = "," + result;
    //     }
    //   }
    //   return result;
    // }
  },
  filters: {}
};
</script>

<style lang="scss">
$back-icon-padding: 10;
.myVip {
  .header-cmp {
    background: none;

    .vipDetailBtn {
      font-size: rem(24);
      border-radius: rem(20);
      background-color: #1e213d;
      padding: rem(10) rem(20);
      box-sizing: border-box;
    }
  }
  width: 100%;
  height: 100%;
  background-image: url("~@/assets/images/vip/vip-Bg.png");
  background-size: 100% 100%;

  main {
    width: 100%;
    height: calc(100% - #{rem(116)});
    padding: 0 0.3rem 0px 0.3rem;
    box-sizing: border-box;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;

    .card {
      width: 100%;
      position: relative;
      background-image: url("~@/assets/images/vip/card-Bg.png");
      background-size: 100% 100%;
      // padding: rem(46) rem(40);
      padding: rem(20) rem(40);
      box-sizing: border-box;
      //   filter: drop-shadow(0.717px 1.867px 2.5px rgba(149,127,85,0.59));
      &-title {
        width: 100%;
        position: relative;
        display: flex;
        align-items: center;
        margin-bottom: rem(50);
        display: flex;
        flex-wrap: wrap;

        &-mugShot {
          width: rem(100);
          height: rem(100);
          border-radius: rem(50);
          background-image: url("~@/assets/images/center/avatar.png");
          background-size: 100% 100%;
          margin-right: rem(10);
          border: 2px solid #fff;
          box-sizing: border-box;
        }
        &-content {
          display: flex;
          flex-flow: column;

          .card-title-levelBg {
            width: rem(130);
            height: rem(58);
            background-image: url("~@/assets/images/vip/vip-img.png");
            background-size: 100% 100%;
            position: relative;

            .card-title-level {
              font-size: rem(24);
              position: absolute;
              right: rem(30);
              top: rem(18);
              font-weight: bold;
              background: -webkit-linear-gradient(
                top,
                #ffffd2 10%,
                #ffdc02 100%
              );
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }
          }

          img {
            width: rem(100);
            margin-bottom: rem(20);
          }
          div {
            font-size: rem(36);
            color: #fff;
          }
        }

        .stored {
          font-size: rem(28);
          background: red;
          border-radius: rem(10);
          padding: rem(10);
          box-sizing: border-box;
          position: absolute;
          right: 0;
          color: #fff;
        }
      }

      &-content {
        width: 100%;
        display: flex;
        flex-flow: column;
        align-items: flex-end;

        .progressBox {
          width: 85%;
          display: flex;
          align-items: center;
        }
        .nowLevelBg {
          // position: absolute;
          top: rem(-10);
          width: rem(60);
          height: rem(30);
          background-image: url("~@/assets/images/vip/nowLevel-Bg.png");
          background-size: 100% 100%;
          filter: drop-shadow(0.717px 1.867px 2.5px rgba(149, 127, 85, 0.59));
          font-size: rem(24);
          color: #bd9a62;
          // text-align: center;
          font-family: "Berlin Sans FB";
          line-height: rem(28);
          // padding: 0 rem(16);
          box-sizing: border-box;
          text-align: center;
          margin-right: rem(-1);
          z-index: 1;

          span {
            color: #bd9a62;
          }
        }

        .nextLevelBg {
          // position: absolute;
          top: rem(-10);
          right: 0;
          width: rem(60);
          height: rem(30);
          background-image: url("~@/assets/images/vip/nextLevel-Bg.png");
          background-size: 100% 100%;
          filter: drop-shadow(0.717px 1.867px 2.5px rgba(149, 127, 85, 0.59));
          font-size: rem(24);
          color: #fff;
          // text-align: center;
          font-family: "Berlin Sans FB";
          line-height: rem(28);
          // padding: 0 rem(16);
          box-sizing: border-box;
          text-align: center;
          margin-left: rem(-2);
          z-index: 1;

          span {
            color: #fff;
          }
        }
        //   進度條
        div.progressContainer {
          height: rem(8);
          width: 85%;
          position: relative;
          //   border-radius: 10px;
          background-color: #9e8152;
          // margin-left: 2%;
          // position: relative;
        }
        div.progress {
          background-color: #fff;
          //   border-radius: 10px;
          height: rem(8);
          line-height: rem(40);
          transition: 3s;
        }
        b {
          color: #bd9a62;
          font-weight: 300;
          font-size: rem(24);
          font-family: "Berlin Sans FB";
          position: absolute;
          left: 45%;
          top: rem(-44);
          background: #fff;
          border-radius: rem(20);
          padding: 0 rem(14);
          box-sizing: border-box;
        }
        //   進度條end

        &-text {
          margin-top: rem(26);
          width: 85%;
          font-size: rem(28);
          color: #82561f;
          line-height: rem(36);
        }
      }
    }

    //     .card:before {
    //     content: "";
    //     background-image: url("~@/assets/images/vip/card-Bg.png");
    //       background-size: 100% 100%;
    //     position: absolute;
    //     top: 100%;
    //     left: 0;
    //     right: 0;
    //     bottom: -100%;
    //     transform: rotateX(180deg);
    // }

    .card:after {
      content: "";
      position: absolute;
      left: 0;
      border-radius: rem(20);
      width: 100%;
      height: rem(40);
      bottom: rem(-44);
      // transform: rotateX(180deg);
      /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#ddba7e+0,ffffff+100&1+0,0+100 */
      background: -moz-linear-gradient(
        top,
        rgba(221, 186, 126, 1) -150%,
        rgba(255, 255, 255, 0) 70%
      ); /* FF3.6-15 */
      background: -webkit-linear-gradient(
        top,
        rgba(221, 186, 126, 1) -150%,
        rgba(255, 255, 255, 0) 70%
      ); /* Chrome10-25,Safari5.1-6 */
      background: linear-gradient(
        to bottom,
        rgba(221, 186, 126, 1) -150%,
        rgba(255, 255, 255, 0) 70%
      ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ddba7e', endColorstr='#00ffffff',GradientType=0 ); /* IE6-9 */
      z-index: 2;
    }

    .pageChange {
      width: 100%;
      height: rem(80);
      background-image: url("~@/assets/images/vip/pageChange-Bg.png");
      background-size: 100% 100%;
      margin-top: rem(50);
      // display: flex;
      // align-items: center;
      // justify-content: space-around;
      padding: 0 rem(70);
      box-sizing: border-box;
      position: relative;
      div {
        font-size: rem(28);
        color: #82561f;
        font-family: "Microsoft Ya Hei";
      }
      .levelText {
        font-size: rem(35);
        letter-spacing: rem(2);
        color: #f9ecd3;
        font-family: "Berlin Sans FB";
        text-align: center;
        line-height: rem(70);
        background: -webkit-linear-gradient(top, #bb9965 0, #ddc58f 82%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .lastLevelBtn,
      .nextLevelBtn {
        position: absolute;
        top: rem(28);
      }
      .nextLevelBtn {
        right: rem(70);
      }
    }

    .mission {
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-bottom: rem(20);

      &-box {
        width: 48.5%;
        padding: rem(20);
        box-sizing: border-box;
        background-image: linear-gradient(-43deg, #1d1f3d 0%, #272b69 97%);
        background-clip: padding-box, border-box;
        background-origin: padding-box, border-box;
        background-image: linear-gradient(-43deg, #1d1f3d 0%, #272b69 97%),
          linear-gradient(-43deg, #2c3075 0%, #494ea4 100%);
        border: 1px transparent solid;
        border-radius: rem(10);
        display: flex;
        flex-flow: column;
        align-items: center;
        margin-top: rem(22);
      }
      &-tilte {
        width: 100%;
        font-size: rem(36);
        display: flex;
        align-items: center;

        &-text {
          margin-left: rem(20);
        }
      }
      &-reward {
        font-size: rem(50);
        margin-top: rem(30);
        margin-bottom: rem(16);
        background: -webkit-linear-gradient(bottom, #fdd193 9%, #f7f5f3 83%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        span {
          font-size: rem(36);
        }
      }
      &-content {
        font-size: rem(28);
        margin-bottom: rem(36);
        color: #6368b4;
      }
      &-btn {
        width: 100%;
        text-align: center;
        font-size: rem(32);
        div {
          color: #6368b4;
          // padding: rem(10) 0;
          // box-sizing: border-box;
        }
        .received {
          div {
            padding: rem(10) 0;
            box-sizing: border-box;
          }
          span {
            color: #fff;
          }
          .receivedText {
            border-radius: rem(28);
            background-color: rgba(45, 155, 127, 0);
            border: 1px solid #5c5f92;
            color: #6368b4;
          }
        }
        .available {
          border-radius: rem(28);
          color: #fff;
          background-image: linear-gradient(90deg, #e9c3a3 0%, #c3936b 100%);
          border: 1px solid #5c5f92;
        }

        .notAvailable {
          border-radius: rem(28);
          color: #fff;
          background-image: linear-gradient(90deg, #e9c3a3 0%, #c3936b 100%);
          opacity: 0.5;
          border: 1px solid #5c5f92;
        }
      }
    }
  }

  //   .left-arrow {
  //     display: inline-block;
  //     position: relative;
  //     width: rem(28);
  //     height: rem(28);
  //     transition: transform 0.3s;
  //   }

  //   .left-arrow::after {
  //     display: inline-block;
  //     content: " ";
  //     height: rem(28);
  //     width: rem(28);
  //     border-width: rem(4) rem(4) 0 0;
  //     border-color: #23affa;
  //     border-style: solid;
  //     border-radius: rem(6);
  //     transform: matrix(-0.71, 0.71, 0.71, 0.71, 0, 0);
  //   }
  //   .active {
  //     transform-origin: center;
  //     transform: rotate(-90deg);
  //     transition: transform 0.3s;
  //   }

  .vipDetail {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;

    &-main {
      width: 85%;
      color: #fff;
      position: relative;
      font-size: rem(48);
      background-clip: padding-box, border-box;
      background-origin: padding-box, border-box;
      background-image: linear-gradient(-43deg, #1d1f3d 0%, #272b69 97%),
        linear-gradient(-43deg, #2c3075 0%, #494ea4 100%);
      border: 1px transparent solid;
      border-radius: rem(10);
      padding: rem(20);
      box-sizing: border-box;
      margin: 0 auto;
      border-radius: rem(30);

      &-title {
        text-align: center;
        padding: rem(30);
        background: #d0b78c;
        box-sizing: border-box;
        color: #82561f;
      }

      &-content {
        margin-top: rem(20);
        font-size: rem(36);
        div {
          margin-bottom: rem(20);
          line-height: rem(50);
        }
      }

      &-remind {
        font-size: rem(36);
        line-height: rem(50);
        color: #6368b4;
      }
      .vipDetailClose {
        width: rem(60);
        position: absolute;
        top: rem(-20);
        right: rem(-20);
      }
    }
  }
}
</style>
