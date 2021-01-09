<template>
  <div id="childGame">
    <header-cmp :title="title" />
    <div class="picker">
      <div class="selection">
        <div>{{ type.name }}</div>
        <img
          src="~@/assets/images/icons/down.png"
          alt
          @click.prevent="isDown = !isDown"
        />
      </div>
      <transition name="down">
        <div class="selections" v-if="isDown">
          <span
            v-for="select in selections"
            :key="select.id"
            @click.prevent="sort(select)"
            >{{ select.name }}</span
          >
        </div>
      </transition>
    </div>
    <div class="container">
      <div class="input_box">
        <img class="mag" src="~@/assets/images/icons/search.png" alt />
        <input type="text" v-model="filter" @change="getGame" />
        <img
          class="cross"
          src="~@/assets/images/icons/cross.png"
          @click.prevent="filter = ''"
          alt
        />
      </div>
    </div>
    <mt-loadmore
      :bottom-method="loadBottom"
      :bottomPullText="bottomPullText"
      :bottom-all-loaded="allLoaded"
      ref="loadmore"
      class="bottom"
    >
      <div class="game" v-for="game in gameList" :key="game.id">
        <div class="childGame">
          <img :src="imgUrl + gameId + '/' + game.gameImg" alt />
          <span>{{ game.gameName }}</span>
        </div>
        <div
          class="play"
          @click.prevent="playGame(gameId, game.gameCode, game.gameName)"
        >
          PLAY
          <img src="~@/assets/images/icons/right.png" alt />
        </div>
      </div>
       <div slot="bottom" class="mint-loadmore-bottom">
         {{bottomPullText}}
  </div>
    </mt-loadmore>
  </div>
</template>
<script>
import { apiGetChildGames, apiStartGame } from "@/api";
export default {
  data() {
    return {
      title: this.$route.query.title,
      selections: [
        {
          typestr: "all",
          name: this.$t("AllGame")
        },
        {
          typestr: "popular",
          name: this.$t("HotGame")
        },
        {
          typestr: "isnew",
          name:this.$t("NewGame")
        }
      ],
      isDown: false,
      gameId: this.$route.query.gameId,
      gameList: [],
      type: {
        typestr: "all",
        name: this.$t("AllGame")
      },
      filter: "",
      imgUrl: process.env.VUE_APP_IMG_BASE_URL + "child/",
      pageIndex: 1,
      bottomStatus: "",
      allLoaded: false,
      bottomPullText:""
    };
  },
  mounted() {
    this.getGame();
  },
  methods: {
    // 獲取遊戲
    getGame() {
   
      let data = {
        gameid: this.gameId,
        gamename: this.filter,
        pageIndex: 1,
        pageSize: 10,
        typestr: this.type.typestr
      };
      apiGetChildGames(data).then(res => {
        if (res.result == 1) {
           this.bottomPullText=  res.data==null? "---End---":this.$t('WipeUpLoad')
          this.gameList = res.data==null?[]:res.data.list;
         (res.data!=null)&& res.data.count > 10
            ? (this.allLoaded = false)
            : (this.allLoaded = true);
        }
      });
    },
    loadBottom() {
      this.pageIndex++;
      let data = {
        gameid: this.gameId,
        gamename: this.filter,
        pageIndex: this.pageIndex,
        pageSize: 10,
        typestr: this.type.typestr
      };
      apiGetChildGames(data).then(res => {
        let list = this.gameList;
        this.gameList = res.data==null?list:list.concat(res.data.list);
            this.bottomPullText=  res.data==null? "---End---":this.$t('WipeUpLoad')
        this.allLoaded = (res.data==null)|| (this.gameList.length === res.data.count) ? true : false;
        this.$refs.loadmore.onBottomLoaded();
      });
    },
    // 上方搜尋
    sort(select) {
      this.type = select;
      this.isDown = !this.isDown;
      this.getGame();
    },
    // 玩遊戲
    playGame(gameId, childId, title) {
      let params = {
        gameId,
        childId,
        title
      };
      apiStartGame(params).then(res => {
        if (res.result == 1) {
          //app处理
          this.$APP.autoHandel(res.data,gameId,title)
          //window.location = res.data;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#childGame {
  background: #1b1b28;
  color: #dfdfdf;
  height: 100%;
  overflow: hidden;
  .picker {
    width: 100%;
    font-size: rem(35);
    background-color: #1f212f;
    .selection {
      height: rem(70);
      display: flex;
      justify-content: center;
      align-items: center;
      div {
        margin-right: rem(15);
      }
      img {
        width: rem(20);
      }
    }
    .selections {
      z-index: 99;
      position: absolute;
      width: 100%;
      background-color: #060616;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      height: rem(210);
      span {
        font-size: rem(30);
        height: rem(70);
        background-color: #060616;
        display: flex;
        align-items: center;
      }
    }
  }
  .container {
    z-index: 1;
    background: #1b1b28;
    margin-bottom: 5%;
    padding-top: rem(20);
    .input_box {
      border-bottom: 0;
      margin-bottom: 0;
      img {
        height: rem(33);
        position: absolute;
      }
      .mag {
        left: 3%;
      }
      input {
        background: #8794a7;
        border-radius: 10px;
        padding-left: 10%;
      }
      .cross {
        right: 2%;
      }
      .search {
        width: 20%;
      }
    }
  }
  .bottom {
    background: #1b1b28;
    width: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    height: 75%;
    font-size: rem(30);
    box-sizing: border-box;
    .game {
      height: 15%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #12121a;
      border-top: 2px solid #252538;
      padding: rem(20) 10%;
      .childGame {
        display: flex;
        align-items: center;
        height: 100%;
        img {
          height: rem(90);
          margin-right: 20px;
        }
      }
      .play {
        width: rem(140);
        height: rem(40);
        border: 1px solid #ffffff;
        border-radius: 30px;
        line-height: rem(40);
        text-align: center;
        img {
          height: 50%;
        }
      }
    }
  }
}

.down-enter-active,
.down-leave-active {
  transition: height 0.3s;
  height: 0rem !important;
  overflow: hidden;
}

.down-enter-to {
  height: 2.1rem !important;
}
.down-leave-to {
  height: 0rem !important;
}
</style>
