<template>
  <div class="recordPage">
    <header-cmp title="兑换纪录">
      <!-- <template #btn>
        <div class="records" @click.prevent="isFilter = true">{{ $t("Filter") }}</div>
      </template> -->
    </header-cmp>
    <div class="container recordBox" v-if="redeemData.length > 0">
      <div class="box container" v-for="data in redeemData" :key="data.id">
        <div class="flex">
          <!-- <span>{{ data.payChannel }}</span> -->
          <span class="time">{{ data.time }}</span>
        </div>
        <!-- <p>{{ `${$t("OrderNo")}: ${data.orderId}` }}</p> -->
        <div class="flex">
          <div class="amount">
            <!-- <img src="~@/assets/images/records/deposit.png" /> -->
            <span>兑换金额:</span>
            <span>{{ data.money  }}</span>
          </div>
        </div>
        <span
          class="status"
          :class="{ result: data.statusName == '成功' }"
        >{{ data.statusName }}</span>
      </div>
    </div>
    <div class="noData" v-else>{{ $t("NoData") }}</div>
    <!-- <keep-alive>
      <transition name="pop">
        <record-filter v-if="isFilter" @confirm="confirm"></record-filter>
      </transition>
    </keep-alive>-->
  </div>
</template>
<script>
import RecordFilter from "@/components/RecordFilter.vue";
import loadMore from "@/mixin/loadMore";
import { apiGetExchangeLog } from "@/api";
export default {
  // mixins: [loadMore],
  // components: {
  //   RecordFilter
  // },
  data() {
    return {
      // isFilter: false,
      redeemData: []
      // pageIndex: 1,
      // pageSize: 10,
      // totalCount: 0
    };
  },
  mounted() {
    this.getRecord();
  },
  methods: {
    getRecord() {
      // let params = {
      //   startDate: this.startDate,
      //   endDate: this.endDate,
      //   gameIds: this.gameIds,
      //   pageIndex: this.pageIndex,
      //   pageSize: this.pageSize
      // };
      apiGetExchangeLog().then(res => {
        if (res.result == 1) {
          this.redeemData = res.data;
        }
      });
    }
    // confirm() {
    //   this.isFilter = !this.isFilter;
    //   this.getRecord();
    // },
    // loadMore() {
    //   this.pageIndex++;
    //   if (this.redeemData.length == this.totalCount) return;
    //   let params = {
    //     startDate: this.startDate,
    //     endDate: this.endDate,
    //     pageIndex: this.pageIndex,
    //     pageSize: this.pageSize
    //   };
    //   apiGetExchangeLog(params).then(res => {
    //     this.redeemData = this.redeemData.concat(res.data.betLogModels);
    //   });
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
  }
};
</script>

<style lang="scss" scoped>
.recordPage {
  height: 100%;
  overflow: hidden;
  .recordBox{
     height: calc(100% - #{rem(130)});
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    .box {
    display: flex;
    align-items: center;
    flex-direction: column;
    .flex{
      margin:rem(20) 0;
    }
    .status {
      margin-top: rem(20);
      font-size: rem(30);
      color: #ebb866;
      position: relative;
      &.result {
        color: #01bc06;
      }
      &.result:after {
        background: #01bc06;
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
  }
  
}
.noData {
  font-size: rem(40);
  width: 100%;
  margin: rem(30) auto;
  text-align: center;
}
</style>
