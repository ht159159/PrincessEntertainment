<template>
  <div class="layer">
    <header-cmp :title="$t('layerManage')" />
    <div class="top">
      <input
        type="text"
        :placeholder="$t('EnterNickname')"
        v-model="name.teamName"
      />
      <div class="btn btn-round btn-blue" @click="search">
        {{ $t("Search") }}
      </div>
      <div class="btn btn-round btn-coffee" @click="isCreate = true">
        {{ $t("CreateQRCode") }}
      </div>
    </div>

    <div class="bottom">
      <div class="box" v-for="i in teamInfo" :key="i.id">
        <div class="box-top">
          <span class="name" @click="openChange(i.id)">{{ i.name }}</span>
          <span class="revise">{{ `(${$t("ClickToRevise")})` }}</span>
        </div>
        <div class="box-middle">
          <div class="btn btn-round btn-coffee" @click="shareUrl(i.id)">
            {{ $t("Share") }}
          </div>
          <div class="btn btn-round btn-coffee" @click="openReset(i.id)">
            {{ $t("ResetQRCode") }}
          </div>
          <div
            class="btn btn-round btn-coffee"
            @click="getTeamLIst(i.id, i.name)"
          >
            {{ $t("TeamList") }}
          </div>
          <div class="number">{{ `${$t("TeamNumber")}:${i.number}` }}</div>
          <div class="polar"></div>
          <div class="number">{{ `${$t("LayerNumber")}:${i.maxNumber}` }}</div>
          <div class="polar"></div>
          <div class="number">{{ `${$t("LatestAdd")}:(${i.lastMemId})` }}</div>
        </div>
      </div>
    </div>
    <!-- 生成排線碼 -->
    <transition name="pop">
      <modal-alert v-if="isCreate" :text="$t('CreateQRCode')">
        <template #content>
          <input
            type="text"
            v-model.trim="create.name"
            maxlength="8"
            class="alert-box-input"
            :placeholder="$t('EnterTeamName')"
          />
          <input
            type="phone"
            v-model.number="create.maxNumber"
            class="alert-box-input font-sm"
            :placeholder="`${$t('TeamAmountBetween')} 1~2800 `"
          />
        </template>
        <template #btn>
          <div class="alert-box-cancel alert-box-btn" @click="isCreate = false">
            {{ $t("Leave") }}
          </div>
          <div
            class="alert-box-cancel alert-box-btn alert-box-btn-bright"
            @click.prevent="createTeam"
          >
            {{ $t("Confirm") }}
          </div>
        </template>
      </modal-alert>
    </transition>
    <!-- 修改排線名稱 -->
    <transition name="pop">
      <modal-alert v-if="isChangeName" :text="$t('ChangeLayerName')">
        <template #content>
          <input
            type="text"
            v-model.trim="changeTeamName.name"
            maxlength="8"
            class="alert-box-input"
            :placeholder="$t('TeamName')"
          />
        </template>
        <template #btn>
          <div
            class="alert-box-cancel alert-box-btn"
            @click="isChangeName = false"
          >
            {{ $t("Leave") }}
          </div>
          <div
            class="alert-box-cancel alert-box-btn alert-box-btn-bright"
            @click.prevent="change"
          >
            {{ $t("Confirm") }}
          </div>
        </template>
      </modal-alert>
    </transition>
    <!-- 二維碼重製 -->
    <transition name="pop">
      <modal-alert v-if="isReset" :text="$t('isResetQRcode')">
        <template #btn>
          <div class="alert-box-cancel alert-box-btn" @click="isReset = false">
            {{ $t("Leave") }}
          </div>
          <div
            class="alert-box-cancel alert-box-btn alert-box-btn-bright"
            @click.prevent="reset"
          >
            {{ $t("Confirm") }}
          </div>
        </template>
      </modal-alert>
    </transition>
  </div>
</template>
<script>
import {
  apiGetTeamCodes,
  apiCreateTeamCode,
  apiChangeTeamName,
  apiGetShareUrl,
  apiResetTeamCode
} from "@/api";
export default {
  data() {
    return {
      // 搜尋 參數
      name: {
        teamName: ""
      },
      // 生成二維碼 參數
      create: {
        name: "",
        maxNumber: ""
      },
      // 生成二維碼開關
      isCreate: false,
      teamInfo: [],
      // 修改名稱開關
      isChangeName: "",
      // 修改名稱 參數
      changeTeamName: {
        name: "",
        id: ""
      },
      // 重製二維碼開關
      isReset: false,
      // 重製二維碼參數
      resetParam: {
        id: ""
      }
    };
  },
  mounted() {
    this.search();
  },
  methods: {
    // 搜尋
    search() {
      apiGetTeamCodes(this.name).then(res => {
        if (res.result == 1) {
          this.teamInfo = res.data.teamCodes;
        }
      });
    },
    // 二維碼生成
    createTeam() {
      if (!this.create.name) {
        this.$toast(this.$t("EnterTeamName"));
        return;
      }
      if (
        !Number.isInteger(this.create.maxNumber) ||
        this.create.maxNumber > 2800 ||
        this.create.maxNumber < 1
      ) {
        this.$toast(`${this.$t("TeamAmountBetween")} 1~2800 `);
        return;
      }
      apiCreateTeamCode(this.create).then(res => {
        if (res.result == 1) {
          this.search();
          this.$toast(this.$t("CreateSuccess"));
          this.isCreate = false;
        }
      });
    },
    // 開啟名稱修改欄
    openChange(id) {
      this.isChangeName = true;
      this.changeTeamName.id = id;
    },
    // 修改名稱
    change() {
      if (!this.changeTeamName.name) {
        this.$toast(this.$t("EnterTeamName"));
        return;
      }
      apiChangeTeamName(this.changeTeamName).then(res => {
        if (res.result == 1) {
          this.$toast(this.$t("ChangeNameSuccess"));
          this.isChangeName = false;

          apiGetTeamCodes(this.name).then(res => {
            if (res.result == 1) {
              this.teamInfo = res.data.teamCodes;
            }
          });
        }
      });
    },
    // 分享
    shareUrl(id) {
      apiGetShareUrl({ id }).then(res => {
        if (res.result == 1) {
          this.$router.push({
            name: "subordinate",
            query: { QRUrl: res.data }
          });
        }
      });
    },
    // 重製二維碼
    openReset(id) {
      this.isReset = true;
      this.resetParam.id = id;
    },
    reset() {
      apiResetTeamCode(this.resetParam.id).then(res => {
        if (res.result == 1) {
          this.$toast(this.$t("ResetQRcodeSuccess"));
          this.isReset = false;
        }
      });
    },
    getTeamLIst(id, name) {
      this.$router.push({ name: "teamList" });
      this.$storage.session.set("teamList", { id, name });
    }
  }
};
</script>

<style lang="scss" scoped>
.layer {
  height: 100%;
  width: 100%;
  .top {
    top: rem(30);
    margin-top: rem(24);
    width: 100%;
    text-align: center;
    height: rem(124);
    background-color: #1c1b29;
    display: flex;
    align-items: center;
    justify-content: center;
    input {
      display: block;
      width: rem(249);
      height: rem(65);
      padding: 0 rem(20);
      border: 1px solid #3a3d55;
      margin: 0 rem(13);
      font-size: 0.3rem;
      background-color: #13121c;
      box-sizing: border-box;
    }
    input::placeholder {
      color: #4e5164;
    }
    .btn {
      font-size: 0.27rem;
      text-align: center;
      line-height: rem(65);
      margin-right: rem(9);
      color: #ffffff;
      height: 50%;
      padding: 0;
    }
  }
  .bottom {
    width: 95%;
    margin: rem(20) auto 0 auto;
    font-size: 0.3rem;
    z-index: 1;
    height: calc(100% - #{rem(300)});
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    .box {
      width: 100%;
      height: rem(213);
      margin-bottom: 0.2rem;
      border: 1px solid #3b4378;
      box-shadow: 0 rem(5) 5px 2px #1c1e2a;
      border-radius: 0 0 5px 5px;
      box-sizing: border-box;
      &-top {
        background: #171723;
        height: rem(76);
        line-height: rem(76);
        padding: 0 rem(20);
        .name {
          color: #d29f05;
          font-size: rem(35);
        }
        .revise {
          margin-left: rem(20);
          font-size: rem(25);
          color: #4a4c5c;
        }
      }
      &-middle {
        display: flex;
        padding: rem(20);
        height: rem(137);
        flex-wrap: wrap;
        box-sizing: border-box;
        color: #dadbe4;
        .btn {
          font-size: rem(25);
          width: 32%;
          padding: 0;
          height: rem(41);
          line-height: rem(41);
          margin-right: 1%;
          margin-bottom: rem(10);
        }
        .number {
          margin-right: rem(20);
          font-size: rem(24);
        }
      }
    }
  }
  .polar {
    border: 1px solid #dadbe4;
    height: rem(25);
    margin-right: rem(20);
  }
  .font-sm::placeholder {
    font-size: rem(20);
    line-height: rem(35);
  }
}
</style>
