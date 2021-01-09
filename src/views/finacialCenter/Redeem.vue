<template>
  <div class="redeem">
    <header-cmp title="兑换码"></header-cmp>
    <div class="container">
      <input type="TEXT" placeholder="请输入兑换码" v-model="redeemData" />
      <a href="#" class="btn btn-round btn-blue" @click.prevent="redeem">送出</a>
    </div>
  </div>
</template>

<script>
import { apiExchangeSomething } from "@/api";
export default {
  data() {
    return {
      redeemData: ""
    };
  },
  methods: {
    redeem() {
      if (!this.redeemData) {
        this.$toast("请输入兑换码");
        return;
      }
      apiExchangeSomething({exchangeCode:this.redeemData}).then(res => {
        if (res.result == 1) {
          this.$toast(res.message);
          this.redeemData = "";
        }
      });
    }
  }
};
</script>


<style lang="scss" scoped>
.redeem {
  width: 100%;
  .container {
    // text-align: center;
    input {
      margin-top: rem(100);
      border-radius: rem(15);
      border: rem(2) $gray solid;
      background-color: transparent;
      width: 100%;
      padding: rem(30) rem(40);
      font-size: rem(27);
      box-sizing: border-box;
      outline: none;
      color: #fff;
    }
    // }
    // input::placeholder{
    //     font-size: rem(32)
    // }
    .btn {
      margin-top: rem(50);
    }
  }
}
</style>


