<template>
  <section
    class="withdraw"
    ref="scroll"
    @scroll="$scrollLoad(loadMore, $event)"
  >
    <div v-if="withdrawDate.length > 0">
      <div class="box container" v-for="data in withdrawDate" :key="data.id">
        <div class="flex">
          <span class="no">{{ $t("OrderNo") }}:</span>
          <span class="time">{{ data.time }}</span>
        </div>
        <p>{{ data.orderId }}</p>
        <div class="flex">
          <div class="amount">
            <img src="~@/assets/images/records/withdraw.png" />
            <span>{{ data.amount | $currency }} 點</span>
          </div>
          <span class="status" :class="{ result: data.result == '成功' }">{{
            data.result
          }}</span>
        </div>
      </div>
    </div>
    <div class="noData" v-else>{{ $t("NoData") }}</div>
  </section>
</template>
<script>
import { apiGetOrders } from "@/api";

import loadMore from "@/mixin/loadMore";
export default {
  mixins: [loadMore],
  data() {
    return {
      withdrawDate: [],
      pageIndex: 1,
      pageSize: 10,
      totalCount: 0
    };
  },
  mounted() {
    this.getRecord();
  },
  methods: {
    getRecord() {
      let params = {
        orderType: 2,
        startDate: this.startDate,
        endDate: this.endDate,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      };
      apiGetOrders(params).then(res => {
        this.withdrawDate = res.data.orders;
      });
    },
    loadMore() {
      this.pageIndex++;
      if (this.withdrawDate.length == this.totalCount) return;
      let params = {
        orderType: 2,
        startDate: this.startDate,
        endDate: this.endDate,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      };
      apiGetOrders(params).then(res => {
        let list = this.withdrawDate;
        this.withdrawDate = list.concat(res.data.orders);
      });

      // this.$refs.loadmore.onTopLoaded();
    }
  },
  computed: {
    startDate() {
      return this.$store.state.filterDate.startDate;
    },
    endDate() {
      return this.$store.state.filterDate.endDate;
    }
  }
};
</script>

<style lang="scss" scoped>
.deposit {
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
.box {
  .no {
    color: #6c6c77;
    font-size: rem(20);
  }
}
</style>
