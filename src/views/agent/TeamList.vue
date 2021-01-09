<template>
  <div class="manage">
    <header-cmp :title="`${$t('TeamList')}-${teamName}`" />
    <div class="manage-search">
      <img
        class="icon"
        src="@/assets/images/icons/search_subManage.png"
        @click.prevent="getTeamList()"
      />
      <input
        class="bar"
        type="text"
        :placeholder="$t('SubID')"
        v-model="memId"
      />
    </div>
    <div class="manage-team">
      <div class="box">
        <p class="yellow">{{ teamInfo.teamerCount }}</p>
        <p>{{ $t("TeamNumber") }}</p>
      </div>
      <div class="box">
        <p class="yellow">{{ teamInfo.todayRegisterCount }}</p>
        <p>{{ $t("TodayAdd") }}</p>
      </div>
    </div>
    <ul class="manage-info manage-info-nav">
      <li class="list grey">{{$t('Rank')}}</li>
      <!-- <li class="list grey">{{$t('Nickname')}}</li> -->
      <li class="list grey">ID</li>
      <li class="list grey">{{ $t("WeekPerformance") }}</li>
      <li class="list grey">{{ $t("TeamNumber") }}</li>
    </ul>

    <div class="manage-content">
      <ul class="manage-info" v-for="i in teamInfo.child" :key="i.index">
        <li class="list">{{i.no}}</li>
        <!-- <li class="list">{{i.nickName}}</li> -->
        <li class="list" @click="memberDetail(i.memId)">{{i.memId}}</li>
        <li class="list">{{i.teamBet}}</li>
        <li class="list">{{i.teamerCount}}</li>
      </ul>
    </div>
    <Pagination
      v-show="teamInfo.childTotalCount > 0"
      :pageIndex="pageIndex"
      :totalPage="totalPage"
      @change-Page="changePage($event)"
    ></Pagination>
  </div>
</template>
<script>
import { apiGetTeamMembers } from "@/api";
export default {
  data() {
    return {
      teamId: "",
      memId: "",
      teamInfo: [],
      pageIndex: 1,
      pageSize: 10,
      //   團隊名稱
      teamName: ""
    };
  },
  mounted() {
    this.teamName = this.$storage.session.get("teamList").name;
    this.teamId = this.$storage.session.get("teamList").id;
    this.getTeamList();
  },
  methods: {
    // 獲取列表
    getTeamList() {
      let data = {
        teamId: this.teamId,
        memId: this.memId,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      };
      apiGetTeamMembers(data).then(res => {
        if (res.result == 1) {
          this.teamInfo = res.data;
        }
      });
    },
    // 搜尋
    memberDetail() {},
    // 換頁
    changePage(page) {
      this.pageIndex = page;
    }
  },
  computed: {
    totalPage() {
      return Math.ceil(this.teamInfo.childTotalCount / this.pageSize);
    }
  }
};
</script>

<style lang="scss" scoped>
.manage {
  width: 100%;
  height: 100%;
  .yellow {
    color: #e0a019;
  }
  &-search {
    background: #282a39;
    height: rem(63);
    margin-top: rem(20);
    font-size: rem(28);
    display: flex;
    align-items: center;
    .icon {
      height: rem(37);
      margin: 0 rem(25);
    }
    .bar {
      background: #282a39;
    }
  }
  &-team {
    display: flex;
    background: #171723;
    font-size: rem(26);
    width: 100%;
    height: rem(84);
    .box {
      width: 50%;
      height: rem(84);
      display: flex;
      align-items: center;
      flex-direction: column;
      p {
        height: 50%;
        padding: rem(5);
      }
    }
  }
  &-info {
    margin-top: rem(20);
    display: flex;
    font-size: rem(27);
    height: rem(53);
    align-items: center;
    &-nav {
      background: #333748;
    }
    .grey {
      color: #989898;
    }
    .list {
      text-align: center;
      width: 25%;
    }
  }
  &-content {
    height: calc(100% - #{rem(480)});
    width: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
}
</style>
