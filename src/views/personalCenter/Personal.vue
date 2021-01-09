<template>
  <div class="personal">
    <header-cmp :title="$t('Personal')"></header-cmp>
    <div class="scroll">
      <ul class="menu">
        <li class="list">
          <div class="list-l">
            <div class="list-l-icon">
              <img src="~@/assets/images/icons/user.png" />
            </div>
            <div class="list-l-text">{{ $t("Account") }}</div>
          </div>
          <div class="list-r">
            <!-- <div class="list-r-text list-r-text-blue">
              {{ personalInfo.userName }}
            </div> -->
            <input
              type="text"
              class="list-r-text list-r-text-blue"
              v-model="personalInfo.nickName"
              :readonly="!editable"
              :unselectable="editable ? '' : 'on'"
            />
            <div class="list-r-icon"></div>
          </div>
        </li>
        <li class="list">
          <div class="list-l">
            <div class="list-l-icon">
              <img src="~@/assets/images/icons/name.png" />
            </div>
            <div class="list-l-text">{{ $t("Name") }}</div>
          </div>
          <div class="list-r">
            <input
              type="text"
              class="list-r-text"
              v-model="personalInfo.realName"
              :placeholder="$t('Placeholder_NotSetYet')"
              :readonly="!editable"
              :unselectable="editable ? '' : 'on'"
            />
            <div class="list-r-icon"></div>
          </div>
        </li>
      </ul>

      <ul class="menu">
        <li class="list">
          <div class="list-l">
            <div class="list-l-icon">
              <img src="~@/assets/images/icons/phone.png" />
            </div>
            <div class="list-l-text">{{ $t("Mobile") }}</div>
          </div>
          <div class="list-r">
            <div
              type="text"
              class="list-r-text"
              :class="{ phone: editable }"
              @click="editPhoneNumber"
              :readonly="!editable"
              :unselectable="editable ? '' : 'on'"
            >
              {{ personalInfo.mobile | $maskPhone }}
            </div>
            <div class="list-r-icon"></div>
          </div>
        </li>
        <li class="list">
          <div class="list-l">
            <div class="list-l-icon">
              <img src="~@/assets/images/icons/mail.png" />
            </div>
            <div class="text">{{ $t("Email") }}</div>
          </div>
          <div class="list-r">
            <input
              type="text"
              class="list-r-text"
              v-model="personalInfo.email"
              :placeholder="$t('Placeholder_NotSetYet')"
              :readonly="!editable"
              :unselectable="editable ? '' : 'on'"
            />
            <div class="list-r-icon"></div>
          </div>
        </li>
        <li class="list">
          <div class="list-l">
            <div class="list-l-icon">
              <img src="~@/assets/images/icons/mail.png" />
            </div>
            <div class="text">Line ID</div>
          </div>
          <div class="list-r">
            <input
              type="text"
              class="list-r-text"
              v-model="personalInfo.lineID"
              :placeholder="$t('Placeholder_NotSetYet')"
              :readonly="!editable"
              :unselectable="editable ? '' : 'on'"
            />
            <div class="list-r-icon"></div>
          </div>
        </li>
      </ul>
      <ul class="menu">
        <li class="list">
          <div class="list-l">
            <div class="list-l-icon">
              <img src="~@/assets/images/icons/gender.png" />
            </div>
            <div class="list-l-text">{{ $t("Gendere") }}</div>
          </div>
          <div class="list-r">
            <picker
              v-model="gender"
              :editable="editable"
              :text="gender.name"
              :list="genderList"
              :placeholder="$t('Placeholder_Gender')"
            ></picker>
            <div class="list-r-icon"></div>
          </div>
        </li>
        <li class="list">
          <div class="list-l">
            <div class="list-l-icon">
              <img src="~@/assets/images/icons/date.png" />
            </div>
            <div class="list-l-text">{{ $t("Birthday") }}</div>
          </div>
          <div class="list-r">
            <datetime
              input-class="datepicker"
              v-model="personalInfo.birhdate"
              :class="{ 'list-r-disable': !editable }"
              :placeholder="personalInfo.birhdate"
              :title="$t('BirthDate')"
            ></datetime>
            <div class="list-r-icon"></div>
          </div>
        </li>
        <!-- <li class="list">
          <div class="list-l">
            <div class="list-l-icon">
              <img src="~@/assets/images/icons/qq.png" />
            </div>
            <div class="list-l-text">{{ $t("QQcode") }}</div>
          </div>
          <div class="list-r">
            <input
              type="text"
              class="list-r-text"
              :placeholder="$t('Placeholder_QQ')"
              v-model="personalInfo.qq"
              :readonly="!editable"
              :unselectable="editable ? '' : 'on'"
            />
            <div class="list-r-icon"></div>
          </div>
        </li> -->
      </ul>
      <p class="alert" v-if="!editable">
        {{ $t("Not_Allow_Change_Personal") }}
      </p>
      <div class="container" v-if="editable">
        <a
          href="#"
          class="btn btn-round btn-blue"
          @click.prevent="confirmData()"
          >{{ $t("Confirm") }}</a
        >
      </div>
    </div>
    <modal-alert
      v-if="showAlert"
      imgName="alert"
      @close="showAlert = false"
      :text="$t('ConfirmPassword')"
    >
      <template #content>
        <input
          type="password"
          class="alert-box-input"
          v-model="loginPwd"
          :placeholder="$t('PasswordLogin')"
          AUTOCOMPLETE="off"
          autocomplete=“new-password”
        />
      </template>
      <template #btn>
        <div class="alert-box-cancel alert-box-btn" @click="closeModal">
          {{ $t("Cancel") }}
        </div>
        <div
          class="alert-box-cancel alert-box-btn alert-box-btn-bright"
          @click="updatePersonalInfoHandler"
        >
          {{ $t("Submit") }}
        </div>
      </template>
    </modal-alert>
    <modal-alert
      v-if="editAlert"
      imgName="alert"
      @close="editAlert = false"
      :text="$t('MessageForValidation')"
    >
      <template #btn>
        <div
          class="alert-box-cancel alert-box-btn alert-box-btn-bright"
          @click="editAlert = false"
        >
          {{ $t("Close") }}
        </div>
      </template>
    </modal-alert>
  </div>
</template>
<script>
import { Datetime } from "vue-datetime";
import { apiGetPersonalInformation, apiUpdatePersonalInformation } from "@/api";
export default {
  components: {
    Datetime
  },
  data() {
    return {
      editAlert: false,
      editable: false,
      showAlert: false,
      gender: {},
      genderList: [
        { id: 1, name: this.$t("Male") },
        { id: 2, name: this.$t("Female") }
      ],
      personalInfo: {
        nickName: "",
        realName: "",
        userName: "",
        birhdate: "",
        email: "",
        mobile: "",
        gender: "",
        lineID: ""
      },
      loginPwd: ""
    };
  },
  computed: {
    dataZone() {
      return this.$storage.local.get("lang").tag;
    }
  },
  mounted() {
    this.getPersonalInfo();
  },
  methods: {
    getPersonalInfo() {
      apiGetPersonalInformation().then(res => {
        if (res.result === 1) {
          let data = {
            nickName: res.data.nickName,
            realName: res.data.realName,
            userName: res.data.userName,
            birhdate: res.data.birhdate,
            email: res.data.email,
            gender: res.data.gender,
            mobile: res.data.mobile,
            lineID: res.data.lineID
          };

          if (res.data.gender === 1) this.gender = this.genderList[0];
          else if (res.data.gender === 2) this.gender = this.genderList[1];

          if (res.data.canEdit) this.editAlert = true;
          this.editable = res.data.canEdit;
          this.personalInfo = data;
          this.$storage.local.set("canEdit", res.data.canEdit);
          this.$storage.local.set("realName", res.data.realName);
        }
      });
    },
    // 修改個人資料
    updatePersonalInfoHandler() {
      let data = this.confirmData();
      data.loginPwd = this.loginPwd;
      if (!data.loginPwd) {
        this.$toast(this.$t("Error_Password_IsNull"));
        return;
      }
      apiUpdatePersonalInformation(data).then(res => {
        this.closeModal();
        if (res.result === 0) {
          return;
        } else {
          this.$toast(this.$t("Modify_Success"));
          this.getPersonalInfo();
        }
      });
    },
    closeModal() {
      this.showAlert = false;
      this.loginPwd = "";
    },
    confirmData() {
      let {
        nickName,
        email,
        realName,
        gender,
        birhdate,
        lineID
      } = this.personalInfo;
      if (!nickName || !email || !realName || !birhdate || !gender || !lineID) {
        this.$toast(this.$t("Error_Data_NotComplete"));
        return;
      }
      if (!this.showAlert) {
        this.showAlert = true;
      }
      return {
        nickName,
        email,
        realName,
        gender,
        birhdate,
        lineID,
        canEdit: true
      };
    },
    editPhoneNumber() {
      if (!this.editable) {
        return;
      }
      this.$router.push({ name: "phonechange" });
    }
  },
  watch: {
    gender(val) {
      this.personalInfo.gender = val.id;
    }
  }
};
</script>
<style lang="scss">
.personal {
  height: 100%;
  .scroll {
    height: calc(100% - #{rem(120)});
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
  .alert {
    font-size: rem(24);
    text-align: center;
    color: $font-alert;
    padding-top: rem(20);
    padding-bottom: rem(40);
  }
  .phone {
    color: #fff;
  }
  .container {
    margin-top: rem(30);
  }
}
</style>
