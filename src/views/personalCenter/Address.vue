<template>
  <div>
    <header-cmp :title="$t('Send_Address')"></header-cmp>
    <ul class="menu">
      <li class="list">
        <div class="list-l">
          <div class="list-l-icon">
            <img src="~@/assets/images/icons/country.png" />
          </div>
          <div class="text">{{ $t("Nation") }}</div>
        </div>
        <div class="list-r">
          <input
            type="list-r-text"
            :placeholder="$t('Placeholder_Nation')"
            v-model="addressData.country"
            :readonly="!addressData.canEdit"
          />
        </div>
      </li>
      <li class="list">
        <div class="list-l">
          <div class="list-l-icon">
            <img src="~@/assets/images/icons/city.png" />
          </div>
          <div class="list-l-text">{{ $t("City") }}</div>
        </div>
        <div class="list-r">
          <input
            type="list-r-text"
            :placeholder="$t('Placehoder_City')"
            v-model="addressData.city"
            :readonly="!addressData.canEdit"
          />
        </div>
      </li>
      <li class="list">
        <div class="list-l">
          <div class="list-l-icon">
            <img src="~@/assets/images/icons/zipcode.png" />
          </div>
          <div class="list-l-text">{{ $t("Zip_Code") }}</div>
        </div>
        <div class="list-r">
          <input
            type="list-r-text"
            :placeholder="$t('Placehoder_ZipCode')"
            v-model="addressData.zipCode"
            :readonly="!addressData.canEdit"
          />
        </div>
      </li>
      <li class="list">
        <div class="list-l">
          <div class="list-l-icon">
            <img src="~@/assets/images/icons/address.png" />
          </div>
          <div class="list-l-text">{{ $t("Address") }}</div>
        </div>
        <div class="list-r">
          <input
            type="text"
            :placeholder="$t('Placeholder_Address')"
            v-model="addressData.address"
            :readonly="!addressData.canEdit"
          />
        </div>
      </li>
    </ul>
    <div class="container">
      <a
        href="#"
        class="btn btn-round btn-blue"
        v-if="addressData.canEdit"
        @click.prevent="sendAddressHandler"
        >{{ $t("Submit") }}</a
      >
    </div>
  </div>
</template>
<script>
import { apiAddress, apiGetPersonalInformation } from "@/api";
export default {
  data() {
    return {
      addressData: {
        address: "",
        city: "",
        zipCode: "",
        country: "",
        canEdit: false
      }
    };
  },
  mounted() {
    this.getAdderssInfo();
  },
  methods: {
    getAdderssInfo() {
      if (!this.$storage.session.get("addressInfo")) {
        apiGetPersonalInformation().then(res => {
          if (res.result === 1) {
            let { address, city, zipCode, country, canEdit } = res.data;
            this.addressData = { address, city, zipCode, country, canEdit };
            this.$storage.session.set("addressInfo", this.addressData);
          }
        });
      } else {
        this.addressData = this.$storage.session.get("addressInfo");
      }
    },
    sendAddressHandler() {
      if (Object.values(this.addressData).indexOf("") === 0) {
        this.$toast($t("ValueIsNull"));
        return;
      } else if (
        this.addressData.zipCode.length < 3 ||
        this.addressData.zipCode.length > 10
      ) {
        this.$toast($t("Error_ZipCode_IsNull"));
        return;
      }
      apiAddress(this.addressData).then(() => {
        this.$router.back(-1);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  margin-top: rem(98);
  margin-bottom: rem(88);
}
</style>
