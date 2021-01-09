<template>
  <div class="agent">
    <transition :name="transitionName">
      <router-view />
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {
      transitionName: ""
    };
  },
  watch: {
    $route(to, from) {
      // 過廠動畫 頁面名稱:動畫名稱
      const AnimeObj = {
        agent: "R-Slide-horizontal",
        query: "Slide-horizontal",
        layer: "Slide-horizontal",
        mange: "Slide-horizontal",
        subordinate: "Slide-horizontal",
        subordinatequery: "Slide-horizontal",
        faq: "Slide-horizontal",
        superAgent: "Slide-horizontal",
      };
      this.transitionName = AnimeObj[to.name];
    }
  }
};
</script>

<style lang="scss">
.agent {
  width: 100%;
  height: 100%;
}
</style>
