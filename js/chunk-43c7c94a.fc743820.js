(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-43c7c94a"],{"26cd":function(e,t,a){"use strict";var n=a("e06d"),o=a.n(n);o.a},"373b":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("header-cmp",{attrs:{title:e.$t("ChangeMobile")}}),a("div",{staticClass:"container"},[a("div",{staticClass:"input_box"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.changeData.mobile,expression:"changeData.mobile"}],attrs:{type:"text",placeholder:e.$t("Placeholder_Mobile")},domProps:{value:e.changeData.mobile},on:{input:function(t){t.target.composing||e.$set(e.changeData,"mobile",t.target.value)}}})]),a("div",{staticClass:"input_box"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.changeData.imgCode,expression:"changeData.imgCode"}],attrs:{type:"text",placeholder:e.$t("Placeholder_Validation")},domProps:{value:e.changeData.imgCode},on:{input:function(t){t.target.composing||e.$set(e.changeData,"imgCode",t.target.value)}}}),a("span",{staticClass:"imgcode",attrs:{href:"#"},on:{click:function(t){return t.preventDefault(),e.changeImg(t)}}},[a("img",{attrs:{src:e.img}})])]),a("div",{staticClass:"input_box"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.changeData.smsCode,expression:"changeData.smsCode"}],attrs:{type:"text",placeholder:e.$t("Placeholder_SMSCode")},domProps:{value:e.changeData.smsCode},on:{input:function(t){t.target.composing||e.$set(e.changeData,"smsCode",t.target.value)}}}),a("span",{staticClass:"confirm",class:{dontClick:e.countDown},attrs:{href:"#"},on:{click:function(t){return t.preventDefault(),e.getSMScode(t)}}},[e._v(e._s(e.SMSCodeMessage))])]),a("a",{staticClass:"btn btn-round btn-blue",attrs:{href:"#"},on:{click:e.sendChangeMobile}},[e._v(e._s(e.$t("Done")))])])],1)},o=[],i=a("365c"),s=a("76a0"),c={data:function(){return{img:"",countDown:0,changeData:{mobile:"",imgCode:"",smsCode:""},SMSCodeMessage:this.$t("Send_ValidationCode")}},mounted:function(){this.changeImg()},methods:{changeImg:function(){this.img="https://api-btbh.linsio.cn/api/Account/GetImgCode?t="+Math.random()},getSMScode:function(){var e=this,t=this.changeData,a=t.mobile,n=t.imgCode;this.$verifyData({mobile:a,imgCode:n})&&Object(i["kb"])({mobile:a,imgCode:n}).then(function(t){if(t.result){if(1===t.result){Object(s["Toast"])(e.$t("Error_SMSCode_IsSent")),e.countDown=60;var a=setInterval(function(){e.countDown=e.countDown-1,e.countDown||clearInterval(a)},1e3)}}else e.$toast(t.message)})},sendChangeMobile:function(){var e=this,t=this.changeData,a=t.mobile,n=t.smsCode;Object(i["d"])({mobile:a,smsCode:n}).then(function(t){1===t.result&&(e.$toast(t.message),setTimeout(function(){e.$router.back(-1)},3e3))})}},watch:{countDown:function(e){this.SMSCodeMessage=0==e?this.$t("Send_ValidationCode"):"".concat(e).concat(this.$t("SendSMSCodeAfterSec"))}}},l=c,r=(a("26cd"),a("2877")),d=Object(r["a"])(l,n,o,!1,null,"8036f1fa",null);t["default"]=d.exports},e06d:function(e,t,a){}}]);
//# sourceMappingURL=chunk-43c7c94a.fc743820.js.map