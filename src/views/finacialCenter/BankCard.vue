<template>
  <div class="bankCard">
    <header-cmp :title="$t('BankCardInfo')"></header-cmp>
    <div class="container" v-if="!cardList">
      <div class="nocard">
        <div class="info">
          <p>{{ $t("BankCardNotAdd") }}</p>
          <div class="line"></div>
          <p>**** **** **** ****</p>
        </div>
      </div>
      <router-link :to="{ name: 'bankcardedit' }">
        <img src="~@/assets/images/finacialcenter/plusBtn.png" />
      </router-link>
    </div>
    <div class="container" v-else>
      <div class="card" v-for="card in cardList" :key="card.id">
        <p class="name">{{ card.accountName }}</p>
        <div class="number">
          <p>{{ card.name }}</p>
          <p>{{ card.accountNo | $maskString }}</p>
        </div>
        <img
          src="~@/assets/images/finacialcenter/disconnect.png"
          alt
          @click.prevent="deleteCard(card.id)"
        />
      </div>
      <router-link :to="{ name: 'bankcardedit' }">
        <a href="javascript:;" class="btn btn-round btn-blue">{{ $t("BankCardAdd") }}</a>
      </router-link>
    </div>
    <modal-alert v-if="isConfirm" imgName="alert" :text="$t('BankCardDelConfirm')">
      <template #btn>
        <div
          class="alert-box-cancel alert-box-btn"
          @click.prevent="isConfirm = false"
        >{{ $t("Leave") }}</div>
        <div
          class="alert-box-cancel alert-box-btn alert-box-btn-bright"
          @click="deleteBankNo()"
        >{{ $t("Confirm") }}</div>
      </template>
    </modal-alert>
  </div>
</template>

<script>
import { apiGetMyBankList, apiDelBankNo } from "@/api";
export default {
  data() {
    return {
      cardList: [],
      accountId: "",
      isConfirm: false
    };
  },
  mounted() {
    apiGetMyBankList().then(res => {
      if (res.result == 1) {
        this.$nextTick(() => {
          this.cardList = res.data;
        });
      }
    });
  },
  methods: {
    // 刪除
    deleteCard(id) {
      this.isConfirm = true;
      this.accountId = id;
    },
    //   刪除銀行卡
    deleteBankNo() {
      let accountId = this.accountId;
      apiDelBankNo({ accountId }).then(res => {
        if (res.result == 1) {
          apiGetMyBankList().then(res => {
            if (res.result == 1) {
              this.$nextTick(() => {
                this.cardList = res.data || [];
              });
            }
          });
        }
        this.isConfirm = false;
      });
    }
  },
  filters: {}
};
</script>
<style lang="scss" scoped>
.bankCard {
  height: 100%;
}
.container {
  margin-top: rem(50);
  text-align: center;
  height: calc(100% - #{rem(170)});
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;

  .nocard {
    width: 100%;
    height: rem(321);
    background: url("~@/assets/images/finacialcenter/bankcard.png");
    background-size: cover;
    .info {
      font-size: rem(32);
      width: 90%;
      margin: 0 auto;
      padding: rem(40) 0;
      height: rem(321);
      .line {
        width: 100%;
        border-top: 1px solid rgba(107, 112, 177, 1);
        margin: rem(40) 0 rem(10) 0;
      }
    }
  }
  img {
    padding-top: rem(50);
    width: rem(109);
  }

  .card {
    box-sizing: border-box;
    width: 100%;
    height: rem(211);
    position: relative;
    background: #1b1b27;
    border-radius: 10px;
    font-size: rem(24);
    padding: rem(40) rem(40);
    text-align: start;
    margin-bottom: rem(50);
    .name {
      font-size: rem(24);
      color: #636572;
      margin-bottom: rem(35);
    }
    .number {
      display: flex;
      // justify-content: space-between;
      flex-flow: column;
      font-size: rem(32);
      color: #c3c3c3;

      p:last-child {
        margin-top: rem(20);
      }
      img {
        height: rem(38);
        width: rem(38);
        padding: 0;
        //   margin-left: rem(50);
      }
    }
    img {
      height: rem(38);
      width: rem(38);
      padding: 0;
      position: absolute;
      // margin-top: rem(20);
      right: rem(40);
      bottom: rem(30);
      //   margin-left: rem(50);
    }
  }
}
</style>
