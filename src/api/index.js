import service from "./base";

// 設定是否需要傳送token驗證 預設沒寫為不用
const needAuth = true;

// 登入
export const apiGetToken = data => {
  return service.post("/Account/GetToken", data);
};

// 游客登入
export const apiYkLogIn = params => {
  return service.get("/Account/YkLogIn", { params });
};

// 註冊
export const apiRegister = data => {
  return service.post("/Account/Register", data);
};

// 刷新token
export const apiRefreshToken = params => {
  return service.get("/Account/RefreshToken", {
    params,
    needAuth,
    noLoading: true
  });
};

// 发送注册手机验证码
export const apiGetSMSCode = params => {
  return service.get("/Account/GetSMSCode", { params });
};

// 发送圖形验证码
export const apiGetImgCode = () => {
  return service.get("/Account/GetImgCode");
};

// 发送信箱手机验证码
export const apiSendRegisterEmailCode = params => {
  return service.get("/Account/SendRegisterEmailCode", { params });
};

// 忘記密碼
export const apiForgotPasswordValid = params => {
  return service.get("/Account/ForgotPasswordValid", { params });
};

// 郵箱找回密碼
export const apiForgotPasswordEmail = data => {
  return service.post("/Account/ForgotPasswordEmail", data);
};

// 修改密码
export const apiChangePassword = data => {
  return service.post("/Account/ChangePassword", data, { needAuth });
};

// 修改取款密码
export const apiChangeWalletPassword = data => {
  return service.post("/Account/ChangePassword", data, { needAuth });
};

// 个人信息
export const apiGetPersonalInformation = params => {
  return service.get("/Account/GetPersonalInformation", {
    params,
    needAuth,
    noLoading: true
  });
};
export const apiGetUnreadMessage = params => {
  return service.get("/Account/GetUnreadMessage", {
    params,
    needAuth,
    noLoading: true
  });
};
// 修改个人信息
export const apiUpdatePersonalInformation = data => {
  return service.post("/Account/UpdatePersonalInformation", data, { needAuth });
};
// 发送修改手机号验证码
export const apiSendUpdateMobileCode = params => {
  return service.get("/Account/SendUpdateMobileCode", { params, needAuth });
};
// 修改绑定手机号
export const apiChangePhoneNumberBind = data => {
  return service.post("/Account/ChangePhoneNumberBind", data, { needAuth });
};
// 修改地址
export const apiAddress = data => {
  return service.post("/Account/Address", data, { needAuth });
};
// 绑定银行卡
export const apiBindBankNo = data => {
  return service.post("/Account/BindBankNo", data, { needAuth });
};
// 或許銀行信息
export const apiGetBankInfo = params => {
  return service.get("/Account/GetBankInfo", { params, needAuth });
};
// 流水報表
export const apiGetNeedAmunot = params => {
  return service.get("/Account/GetNeedAmunot", { params, needAuth });
};
// 获取首页Banner
export const apiGetBanner = params => {
  return service.get("/Info/GetBanner", { params });
};

// 跑马灯滚动内容
export const apiMarqueeScrollContent = params => {
  return service.get("/Info/MarqueeScrollContent", { params });
};
// 跑马灯弹出内容层
export const apiShowScrollMessage = params => {
  return service.get("/Info/ShowScrollMessage", { params });
};

// 优惠活动
export const apiGetActivity = params => {
  return service.get("/Info/GetActivity", { params });
};
// 已讀郵件
export const apiHaveReadMessger = params => {
  return service.get("/Info/HaveReadMessger", { params, needAuth });
};
// 站內信
export const apiGetMessage = params => {
  return service.get("/Info/GetMessage", { params, needAuth });
};

// 客服的接口
export const apiGetCustomerService = params => {
  return service.get("/Info/GetCustomerService", { params, needAuth });
};

// 充值&轉帳紀錄
export const apiGetOrders = params => {
  return service.get("/History/GetOrders", { params, needAuth });
};

// 轉帳紀錄
export const apiGetTransfers = params => {
  return service.get("/History/GetTransfers", { params, needAuth });
};

// 反水记录
export const apiGetRebates = params => {
  return service.get("/History/GetRebates", { params, needAuth });
};

// 投注记录
export const apiGetBetLogs = params => {
  return service.get("/History/GetBetLogs", { params, needAuth });
};

// 紅利紀錄
export const apiGetCommission = params => {
  return service.get("/History/GetCommission", { params, needAuth });
};

// 超級代理
export const apiGetMemDayRoomRpt = params => {
  return service.get("/History/GetMemDayRoomRpt", { params, needAuth });
};

// 获取主游戏列表
export const apiGameTypeList = params => {
  return service.get("/Game/GameTypeList", { params, needAuth });
};

//获取游戏列表
export const apiGetGames = params => {
  return service.post("/Game/GetGames", params, needAuth);
};

// 获取子游戏列表
export const apiGetChildGames = data => {
  return service.post("/Game/GetChildGames", data, { needAuth });
};

// 开始游戏
export const apiStartGame = params => {
  return service.get("/Game/StartGame", { params, needAuth });
};

// 投注记录游戏列表
// export const apiGetGameType = data => {
//   return service.post("/Game/GetGameType", data, { needAuth });
// };
// 獲取取渠道列表
export const apiGetBalanceAsync = params => {
  return service.get("/Payment/GetBalanceAsync", { params, needAuth });
};
// 獲取取渠道列表
export const apiGetListBalanceAsync = data => {
  return service.post("/Payment/GetListBalanceAsync", data, { needAuth });
};
// 中心钱包
export const apiGetMidBalanceAsync = data => {
  return service.post("/Payment/GetMidBalanceAsync", data, { needAuth });
};
// 获取游戏余额
export const apiGetPayType = params => {
  return service.get("/Payment/GetPayType", { params, needAuth });
};

// 獲取取渠道列表
export const apiGetPlat = params => {
  return service.get("/Payment/GetPlat", { params, needAuth });
};

//Mao_获取游戏余额
export const apiMaoGetBalanceAsync = params => {
  return service.get("/Payment/MaoGetBalanceAsync", { params, needAuth });
};

// 充值
export const apiMaoPay = params => {
  return service.get("/Payment/MaoPay", { params, needAuth });
};
// 提款
export const apiMaoPayBankTransfer = data => {
  return service.post("/Payment/MaoPayBankTransfer", data, { needAuth });
};
// 提款資料
export const apiGetBankTransfer = params => {
  return service.get("/Payment/GetBankTransfer", { params, needAuth });
};
// 获取付款方式
export const apiTransferAmountAsync = data => {
  return service.post("/Payment/TransferAmountAsync", data, { needAuth });
};
// 修改取款密码
export const apiUpdateWalletPwd = data => {
  return service.post("/Account/UpdateWalletPwd", data, { needAuth });
};

// 修改取款密码
export const apiGetLanguages = () => {
  return service.get("/Setting/GetLanguages");
};

// 代理加盟注册 -
export const apiRegisterAgent = data => {
  return service.post("/Account/RegisterAgent", data, { needAuth });
};

// 取得銀行列表
export const apiGetBankList = data => {
  return service.post("/Payment/GetBankList", data, { needAuth });
};
// 取得銀行列表
export const apiGetBankInfoPay = params => {
  return service.get("/Payment/GetBankInfo", { params, needAuth });
};
// 卡转卡充值
export const apiPayForBank = data => {
  return service.post("/Payment/PayForBank", data, { needAuth });
};
// 创建备注码
export const apiGetRandomFour = data => {
  return service.post("/Payment/GetRandomFour", data, { needAuth });
};

// 兌換碼
export const apiExchangeSomething = params => {
  return service.get("/Payment/ExchangeSomething", { params, needAuth });
};

// 兌換紀錄
export const apiGetExchangeLog = data => {
  return service.post("/Payment/GetExchangeLog", data, { needAuth });
};

// 銀行卡列表
export const apiGetMyBankList = params => {
  return service.get("/Account/GetMyBankList", { params, needAuth });
};
// 刪除銀行卡
export const apiDelBankNo = params => {
  return service.get("/Account/DelBankNo", { params, needAuth });
};

// 獲取人工儲值訊息
export const apiGetCustomer = () => {
  return service.get("/Payment/GetCustomer", { needAuth });
};

// 業績查詢 业绩面板数据汇总
export const apiGetFeatSum = params => {
  return service.get("/AgentCenter/GetFeatSum", { params, needAuth });
};
// 業績查詢 我的直营业绩,数据获取
export const apiGetSonBetList = params => {
  return service.get("/AgentCenter/GetSonBetList", { params, needAuth });
};

// 業績查詢 直属代理的业绩,数据获取
export const apiGetSonTeamBetList = params => {
  return service.get("/AgentCenter/GetSonTeamBetList", { params, needAuth });
};

//
// 排線碼 列表获取
export const apiGetTeamCodes = params => {
  return service.get("/TeamCode/GetTeamCodes", { params, needAuth });
};
// 排線碼 生成
export const apiCreateTeamCode = data => {
  return service.post("/TeamCode/CreateTeamCode", data, { needAuth });
};

// 排線碼 修改排线名
export const apiChangeTeamName = data => {
  return service.post("/TeamCode/ChangeTeamName", data, { needAuth });
};

// 排線碼 分享链接
export const apiGetShareUrl = params => {
  return service.get("/TeamCode/GetShareUrl", { params, needAuth });
};

// 排線碼 重置
export const apiResetTeamCode = data => {
  return service.post(`/TeamCode/ResetTeamCode?id=${data}`, data, { needAuth });
};

// 排线码-团队列表
export const apiGetTeamMembers = data => {
  return service.post("/TeamCode/GetTeamMembers", data, { needAuth });
};

// 推广码发展下级
export const apiReferralCode = params => {
  return service.get("/Account/ReferralCode", { params, needAuth });
};

// 第一次登入紀錄
// export const apiUpdatePrompt = params => {
//   return service.get("/Account/UpdatePrompt", { params, needAuth });
// };

// 下级列表,数据获取
export const apiGetMemberlist = params => {
  return service.get("/AgentCenter/GetMemberlist", { params, needAuth });
};

// 下级查询
export const apiSearchMember = params => {
  return service.get("/AgentCenter/SearchMember", { params, needAuth });
};

// 获取玩家VIP等级信息
export const apiGetMemRank = params => {
  return service.get("/Rank/GetMemRank", { params, needAuth });
};

// 获取站点VIP详情
export const apiGetRanks = params => {
  return service.get("/Rank/GetRanks", { params, needAuth });
};

// 晋升礼金领取
export const apiGetBaseBonus = params => {
  return service.get("/Rank/GetBaseBonus", { params, needAuth });
};

// 日俸禄领取
export const apiGetDayBonus = params => {
  return service.get("/Rank/GetDayBonus", { params, needAuth });
};

// 周奖金领取
export const apiGetWeekBonus = params => {
  return service.get("/Rank/GetWeekBonus", { params, needAuth });
};

// 月俸禄领取
export const apiGetMonthBonus = params => {
  return service.get("/Rank/GetMonthBonus", { params, needAuth });
};

// 保險箱
export const apiSafeInput = data => {
  return service.post("/Payment/MaoSafe", data, { needAuth });
};