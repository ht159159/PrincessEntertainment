(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ecea33b4"],{"06e0":function(t,i,s){"use strict";s.r(i);var e=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"promotion"},[e("div",{directives:[{name:"show",rawName:"v-show",value:!t.show,expression:"!show"}],staticClass:"promo"},[e("header-cmp",{attrs:{title:t.$t("Promotion_Activity"),isBack:!1}}),e("div",{staticClass:"nav"},[e("ul",t._l(t.promotion,function(i,s){return e("li",{key:i,class:{active:s===t.selected}},[e("a",{attrs:{href:"#"},on:{click:function(i){return i.preventDefault(),t.getActivity(s)}}},[t._v(t._s(i))])])}),0)]),t.activitys.length?e("div",{staticClass:"main"},t._l(t.activitys,function(i){return e("div",{key:i.id,staticClass:"item-group"},[e("div",{staticClass:"pic",on:{click:function(s){return s.preventDefault(),t.showDetails(i.activityName,i.mImgUrl,i.connectionUrl)}}},[e("img",{attrs:{src:i.imgUrl,alt:""}})]),e("div",{staticClass:"title"},[e("h1",[t._v(t._s(i.activityName))]),e("p",[t._v(t._s(i.beginTime)+" "+t._s(t.$t("until"))+" "+t._s(i.endTime))])])])}),0):e("div",{staticClass:"item-none main"},[t._v(t._s(t.$t("NoData")))])],1),e("transition",{attrs:{name:"pop"}},[e("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"pop"},[e("header-cmp",{attrs:{title:t.clickTitle}},[e("template",{slot:"back"},[e("a",{staticClass:"back",attrs:{href:"#"},on:{click:function(i){i.preventDefault(),t.show=!1}}},[e("img",{attrs:{src:s("2100")}})])])],2),e("div",{staticClass:"pop1"},[e("img",{attrs:{src:t.clickImageUrl,width:"100%",height:"auto"}})])],1)])],1)},a=[],c=s("365c"),n={data:function(){return{show:!1,clickTitle:null,clickImageUrl:null,promotion:[this.$t("All"),this.$t("NewMember"),this.$t("Game"),this.$t("promote"),this.$t("other")],selected:0,activitys:[],imgUrl:"https://m-btbh.linsio.cn/resources/gameImages/"}},mounted:function(){this.getActivity(0)},methods:{showDetails:function(t,i,s){""!==s&&null!==s?window.open(s,"_blank"):(this.clickTitle=t,this.clickImageUrl=i,this.show=!0)},getActivity:function(t){var i=this;this.selected=t;var s=t;Object(c["k"])({promotionTypeId:s}).then(function(t){i.activitys=t.data,0==t.result&&(i.activitys=[])})}}},o=n,l=(s("b965"),s("2877")),r=Object(l["a"])(o,e,a,!1,null,"e400d30e",null);i["default"]=r.exports},b00f:function(t,i,s){},b965:function(t,i,s){"use strict";var e=s("b00f"),a=s.n(e);a.a}}]);
//# sourceMappingURL=chunk-ecea33b4.08a41fcb.js.map