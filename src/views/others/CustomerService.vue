<template>
  <div class="customerService">
    <header-cmp :title="$t('Service')"></header-cmp>
    <main>
      <div
        class="serviceList"
        v-for="(item, index) in serviceData"
        :key="index"
      >
        <div class="title" @click="toggle(item)">
          <img
            class="icon"
            :src="item.img"
            v-if="item.titleName === '常見問題'"
          />
          <div
            class="contentBox"
            :class="{ serviceBox: item.titleName === '聯絡客服' }"
          >
            <div class="contentTitleBox">
              <div>{{ item.titleName }}</div>
              <div class="titleContent">{{ item.titleContent }}</div>
            </div>
            <div
              class="left-arrow"
              :class="{ active: item.choose }"
              v-if="
                item.titleName !== 'VIP貴賓' &&
                  item.titleName !== '代理加盟熱線'
              "
            ></div>
          </div>
        </div>
        <transition name="draw">
          <!--这里的name 和 css 类名第一个字段要一样-->

          <div
            class="box"
            :class="{ questionBox: item.titleName === '常見問題' }"
            v-show="item.choose"
          >
            <div
              class="serviceData"
              :class="{ questionData: item.titleName === '常見問題' }"
              v-for="(list, questionI) in item.dataList"
              :key="questionI"
            >
              <section v-if="list.serverAisles">
                <img :src="list.headimg" alt="" />
                <div>暱稱:{{ list.name }}</div>

                <a
                  :class="{
                    connection:
                      serverItem.type === 'WeChat' || serverItem.callUrl == null
                  }"
                  @click.stop="$APP.openByBrowerInApp(serverItem.callUrl)"
                  v-for="(serverItem, i) in list.serverAisles"
                  :key="i"
                >
                  <div>{{ serverItem.type }}</div>
                  <div
                    :id="'copythis' + questionI + i"
                    v-if="
                      serverItem.type == 'WeChat' || serverItem.callUrl == null
                    "
                  >
                    {{ serverItem.number }}
                  </div>
                  <a
                    v-if="
                      serverItem.type == 'WeChat' || serverItem.callUrl == null
                    "
                    href="javascript:void(0)"
                    @click="
                      CopyTextToClipboard(
                        'copythis' + questionI + i,
                        serverItem
                      )
                    "
                    >{{ $t("copyAccount") }}</a
                  >
                </a>

                <!-- <a :href="'https://line.me/R/ti/p/%40guv7422g'">
                  <div>Line</div>
                </a>
                <a :href="'https://t.me/Nick0515'">
                  <div>Telegram</div>
                </a> -->
                <!-- <div class="connection" v-if="serverItem.type == 'WeChat'">
                  <div>Wechat ID</div>
                  <div>{{ list.chatNo }}</div>
                </div> -->
                <!-- <a :href="list.urlCode">點擊進入</a> -->
              </section>

              <section v-if="!list.serverAisles" class="questionDataContent">
                <div class="questionNumber">{{ questionI + 1 }}</div>
                <div class="questionContent">
                  <div>{{ list.titleName }}</div>
                  <div v-html="list.content">{{ list.content }}</div>
                </div>
              </section>
            </div>
          </div>
        </transition>
      </div>

      <!-- <div class="commonProblem">
          <div class="title" @click="boxshow = !boxshow">QQ克服</div>
        <transition name="draw">

          <div class="box" v-show="boxshow"></div>
        </transition>
      </div>-->
    </main>
  </div>
</template>
<script>
// import axios from "axios";
import { apiGetCustomerService } from "@/api";
export default {
  data() {
    return {
      serviceData: [
        {
          titleName: "VIP貴賓",
          titleContent: "提供快速便捷的即時溝通",
          choose: false,
          img: require("../../assets/images/icons/qqService_Icon.png"),
          dataList: ""
        },
        {
          titleName: "代理加盟熱線",
          titleContent: "更多賺錢的技巧請加TG頻道",
          choose: false,
          img: require("../../assets/images/icons/qqService_Icon.png"),
          dataList: ""
        },
        {
          titleName: "聯絡客服",
          titleContent: "海量用戶的第一選擇,優質的服務",
          choose: false,
          img: require("../../assets/images/icons/qqService_Icon.png"),
          dataList: ""
        },
        {
          titleName: "常見問題",
          titleContent: "常見問題諮詢,智能,自助",
          choose: false,
          img: require("../../assets/images/icons/commonProblem_Icon.png"),
          dataList: [
            {
              titleName: "怎麼代理?",
              content:
                "用您的專屬推廣碼或QR及連結，提供給其他成員進行註冊！成員註冊成功後，您則成為代理資格！"
            },
            {
              titleName: "自己的推廣碼在哪?",
              content:
                "A. 遊戲主介面點擊下方『我的』上方資訊即有6位數推廣碼！<br/>B. 遊戲主介面點擊下方『皇冠』『推廣碼』即可獲取QR圖與連結！可通過以上方式邀請成員成為您的下線！"
            },
            {
              titleName: "流水是怎麼算的？",
              content:
                "流水是指玩家在遊戲內有效投注的情況，例如您這把下注贏300，下把輸200，則您的個人流水為500。<br/>註：好友廳為玩家開房配對遊戲，其房間內流水除以10計算。"
            },
            {
              titleName: "直屬業績是怎麼算的？",
              content:
                "指的是您的直屬下線在遊戲內有效投注的流水，團隊業績則為直屬與下線團隊成員的全部流水！好友廳不列入業績計算。"
            },
            {
              titleName: "紅利在哪裡查看？",
              content:
                "遊戲主介面，點擊下方『我的』『代理中心』就能看到您的紅利等許多資訊。"
            },
            {
              titleName: "紅利多久結算？",
              content:
                "本產品紅利制度為日結算，每整點更新顯示，紅利將於隔日00:30後自動發放。"
            },
            {
              titleName: "託售有什麼要求？",
              content:
                "請參照主介面『託售』中查看，最低託售為1000點，每日託售最高25萬點。通過審核後即可。"
            },
            {
              titleName: "託售點數說明: ",
              content:
                "託售時，達到每筆所需流水加總，且每筆紅利發放、彩金領取或者儲值的時間點之後都符合每筆所需流水，即可託售所有點數，以下為儲值、贈點、紅利相對應託售所需流水：<br/>1.儲值點 x 1、VIP彩金 x 5。<br/>2.註冊禮金 x 20。<br/>3.紅利點及提成點則無需流水。<br/>舉例：<br/>a.儲值1000，VIP彩金28，註冊禮金100。<br/>1000x1+28x5+100x20 = 所需流水3140即可託售3140點。</br>b.如不領註冊禮金跟彩金，儲值1000所需流水1000既可託售。</br>備註：</br>1.每次託售申請後，託售所需流水重新計算。</br>2.託售以託售的時間點來作為主要判斷可以託售所需流水。"
            },
            {
              titleName: "公主娛樂有哪些優勢?",
              content:
                "A. 境外集團自主研發，全新技術與銀行採用128位SSL加密技術和嚴格的安全管理體系，確保客戶的所有交易活動都是在極其嚴密的情況下進行。<br/>B. 萬人棋牌對戰；線上匹配、好友開房、自動結算，沒有局數限制，玩大玩小，玩多玩少，由您決定！<br/>C. 擁有高素質的客戶服務，24小時即時線上諮詢及問答！"
            }
          ]
        }
      ],
      qqServiceUrl: process.env.VUE_APP_QQ_BASE_URL
    };
  },
  // created() {
  //   // this.serviceData[0].dataList = serviceInfo.Data
  // },
  mounted() {
    // axios.get('kefu.json').then(res => {
    //   this.serviceData[0].dataList = res.data.Data
    // })

    apiGetCustomerService().then(res => {
      for (let i = 0; this.serviceData.length > i; i++) {
        if (this.serviceData[i].titleName == "聯絡客服") {
          this.serviceData[i].dataList = res;
        }
      }
    });
  },
  methods: {
    toggle(item) {
      if (item.titleName === "VIP貴賓") {
        this.$APP.openByBrowerInApp("https://lin.ee/3SeRpTxuz");
      } else if (item.titleName === "代理加盟熱線") {
        this.$APP.openByBrowerInApp("https://t.me/pe7777777");
      } else {
        item.choose = !item.choose;
      }
    },
    // 複製文字
    CopyTextToClipboard(id, item) {
      let TextRange = document.createRange();
      TextRange.selectNode(document.getElementById(id));
      let sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(TextRange);
      document.execCommand("copy");
      // alert('複製完成！') 此行可加可不加
      if (item.type === "Line") {
        this.$toast(this.$t("帳號已複製，請打開Line加好友"));
      }
      if (item.type === "WeChat") {
        this.$toast(this.$t("帳號已複製，請打開WeChat加好友"));
      }
    }
  },
  filters: {}
};
</script>

<style lang="scss">
$back-icon-padding: 10;
.customerService {
  height: 100%;

  main {
    width: 100%;
    height: calc(100% - 2.3rem);
    padding: 0.3rem 0.3rem 0px 0.3rem;
    box-sizing: border-box;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;

    .serviceList {
      width: 100%;
      margin-bottom: rem(40);

      .title {
        width: 100%;
        padding: rem(30);
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        border-radius: rem(40);
        font-size: 0.34rem;
        background-color: #1b1b26;
        margin-bottom: rem(10);

        .icon {
          width: rem(80);
          height: rem(80);
        }

        .contentBox {
          width: 85%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .titleContent {
            margin-top: rem(10);
            font-size: 0.28rem;
            color: #6c6c77;
          }
        }
        .serviceBox {
          width: 100%;
        }
      }
      .questionBox {
        flex-flow: column;
        padding: 0 rem(20);
        box-sizing: border-box;
      }
      .box {
        display: flex;
        justify-content: space-between;
        overflow-y: hidden;

        .serviceData {
          width: 23%;
          margin: 5%;

          img {
            width: 100%;
            border-radius: rem(20);
            border: rem(6) solid #36394e;
            box-sizing: border-box;
            margin-bottom: 0.2rem;
          }

          div {
            color: #fff;
            font-size: 0.24rem;
            white-space: nowrap;
            margin-top: 0.1rem;
          }

          a {
            display: block;
            text-align: center;
            color: #daab60;
            border: rem(2) solid #c39853;
            border-radius: rem(10);
            padding: 0.1rem 0.1rem;
            box-sizing: border-box;
            text-align: center;
            margin-top: rem(20);

            div {
              color: #daab60;
              padding: 0.1rem 0;
              margin: 0;
            }
          }

          .connection {
            margin: 0.2rem 0;
            border: 1px solid #6c6c77;
            // border-radius: 5px;
            padding: 0.1rem;
            box-sizing: border-box;
            text-align: center;
            color: #6c6c77;

            div {
              color: #6c6c77;
            }

            div:last-child {
              margin-top: 0;
            }
          }
        }
        .questionData {
          width: 100%;
          margin: 5% 0 5% 0;
          border: rem(2) solid #36394e;
          padding: rem(20);
          box-sizing: border-box;

          .questionDataContent {
            display: flex;
            align-items: baseline;
            justify-content: space-between;

            div {
              white-space: initial;
              line-height: rem(36);
              margin: 0;
            }
            .questionNumber {
              width: rem(36);
              height: rem(36);
              border-radius: rem(36);
              background-color: #fff;
              color: #000;
              text-align: center;
            }
            .questionContent {
              width: 94%;
              div {
                font-size: rem(28);
              }
            }
          }
        }
      }
    }

    .box {
      height: auto;
      width: 100%;
      border-radius: rem(40);
      background-color: #1b1b26;
      font-size: 0.24rem;
      color: #6c6c77;
    }
    .draw-enter-active,
    .draw-leave-active {
      transition: all 1s ease;
    }
    .draw-enter, .draw-leave-to /* .fade-leave-active below version 2.1.8 */ {
      height: 0;
    }
  }

  .left-arrow {
    display: inline-block;
    position: relative;
    width: rem(28);
    height: rem(28);
    transition: transform 0.3s;
  }

  .left-arrow::after {
    display: inline-block;
    content: " ";
    height: rem(28);
    width: rem(28);
    border-width: rem(4) rem(4) 0 0;
    border-color: #23affa;
    border-style: solid;
    border-radius: rem(6);
    transform: matrix(-0.71, 0.71, 0.71, 0.71, 0, 0);
  }
  .active {
    transform-origin: center;
    transform: rotate(-90deg);
    transition: transform 0.3s;
  }
}

.messages {
  padding: 0 rem(40-$back-icon-padding);
  height: calc(100% - #{rem(101)});
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.message {
  border-radius: rem(15);
  padding: rem(38) rem(22);
  padding-bottom: rem(44);
  margin-top: rem(20);
  box-sizing: border-box;
  background-color: $bg-dark;

  &:active {
    filter: brightness(1.4);
  }
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: rem(24);
    .title {
      display: flex;
      align-items: center;

      .read {
        width: rem(12);
        height: rem(12);
        margin-right: rem(11);
        background-color: #ffa200;
        border-radius: rem(30);
      }
      .name {
        font-size: rem(29);
        color: $white;
      }
    }
    .icon {
      width: rem(15);
      height: rem(26);
      background-image: url("~@/assets/images/icons/back.png");
      background-position: center;
      background-size: cover;
      transform: rotate(180deg);
    }
  }
  .time {
    font-size: rem(24);
    color: $gray;
  }
}
</style>
