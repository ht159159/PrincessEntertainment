<template>
  <div class="promotion">
    <div class="promo" v-show="!show">
      <header-cmp
        :title="$t('Promotion_Activity')"
        :isBack="false"
      ></header-cmp>
      <div class="nav">
        <ul>
          <li
            v-for="(p, i) in promotion"
            :key="p"
            :class="{ active: i === selected }"
          >
            <a href="#" @click.prevent="getActivity(i)">{{ p }}</a>
          </li>
        </ul>
      </div>
      <div class="main" v-if="activitys.length">
        <div class="item-group" v-for="act in activitys" :key="act.id">
          <div
            class="pic"
            @click.prevent="
              showDetails(act.activityName, act.mImgUrl, act.connectionUrl)
            "
          >
            <img :src="act.imgUrl" alt />
          </div>
          <div class="title">
            <h1>{{ act.activityName }}</h1>
            <p>{{ act.beginTime }} {{ $t("until") }} {{ act.endTime }}</p>
          </div>
        </div>
      </div>
      <div class="item-none main" v-else>{{ $t("NoData") }}</div>
    </div>
    <transition name="pop">
      <div v-show="show" class="pop">
        <header-cmp :title="clickTitle">
          <template slot="back">
            <a href="#" class="back" @click.prevent="show = false">
              <img src="~@/assets/images/icons/back.png" />
            </a>
          </template>
        </header-cmp>
        <div class="pop1">
          <img :src="clickImageUrl" width="100%" height="auto" />
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { apiGetActivity } from "@/api";
export default {
  data() {
    return {
      show: false,
      clickTitle: null,
      clickImageUrl: null,
      promotion: [
        this.$t("All"),
        this.$t("NewMember"),
        this.$t("Game"),
        this.$t("promote"),
        this.$t("other")
      ],
      selected: 0,
      activitys: [],
      imgUrl: process.env.VUE_APP_IMG_BASE_URL
    };
  },
  mounted() {
    this.getActivity(0);
  },
  methods: {
    showDetails(title, imageUrl, connectionUrl) {
      if (connectionUrl !== "" && connectionUrl !== null) {
        // window.console.log(connectionUrl);
        window.open(connectionUrl,"_blank") ;
      } else {
        this.clickTitle = title;
        this.clickImageUrl = imageUrl;
        this.show = true;
      }
    },
    getActivity(type) {
      this.selected = type;
      let promotionTypeId = type;
      apiGetActivity({ promotionTypeId }).then(res => {
        this.activitys = res.data;
        if (res.result == 0) {
          this.activitys = [];
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.pop {
  height: calc(100% - 1.21rem);
}
.pop1 {
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  height: calc(100% - 1.16rem);
}
.promotion {
  height: 100%;
  .promo {
    height: 100%;
  }
  .main {
    height: calc(100% - #{rem(340)});
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    padding-bottom: rem(150);
  }
}
.nav {
  width: 100%;
  position: sticky;
  // margin-top: rem(117);
  ul {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    height: 100%;
    li {
      white-space: nowrap;
      position: relative;
      transition: 0.3s;
      height: 100%;
      a {
        display: block;
        padding: rem(30);
        font-size: rem(30);
      }
      &.active {
        a {
          color: #04a6d8;
        }
        &::before {
          content: "";
          position: absolute;
          transition: 0.3s;
          bottom: rem(-6);
          left: 20%;
          width: 60%;
          height: rem(3);
          border-radius: rem(3);
          box-shadow: 0 -3px rem(10) #04a6d8;
          background-color: #04a6d8;
        }
      }
    }
  }
}

.item-group .pic img {
  width: 100%;
}
.item-none {
  width: 100%;
  height: calc(100% - #{rem(305)});
  font-size: rem(40);
  text-align: center;
  margin-top: rem(20);
}
.title {
  color: #8e8e8f;
  background-color: rgb(29, 24, 24);
  padding: rem(10);
}
.title h1 {
  font-size: rem(25);
  padding: rem(5);
}

.title p {
  font-size: rem(25);
  padding: rem(5);
}
</style>
