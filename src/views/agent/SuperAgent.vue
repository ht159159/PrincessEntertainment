<template>
  <div class="recordPage">
    <header-cmp :title="$t('SuperAgent')">
      <template #btn>
        <div class="records" @click.prevent="isFilter = true">
          {{ $t("Filter") }}
        </div>
      </template>
    </header-cmp>
    <div class="title-bar">
    房主活動費於每日00:00～1:00結算 ，01:00後自動發放至錢包。
    </div>
        <div class="container recordBox">
    <section id="commission" ref="scroll" @scroll="$scrollLoad(loadMore, $event)">
      <div v-if="commissionData.length > 0">
          <div class="box container" v-for="(item, i) in commissionData" :key=i>
            <div class="flex">
              <div class="title time">
                {{ $t("Time") }}:
                <p>{{ item.MemDay }}</p>
              </div>
            </div>
            <div class="flex">
              <div class="title">
                活动费:
                <p class="payStatus">
                  {{ item.roompay }} 點
                </p>
              </div>
              <div class="title">
                <span class="status" v-if="item.ispay == 1"
                  >已發放</span
                >
                <span class="statusNo" v-if="item.ispay == 0"
                  >未發放</span
                >
              </div>
            </div>
          </div>
        </div>
      <div class="noData" v-else>{{ $t("NoData") }}</div>
    </section>
      </div>
    <transition name="pop">
      <keep-alive>
        <record-filter
          class="filter"
          v-if="isFilter"
          @confirm="confirm"
        />
      </keep-alive>
    </transition>
  </div>
</template>
<script>
import RecordFilter from "@/components/RecordFilter";
import { apiGetMemDayRoomRpt } from "@/api";
import loadMore from "@/mixin/loadMore";
export default {
    mixins: [loadMore],
  components: { RecordFilter },
  data() {
    return {
      isFilter: false,
      commissionData: [],
      pageIndex: 1,
      pageSize: 10,
      totalCount: 0
    };
  },
  mounted() {
    this.$defaultSearch();
    this.getapiGetMemDayRoomRpt();
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => (this.isRouterAlive = true));
      this.pageIndex = 1;
      this.getapiGetMemDayRoomRpt();
    },
    confirm() {
      this.isFilter = false;
      this.reload();
    },
    getapiGetMemDayRoomRpt() {
      let params = {
        startDate: this.startDate,
        endDate: this.endDate,
        pageIndex: 1,
        pageSize: 10
      };
      apiGetMemDayRoomRpt(params).then(res => {
        this.commissionData = res.data.result;
        this.totalCount = res.data.total;
        for (let i = 0; this.commissionData.length > i; i++) {
          let y = this.commissionData[i].idate.toString().substring(0,4);
          let m = this.commissionData[i].idate.toString().substring(4,6);
          let d = this.commissionData[i].idate.toString().substring(6,8);
          this.commissionData[i].MemDay = y+"-"+m+"-"+d
        }
      });
    },
    //下啦加载
    loadMore() {
      this.pageIndex++;
      if (this.commissionData.length == this.totalCount) return;
      let params = {
        startDate: this.startDate,
        endDate: this.endDate,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      };
      apiGetMemDayRoomRpt(params).then(res => {
        let list = this.commissionData;
        let newData = res.data.result;
        for (let i = 0; newData.length > i; i++) {
          let y = newData[i].idate.toString().substring(0,4);
          let m = newData[i].idate.toString().substring(4,6);
          let d = newData[i].idate.toString().substring(6,8);
          newData[i].MemDay = y+"-"+m+"-"+d
        }
        this.commissionData = list.concat(newData);
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
  },
  destroyed() {
    //離開頁面日期清空
      this.$store.dispatch("updateFilterDate", {
        startDate: "",
        endDate: ""
      });
    }
};
</script>

<style lang="scss" scoped>
.title-bar {
// margin-top: 0.23rem;
    width: 100%;
    display: flex;
    font-size: 0.32rem;
    text-align: center;
    background: #000220;
    padding: 0.2rem 0;
    box-sizing: border-box;
}

$green: #01bc06;
#commission {
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  .box {
    height: auto;
    padding: rem(54);
    .flex {
      justify-content: space-between;
      .title {
        // width: 50%;
        color: #6c6c77;
        text-align: center;
        font-size: rem(30);
        // margin-top: rem(20);
        display: flex;
        align-items: center;

        p {
          margin-left: rem(20);
        }
        .payStatus {
          font-size: rem(30);
          color: #d0d1d4;
          &.result {
            color: $green;
          }
        }
        .status {
          font-size: rem(30);
          color: #ebb866;
          position: relative;
          &.result {
            color: $green;
          }
          &.result:after {
            background: $green;
          }
        }
        .status:after {
          content: "";
          width: rem(20);
          height: rem(20);
          background: #ebb866;
          position: absolute;
          left: rem(-45);
          border-radius: 50%;
          top: 35%;
          transform: translateY(-25%);
        }
        .statusNo {
          font-size: rem(30);
          color: #fff;
          position: relative;
          &.result {
            color: $green;
          }
          &.result:after {
            background: $green;
          }
        }
        .statusNo:after {
          content: "";
          width: rem(20);
          height: rem(20);
          background: #fff;
          position: absolute;
          left: rem(-45);
          border-radius: 50%;
          top: 35%;
          transform: translateY(-25%);
        }
      }

      .time {
        width: 100%;
      }
    }
    .flex:nth-child(1) {
      margin-bottom: rem(40);
    }
    .flex:nth-child(3) {
      margin-top: rem(10);
    }
  }
}
</style>