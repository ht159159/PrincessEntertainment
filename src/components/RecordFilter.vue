<template>
  <div class="filter">
    <header-cmp :title="$t('Select_Time')" :isBack="false">
      <template #btn>
        <div class="records" @click.prevent="filter">{{ $t("Done") }}</div>
      </template>
    </header-cmp>
    <main>
      <div class="time">
        <div class="title">{{ $t("Time") }}</div>
        <div class="options">
          <div
            class="option"
            v-for="d in date"
            :key="d.id"
            :class="{ selected: selectedDate === d.id }"
            @click="chooseDate(d.id)"
          >{{ d.name }}</div>
        </div>
        <div class="date">
          <div class="text">
            <datetime
              v-model="startDate.date"
              input-class="datetime-input"
              class="input_box"
              :max-datetime="maxDatetime"
              :title="$t('Start_Time')"
              format="yyyy-MM-dd"
            ></datetime>
            <div class="line"></div>
            <datetime
              v-model="endDate.date"
              input-class="datetime-input"
              class="input_box"
              :max-datetime="maxDatetime"
              format="yyyy-MM-dd"
              :title="$t('End_Time')"
            ></datetime>
          </div>
          <!-- <div class="icon"></div> -->
        </div>
      </div>

      <!-- <div class="platform" v-if="gameList">
        <div class="title">{{ $t("Search_PlatForm") }}</div>
        <div class="row">
          <div  class="box"  v-for="game in gameListArry"  :key="game.gameId"  :ref="game.gameId"  @click="chooseGames(game.gameId)">{{ game.name }}</div>
        </div>
      </div> -->
    </main>
  </div>
</template>
<script>
// import { apiGetGameType } from "@/api";
export default {
  props: {
    gameList: {
      type: Boolean
    }
  },
  data() {
    return {
      selectedDate: -6,
      // 預設選擇
      date: [
        {
          name: this.$t("Today"),
          id: 0
        },
        {
          name: this.$t("Yesterday"),
          id: -1
        },
        {
          name: this.$t("Seven_Day"),
          id: -6
        },
        {
          name: this.$t("month"),
          id: -31
        }
      ],
      // 綁定值
      startDate: {
        // 快速選擇綁定直
        selectDate: "",
        // 自己選擇&&綁定
        date: "",
        //
        time: ""
      },
      endDate: {
        selectDate: "",
        date: "",
        time: ""
      },
      // 限制選擇時間
      maxDatetime: "",
      // 遊戲列表
      gameListArry: [],
      // 遊戲選擇ID
      gameIds: []
    };
  },
  beforeMount() {
    // 限制選擇日期在今天
    this.maxDatetime = new Date().toISOString();
  },
  // keepalive
  // activated() {
  //   // 如果需要選擇遊戲 帶入遊戲列表

  //   if (this.gameList) {
  //     apiGetGameType().then(res => {
  //       if (res.result == 1) {
  //         this.gameListArry = res.data;
  //         // this.$nextTick(() => {
  //         //   let param = this.gameListArry[0].gameId;
  //         //   this.gameIds.push(param);
  //         //   this.addSelectedClass(param);
  //         // });
  //       }
  //     });
  //   }
  // },
  mounted() {
    // 給日期預設值
    this.startDate.date = this.storeStartDate;
    this.endDate.date = this.storeEndDate;
  },
  methods: {
    filter() {
      // 判定時間
      let startTime = new Date(this.startDate.date).getTime();
      let endTime = new Date(this.endDate.date).getTime();
      // console.log(new Date(this.startDate.date), new Date(this.endDate.date));

      if (startTime > endTime) {
        this.$toast(this.$t("Error_Date"));
        return;
      }

      // gameids格式轉變
      let gameids = "";
      for (let i = 0; i < this.gameIds.length; i++) {
        if (i != this.gameIds.length - 1) {
          gameids += `${this.gameIds[i]}|`;
        } else {
          gameids += `${this.gameIds[i]}`;
        }
      }

      // 更新搜尋時間到vuex
      this.$store.dispatch("updateFilterDate", {
        startDate: this.startDate.date,
        endDate: this.endDate.date,
        gameIds: gameids
      });

      this.$emit("confirm");
    },
    // 選時間
    chooseDate(params) {
      this.selectedDate = params;
      // 選取結束時間
      let time = new Date();
      let dif = -((time.getTimezoneOffset() / 60) * 3600 * 1000);
      // time = new Date(+new Date() + dif);

      let end = time.toISOString();
      let year = time.getFullYear();
      let month = time.getMonth();
      let date = time.getDate();
      time = new Date(year, month, date);

      time = time.getTime();
      let sec = 86400000 * params;
      let start = new Date(+time + sec + dif).toISOString();
      // 取得選取開始時間
      this.startDate.selectDate = start;
      this.startDate.date = start;

      this.endDate.selectDate = end;
      this.endDate.date = end;
    },
    // 選遊戲
    chooseGames(id) {
      // 如果還沒選擇加進去陣列
      if (
        !this.gameIds.some(item => {
          return item == id;
        })
      ) {
        this.gameIds.push(id);
        this.addSelectedClass(id);
      }
      // 如果已經選擇從列移除
      else {
        for (let i = 0; i < this.gameIds.length; i++) {
          if (this.gameIds[i] == id) {
            this.gameIds.splice(i, 1);
          }
        }
        this.addSelectedClass(id);
      }
    },
    // 新增class
    addSelectedClass(id) {
      this.$refs[id][0].classList[1] === "selected"
        ? this.$refs[id][0].classList.remove("selected")
        : this.$refs[id][0].classList.add("selected");
    }
  },
  watch: {
    "endDate.date"(val) {
      if (val != this.endDate.selectDate) {
        this.selectedDate = "";
      }
    },
    "startDate.date"(val) {
      if (val != this.startDate.selectDate) {
        this.selectedDate = "";
      }
    }
  },
  computed: {
    // vuex值
    storeStartDate() {
      return this.$store.state.filterDate.startDate;
    },
    storeEndDate() {
      return this.$store.state.filterDate.endDate;
    }
  }
};
</script>

<style lang="scss" scoped>
.filter {
  position: fixed;
  top: 0;
  font-size: rem(32);
  width: 100%;
  height: 100vh;
  left: 0;
  overflow: hidden;
  z-index: 99;
  main {
    height: 100%;
    padding: 0 rem(32);
    padding-top: rem(40);
    box-sizing: border-box;
    background-color: $bg-primary;
    overflow: hidden;
  }
  .title {
    padding-bottom: rem(25);
  }
  .options {
    display: flex;
    align-items: center;
    border-radius: rem(15);
    margin-bottom: rem(48);
    .option {
      width: 25%;
      text-align: center;
      padding: rem(27) 0;
      background-color: $bg-dark;
      font-size: 0.3rem;
      height: 0.3rem;
      &:nth-child(1) {
        border-top-left-radius: rem(15);
        border-bottom-left-radius: rem(15);
      }
      &:nth-child(4) {
        border-top-right-radius: rem(15);
        border-bottom-right-radius: rem(15);
      }
      &.selected {
        border-radius: rem(15);
        // padding: rem(40) 0;
        height: 0.4rem;
        background-color: #232330;
        box-shadow: 0 0 rem(10) rgba(#000, 0.3);
        z-index: 1;
      }
    }
  }
  .date {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: rem(30) rem(52);
    box-sizing: border-box;
    background-color: $bg-dark;
    border-radius: rem(15);
    margin-bottom: rem(50);
    .text {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-grow: 1;
      .line {
        width: 20%;
        height: rem(2);
        background-color: $dark-gray;
        margin: 0 rem(10);
      }
    }
    .icon {
      margin-left: rem(47);
      width: rem(18);
      height: rem(31);
      background-image: url("~@/assets/images/icons/back.png");
      background-size: cover;
      transform: rotate(180deg);
    }
  }
  .platform {
    height: 50%;
    .row {
      display: flex;
      align-items: center;
      // justify-content: space-between;
      // margin-bottom: rem(60);
      flex-wrap: wrap;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      height: 100%;
      .box {
        box-sizing: border-box;
        width: 32%;
        margin-right: 1%;
        height: rem(125);
        line-height: rem(125);
        text-align: center;
        box-sizing: border-box;
        background-color: $bg-dark;
        border-radius: rem(15);
        margin-bottom: rem(10);
        // font-size: rem(15);
        &.selected {
          border: rem(2) solid #5ecaed;
          color: #0ba3d6;
        }
      }
    }
  }
  .input_box {
    border-bottom: none;
    margin-bottom: 0;
    width: 40%;
  }
}
</style>
