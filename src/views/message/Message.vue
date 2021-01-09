<template>
  <div class="outer">
    <header-cmp :title="$t('Message_Box')"></header-cmp>
    <section @scroll="$scrollLoad(loadMore,$event)" ref="scroll" class="messages">
      <div v-if="messages.length > 0">
        <div
          class="message"
          v-for="(m, i) in messages"
          :key="i"
          @click="myMessage(m.message, m.createTime, m.id)"
        >
          <div class="top">
            <div class="title">
              <div class="read" v-if="!m.isRead"></div>
              <div class="name">{{ m.subjectName }}</div>
            </div>
            <div class="icon"></div>
          </div>
          <div class="buttom">
            <div class="time">{{ m.createTime | dateFormat }}</div>
          </div>
        </div>
      </div>
      <div class="noData" v-else>{{ $t("NoData") }}</div>
    </section>
  </div>
</template>
<script>
import { apiGetMessage } from "@/api";
import storage from "@/utils/storage.js";
// import { stat } from "fs";
import loadMore from "@/mixin/loadMore";
// import { setInterval } from "timers";
export default {
  mixins: [loadMore],
  data() {
    return {
      messages: [],
      pageIndex: 1,
      bottomStatus: "",
      allLoaded: false,
      totalCount: ""
    };
  },
  mounted() {
    this.getMessage();
  },
  methods: {
    getMessage() {
      let params = {
        pageIndex: 1,
        pageSize: 10
      };
      apiGetMessage(params).then(res => {
        if (res.result === 1) {
          this.messages = res.data.internalMessageDTOs;
          this.totalCount = res.data.totalCount;
          res.data.totalCount > 10
            ? (this.allLoaded = false)
            : (this.allLoaded = true);
        }
      });
    },
    myMessage(message, time, id) {
      time = this.$options.filters.dateFormat(time);
      storage.session.set("message", { message, time, id });

      this.$router.push({ name: "mynews" });
    },
    loadMore() {
      if(Math.ceil(this.totalCount /10) > this.pageIndex){
        this.pageIndex++;
        let params = {
          pageIndex: this.pageIndex,
          pageSize: 10
        };
        apiGetMessage(params).then(res => {
          let list = this.messages;
          this.messages = list.concat(res.data.internalMessageDTOs);
          this.allLoaded =
            this.messages.length === res.data.totalCount ? true : false;
  
          // this.$refs.loadmore.onBottomLoaded();
        });
      }
    }
  },
  filters: {
    dateFormat(val) {
      // let date = new Date(val);
      // let y, m, d, h, mi, s;
      // y = date.getFullYear();
      // m = date.getMonth() + 1;
      // m = m > 9 ? m : `0${m}`;
      // d = date.getDate();
      // d = d > 9 ? d : `0${d}`;
      // h = date.getHours();
      // h = h > 9 ? h : `0${h}`;
      // mi = date.getMinutes();
      // mi = mi > 9 ? mi : `0${mi}`;
      // s = date.getSeconds();
      // s = s > 9 ? s : `0${s}`;
      // return `${y}-${m}-${d} ${h}:${mi}:${s}`;
      return val;
    }
  }
};
</script>

<style lang="scss">
$back-icon-padding: 10;
.outer {
  height: 100%;
}
.messages {
  padding: 0 rem(40-$back-icon-padding);
  height: calc(100% - #{rem(101)});
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.message {
  border-radius: rem(15);
  padding: rem(38) rem(22);
  padding-bottom: rem(44);
  margin-top: rem(20);
  box-sizing: border-box;
  background-color: $bg-dark;

  &:active {
    filter: brightness(1.4);
  }
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: rem(24);
    .title {
      display: flex;
      align-items: center;

      .read {
        width: rem(12);
        height: rem(12);
        margin-right: rem(11);
        background-color: #ffa200;
        border-radius: rem(30);
      }
      .name {
        font-size: rem(29);
        color: $white;
      }
    }
    .icon {
      width: rem(15);
      height: rem(26);
      background-image: url("~@/assets/images/icons/back.png");
      background-position: center;
      background-size: cover;
      transform: rotate(180deg);
    }
  }
  .time {
    font-size: rem(24);
    color: $gray;
  }
}
</style>
