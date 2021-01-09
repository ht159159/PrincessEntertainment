<template>
  <div class="subSearch">
    <header-cmp :title="$t('SubSearch')" />
    <div class="subSearch-search">
      <span>{{ `(${$t("SubSearch")})` }}</span>
      <input
        class="bar"
        :placeholder="$t('SubID')"
        v-model="memId"
        type="text"
      />
    </div>
    <div class="btn btn-round btn-blue subSearch-btn" @click="searchMember">
      {{ `${$t("Search")}` }}
    </div>
    <p>{{ `${$t("SearchResult")}:` }}</p>
    <div class="subSearch-result" v-show="isData">
      <p>{{ $t("TeamIsBigger") }}</p>
      <p>{{ `${$t("HisParentId")} : ${memberData.parentId}` }}</p>
      <p>{{ `${$t("HisTeamAmount")} : ${memberData.teamerCount}` }}</p>
      <p>{{ `${$t("HisTodayBet")} : ${memberData.todayBet}` }}</p>
      <p>{{ `${$t("HisWeekBet")} : ${memberData.bet}` }}</p>
      <p>{{ `${$t("HisRegisterTime")} : ${memberData.registerDateTime}` }}</p>
    </div>
  </div>
</template>
<script>
import { apiSearchMember } from "@/api";
export default {
  data() {
    return {
      memId: "",
      memberData: {},
      isData: false
    };
  },
  mounted() {
    // 從代理管理來
    if (this.$route.query.memId) {
      this.memId = this.$route.query.memId;
      this.searchMember();
    }
  },
  methods: {
    searchMember() {
      if (!this.memId) {
        this.$toast(this.$t("EnterId"));
        return;
      }
      let params = {
        memId: this.memId
      };
      apiSearchMember(params).then(res => {
        if (res.result == 1) {
          this.memberData = res.data;
          this.isData = true;
          return;
        }
        this.isData = false;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.subSearch {
  height: 100%;
  width: 100%;
  text-align: center;
  font-size: rem(35);
  &-search {
    margin-top: rem(35);
    height: rem(124);
    font-size: rem(28);
    background: #1c1b29;
    display: flex;
    align-items: center;
    justify-content: center;
    .bar {
      margin-left: rem(10);
      background: #13121c;
      border: 1px solid #3a3d55;
      width: rem(250);
      height: rem(55);
    }
    .bar::placeholder {
      color: #4e5164;
    }
  }
  &-btn {
    width: rem(320);
    margin: rem(30) auto;
  }
  &-result {
    width: 80%;
    margin: rem(20) auto;
    font-size: rem(28);
    text-align: left;
    line-height: rem(50);
  }
}
</style>
