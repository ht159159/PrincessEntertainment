<template>
  <div class="details">
    <ul class="details-title">
      <li class="detail">{{ $t("Rank") }}</li>
      <!-- <li class="detail">{{$t("Nickname")}}</li> -->
      <li class="detail">ID</li>
      <li class="detail detail-bet amount">{{ $t("BetAmount") }}</li>
      <!-- <li class="detail">{{$t("Commission")}}</li> -->
    </ul>
    <ul
      class="details-title details-title-data"
      v-for="i in queryDetail"
      :key="i.id"
    >
      <li class="detail">{{ i.no }}</li>
      <!-- <li class="detail">{{i.nickName}}</li> -->
      <li class="detail">{{ i.memId }}</li>
      <li class="detail detail-bet">{{ i.bet | $currency }}</li>
      <!-- <li class="detail amount">{{i.pay}}</li> -->
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    queryDetail: Array
  }
};
</script>

<style lang="scss" scoped>
.details {
  width: 100%;
  &-title {
    width: 100%;
    display: flex;
    height: rem(50);
    align-items: center;
    text-align: center;
    background: #232224;
    &-data {
      background: #1d1d1d;
    }
    .detail {
      width: 30%;
      &-bet {
        width: 40%;
      }
    }
  }
}
.amount {
  color: #e0a019;
}
</style>
