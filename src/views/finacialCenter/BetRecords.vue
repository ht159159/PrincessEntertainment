<template>
  <div class="betRecord">
    <header-cmp :title="$t('Bet_Record')">
      <template #btn>
        <div class="records" @click.prevent="isFilter = true">
          {{ $t("Filter") }}
        </div>
      </template>
    </header-cmp>
    <div
      class="container recordBox"
      v-if="betLogArry.length > 0"
      ref="scroll"
      @scroll="$scrollLoad(loadMore, $event)"
    >
      <div class="cards" v-for="data in betLogArry" :key="data.id">
        <div class="card">
          <div class="card-row">
            <div class="bet-code col">
              <p class="card-font">{{ $t("OrderNo") }}:</p>
              <p class="card-font">{{ data.betId }}</p>
            </div>
            <div class="card-font col">
              <p class="card-font">{{ data.betTime }}</p>
            </div>
          </div>
          <div class="card-row">
            <div class="bet-platform col">
              <p class="card-font">{{ $t("BetPlatform") }}</p>
              <p class="card-font card-font-light">{{ data.gameId }} <span v-if="data.friendsRoom">( 好友廳 )</span></p>
            </div>
            <div class="bet-money col">
              <p class="card-font">{{ $t("Bet") }}</p>
              <p class="card-font card-font-light">
                {{ data.betAmount | $currency }}
              </p>
            </div>
          </div>
          <div class="card-row">
            <div class="col">
              <p class="card-font-large green">{{ $t("Closed") }}</p>
            </div>
            <div class="bet-result col">
              <!-- <p class="card-font-large blue">{{ $t("NotWin") }}</p> -->
              <p class="card-font-large blue">
                {{ data.result
                }}<span class="betIdF" v-if="data.betIdF">(提成)</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="noData" v-else>{{ $t("NoData") }}</div>
    <transition name="pop">
      <keep-alive>
        <record-filter
          v-if="isFilter"
          :gameList="true"
          @confirm="confirm"
        ></record-filter>
      </keep-alive>
    </transition>
  </div>
</template>
<script>
import RecordFilter from "@/components/RecordFilter.vue";
import loadMore from "@/mixin/loadMore";
import { apiGetBetLogs } from "@/api";
export default {
  mixins: [loadMore],
  components: {
    RecordFilter
  },
  data() {
    return {
      isFilter: false,
      betLogArry: [],
      pageIndex: 1,
      pageSize: 10,
      totalCount: 0
    };
  },
  mounted() {
    // 預設時間
    this.$defaultSearch();
    this.getRecord();
  },
  methods: {
    getRecord() {
      let params = {
        startDate: this.startDate,
        endDate: this.endDate,
        gameIds: this.gameIds,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      };
      apiGetBetLogs(params).then(res => {
        if (res.result == 1) {
          for (let i = 0; res.data.betLogModels.length > i; i++) {
            res.data.betLogModels[i].betId;
            if (res.data.betLogModels[i].betId.indexOf("F") == 0) {
              res.data.betLogModels[i].betIdF = "1";
            }
          }
          this.betLogArry = res.data.betLogModels;
          this.totalCount = res.data.totalCount;

          //判斷是不是好友廳
          for(let i = 0; this.betLogArry.length > i; i++){
            if (this.betLogArry[i].childGameId.slice(0, 1) == "9") {
              this.betLogArry[i].friendsRoom = true
            }else{
              this.betLogArry[i].friendsRoom = false
            }
          }
        }
      });
    },
    confirm() {
      this.isFilter = !this.isFilter;
      this.getRecord();
    },
    loadMore() {
      this.pageIndex++;
      if (this.betLogArry.length == this.totalCount) return;
      let params = {
        startDate: this.startDate,
        endDate: this.endDate,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      };
      apiGetBetLogs(params).then(res => {
        for (let i = 0; res.data.betLogModels.length > i; i++) {
          res.data.betLogModels[i].betId;
          if (res.data.betLogModels[i].betId.indexOf("F") == 0) {
            res.data.betLogModels[i].betIdF = "1";
          }
        }
        this.betLogArry = this.betLogArry.concat(res.data.betLogModels);
      });
    }
  },
  computed: {
    startDate() {
      return this.$store.state.filterDate.startDate;
    },
    endDate() {
      return this.$store.state.filterDate.endDate;
    },
    gameIds() {
      return this.$store.state.filterDate.gameIds;
    }
  }
};
</script>

<style lang="scss" scoped>
.betRecord {
  height: 100%;
  overflow: hidden;
  .recordBox {
    height: calc(100% - #{rem(130)});
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
}

.cards {
  margin: 0 rem(32);
}
.green {
  color: #01bc06;
}
.blue {
  color: #008ae3;
}

.card {
  margin-top: rem(35);
  padding: 0 rem(31);
  padding-top: rem(27);
  background-color: $bg-dark;
  border-radius: rem(15);
  text-align: center;
  &-font {
    font-size: rem(25);
    color: $dark-gray;
    &:nth-child(1) {
      padding-bottom: rem(20);
    }
    &-light {
      color: $white;
      font-size: rem(27);
    }
    &-large {
      font-size: rem(32);
      font-weight: bold;
    }
  }
  &-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    .col {
      width: 50%;
      padding-bottom: rem(34);
    }
  }
}

.noData {
  font-size: rem(40);
  width: 100%;
  margin: rem(30) auto;
  text-align: center;
}

.betIdF {
  color: red;
}
</style>
