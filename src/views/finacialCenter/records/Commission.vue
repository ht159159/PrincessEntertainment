<template>
  <section id="commission" ref="scroll" @scroll="$scrollLoad(loadMore, $event)">
    <div v-if="commissionData.length > 0">
      <div class="box container" v-for="data in commissionData" :key="data.id">
        <div class="flex">
          <div class="title time">
            {{ $t("Time") }}:
            <p>{{ data.createTime }}</p>
          </div>
          <!-- <div class="title">
            {{ $t("Platform") }}:
            <p>{{ data.gameId }}</p>
          </div>-->
        </div>
        <!-- <div class="flex">
          <div class="title">
            {{ $t("TotalBetAmount") }}:
            <p class="result">{{ data.effecBet | $currency }}</p>
          </div>
          <div class="title">
            {{ $t("Result") }}:
            <p class="result">{{ data.winOrLose | $currency }}</p>
          </div>
        </div>-->
        <div class="flex">
          <div class="title">
            {{ $t("Commision") }}:
            <p class="payStatus" :class="{ result: data.payStatus == '成功' }">
              {{ data.amount | $currency }} 點
            </p>
          </div>
          <div class="title">
            <span class="status" :class="{ result: data.result == '成功' }"
              >已發放</span
            >
          </div>
        </div>
      </div>
    </div>
    <div class="noData" v-else>{{ $t("NoData") }}</div>
  </section>
</template>
<script>
import { apiGetCommission } from "@/api";
import loadMore from "@/mixin/loadMore";
export default {
  mixins: [loadMore],
  data() {
    return {
      commissionData: [],
      pageIndex: 1,
      pageSize: 10,
      totalCount: 0
    };
  },
  mounted() {
    // this.getComssissionRecord();
    this.$defaultSearch();
    this.getapiGetCommission();
  },
  methods: {
    // getComssissionRecord() {
    //   let params = {
    //     startDate: this.startDate,
    //     endDate: this.endDate,
    //     gameIds: this.gameIds,
    //     pageIndex: 1,
    //     pageSize: 10
    //   };
    //   apiGetRebates(params).then(res => {
    //     this.commissionData = res.data.rebateModels;
    //     this.totalCount = res.data.totalCount;
    //   });
    // },
    getapiGetCommission() {
      let params = {
        startDate: this.startDate,
        endDate: this.endDate,
        pageIndex: 1,
        pageSize: 10
      };
      apiGetCommission(params).then(res => {
        this.commissionData = res.data.result;
        this.totalCount = res.data.total;
        // console.log(this.commissionData[0])
        // console.log(this.commissionData.length)
        for (let i = 0; this.commissionData.length > i; i++) {
          // console.log("123")
          // console.log(this.timeChange(this.commissionData[i].createTime))
          // this.timeChange(this.commissionData[i].createTime)
          this.commissionData[i].createTime = this.commissionData[i].createTime;
        }
        // this.timeChange(res.data.result[0].createTime)
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
      apiGetCommission(params).then(res => {
        let list = this.commissionData;
        let newData = res.data.result;
        for (let i = 0; newData.length > i; i++) {
          newData[i].createTime = newData[i].createTime;
        }
        this.commissionData = list.concat(newData);
      });
    }

    // 時間格式轉換
    // timeChange(time) {
    //   Date.prototype.format = function (fmt) {
    //       var o = {
    //           "M+": this.getMonth() + 1, //月份
    //           "d+": this.getDate(), //日
    //           "h+": this.getHours(), //小时
    //           "m+": this.getMinutes(), //分
    //           "s+": this.getSeconds(), //秒
    //           "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    //           "S": this.getMilliseconds() //毫秒
    //       };
    //       if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    //       for (var k in o)
    //       if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    //       return fmt;
    //   }
    //   let newTime = new Date(time).format("yyyy-MM-dd hh:mm:ss")
    //   return newTime;
    // }
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
      this.$store.dispatch("updateFilterDate", {
        startDate: "",
        endDate: ""
      });
  }
};
</script>

<style lang="scss" scoped>
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
