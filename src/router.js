import Vue from "vue";
import Router from "vue-router";
import Index from "./views/index/Index.vue";
import Layout from "./views/Layout.vue";
// import storage from "./utils/storage.js";
Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    // 引導頁
    {
      path: "/guide",
      name: "guide",
      component: () => import("@/views/index/Guide.vue"),
      meta: { noNeedAuth: true }
    },
    // 引導頁(不需要手機)
    {
      path: "/nguide",
      name: "nguide",
      component: () => import("@/views/index/NGuide.vue"),
      meta: { noNeedAuth: true }
    },
    {
      path: "/",
      name: "index",
      component: Index,
      meta: { noNeedAuth: true }
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./views/index/Login.vue"),
      meta: { noNeedAuth: true }
    },
    // 註冊
    {
      path: "/register",
      name: "register",
      component: () => import("./views/index/Register.vue"),

      meta: { noNeedAuth: true }
    },
    // 註冊(不需要手機)
    {
      path: "/nregister",
      name: "nregister",
      component: () => import("./views/index/NRegister.vue"),

      meta: { noNeedAuth: true }
    },
    {
      path: "/forgetpassword/:id",
      name: "forgetpassword",
      component: () => import("@/views/index/ForgetPassword.vue"),
      meta: { noNeedAuth: true }
    },

    //客服
    {
      path: "/CustomerService",
      name: "CustomerService",
      component: () => import("@/views/others/CustomerService.vue"),
      //meta: { noNeedAuth: true }
    },
    {
      path: "",
      component: Layout,
      children: [
        //主页
        {
          path: "/main",
          name: "main",
          component: () => import("./views/Main.vue")
        },
        //个人中心
        {
          path: "/center",
          name: "center",
          component: () => import("./views/Center.vue")
        },
        //活动页
        {
          path: "/promotion",
          name: "promotion",
          component: () => import("@/views/others/Promotion.vue")
        }
      ]
    },
    // 子遊戲列表
    {
      path: "/childGame",
      name: "childGame",
      component: () => import("@/views/ChildGame.vue")
    },

    // 中心錢包
    {
      path: "/gamebalance",
      name: "gamebalance",
      component: () => import("@/views/personalCenter/GameBalance.vue")
    },
    // 個人資料
    {
      path: "/personal",
      name: "personal",
      component: () => import("@/views/personalCenter/Personal.vue")
    },
    // 代理加盟
    {
      path: "/agentjoined",
      name: "agentjoined",
      component: () => import("@/views/personalCenter/AgentJoined.vue")
    },
    // 兌換紀錄
    {
      path: "/traderecord",
      name: "traderecord",
      component: () => import("@/views/finacialCenter/TradeRecord.vue")
    },
    // 代理加盟
    {
      path: "/agentjoin",
      name: "agentjoin",
      component: () => import("@/views/personalCenter/AgentJoin.vue")
    },
    // 添加手機號碼
    {
      path: "/phoneadd",
      name: "phoneadd",
      component: () => import("@/views/personalCenter/PhoneAdd.vue")
    },
    // 手機號碼變更
    {
      path: "/phonechange",
      name: "phonechange",
      component: () => import("@/views/personalCenter/PhoneChange.vue")
    },
    // 地址
    {
      path: "/address",
      name: "address",
      component: () => import("@/views/personalCenter/Address.vue")
    },
    // 建議
    {
      path: "/suggest",
      name: "suggest",
      component: () => import("@/views/personalCenter/Suggest.vue")
    },
    // 銀行卡設置
    {
      path: "/bankcardsetting",
      name: "bankcardsetting",
      component: () => import("@/views/personalCenter/Bankcardsetting.vue")
    },
    // 財務中心-紀錄
    {
      path: "/records",
      component: () => import("@/views/finacialCenter/Records.vue"),
      children: [
        {
          path: "",
          name: "commissionRecord",
          component: () =>
            import("@/views/finacialCenter/records/Commission.vue")
        },
        {
          path: "records",
          name: "records",
          component: () => import("@/views/finacialCenter/records/Deposit.vue")
        },
        {
          path: "withdrawRecord",
          name: "withdrawRecord",
          component: () => import("@/views/finacialCenter/records/Withdraw.vue")
        },
        {
          path: "transferRecord",
          name: "transferRecord",
          component: () => import("@/views/finacialCenter/records/Transfer.vue")
        }
      ]
    },
    // 投注紀錄
    {
      path: "/betrecords",
      name: "betrecords",
      component: () => import("@/views/finacialCenter/BetRecords.vue")
    },

    // 流水報表
    {
      path: "/FlowReport",
      name: "FlowReport",
      component: () => import("@/views/finacialCenter/FlowReport.vue")
    },

    // 站內信
    {
      path: "/message",
      name: "message",
      component: () => import("@/views/message/Message.vue")
    },
    // 寫信
    {
      path: "/compose",
      name: "compose",
      component: () => import("@/views/message/Compose.vue")
    },
    // 充值
    {
      path: "/thirdpartypayment",
      name: "thirdpartypayment",
      meta: { noNeedAuth: true },
      component: () => import("@/views/finacialCenter/ThirdPartyPayment.vue")
    },
    // 繳費頁面
    {
      path: "/ZhiGuanPay",
      name: "ZhiGuanPay",
      component: () => import("@/views/finacialCenter/ZhiGuanPay.vue")
    },
    // 我的消息
    {
      path: "/mynews",
      name: "mynews",
      component: () => import("@/views/message/MyNews.vue")
    },
    // 更改密碼
    {
      path: "/changepassword",
      name: "changepassword",
      component: () => import("@/views/finacialCenter/ChangePassword.vue")
    },
    // 資金密碼設置
    {
      path: "/fundpasswordsetting",
      name: "fundpasswordsetting",
      component: () => import("@/views/finacialCenter/FundPasswordSetting.vue")
    },
    // 提款
    {
      path: "/withdraw",
      name: "withdraw",
      component: () => import("@/views/finacialCenter/Withdraw.vue")
    },
    // 銀行卡編輯
    {
      path: "/bankcardedit",
      name: "bankcardedit",
      component: () => import("@/views/finacialCenter/BankcardEdit.vue")
    },
    // 轉帳
    {
      path: "/transfermoney",
      name: "transfermoney",
      component: () => import("@/views/finacialCenter/TransferMoney.vue")
    },
    // 選擇銀行
    {
      path: "/selectbank",
      name: "selectbank",
      component: () => import("@/views/finacialCenter/SelectBank.vue")
    },
    // 添加銀行卡
    {
      path: "/addbankcard",
      name: "addbankcard",
      component: () => import("@/views/finacialCenter/AddBankcard.vue")
    },
    // 下載頁
    {
      path: "/downloadpage",
      name: "downloadpage",
      component: () => import("@/views/others/DownloadPage.vue")
    },
    // 兌換
    {
      path: "/redeem",
      name: "redeem",
      component: () => import("@/views/finacialCenter/Redeem.vue")
    },
    // 銀行卡管理
    {
      path: "/bankcard",
      name: "bankcard",
      component: () => import("@/views/finacialCenter/BankCard.vue")
    },
    // 保險箱
    {
      path: "/safe",
      name: "safe",
      component: () => import("@/views/finacialCenter/Safe.vue")
    },
    // 代理中心
    {
      path: "/agent",
      component: () => import("@/views/agent/index.vue"),
      children: [
        {
          path: "",
          name: "agent",
          component: () => import("@/views/agent/Center.vue")
        },
        {
          path: "query",
          name: "query",
          component: () => import("@/views/agent/Query.vue")
        },
        // 排線碼
        {
          path: "layer",
          name: "layer",
          component: () => import("@/views/agent/Layer.vue")
        },
        // 團隊列表
        {
          path: "layer/teamList",
          name: "teamList",
          component: () => import("@/views/agent/TeamList.vue")
        },
        {
          path: "mange",
          name: "mange",
          component: () => import("@/views/agent/Mange.vue")
        },
        {
          path: "subordinate",
          name: "subordinate",
          component: () => import("@/views/agent/Subordinate.vue")
        },
        {
          path: "subordinatequery",
          name: "subordinatequery",
          component: () => import("@/views/agent/SubordinateQuery.vue")
        },
        {
          path: "faq",
          name: "faq",
          component: () => import("@/views/agent/FAQ.vue")
        },
        {
          path: "superAgent",
          name: "superAgent",
          component: () => import("@/views/agent/SuperAgent.vue")
        }
      ]
    },
    {
      path: "/maintenance",
      name: "maintenance",
      component: () => import("@/views/others/Maintenance.vue")
    },
    //我的VIP
    {
      path: "/MyVip",
      name: "MyVip",
      component: () => import("@/views/others/MyVip.vue")
    },
    {
      path: "*",
      redirect: "/main"
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.name === "thirdpartypayment") {
    next();
    return
  }
  // 不用token頁面
  if (to.matched.some(record => record.meta.noNeedAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (localStorage.getItem("token")) {
      if (to.matched.some(record => record.name === "CustomerService")) {
        if (to.name === "CustomerService") {
          next();
          return;
        }
        next({
          name: "CustomerService"
        });
      } else {
        next({
          name: "main"
        });
      }
    } else {
      next();
    }
  }
  // 需要token頁面
  else {
    if (!localStorage.getItem("token")) {
      next({
        name: "index"
      });
    } else {
      next();
    }
  }
});

export default router;
