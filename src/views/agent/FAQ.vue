<template>
  <div class="FAQ">
    <header-cmp title="紅利說明" />
    <div class="FAQ-container">
      <img
        class="bonusSystem"
        src="../../assets/images/records/bonusSystem.png"
        alt=""
      />
      <p class="title">=業績計算=</p>
      <div class="content">
        指的是您的直屬下線在遊戲內有效投注的流水，團隊業績則為直屬與下線團隊成員的全部流水！好友廳流水不列入業績計算。
         <br />註：流水是指玩家遊戲內的投注，例如這把下注贏300，下把輸200，則流水為500。
      </div>
      <p class="title">=本日分紅計算=</p>
      <div class="content">
        總業績 = 所有直屬及下線團隊產生的業績<br />
        總分紅 = 直屬業績 + 級別紅利<br />
        <P>&nbsp;</P>
        直屬業績200萬 + 甲團隊總業績300萬 + 乙團隊總業績200萬 + 丙團隊總業績20萬 = 總業績720萬<br />
        判定為A10總裁級紅利1.5%<br />
        <P>&nbsp;</P>
        直屬業績 200萬 x 1.5% = 30,000<br />
        甲下屬團隊 300萬 x (1.5% - 1.2%) = 9,000<br />
        乙下屬團隊 200萬 x (1.5% - 1.1%) = 8,000<br />
        丙下屬團隊 20萬 x (1.5% - 0.6%) = 1,800<br />
        <P>&nbsp;</P>
        所以本日分紅合計：<br />
        30,000 + 9,000 + 8,000 + 1,800 = 48,800<br />
        <P>&nbsp;</P>
        備註：<br />
        1.直屬業績：以上說明為例甲、乙、丙為直屬下線，甲乙丙所產生的業績200萬，此為直屬業績。<br />
        2. 總業績以日結算，每整點更新顯示，紅利將於隔日00:30後自動發放。
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.FAQ {
  height: 100%;
  width: 100%;

  &-container {
    width: 90%;
    height: 85%;
    margin: rem(50) auto;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;

    .title {
      font-size: rem(33);
      color: #bd9e5d;
      // margin-bottom: rem(10);
    }
    .content {
      color: #fff;
      font-size: rem(26);
      line-height: rem(40);
      // margin-bottom: rem(10);
      padding: rem(20) 0;
    }

    .bonusSystem {
      width: 100%;
    }
  }
}
</style>
