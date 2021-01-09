<template>
  <div class="flowReport">
    <header-cmp :title="$t('FlowReport')" />
    <main class="flowReport-content">
      <div class="flowReport-content-box">
        <div class="validBetting">
          <div>{{ $t("ValidBetting") }} :</div>
          <div class="value">
            <span
              v-if="
                !needAmunotData.validAmount && needAmunotData.validAmount != 0
              "
              >查询中...</span
            >{{ needAmunotData.validAmount }}
          </div>
        </div>
        <div class="flowWater">
          <div>{{ $t("FlowWater") }} :</div>
          <div class="value">
            <span
              v-if="
                !needAmunotData.needAmount && needAmunotData.needAmount != 0
              "
              >查询中...</span
            >{{ needAmunotData.needAmount }}
          </div>
        </div>
        <div class="notYetReached">
          <div>{{ $t("NotYetReached") }} :</div>
          <div
            class="value"
            :class="{ notYet: needAmunotData.unNeedAmount > 0 }"
          >
            <span
              v-if="
                !needAmunotData.unNeedAmount && needAmunotData.unNeedAmount != 0
              "
              >查询中...</span
            >
            {{ needAmunotData.unNeedAmount }}
          </div>
        </div>
        <div class="flowReportRemarks">
          溫馨小提醒 : <br />
          流水 = 有效投注，每次託售成功後會清空有效投注和所需流水。
        </div>
        <div class="withdrawalRules">
          託售點數說明 : <br />
          託售時，達到每筆所需流水加總，且每筆紅利發放、彩金領取或者儲值的時間點之後都符合每筆所需流水，即可託售所有點數，以下為儲值、贈點、紅利相對應託售所需流水：<br />
          1.儲值點 x 1、VIP彩金 x 5。<br />
          2.註冊禮金 x 20。<br />
          3.紅利點及提成點則無需流水。<br />
          <br />
          舉例：<br />
          a.儲值1000，VIP彩金28，註冊禮金100。<br />
          1000x1+28x5+100x20 = 所需流水3140即可託售3140點。<br />
          b.如不領註冊禮金跟彩金，儲值1000所需流水1000既可託售。<br />
          <br />
          備註：<br />
          1.每次託售申請後，託售所需流水重新計算。<br />
          2.託售以託售的時間點來作為主要判斷可以託售所需流水。
<br />
        </div>
      </div>
    </main>
  </div>
</template>
<script>
import { apiGetNeedAmunot } from "@/api";
export default {
  data() {
    return {
      needAmunotData: ""
    };
  },
  mounted() {
    apiGetNeedAmunot().then(res => {
      if (res.result === 1) {
        this.needAmunotData = res.data;
        if (this.needAmunotData.unNeedAmount < 0) {
          this.needAmunotData.unNeedAmount = 0;
        }
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.flowReport-content {
  width: 100%;
  height: calc(100vh - #{rem(114)});
  padding: rem(40) rem(40);
  box-sizing: border-box;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  &-box {
    //   background: burlywood;
    background-image: linear-gradient(-43deg, #1d1f3d 0%, #272b69 97%),
      linear-gradient(-43deg, #2c3075 0%, #494ea4 100%);
    border-radius: 10px;
    padding: rem(40) rem(30);
    box-sizing: border-box;
  }
  .validBetting,
  .flowWater,
  .notYetReached {
    display: flex;
    align-items: center;
    font-size: rem(36);
    margin-bottom: rem(20);
  }
  .value {
    margin-left: rem(20);
  }
  .flowReportRemarks {
    font-size: rem(36);
    color: #6368b4;
    line-height: rem(45);
  }
  .notYet {
    color: red;
  }
  .withdrawalRules {
    margin-top: rem(20);
    font-size: rem(36);
    color: #abaeb9;
    line-height: rem(45);
  }
}
</style>
