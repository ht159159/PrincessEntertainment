<template>
  <div class="outer">
    <header-cmp title="代理加盟"></header-cmp>
    <ul class="menu">
      <li class="list">
        <div class="list-l">
          <div class="list-l-icon">
            <img src="~@/assets/images/icons/user.png" />
          </div>
          <div class="list-l-text">全名</div>
        </div>
        <div class="list-r">
          <input type="list-r-text" value="Sammi" readonly />
          <div class="list-r-icon"></div>
        </div>
      </li>
      <li class="list">
        <div class="list-l">
          <div class="list-l-icon">
            <img src="~@/assets/images/icons/date.png" />
          </div>
          <div class="list-l-text">出生日期</div>
        </div>
        <div class="list-r">
          <datetime
            input-class="datepicker"
            v-model="date"
            :class="{ disable: !isChangeBirth }"
            placeholder="仅允许修改一次"
            title="出生日期(仅允许修改一次)"
          ></datetime>
          <div class="list-r-icon"></div>
        </div>
      </li>
      <li class="list">
        <div class="list-l">
          <div class="list-l-icon">
            <img src="~@/assets/images/icons/mail.png" />
          </div>
          <div class="list-l-text">电子邮箱</div>
        </div>
        <div class="list-r">
          <input type="list-r-text" value="Sammi@qq.com" readonly />
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
          <div class="list-l-text">手机号码</div>
        </div>
        <div class="list-r">
          <input type="list-r-text" value="180********5" readonly />
          <div class="list-r-icon"></div>
        </div>
      </li>
      <li class="list">
        <div class="list-l">
          <div class="list-l-icon">
            <img src="~@/assets/images/icons/qq.png" />
          </div>
          <div class="list-l-text">QQ号码</div>
        </div>
        <div class="list-r">
          <input type="list-r-text" placeholder="请输入您的QQ号码" readonly />
          <div class="list-r-icon"></div>
        </div>
      </li>
      <li class="list">
        <div class="list-l">
          <div class="list-l-icon">
            <img src="~@/assets/images/icons/skype.png" />
          </div>
          <div class="list-l-text">Skype</div>
        </div>
        <div class="list-r">
          <input
            type="list-r-text"
            placeholder="请输入您的Skype号码"
            readonly
          />
          <div class="list-r-icon"></div>
        </div>
      </li>
    </ul>
    <ul class="menu">
      <li class="list">
        <div class="list-l">
          <div class="list-l-icon">
            <img src="~@/assets/images/icons/user.png" />
          </div>
          <div class="list-l-text">用户名</div>
        </div>
        <div class="list-r">
          <input type="list-r-text" value="Sammi" readonly />
          <div class="list-r-icon"></div>
        </div>
      </li>
      <li class="list">
        <div class="list-l">
          <div class="list-l-icon">
            <img src="~@/assets/images/icons/password.png" />
          </div>
          <div class="list-l-text">密码</div>
        </div>
        <div class="list-r">
          <input type="list-r-text" placeholder="请输入密码" readonly />
          <div class="list-r-icon"></div>
        </div>
      </li>
      <li class="list">
        <div class="list-l">
          <div class="list-l-icon">
            <img src="~@/assets/images/icons/confirmPassword.png" />
          </div>
          <div class="list-l-text">确认密码</div>
        </div>
        <div class="list-r">
          <input type="list-r-text" placeholder="请再次输入密码" readonly />
          <div class="list-r-icon"></div>
        </div>
      </li>
    </ul>
    <ul class="menu">
      <li class="list">
        <div class="list-l">
          <div class="list-l-icon">
            <img src="~@/assets/images/icons/address.png" />
          </div>
          <div class="list-l-text">地址</div>
        </div>
        <div class="list-r">
          <input type="list-r-text" placeholder="请输入有效的地址" readonly />
          <div class="list-r-icon"></div>
        </div>
      </li>
      <li class="list">
        <div class="list-l">
          <div class="list-l-icon">
            <img src="~@/assets/images/icons/changeLang.png" />
          </div>
          <div class="list-l-text">语言</div>
        </div>
        <div class="list-r">
          <input type="list-r-text" placeholder="请选择" readonly />
          <div class="list-r-icon"></div>
        </div>
      </li>
      <li class="list">
        <div class="list-l">
          <div class="list-l-icon">
            <img src="~@/assets/images/icons/website.png" />
          </div>
          <div class="list-l-text">网站</div>
        </div>
        <div class="list-r">
          <input type="list-r-text" placeholder="请输入您的分享网站" readonly />
          <div class="list-r-icon"></div>
        </div>
      </li>
      <li class="list">
        <div class="list-l">
          <div class="list-l-icon">
            <img src="~@/assets/images/icons/website.png" />
          </div>
          <div class="list-l-text">网站</div>
        </div>
        <div class="list-r">
          <input type="list-r-text" placeholder="请输入您的分享网站" readonly />
          <div class="list-r-icon"></div>
        </div>
      </li>
      <li class="list">
        <div class="list-l">
          <div class="list-l-icon">
            <img src="~@/assets/images/icons/website.png" />
          </div>
          <div class="list-l-text">网站</div>
        </div>
        <div class="list-r">
          <input type="list-r-text" placeholder="请输入您的分享网站" readonly />
          <div class="list-r-icon"></div>
        </div>
      </li>
      <li class="list">
        <div class="list-l">
          <div class="list-l-icon">
            <img src="~@/assets/images/icons/suggestion.png" />
          </div>
          <div class="list-l-text">建议</div>
        </div>
        <div class="list-r">
          <input
            type="list-r-text"
            placeholder="请告诉我们您的推广方案"
            readonly
          />
          <div class="list-r-icon"></div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { Datetime } from "vue-datetime";
export default {
  components: {
    Datetime
  },
  data() {
    return {
      date: "",
      pickerShow: false,
      isChangeGender: false,
      isChangeBirth: false,
      gender: ""
    };
  }
};
</script>
<style lang="scss" scoped>
.outer {
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
</style>
