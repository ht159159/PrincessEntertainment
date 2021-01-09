<template>
  <div class="transferMoney">
    <header-cmp :title="$t('Transfer')"></header-cmp>
    <div class="container box">
      <div class="mainwallet">
        <div class="row">
          <div class="title">
            <h1 @click.prevent="openGameListHandler('from')">{{ from.gameName }}</h1>
          </div>
          <div class="money">
            <p>{{ $t("Balance") }}：</p>
            <h3 v-if="from.amount!==''">{{ from.amount }}</h3>
            <span class="points loading" v-else>
              <img src="~@/assets/images/icons/loading.gif" />
            </span>
          </div>
          <div class="money">
            <p>{{ $t("Avaible_Balance") }}:</p>
            <h2 v-if="from.message==='1'">{{ $t('Error_BetAmount_NotEnough') }}</h2>
            <h2 v-else>{{ from.amount }}</h2>
          </div>
          <div class="transicon">
            <img
              src="~@/assets/images/icons/transfer_A.png"
              @click.prevent="openGameListHandler('from')"
            />
          </div>
        </div>
      </div>
      <div class="transfer">
        <div class="trans1">
          <img src="~@/assets/images/icons/trans1.png" alt />
        </div>
        <div class="trans2">
          <img src="~@/assets/images/icons/trans2.png" @click.prevent="reverseWalletHandler" />
        </div>
      </div>
      <div class="mainwallet">
        <div class="row1">
          <div class="title">
            <h1 @click.prevent="openGameListHandler('to')">{{ to.gameName }}</h1>
          </div>
          <div class="money" v-if="to.amount!==''">
            <p>{{ $t("Balance") }}：</p>
            <h3>{{ to.amount }}</h3>
          </div>

          <div class="transicon">
            <img
              src="~@/assets/images/icons/transfer_A.png"
              @click.prevent="openGameListHandler('to')"
            />
          </div>
        </div>
      </div>

      <div class="transall">
        <div class="input_box">
          <input
            type="text"
            :placeholder="$t('Placeholder_TransferAmount')"
            v-model="amount"
          />
        </div>
        <div class="all">
          <a href="#" @click.prevent="transferAllAmountHandler">
            {{
            $t("All")
            }}
          </a>
        </div>
      </div>
      <div class="row2">
        <div class="money1">
          <p>{{ $t("Avaible_Balance") }}：</p>
          <h2>{{ from.amount }}</h2>
        </div>
      </div>
      <a
        href="#"
        class="btn btn-round btn-blue"
        @click.prevent="sendTransferAmountAsync"
      >{{ $t("Confirm") }}</a>
    </div>
    <transition name="pop">
      <div class="selectAccount" v-if="showAccountList">
        <header-cmp :title="$t('ChooseGame')">
          <template #back>
            <a href="#" class="back" @click.prevent="showAccountList = false">
              <img src="~@/assets/images/icons/back.png" />
            </a>
          </template>
        </header-cmp>
        <ul class="lists">
          <li
            class="list"
            v-for="gl in gameList"
            :key="gl.gameName"
            @click.prevent="selectGameHandler(gl)"
          >
            <span class="name">{{ gl.gameName }}</span>
            <span class="points" v-if="gl.amount!==''">{{ gl.amount }}</span>
            <span class="points loading" v-else>
              <img src="~@/assets/images/icons/loading.gif" />
            </span>
          </li>
        </ul>
      </div>
    </transition>
    <modal-alert v-if="showAlert" imgName="alert" @close="closeModal" :text="$t('Choose_Game')">
      <template #btn>
        <div class="alert-box-cancel alert-box-btn" @click="closeModal">{{ $t("Confirm") }}</div>
      </template>
    </modal-alert>
  </div>
</template>
<script>
import {
  apiGetListBalanceAsync,
  apiTransferAmountAsync,
  apiGetBalanceAsync,
  apiGetMidBalanceAsync
} from "@/api";
import { clearTimeout } from "timers";
import { Promise } from "q";
export default {
  data() {
    return {
      showAccountList: false,
      showAlert: false,
      editBonusCode: false,
      gameList: [],
      from: {
        gameId: "",
        gameName: "",
        amount: ""
      },
      to: {
        gameId: "",
        gameName: this.$t("Choose_Game"),
        amount: ""
      },
      amount: "",
      bonusCode: "",
      currentSelect: ""
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
          .catch(res => {
            r();
          });
      });
    },
    getAllGameBalance() {
      let list = this.gameList.map(async item => {
        let res = await apiGetBalanceAsync({ gameId: item.gameId });
        return {
          gameId: item.gameId,
          gameName: item.gameName,
          amount: res.data,
          message: res.message
        };
      });
      for (let i = 0; i < list.length; i++) {
        list[i].then(res => {
          this.$set(this.gameList, i, res);
          if (i === 0 && !this.from.gameId) {
            this.from = this.gameList[i];
          }
        });
      }
    },
    openGameListHandler(select) {
      this.currentSelect = select;
      this.showAccountList = true;
      this.getAllGameBalance();
    },
    async selectGameHandler(game) {
      switch (this.currentSelect) {
        case "to":
          if (this.from.gameId === game.gameId) {
            this.$toast(this.$t("Error_Choose_Another_Game"));
            return;
          }
          break;
        case "from":
          if (this.to.gameId === game.gameId) {
            this.$toast(this.$t("Error_Choose_Another_Game"));
            return;
          }
          break;
      }

      let res = await apiGetBalanceAsync({ gameId: game.gameId });
      this[this.currentSelect] = game;
      this[this.currentSelect].amount = res.data;
      this[this.currentSelect].message = res.message;
      this.showAccountList = false;
    },
    reverseWalletHandler() {
      if (this.to.gameId === "") {
        this.showAlert = true;
        return;
      }
      let w = this.from;
      this.from = this.to;
      this.to = w;
    },
    transferAllAmountHandler() {
      this.amount = this.from.amount;
    },
    closeModal() {
      this.showAlert = false;
      this.currentSelect = "to";
      this.showAccountList = true;
    },
    openEditBonusCodeHandler() {
      if (this.to.gameId === "") {
        this.showAlert = true;
        return;
      }
      if (this.from.message === "1") {
        this.$toast(this.$t("Error_BetAmount_NotEnough"));
        return;
      }
      if (!Number(this.amount)) {
        this.$toast(this.$t("Placeholder_TransferAmount"));
        return;
      }
    },
    sendTransferAmountAsync() {
      if (this.to.gameId === "") {
        this.showAlert = true;
        return;
      }
      if (!this.amount) {
        this.$toast(this.$t("Placeholder_TransferAmount"));
        return;
      }
      if (this.amount < 10) {
        this.$toast(this.$t("Error_Amount_10"));
        return;
      }
      if (this.from.message === "1") {
        this.$toast(this.$t("Error_BetAmount_NotEnough"));
        return;
      }

      if (!Number(this.amount)) {
        this.$toast(this.$t("Placeholder_TransferAmount"));
        return;
      }
      if (Number(this.from.gameId) === Number(this.to.gameId)) {
        this.$toast(this.$t("Placehoder_WalletPassword"));
        return;
      }
      let data = {
        transferAmount: Math.floor(this.amount),
        transferFrom: Number(this.from.gameId),
        transferTo: Number(this.to.gameId)
      };
      apiTransferAmountAsync(data).then(res => {
        if (res.result == 1) {
          this.$toast(res.message);
          apiGetBalanceAsync({ gameId: this.from.gameId }).then(res => {
            this.from.amount = res.data;
          });
          apiGetBalanceAsync({ gameId: this.to.gameId }).then(res => {
            this.to.amount = res.data;
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding-top: rem(85);
}
.mainwallet {
  background-color: #1b1b26;
  border-radius: 20px;
}
.row {
  width: 90%;
  margin: 0 auto;
  padding: rem(30);
  position: relative;
}
.row1 {
  width: 90%;
  margin: 0 auto;
  padding: rem(20);
  position: relative;
  padding-bottom: rem(80);
}
.row2 {
  width: 90%;
  margin: 0 auto;
}

.title h1 {
  color: #0fb5f4;
  font-size: rem(30);
  padding-top: rem(30);
  padding-bottom: rem(25);
}
.money {
  display: flex;
  align-items: baseline;
  padding-top: rem(15);
}
.money1 {
  display: flex;
  align-items: baseline;
  margin-top: rem(10);
}
.money1 p {
  font-size: rem(22);
  color: #6c6c77;
}
.money1 h2 {
  font-size: rem(24);
  color: #ebb866;
}
.money p {
  font-size: rem(22);
  color: #6c6c77;
}
.money h3 {
  font-size: rem(60);
  color: #e2e3e5;
}
.money h2 {
  font-size: rem(24);
  color: #ebb866;
}
.transicon {
  position: absolute;
  right: 5%;
  top: 25%;
  width: 9%;
}
.transicon img {
  width: 100%;
}
.transfer {
  display: flex;
  justify-content: space-between;
  margin-top: rem(20);
}
.trans1 {
  width: 10%;
}
.trans1 img {
  width: 100%;
}
.trans2 {
  width: 16%;
}
.trans2 img {
  width: 100%;
}
.transall {
  margin-top: rem(50);
  border: 2px solid #666666;
  border-radius: 10px;
  height: rem(75);
  display: flex;
}
.input_box {
  margin-left: rem(20);
  border-bottom: none;
  width: 80%;
  padding-top: rem(35);
}
.all {
  width: 20%;
  background-color: #666666;
  border-radius: 7.5px;
  height: rem(75);
  line-height: rem(75);
}
.all a {
  font-size: rem(30);
  text-align: center;
  color: #a3a3ab;
  display: block;
  height: 100%;
  border-radius: 7.5px;
}
.btn {
  margin-top: rem(50);
}
.input_box ::-webkit-input-placeholder {
  color: #b4b4be;
}
.transferMoney {
  height: 100%;
  overflow: hidden;
  .box {
    height: calc(100% - #{rem(130)});
    padding-top: rem(40);
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
}
.selectAccount {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  height: 100%;
  background-color: #1f212e;
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

      .name {
        font-size: 0.32rem;
        color: #fff;
      }
      .points {
        font-size: rem(24);
        color: #23affb;
        &.loading {
          height: rem(40);
          img {
            display: block;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
