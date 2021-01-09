<template>
  <div class="recordPage">
    <header-cmp :title="$t('Trade_Record')">
      <template #btn>
        <div class="records" @click.prevent="isFilter = true">
          {{ $t("Filter") }}
        </div>
      </template>
    </header-cmp>
    <div class="nav-bar">
      <router-link
        :to="{ name: 'records' }"
        class="nav"
        :class="{ active: records == 'records' }"
        replace
        >{{ $t("Deposit") }}</router-link
      >
      <router-link
        :to="{ name: 'withdrawRecord' }"
        class="nav"
        :class="{ active: records == 'withdrawRecord' }"
        replace
        >{{ $t("Withdraw") }}</router-link
      >
      <!-- <router-link
        :to="{ name: 'transferRecord' }"
        class="nav"
        :class="{ active: records == 'transferRecord' }"
        replace
      >{{ $t("Transfer") }}</router-link> -->
      <router-link
        :to="{ name: 'commissionRecord' }"
        class="nav"
        :class="{ active: records == 'commissionRecord' }"
        replace
        >{{ $t("Commision") }}</router-link
      >
    </div>
    <div class="container recordBox">
      <router-view v-if="isRouterAlive"></router-view>
    </div>

    <transition name="pop">
      <keep-alive>
        <record-filter
          class="filter"
          v-if="isFilter"
          :page="records"
          :gameList="gameList"
          @confirm="confirm"
        />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import RecordFilter from "@/components/RecordFilter";
export default {
  components: { RecordFilter },
  data() {
    return {
      // 換頁acitve
      records: this.$route.name,
      // 顯示搜尋頁
      isFilter: false,
      // 是否在搜尋條件顯示遊戲列表選項
      gameList: false,
      isRouterAlive: true
    };
  },
  mounted() {},
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => (this.isRouterAlive = true));
    },
    confirm() {
      this.isFilter = false;
      this.reload();
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.gameList = to.name === "commissionRecord" ? true : false;
    this.records = to.name;
    next();
  }
};
</script>
