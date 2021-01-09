<template>
  <div class="agent">
    <header-cmp title="代理中心" />
    <div class="menus">
      <ul class="menu">
        <router-link tag="li" to="/agent/query" class="list list-clickable">
          <div class="list-l">
            <div class="list-l-text">{{ $t("PerformanceQuery") }}</div>
          </div>
          <div class="list-r">
            <div class="list-r-icon"></div>
          </div>
        </router-link>
        <!-- 排線碼 -->
        <!-- <router-link tag="li" to="/agent/layer" class="list list-clickable">
          <div class="list-l">
            <div class="list-l-text">{{ $t("Layer") }}</div>
          </div>
          <div class="list-r">
            <div class="list-r-icon"></div>
          </div>
        </router-link> -->
        <router-link tag="li" to="/agent/mange" class="list list-clickable">
          <div class="list-l">
            <div class="list-l-text">{{ $t("SubManage") }}</div>
          </div>
          <div class="list-r">
            <div class="list-r-icon"></div>
          </div>
        </router-link>
        <router-link tag="li" to="/agent/subordinatequery" class="list list-clickable">
          <div class="list-l">
            <div class="list-l-text">{{ $t("SubSearch") }}</div>
          </div>
          <div class="list-r">
            <div class="list-r-icon"></div>
          </div>
        </router-link>
        <router-link tag="li" to="/agent/subordinate" class="list list-clickable">
          <div class="list-l">
            <div class="list-l-text">{{ $t("DevelopeSub") }}</div>
          </div>
          <div class="list-r">
            <div class="list-r-icon"></div>
          </div>
        </router-link>
        <router-link tag="li" to="/agent/faq" class="list list-clickable">
          <div class="list-l">
            <div class="list-l-text">{{ $t("rebateInstructions") }}</div>
          </div>
          <div class="list-r">
            <div class="list-r-icon"></div>
          </div>
        </router-link>
        <router-link tag="li" to="/agent/superAgent" class="list list-clickable">
          <div class="list-l">
            <div class="list-l-text">{{ $t("SuperAgent") }}</div>
          </div>
          <div class="list-r">
            <div class="list-r-icon"></div>
          </div>
        </router-link>
      </ul>
    </div>
  </div>
</template>
