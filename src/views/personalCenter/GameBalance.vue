<template>
  <div class="outer">
    <header-cmp :title="$t('CenterWallet')"></header-cmp>
    <ul class="lists">
      <li class="list" v-for="gl in gameList" :key="gl.gameName">
        <span class="name">{{ gl.gameName }}</span>
        <span class="points" v-if="gl.amount!==undefined">{{ gl.amount |$currency }}</span>
        <span class="points loading" v-else>
          <img src="~@/assets/images/icons/loading.gif" />
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import { apiGetBalanceAsync, apiGetMidBalanceAsync } from "@/api";
import { Promise } from "q";
export default {
  data() {
    return {
      gameList: [],
      isLoaded: false
    };
  },
  async mounted() {
    await this.getGameList();
    this.getAllGameBalance();
  },
  methods: {
    getGameList() {
      return new Promise(r => {
        apiGetMidBalanceAsync()
          .then(res => {
            if (res.result === 1) {
              this.gameList = res.data;
            }
            r();
          })
          .catch(() => {
            r();
          });
      });
    },
    async getAllGameBalance() {
      let list = this.gameList.map(async item => {
        let res = await apiGetBalanceAsync({ gameId: item.gameId });
        return {
          gameId: item.gameId,
          gameName: item.gameName,
          amount: res.data
        };
      });
      for (let i = 0; i < list.length; i++) {
        list[i].then(res => {
          this.$set(this.gameList, i, res);
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.outer {
  height: 100%;
}
.lists {
  box-sizing: border-box;
  padding: rem(20) 2%;
  height: calc(100% - #{rem(101)});
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  .list {
    width: 100%;
    background-color: #1b1b28;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 1.3rem;
    padding: 0 5%;
    box-sizing: border-box;
    border-radius: rem(15);
    margin-bottom: 0.2rem;
    &:nth-child(1) {
      background: #0492ff;
      .points {
        color: #ffde00;
      }
    }
    .name {
      font-size: 0.32rem;
      color: #fff;
    }
    .points {
      font-size: 0.24rem;
      color: #23affb;
    }
  }
}
</style>
