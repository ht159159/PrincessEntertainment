(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-41e8517e"],{7147:function(t,a){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAcBAMAAACaHyIpAAAAJ1BMVEVHcEzHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8cFT1t0AAAADXRSTlMA/99dupyL1hJOdCk2WeCTPQAAAG9JREFUCNdjYBMUVFISFKxhSCxxEhQUcRFkEGJgcC83YDBkEGcAg4kgERAwJJLBmgBlcInBpCYugDA4OcUgDBYBwwSIlCCzNITRydBAtBX4GB0dDGDHcwsKBkAcv3s3SCTQNXTVqtRQQQYWQTAQBgBMGxTyrg2WpwAAAABJRU5ErkJggg=="},d117:function(t,a,n){"use strict";n.r(a);var e=function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("div",{staticClass:"withdrawBox"},[n("header-cmp",{attrs:{title:t.$t("Withdraw")}}),n("div",{staticClass:"containerBox"},[n("div",{staticClass:"container"},[n("div",{staticClass:"cardinfo"},[n("div",{staticClass:"row"},[n("p",[t._v(t._s(this.personalInfo.realName))])]),n("picker",{staticClass:"plat",attrs:{large:!0,text:t.$options.filters.$maskString(t.bankCard.cardNumber),list:t.personalInfo.bankList,bgRed:!0},model:{value:t.bankCard,callback:function(a){t.bankCard=a},expression:"bankCard"}})],1),n("div",{staticClass:"phone_id"},[t._m(0),n("div",{staticClass:"num"},[n("p",[t._v(t._s(t.bankTransferData.mobile))])])]),n("div",{staticClass:"drawal"},[n("h1",[t._v(t._s(t.$t("Withdraw_Money")))])]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.amount,expression:"amount"}],staticClass:"box",attrs:{type:"tel",placeholder:t.$t("Placeholder_WithDrawAmount")},domProps:{value:t.amount},on:{input:function(a){a.target.composing||(t.amount=a.target.value)}}}),n("div",{staticClass:"article"},[n("div",{staticClass:"tip"},[n("p",[t._v("\n            "+t._s(t.$t("SinglewithdrawalAmount"))+t._s(t._f("$currency")(t.minVal))+" ，\n            "+t._s(t.$t("Limit_Transaction_High"))+t._s(t._f("$currency")(t.maxVal))+"，每日限5次\n          ")]),n("p",[t._v("新台幣 1 : 遊戲幣 1 ｜ 人民幣 1 : 遊戲幣 4.2")]),n("p",[t._v("託售時間為每日12:00～18:00")])]),t._m(1),t._m(2)]),n("a",{staticClass:"btn btn-round btn-blue",attrs:{href:"#"},on:{click:function(a){return a.preventDefault(),t.editWalletPasswordHandler(a)}}},[t._v(t._s(t.$t("Next_Step")))])])]),t.editWalletPassword?n("modal-alert",{attrs:{imgName:"alert",text:t.$t("Placeholder_WallerPassword")},on:{close:function(a){t.editWalletPassword=!1}},scopedSlots:t._u([{key:"content",fn:function(){return[n("input",{directives:[{name:"model",rawName:"v-model",value:t.maoPayBankTransferData.sCode,expression:"maoPayBankTransferData.sCode"}],staticClass:"alert-box-input",attrs:{type:"password",placeholder:t.$t("Placeholder_WallerPassword")},domProps:{value:t.maoPayBankTransferData.sCode},on:{input:function(a){a.target.composing||t.$set(t.maoPayBankTransferData,"sCode",a.target.value)}}})]},proxy:!0},{key:"btn",fn:function(){return[n("div",{staticClass:"alert-box-cancel alert-box-btn",on:{click:function(a){t.editWalletPassword=!1}}},[t._v("\n        "+t._s(t.$t("Cancel"))+"\n      ")]),n("div",{staticClass:"alert-box-cancel alert-box-btn alert-box-btn-bright",on:{click:function(a){return a.preventDefault(),t.sendBankTransfer(a)}}},[t._v("\n        "+t._s(t.$t("Confirm"))+"\n      ")])]},proxy:!0}],null,!1,418048089)}):t._e(),t.showAlert?n("modal-alert",{attrs:{imgName:"alert",text:t.$t("Bank_Card_Notset")},on:{close:function(a){return t.$router.back(-1)}},scopedSlots:t._u([{key:"btn",fn:function(){return[n("div",{staticClass:"alert-box-cancel alert-box-btn",on:{click:function(a){return t.$router.back(-1)}}},[t._v("\n        "+t._s(t.$t("Leave"))+"\n      ")]),n("div",{staticClass:"alert-box-cancel alert-box-btn alert-box-btn-bright",on:{click:function(a){return t.toPage("bankcard")}}},[t._v("\n        "+t._s(t.$t("Goto"))+"\n      ")])]},proxy:!0}],null,!1,462119369)}):t._e()],1)},s=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"pic"},[e("img",{attrs:{src:n("7147"),alt:""}})])},function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("div",{staticClass:"tip1 withdrawalRules"},[n("p",[t._v("業績託售規則說明 :")]),n("p",[t._v("\n            每週可免費託售2次，超過次數將收取3%手續費(單筆最低50點) 每週一00:00系統會自動重置。\n          ")])])},function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("div",{staticClass:"tip2"},[n("p",[t._v("\n            任何疑問請聯系 [\n            "),n("u",[n("a",{staticStyle:{color:"yellow"},attrs:{href:"https://line.me/R/ti/p/%40294wqazk",target:"_blank"}},[t._v("VIP客服")])]),t._v("\n            ]\n          ")])])}],r=(n("c5f6"),n("365c")),o={data:function(){return{editWalletPassword:!1,maxVal:5e4,minVal:1e3,bankTransferData:{},amount:"",showAlert:!1,selectProvider:"",text:"",list:"",bankCard:"",personalInfo:"",maoPayBankTransferData:{type:1}}},mounted:function(){var t=this;Object(r["K"])().then(function(a){if(1===a.result){if(t.personalInfo=a.data,0==a.data.bankList.length)return void(t.showAlert=!0);t.getBankTransfer()}})},methods:{getBankTransfer:function(){var t=this;Object(r["n"])().then(function(a){1===a.result?(t.bankTransferData=a.data,t.maoPayBankTransferData.sCode=""):t.$router.back(-1)})},editWalletPasswordHandler:function(){this.bankCard?(this.amount&&(this.maoPayBankTransferData.amount=Number(Math.floor(this.amount))),this.bankTransferData.realAmount>0?this.$toast("".concat(this.$t("Need_More_Bet_Amount_Before")," ").concat(this.bankTransferData.realAmount).concat(this.$t("Need_More_Bet_Amount_After"))):this.maoPayBankTransferData.amount<this.minVal?this.$toast("".concat(this.$t("Error_Amount_Min")).concat(this.$options.filters.$currency(this.minVal)," ")):this.maoPayBankTransferData.amount>this.maxVal?this.$toast("".concat(this.$t("Error_Amount_Max")).concat(this.$options.filters.$currency(this.maxVal)," ")):this.editWalletPassword=!0):this.$toast(this.$t("NotYetSelectedBankCard"))},sendBankTransfer:function(){var t=this;0!==this.maoPayBankTransferData.sCode.length?(this.maoPayBankTransferData.amount=Math.floor(this.maoPayBankTransferData.amount),this.maoPayBankTransferData.accountName=this.bankTransferData.accountName,this.maoPayBankTransferData.carNo=this.bankCard.cardNumber,Object(r["ab"])(this.maoPayBankTransferData).then(function(a){1===a.result&&t.$toast(a.message),t.editWalletPassword=!1,t.maoPayBankTransferData.sCode=""})):this.$toast(this.$t("Error_WalletPasword_IsNull"))},toPage:function(t){this.showAlert=!1,this.$router.push({name:t})}}},i=o,l=(n("e827"),n("2877")),c=Object(l["a"])(i,e,s,!1,null,"1bba3254",null);a["default"]=c.exports},e115:function(t,a,n){},e827:function(t,a,n){"use strict";var e=n("e115"),s=n.n(e);s.a}}]);
//# sourceMappingURL=chunk-41e8517e.03023fa1.js.map