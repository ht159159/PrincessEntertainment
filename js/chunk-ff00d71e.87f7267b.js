(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ff00d71e"],{"44ea":function(t,a,n){},7779:function(t,a,n){"use strict";var e=n("44ea"),s=n.n(e);s.a},ee3e:function(t,a,n){"use strict";n.r(a);var e=function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("div",{staticClass:"safe"},[n("header-cmp",{attrs:{title:t.$t("Safe")}}),n("main",[n("div",{staticClass:"safeDisplay"},[n("div",{staticClass:"safeDisplay-safe"},[n("div",{staticClass:"safeDisplay-safe-title"},[t._v(t._s(t.$t("Safe")))]),n("div",{staticClass:"safeDisplay-safe-value"},[t._v(t._s(t._f("$currency")(t.walletLock)))])]),n("div",{staticClass:"safeDisplay-wallet"},[n("div",{staticClass:"safeDisplay-wallet-title"},[t._v(t._s(t.$t("Wallet")))]),n("div",{staticClass:"safeDisplay-wallet-value"},[t._v(t._s(t._f("$currency")(t.maoBalance)))])]),n("div",{staticClass:"safeDisplay-amount"},[n("div",{staticClass:"safeDisplay-amount-title"},[t._v(t._s(t.$t("Quantity")))]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.inOutAmount,expression:"inOutAmount"}],staticClass:"safeDisplay-amount-value",attrs:{placeholder:t.$t("enterTheQuantity")},domProps:{value:t.inOutAmount},on:{input:function(a){a.target.composing||(t.inOutAmount=a.target.value)}}})])]),n("div",{staticClass:"safeDescription"},[t._v("\r\n            錢包超過5,000以上，即可存於保險箱內。\r\n        ")]),n("div",{staticClass:"safeDisplay-btn"},[n("div",{staticClass:"btn btn-round btn-blue safeDisplay-btn-deposit",on:{click:function(a){t.bankSavingsAlertShow=!0}}},[t._v(t._s(t.$t("BankSavings")))]),n("div",{staticClass:"btn safeDisplay-btn-takeOut",on:{click:function(a){t.takeOutAlertShow=!0}}},[t._v(t._s(t.$t("TakeOut")))])]),t.bankSavingsAlertShow?n("modal-alert",{attrs:{imgName:"alert",text:t.$t("bankSavingsWarning")},on:{close:function(a){t.bankSavingsAlertShow=!1}},scopedSlots:t._u([{key:"btn",fn:function(){return[n("transition",{attrs:{name:"loading"}},[t.loadingShow?n("div",{staticClass:"loading"},[t._v(t._s(t.$t("loading")))]):t._e()]),n("div",{staticClass:"alert-box-cancel alert-box-btn",on:{click:function(a){t.bankSavingsAlertShow=!1}}},[t._v(t._s(t.$t("Cancel")))]),n("div",{staticClass:"alert-box-cancel alert-box-btn alert-box-btn-bright",on:{click:function(a){return t.safeInOut(0)}}},[t._v(t._s(t.$t("Confirm")))])]},proxy:!0}],null,!1,290882587)}):t._e(),t.takeOutAlertShow?n("modal-alert",{attrs:{imgName:"alert",text:t.$t("takeOutAlertWarning")},on:{close:function(a){t.takeOutAlertShow=!1}},scopedSlots:t._u([{key:"btn",fn:function(){return[n("transition",{attrs:{name:"loading"}},[t.loadingShow?n("div",{staticClass:"loading"},[t._v(t._s(t.$t("loading")))]):t._e()]),n("div",{staticClass:"alert-box-cancel alert-box-btn",on:{click:function(a){t.takeOutAlertShow=!1}}},[t._v(t._s(t.$t("Cancel")))]),n("div",{staticClass:"alert-box-cancel alert-box-btn alert-box-btn-bright",on:{click:function(a){return t.safeInOut(1)}}},[t._v(t._s(t.$t("Confirm")))])]},proxy:!0}],null,!1,1875871262)}):t._e()],1)],1)},s=[],i=n("365c"),l=n("2f62"),o={data:function(){return{bankSavingsAlertShow:!1,takeOutAlertShow:!1,maoBalance:"",walletLock:"",inOutAmount:"",loadingShow:!1}},created:function(){this.walletLock=this.$storage.local.get("walletLock"),this.maoBalance=this.$storage.local.get("maoBalance")},computed:Object(l["b"])(["personalInfo","maoBalanceStore"]),mounted:function(){},methods:{safeInOut:function(t){var a=this,n=/^[0-9]*[1-9][0-9]*$/;if(""!=this.inOutAmount){if(!n.test(this.inOutAmount))return this.bankSavingsAlertShow=!1,this.takeOutAlertShow=!1,this.$toast(this.$t("請輸入正整數")),void(this.inOutAmount="");var e={Type:t,Amount:this.inOutAmount};this.loadingShow=!0,Object(i["hb"])(e).then(function(t){1===t.result?(a.$toast(a.$t(t.message)),a.bankSavingsAlertShow=!1,a.takeOutAlertShow=!1,a.$store.dispatch("getPersonalInfo"),a.$store.dispatch("getMaoGetBalanceAsync"),a.loadingShow=!1,a.inOutAmount=""):(a.bankSavingsAlertShow=!1,a.takeOutAlertShow=!1,a.loadingShow=!1,a.inOutAmount="")})}else this.bankSavingsAlertShow=!1,this.takeOutAlertShow=!1,this.$toast(this.$t("enterTheQuantity"))}},watch:{personalInfo:function(){this.walletLock=this.$storage.local.get("walletLock")},maoBalanceStore:function(){this.maoBalance=this.$storage.local.get("maoBalance")}}},c=o,r=(n("7779"),n("2877")),u=Object(r["a"])(c,e,s,!1,null,"752c8558",null);a["default"]=u.exports}}]);
//# sourceMappingURL=chunk-ff00d71e.87f7267b.js.map