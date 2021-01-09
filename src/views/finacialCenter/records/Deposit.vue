<template>
  <section class="deposit" ref="scroll" @scroll="$scrollLoad(loadMore,$event)">
    <div v-if="depositData.length > 0">
      <div class="box container" v-for="data in depositData" :key="data.id">
        <div class="flex">
          <span>{{ data.payChannel }}</span>
          <span class="time">{{ data.time }}</span>
        </div>
        <p>{{ `${$t("OrderNo")}: ${data.orderId}` }}</p>
        <div class="flex">
          <div class="amount">
            <img src="~@/assets/images/records/deposit.png" />
            <span>{{ data.amount | $currency }} 點</span>
          </div>
          <span class="status" :class="{ result: data.result == '成功' }">{{ data.result }}</span>
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
      depositData: [],
      result: "",
      pageIndex: 1,
      pageSize: 10,
      totalCount: 0
    };
  },
  mounted() {
    this.$defaultSearch();
    this.getRecord();
  },
  methods: {
    getRecord() {
      let params = {
        startDate: this.startDate,
        endDate: this.endDate,
        pageIndex: 1,
        pageSize: 10,
        orderType: 1,
      };
      apiGetOrders(params).then(res => {
        this.depositData = res.data.orders;
        this.totalCount = res.data.totalCount;
      });
    },
    loadMore() {
      this.pageIndex++;
      if (this.depositData.length == this.totalCount) return;
      let params = {
        startDate: this.startDate,
        endDate: this.endDate,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        orderType: 1
      };
      apiGetOrders(params).then(res => {
        let list = this.depositData;
        this.depositData = list.concat(res.data.orders);
      });
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
</style>

