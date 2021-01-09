<template>
  <div class="query">
    <header-cmp :title="$t('PerformanceQuery')" />
    <div class="query-container">
      <div class="titlePrompt">
        每整點更新顯示，紅利將於隔日00:30後自動發放。
      </div>
      <!-- 今日 -->
      <!-- 傭金 -->
      <div class="table table-today">
        <div class="table-title">
          今日數據
        </div>
        <div class="half">
          <div class="half-top">
            <p>{{ $t("TeamCommission") }}</p>
            <p class="amount">{{ query.todayTeamPay | $currency }}</p>
          </div>
          <div class="half-middle">
            <div class="box">
              <p>{{ $t("MyCommission") }}</p>
              <div class="amount">
                <p>{{ query.todaySonPay | $currency }}</p>
                <p v-if="query.todayBasePay !== 0">
                  + {{ query.todayBasePay | $currency }}
                </p>
              </div>
            </div>
            <div class="box">
              <p>{{ $t("AgentCommission") }}</p>
              <p class="amount">{{ query.todayAgentPay | $currency }}</p>
            </div>
          </div>
          <div class="half-bottom">
            <img src="@/assets/images/icons/messaging.png" alt />
            紅利=業績 X 紅利比例
          </div>
        </div>
        <!-- 業績 -->
        <div class="half">
          <div class="half-top">
            <p>{{ $t("TeamBet") }}</p>
            <p class="amount">{{ query.todayTeamBet | $currency }}</p>
          </div>
          <div class="half-middle">
            <div class="box">
              <p>{{ $t("MyBet") }}</p>
              <p class="amount">{{ query.todaySonBet | $currency }}</p>
            </div>
            <div class="box">
              <p>{{ $t("AgentTeamBet") }}</p>
              <p class="amount">{{ query.todayAgentBet | $currency }}</p>
            </div>
          </div>
          <div class="half-bottom">
            <img src="@/assets/images/icons/messaging.png" alt />
            業績=遊戲中有效投注金額
          </div>
        </div>
      </div>
      <!-- 昨日 -->
      <!-- 傭金 -->
      <div class="table table-yesterday">
        <div class="table-title">
          昨日數據
        </div>
        <div class="half">
          <div class="half-top">
            <p>{{ $t("TeamCommission") }}</p>
            <p class="amount">{{ query.yesterdayTeamPay | $currency }}</p>
          </div>
          <div class="half-bottom">
            <div class="box">
              <p>{{ $t("MyCommission") }}</p>
              <div class="amount">
                <p>{{ query.yesterdaySonPay | $currency }}</p>
                <p v-if="query.yesterdayBasePay !== 0">
                  + {{ query.yesterdayBasePay | $currency }}
                </p>
              </div>
            </div>
            <div class="box">
              <p>{{ $t("AgentCommission") }}</p>
              <p class="amount">{{ query.yesterdayAgentPay | $currency }}</p>
            </div>
          </div>
        </div>
        <!-- 業績 -->
        <div class="half">
          <div class="half-top">
            <p>{{ $t("TeamBet") }}</p>
            <p class="amount">{{ query.yesterdayTeamBet | $currency }}</p>
          </div>
          <div class="half-bottom">
            <div class="box">
              <p>{{ $t("MyBet") }}</p>
              <p class="amount">{{ query.yesterdaySonBet | $currency }}</p>
            </div>
            <div class="box">
              <p>{{ $t("AgentTeamBet") }}</p>
              <p class="amount">{{ query.yesterdayAgentBet | $currency }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="titlePrompt">
        業績於每日00:00～1:00結算，將暫停顯示昨日數據。
      </div>
      <!-- 團隊人數 -->
      <div class="member">
        <div class="member-box">
          <!-- {{ `${$t("MemberTotal")} : ${query.teamNum}` }} -->
          {{
            `${$t("MemberTotal")} : ${this.$options.filters.$currency(
              query.teamNum
            )}`
          }}
        </div>
        <div class="member-box">
          {{
            `${$t("YesterdayAdd")} : ${this.$options.filters.$currency(
              query.yesterdayRegisterCount
            )}`
          }}
        </div>
        <div class="member-box">
          {{
            `${$t("MonthAdd")} : ${this.$options.filters.$currency(
              query.monthRegisterCount
            )}`
          }}
        </div>
      </div>
      <!-- 業績 -->
      <!-- <div class="performance">
        <div class="performance-box">
          <p>
            {{ $t("TodayMyTeamBet") }}
            <span class="red">{{ query.todaySonBet }}</span>
          </p>
          <p>
            {{ $t("WeekMyBet") }}
            <span class="red">{{ query.thisWeekTeamBet }}</span>
          </p>
        </div>
        <div class="performance-box">
          <p>
            {{ $t("TodayRebate") }}
            <span class="red">{{ query.todaySonPay }}</span>
          </p>
          <p>
            {{ $t("WeekRebate") }}
            <span class="red">{{ query.thisWeekSonPay }}</span>
          </p>
        </div>
      </div> -->
      <!-- 查詢 -->
      <div class="search">
        <ul class="search-Info">
          <!-- 我的今日直营业绩-->
          <li class="list">
            <p>
              {{ $t("TodayMyBet") }}
              <span class="green">{{ query.todaySonBet | $currency }}</span>
            </p>
            <!-- <img
              class="icon"
              src="@/assets/images/icons/arrow-down.png"
              @click.prevent="showMyData(0)"
              alt
            /> -->
            <!-- <div class="left-arrow" :class="{active: isData.my == 0}" @click.prevent="showMyData(0)"></div> -->
          </li>
          <queryTable
            v-if="isData.my == 0"
            class="search-table"
            :queryDetail="queryDetail"
          ></queryTable>
          <Pagination
            v-if="isData.my == 0"
            @change-Page="changePage($event, 0, 0)"
            :pageIndex="pageIndex"
            :totalPage="totalPage"
          ></Pagination>
          <!--直属代理今日业绩  -->
          <li class="list">
            <p>
              {{ $t("TodayAgentBet") }}
              <span class="green">{{ query.todayAgentBet | $currency }}</span>
            </p>
            <!-- <img
              class="icon"
              src="@/assets/images/icons/arrow-down.png"
              @click.prevent="showAgentData(0)"
              alt
            /> -->
            <div
              class="left-arrow"
              :class="{ active: isData.agent == 0 }"
              @click.prevent="showAgentData(0)"
            ></div>
          </li>
          <queryTable
            v-if="isData.agent == 0"
            class="search-table"
            :queryDetail="queryDetail"
          ></queryTable>
          <Pagination
            v-if="isData.agent == 0"
            @change-Page="changePage($event, 0, 1)"
            :pageIndex="pageIndex"
            :totalPage="totalPage"
          ></Pagination>
          <!-- 我的昨日直营业绩-->
          <li class="list">
            <p>
              {{ $t("YesterdayMyBet") }}
              <span class="green">{{ query.yesterdaySonBet | $currency }}</span>
            </p>
            <!-- <img
              class="icon"
              src="@/assets/images/icons/arrow-down.png"
              @click.prevent="showMyData(1)"
              alt
            /> -->
            <!-- <div class="left-arrow" :class="{active: isData.my == 1}" @click.prevent="showMyData(1)"></div> -->
          </li>
          <queryTable
            v-if="isData.my == 1"
            class="search-table"
            :queryDetail="queryDetail"
          ></queryTable>
          <Pagination
            v-if="isData.my == 1"
            @change-Page="changePage($event, 1, 0)"
            :pageIndex="pageIndex"
            :totalPage="totalPage"
          ></Pagination>
          <!--直属代理昨日业绩  -->
          <li class="list">
            <p>
              {{ $t("YesterdayAgentTeamBet") }}
              <span class="green">{{
                query.yesterdaySonTeamBet | $currency
              }}</span>
            </p>
            <!-- <img
              class="icon"
              src="@/assets/images/icons/arrow-down.png"
              @click.prevent="showAgentData(1)"
              alt
            /> -->
            <div
              class="left-arrow"
              :class="{ active: isData.agent == 1 }"
              @click.prevent="showAgentData(1)"
            ></div>
          </li>
          <queryTable
            v-if="isData.agent == 1"
            class="search-table"
            :queryDetail="queryDetail"
          ></queryTable>
          <Pagination
            v-if="isData.agent == 1"
            @change-Page="changePage($event, 1, 1)"
            :pageIndex="pageIndex"
            :totalPage="totalPage"
          ></Pagination>
          <!-- 我本周的直营业绩 -->
          <li class="list">
            <p>
              {{ $t("WeekMyBet") }}
              <span class="green">{{ query.thisWeekSonBet | $currency }}</span>
            </p>
            <!-- <img
              class="icon"
              src="@/assets/images/icons/arrow-down.png"
              @click.prevent="showMyData(2)"
              alt
            /> -->
            <!-- <div class="left-arrow" :class="{active: isData.my == 2}" @click.prevent="showMyData(2)"></div> -->
          </li>
          <queryTable
            v-if="isData.my == 2"
            class="search-table"
            :queryDetail="queryDetail"
          ></queryTable>
          <Pagination
            v-if="isData.my == 2"
            @change-Page="changePage($event, 2, 0)"
            :pageIndex="pageIndex"
            :totalPage="totalPage"
          ></Pagination>
          <!-- 直属代理本周业绩 -->
          <li class="list">
            <p>
              {{ $t("WeekAgentTeamBet") }}
              <span class="green">{{
                query.thisWeekSonTeamBet | $currency
              }}</span>
            </p>
            <!-- <img
              class="icon"
              src="@/assets/images/icons/arrow-down.png"
              @click.prevent="showAgentData(2)"
              alt
            /> -->
            <div
              class="left-arrow"
              :class="{ active: isData.agent == 2 }"
              @click.prevent="showAgentData(2)"
            ></div>
          </li>
          <queryTable
            v-if="isData.agent == 2"
            class="search-table"
            :queryDetail="queryDetail"
          ></queryTable>
          <Pagination
            v-if="isData.agent == 2"
            @change-Page="changePage($event, 2, 1)"
            :pageIndex="pageIndex"
            :totalPage="totalPage"
          ></Pagination>
          <!-- 我的上周直营业绩 -->
          <li class="list">
            <p>
              {{ $t("LastWeekMyBet") }}
              <span class="green">{{ query.lastWeekSonBet | $currency }}</span>
            </p>
            <!-- <img
              class="icon"
              src="@/assets/images/icons/arrow-down.png"
              @click.prevent="showMyData(3)"
              alt
            /> -->
            <!-- <div class="left-arrow" :class="{active: isData.my == 3}" @click.prevent="showMyData(3)"></div> -->
          </li>
          <queryTable
            v-if="isData.my == 3"
            class="search-table"
            :queryDetail="queryDetail"
          ></queryTable>
          <Pagination
            v-if="isData.my == 3"
            @change-Page="changePage($event, 3, 0)"
            :pageIndex="pageIndex"
            :totalPage="totalPage"
          ></Pagination>
          <!-- 直属代理上周业绩 -->
          <li class="list">
            <p>
              {{ $t("LastWeekAgentTeamBet") }}
              <span class="green">{{
                query.lastWeekSonTeamBet | $currency
              }}</span>
            </p>
            <!-- <img
              class="icon"
              src="@/assets/images/icons/arrow-down.png"
              @click.prevent="showAgentData(3)"
              alt
            /> -->
            <div
              class="left-arrow"
              :class="{ active: isData.agent == 3 }"
              @click.prevent="showAgentData(3)"
            ></div>
          </li>
          <queryTable
            v-if="isData.agent == 3"
            class="search-table"
            :queryDetail="queryDetail"
          ></queryTable>
          <Pagination
            v-if="isData.agent == 3"
            @change-Page="changePage($event, 3, 1)"
            :pageIndex="pageIndex"
            :totalPage="totalPage"
          ></Pagination>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { apiGetFeatSum, apiGetSonBetList, apiGetSonTeamBetList } from "@/api";
import queryTable from "@/components/QueryTable.vue";
export default {
  components: { queryTable },
  data() {
    return {
      query: [],
      queryDetail: [],
      pageIndex: 1,
      pageSize: 10,
      isData: {
        my: 5,
        agent: 5
      },
      totalCount: ""
    };
  },
  mounted() {
    apiGetFeatSum().then(res => {
      if (res.result == 1) {
        this.query = res.data;
      }
    });
  },
  computed: {
    totalPage() {
      return Math.ceil(this.totalCount / this.pageSize);
    }
  },
  methods: {
    // 我的直营业绩,数据获取
    getMydata(timeType) {
      let params = {
        timeType,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      };
      apiGetSonBetList(params).then(res => {
        if (res.result == 1) {
          if (res.data.childsTotalCount == 0) {
            this.$toast(this.$t("NoData"));
            return;
          }
          this.queryDetail = res.data.childs;
          this.totalCount = res.data.childsTotalCount;
          this.switch("my", "agent", timeType);
        }
      });
    },
    // 直属代理的业绩,数据获取
    getAgentData(timeType) {
      if (this.isData.agent == timeType) {
        this.isData.agent = 5;
        return;
      }
      this.pageIndex = 1;
      let params = {
        timeType,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      };
      apiGetSonTeamBetList(params).then(res => {
        if (res.result == 1) {
          if (res.data.childsTotalCount == 0) {
            this.$toast(this.$t("NoData"));
            return;
          }
          this.queryDetail = res.data.childs;
          this.switch("agent", "my", timeType);
        }
      });
    },
    // 下拉我的
    showMyData(timeType) {
      if (this.isData.my == timeType) {
        this.isData.my = 5;
        return;
      }
      this.pageIndex = 1;
      this.getMydata(timeType);
    },
    // 下拉直營
    showAgentData(timeType) {
      if (this.isData.agent == timeType) {
        this.isData.agent = 5;
        return;
      }
      this.pageIndex = 1;
      this.getAgentData(timeType);
    },
    // 切換頁數
    /**
     * @param {string} index 新的page
     * @param {string} type 0 我的 1 直營
     */
    changePage(index, timeType, type) {
      this.pageIndex = index;
      if (type) {
        this.getMydata(timeType);
        return;
      }
      this.getAgentData(timeType);
    },
    // data畫面切換判定
    switch(type, other, timeType) {
      this.isData[type] = timeType;
      this.isData[other] = 5;
    }
  }
};
</script>

<style lang="scss" scoped>
$numberColor: #e0a019;
$boxBg: #171723;
$lineheight: rem(30);
.query {
  height: 100%;
  font-size: rem(22);
  // overflow-y: auto;
  // -webkit-overflow-scrolling: touch;

  .query-container {
    width: 100%;
    height: 84%;
    margin: 0.5rem auto;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;

    .titlePrompt {
      color: #8c784f;
      text-align: center;
    }
  }

  .table {
    box-sizing: border-box;
    width: 100%;
    border: rem(2) solid #3b4378;
    margin-top: rem(50);
    box-shadow: rem(4) rem(4) rem(10) rem(2) #151720;
    display: flex;
    flex-flow: wrap;

    &-today {
      // height: rem(257);
      .half {
        width: 50%;
        text-align: center;
        border-right: rem(2) solid #3b4378;
        box-sizing: border-box;
        &-top {
          // height: 35%;
          line-height: rem(40);
          padding: rem(10) 0;
        }
        &-middle {
          background: $boxBg;
          // height: 35%;
          border-top: rem(2) solid #3b4378;
          border-bottom: rem(2) solid #3b4378;
          display: flex;
          line-height: $lineheight;
          // padding: rem(10) 0;

          .box {
            width: 50%;
            padding: rem(10) 0;
            &:nth-child(1) {
              border-right: rem(2) solid #3b4378;
            }
          }
        }
        &-bottom {
          img {
            width: rem(23);
          }
          line-height: rem(35);
          color: #8c784f;
          font-size: rem(22);
          padding: rem(20);
        }
      }
    }
    &-yesterday {
      // height: rem(184);
      margin-bottom: rem(50);
      .half {
        width: 50%;
        text-align: center;
        border-right: rem(2) solid #3b4378;
        box-sizing: border-box;
        &-top {
          // height: 50%;
          line-height: rem(40);
          border-bottom: rem(2) solid #3b4378;
          padding: rem(10) 0;
        }
        &-bottom {
          box-sizing: border-box;
          display: flex;
          background: $boxBg;
          // height: 50%;
          width: 100%;
          // border-bottom: 1px solid #3b4378;
          // padding: rem(10) 0;
          .box {
            width: 50%;
            line-height: $lineheight;
            padding: rem(10) 0;
            &:nth-child(1) {
              border-right: rem(2) solid #3b4378;
            }
          }
        }
      }
    }

    &-title {
      width: 100%;
      border-bottom: rem(2) solid #3b4378;
      text-align: center;
      padding: rem(20) 0;
      box-sizing: border-box;
      font-size: rem(36);
    }
  }
  .member {
    width: 100%;
    height: rem(76);
    background: #333748;
    margin-top: rem(50);
    display: flex;
    text-align: center;
    align-items: center;
    box-sizing: border-box;
    &-box {
      width: 33%;
      &:nth-child(1) {
        border-right: rem(2) solid #20212f;
      }
      &:nth-child(2) {
        border-right: rem(2) solid #20212f;
      }
    }
  }
  .performance {
    width: 100%;
    height: rem(191);
    background: $boxBg;
    margin-top: rem(20);
    line-height: rem(45);
    padding: 0 rem(20);
    display: flex;
    box-sizing: border-box;
    &-box {
      width: 55%;
    }
    &-box:nth-child(2) {
      width: 45%;
      text-align: end;
    }
  }
  .search {
    width: 100%;
    margin-top: rem(20);
    padding-bottom: rem(30);
    height: 100%;
    &-Info {
      height: 100%;
      .list {
        background: #1b1b28;
        height: rem(121);
        // border-bottom: 2px solid #252538;
        display: flex;
        justify-content: space-between;
        padding: 0 rem(50);
        align-items: center;
        margin-bottom: rem(4);
        .icon {
          //   width: rem(24);
          height: rem(24);
        }
      }
    }
    &-table {
      width: 100%;
      height: rem(600);
    }
  }
  .amount {
    color: $numberColor;
    margin-top: rem(10);
    height: rem(60);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column;
    p {
      color: $numberColor;
    }
  }
  .red {
    color: #ea0203;
  }
  .green {
    color: #00ff1e;
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
    border-color: #5d5d65;
    border-style: solid;
    border-radius: rem(3);
    transform: matrix(-0.71, 0.71, 0.71, 0.71, 0, 0);
  }
  .active {
    transform-origin: center;
    transform: rotate(-90deg);
    transition: transform 0.3s;
  }
}
</style>
