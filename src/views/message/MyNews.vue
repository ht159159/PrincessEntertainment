<template>
  <div>
    <header-cmp :title="$t('MyMessage')"></header-cmp>

    <div class="container">
      <div class="item-group">
        <div class="pic">
          <img :src="randomImg" alt />
        </div>
        <div class="title">
          <div class="row">
            <p>{{ message.time }}</p>
            <h1>{{ message.message }}</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { apiHaveReadMessger } from "@/api";
import girlOne from "../../assets/images/icons/girl-1.png";
import girlTow from "../../assets/images/icons/girl-2.png";
import storage from "@/utils/storage.js";
export default {
  data() {
    return {
      message: {},
      mugShot: [girlOne, girlTow],
      randomImg: ""
    };
  },
  mounted() {
    this.message = storage.session.get("message");
    apiHaveReadMessger({ msgId: this.message.id }).then(res => {});

    //隨機頭像
    this.randomImg = this.mugShot[Math.floor(Math.random() * 2)];
  }
};
</script>

<style lang="scss" scoped>
.container {
  margin-top: rem(98);
  // margin-bottom: rem(88);
}
.title {
  background: url(~@/assets/images/finacialcenter/frame1.png) no-repeat;
  width: 100%;
  position: relative;
  background-size: cover;
  border-radius: 10px;
}
.title_A {
  background: url(~@/assets/images/finacialcenter/frame2.png) no-repeat;
  width: 100%;
  position: relative;
  background-size: cover;
  border-radius: 10px;
  color: #919191;
}
.title_A p {
  text-align: right;
  color: #919191;
}

.row {
  position: absolute;
  left: 5%;
  line-height: rem(40);
  padding: 0 rem(20);
}
.row_A {
  position: absolute;
  right: 5%;
  line-height: rem(40);
}

.item-group {
  display: flex;
  margin-bottom: rem(50);
  height: rem(130);
}
.item-group .pic {
  width: 15%;
}

.item-group .pic img {
  width: 100%;
  border-radius: rem(40);
}
.item-group .title {
  line-height: rem(30);
}

.item-group p {
  font-size: rem(20);
}
.item-group h1 {
  font-size: rem(28);
  color: #dadada;
}
.input_box {
  border-bottom: none;
  padding-left: rem(20);
}
.box {
  border: 2px #5d5d65 solid;
  border-radius: 10px;
  height: rem(150);
  margin-top: rem(350);
  margin-bottom: rem(40);
}
</style>
