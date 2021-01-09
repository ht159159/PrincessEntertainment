<template>
  <div class="main">
    <div class="robot">
      <img src="~@/assets/images/background/robot.jpg" alt />
    </div>
    <div class="wrap">
      <div class="item-group">
        <div class="item">
          <a href>Back</a>
        </div>
        <div class="item">
          <a href>Close</a>
        </div>
        <div class="item">
          <a href>Restart</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main {
  background-color: $bg-primary;
  width: 100%;
  height: 100vh;
  background-size: contain;
  position: relative;
}

.robot {
  width: 70%;
  margin: 0 auto;
  padding-top: rem(150);
}
.robot img {
  width: 100%;
}
.wrap {
  width: 70%;
  margin: 0 auto;
}
.item-group {
  width: 100%;
}
.item {
  text-align: center;
  border: 1px solid #535871;
  margin-top: rem(30);
}
.item a {
  font-size: rem(40);
  color: #858db9;
  display: block;
  padding: rem(20);
}
</style>
