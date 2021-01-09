<template>
  <nav>
    <router-link
      tag="div"
      :to="{ name: 'main' }"
      class="navigation"
      :class="{ 'navigation-active': currentView == 'main' }"
    >
      <img class="navigation-icon" src="~@/assets/images/icons/main.png" />
      <p>{{ $t("Home") }}</p>
    </router-link>
    <router-link
      tag="div"
      :to="{ name: 'promotion' }"
      class="navigation"
      :class="{ 'navigation-active': currentView == 'promotion' }"
    >
      <img class="navigation-icon" src="~@/assets/images/icons/coupon.png" />
      <p>{{ $t("Promotion") }}</p>
    </router-link>
    <!-- <div class="navigation navigation-logo" @click.prevent="openFinacialCenter">
      <img src="~@/assets/images/icons/mainLogo.png" />
    </div> -->
    <canvas id="canvas" width="120" height="120"  @click.prevent="openFinacialCenter"></canvas>
    <!-- <div class="testMAOlogo">
      <div class="testMAOlogo-bg">
        <div class="testMAOlogo-k"></div>
        <div class="testMAOlogo-kl"></div>
        <div class="testMAOlogo-l"></div>
      </div>
    </div> -->
    <!-- <canvas id="canvas1"></canvas> -->
    <!-- <a
      @click="$toast('no service...')"
      class="navigation"
    >
      <img class="navigation-icon" src="~@/assets/images/icons/service.png" />
      <p>{{ $t("Service") }}</p>
    </a> -->

    <router-link
      tag="div"
      :to="{ name: 'CustomerService' }"
      class="navigation"
      :class="{ 'navigation-active': currentView == 'CustomerService' }"
    >
      <img class="navigation-icon" src="~@/assets/images/icons/service.png" />
      <p>{{ $t("Service") }}</p>
    </router-link>

    <router-link
      tag="div"
      :to="{ name: 'center' }"
      class="navigation"
      :class="{
        'navigation-active': currentView == 'center',
        notice: unreadMessage > 0
      }"
    >
      <img class="navigation-icon" src="~@/assets/images/icons/personal.png" />
      <p>{{ $t("My_Info") }}</p>
    </router-link>
  </nav>
</template>
<script>
export default {
  props: ["unreadMessage"],
  data() {
    return {
      finacialCenter: false,
      currentView: ""
    };
  },
  mounted() {
    this.currentView = this.$route.name;
    // this.$paintCanvas("canvas", "spineboy-ess");
  },
  methods: {
    openFinacialCenter() {
      this.$emit("openFinacialCenter", true);
    }
  },
  watch: {
    $route(val) {
      this.currentView = val.name;
    }
  }
};
</script>

<style lang="scss">
nav {
  position: fixed;
  width: 100%;
  height: rem(121);
  background-color: #14141a;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  font-size: rem(20);
  line-height: rem(20);
  z-index: 10000;
}
.navigation {
  text-align: center;
  width: rem(111);
  height: 100%;
  padding: 0 rem(20);
  line-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &.notice {
    position: relative;
    &::after {
      content: "";
      position: absolute;
      display: block;
      right: rem(50);
      top: rem(20);
      width: rem(20);
      height: rem(20);
      border-radius: rem(10);
      background-color: red;
      z-index: 999;
    }
  }
  &-icon {
    height: 35%;
    transition: 0.1s;
  }

  p {
    color: #576678;
    padding-top: rem(10);
    transition: 0.1s;
    white-space: nowrap;
  }
  &-logo {
    width: rem(121);
    box-sizing: border-box;
    background-color: #3ec1fe;
    border-radius: 50%;
    transition: transform 0.2s;
    &:active {
      transform: scale(0.9);
    }
    img {
      height: 100%;
    }
  }
  &:active,
  &-active {
    .navigation-icon {
      filter: invert(8%) sepia(73%) saturate(3133%) hue-rotate(20deg)
        brightness(151%) contrast(71%);
    }
    p {
      color: #d8a925;
    }
  }
}

// @keyframes gif {
//   0% {
//     -webkit-transform: rotateY(0deg);
//     transform: rotateY(0deg);
//   }
//   100% {
//     -webkit-transform: rotateY(360deg);
//     transform: rotateY(360deg);
//   }
// }

// .go {
//   -webkit-animation: gif 2s infinite linear;
//   animation: gif 2s infinite linear;
// }
canvas#canvas,
canvas#canvas1 {
  width: rem(141);
  overflow: hidden;
}

.testMAOlogo {
  width: rem(121);
  height: rem(121);
  border-radius: 100px;
  overflow: hidden;
  position: relative;
}
.testMAOlogo-bg,
.testMAOlogo-k,
.testMAOlogo-kl,
.testMAOlogo-l {
  background: url("~@/assets/images/icons/mainLogotest.png") 0 0 no-repeat;
  background-size: 210%;
}
.testMAOlogo-bg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-position: rem(-6) rem(-2);
  border-radius: 100px;
}
.testMAOlogo-k {
  position: absolute;
  display: block;
  top: rem(2);
  left: rem(-6);
  width: rem(116);
  height: rem(116);
  background-position: rem(-122) rem(-2);
  transform-origin: 50% 85%;
}

.testMAOlogo-kl {
  position: absolute;
  display: block;
  top: rem(-4);
  left: rem(-6);
  width: rem(116);
  height: rem(116);
  background-position: rem(-122) rem(-114);
  transform-origin: 50% 85%;
  animation: klshow 5s linear infinite;
}

.testMAOlogo-l {
  position: absolute;
  display: block;
  top: rem(-110);
  left: rem(-120);
  width: rem(120);
  height: rem(180);
  background-position: rem(-10) rem(-120);
  transform-origin: 50% 85%;
  animation: lmove 5s linear infinite;
}

@keyframes lmove {
  0%,
  60% {
    transform: translate3d(0px, 0px, 0px);
  }
  // 50%{
  //     transform: translate3d(100px, 100px, 0px);
  // }
  80%,
  100% {
    transform: translate3d(rem(200), rem(200), 0px);
  }
}
@keyframes klshow {
  0%,
  20%,
  40%,
  100% {
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
}
</style>
