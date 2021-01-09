<template>
  <section id="transfer" ref="scroll"  @scroll="$scrollLoad(loadMore,$event)">
    <div v-if="transferData.length > 0">
      <div class="box container" v-for="data in transferData" :key="data.index">
        <div class="flex top">
          <span>{{ $t("From") }}</span>
          <span class="no">{{ data.from }}</span>
          <span>{{ $t("To") }}</span>
          <span>{{ data.to }}</span>
          <span class="time">{{ data.time }}</span>
        </div>
        <p>{{ `${$t("OrderNo")}:${data.orderId}` }}</p>
        <div class="flex">
          <div class="amount">
            <img src="~@/assets/images/records/transfer.png" />
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
import { apiGetTransfers } from "@/api";
import loadMore from "@/mixin/loadMore";
export default {
  mixins: [loadMore],
  data() {
    return {
      transferData: [],
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
        startDate: this.startDate,
        endDate: this.endDate,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      };
      apiGetTransfers(params).then(res => {
        this.transferData = res.data.transferModels;
        this.totalCount = res.data.totalCount
      });
    },
    loadMore() {
      this.pageIndex++;
      if(this.transferData.length==this.totalCount) return
      let params = {
        startDate: this.startDate,
        endDate: this.endDate,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      };
      apiGetTransfers(params).then(res => {
        let list = this.transferData;
        this.transferData = list.concat(res.data.transferModels);
      });
      // this.$refs.loadmore.onTopLoaded();
    },

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
#transfer {
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  .box {
    &.container {
      padding: rem(20) rem(20);
    }
    .top {
      span {
        color: #6c6c77;
        font-size: rem(25);
        &.time {
          font-size: rem(20);
          margin-left: rem(10);
        }
      }
    }
    .flex {
      .amount {
        img {
          width: rem(50);
        }
      }
    }
  }
}
</style>
