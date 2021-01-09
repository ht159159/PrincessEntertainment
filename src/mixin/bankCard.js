// import { apiGetPersonalInformation } from "@/api";
import { mapState } from "vuex";
export default {
  data() {
    return {
      isBankCard: false,
      bankcardInfo: {}
    };
  },
  computed: mapState(["personalInfo"]),
  mounted() {
    this.getBankCardInfo();
  },
  methods: {
    getBankCardInfo() {
      if (this.personalInfo) this.isBankCard = true;
      let oldCardNumber = this.personalInfo.cardNumber;
      let cardNumber;
      if (oldCardNumber) {
        cardNumber = oldCardNumber.substring(
          oldCardNumber.length - 4,
          oldCardNumber.length
        );
      }
      let accountNameMask = "";
      for (let i = 1; i < this.personalInfo.accountName.length; i++)
        accountNameMask += "*";

      let data = {
        bankName: this.personalInfo.bankName,
        cardNumber,
        accountName: this.personalInfo.accountName.substring(0, 1),
        accountNameMask
      };
      this.$storage.session.set("bankCardInfo", data);
      this.bankcardInfo = data;
    }
  }
};
