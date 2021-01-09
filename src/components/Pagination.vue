<template>
  <div class="pagination">
    <img
      src="@/assets/images/icons/backPage.png"
      class="pagination-btn"
      @click="changePage(-1)"
    />
    <img
      src="@/assets/images/icons/doubleArrowBack.png"
      class="pagination-btn"
      @click="firstPage()"
    />
    <span>{{ `${pageIndex}/${totalPage}` }}</span>
    <img
      src="@/assets/images/icons/doubleArrowNext.png"
      class="pagination-btn"
      @click="lastPage()"
    />
    <img
      src="@/assets/images/icons/nextPage.png"
      class="pagination-btn"
      @click="changePage(1)"
    />
  </div>
</template>
<script>
export default {
  props: ["pageIndex", "totalPage"],
  methods: {
    changePage(index) {
      let newIndex = this.pageIndex + index;
      if (newIndex < 1 || newIndex > this.totalPage) return;
      this.$emit("change-Page", newIndex);
    },
    lastPage() {
      if (this.pageIndex == this.totalPage) return;
      this.$emit("change-Page", this.totalPage);
    },
    firstPage() {
      if (this.pageIndex == 1) return;
      this.$emit("change-Page", 1);
    }
  }
};
</script>

<style lang="scss">
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  height: rem(100);
  margin: rem(20) 0;
  background: #171723;
  font-size: rem(25);
  &-btn {
    height: rem(33);
    margin: rem(30);
  }
}
</style>
