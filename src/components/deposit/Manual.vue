<template>
  <div class="manual">
    <div class="manual-instruction">
      <p>以下联系方式均为平台账号，充值系统不稳定时可以使用人工充值。添加任意一个客服的QQ或者微信，可以10秒内帮您完成充值。</p>
    </div>
    <a href class="manual-circle"></a>
    <div class="manual-box">
      <div class="manual-box-card" v-for="(card, index) in manualCard" :key="index">
        <img src="@/assets/images/icons/qq-circle.png" alt />
        <span>{{card.cus_QQ}}</span>
        <div
          class="copy"
          href="javascript:;"
          v-clipboard:copy="card.cus_QQ"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
        >复制</div>

        <img src="@/assets/images/icons/wechat.png" alt />
        <span>{{card.cus_VX}}</span>
        <div
          class="copy"
          href="javascript:;"
          v-clipboard:copy="card.cus_VX"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
        >复制</div>
      </div>
    </div>
  </div>
</template>
<script>
import { apiGetCustomer } from "@/api";
export default {
  data() {
    return {
      manualCard: []
    };
  },
  mounted() {
    apiGetCustomer().then(res => {
      if (res.result === 1) {
        this.manualCard = res.data;
      }
    });
  },

  methods: {
    onCopy() {
      this.$toast("success");
    },
    onError() {
      this.$toast("error");
    }
  }
};
</script>
<style lang="scss">
.manual {
  width: 100%;
  font-size: rem(28);
  margin-top: rem(50);
  box-sizing: border-box;
  &-instruction {
    width: 80%;
    margin: 0 auto;
    letter-spacing: 3px;
    line-height: rem(40);
  }
  &-box {
    width: 100%;
    background: #1a1c28;
    padding: rem(10) 3%;
    display: flex;
    flex-wrap: wrap;
    margin-top: rem(50);
    &-card {
      width: 45%;
      height: rem(133);
      background: #3b4052;
      margin: rem(10) 1%;
      border-radius: 10px;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      font-size: rem(25);
      img {
        width: 10%;
        margin: 0 5%;
      }
      span {
        width: 50%;
        color: #80869c;
      }
      .copy {
        width: 25%;
        margin-left: 2%;
        background: #848b9d;
        text-align: center;
        font-size: rem(23);
        height: rem(35);
        line-height: rem(35);
        border-radius: 10px;
        color: #313648;
      }
    }
  }
}
</style>