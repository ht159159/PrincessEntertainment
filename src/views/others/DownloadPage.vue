<template>
  <div>
    <header-cmp title="下载页面" />
    <div class="main">
      <div class="container">
        <div class="logo">
          <img src="~@/assets/images/others/logo.png" alt />
          <p>CASINO LIVE</p>
        </div>
        <div class="phone">
          <img src="~@/assets/images/others/phone.png" alt />
        </div>
        <div class="item-group">
          <div class="item">
            <img src="~@/assets/images/others/apple.png" alt />
          </div>
          <div class="item">
            <img src="~@/assets/images/others/android.png" alt />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main {
  background: url("~@/assets/images/background/downloadbg.jpg") no-repeat center;
  width: 100%;
  height: 100vh;
  background-size: 100% 100%;
}
.container {
  width: 70%;
  margin: 0 auto;
}
.logo {
  width: 30%;
  margin: 0 auto;
  padding-top: rem(50);
  padding-bottom: rem(20);
}
.logo img {
  width: 100%;
}
.logo p {
  font-size: rem(20);
  text-align: center;
}
.phone {
  width: 70%;
  margin: 0 auto;
  padding-top: rem(30);
}
.phone img {
  width: 100%;
}
.item {
  width: 80%;
  margin: 0 auto;
  margin-bottom: rem(25);
}
.item img {
  width: 100%;
}
</style>
