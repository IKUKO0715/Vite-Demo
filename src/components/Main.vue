<template>
  <el-config-provider :locale="elLocale">
    <el-container style="border: 1px solid #eee">
      <!-- <el-aside width="200px"> -->
      <el-aside :width="asideWidth">
        <MyMenu></MyMenu>
        <!-- <v-mymenu></v-mymenu>
        <my-menu></my-menu> -->
      </el-aside>

      <el-container>
        <el-header class="flex-center-space-between">
          <div class="collapseBtn" @click="collapseMenu">
            <el-icon v-if="asideWidth == '64px'"><Expand /></el-icon>
            <el-icon v-else><Fold /></el-icon>
          </div>
          <!-- <el-radio-group
            v-model="toggle_collapse"
            size="mini"
            style="margin-right: 20px"
            @change="changeMenu"
          >
            <el-radio-button :label="false">expand</el-radio-button>
            <el-radio-button :label="true">collapse</el-radio-button>
          </el-radio-group> -->
          <div class="flex-center-flex-end">
            <el-radio-group
              v-model="toggle_locale"
              size="mini"
              border
              style="margin-right: 20px"
              @change="changeLanguage"
            >
              <!-- <el-radio-button label="简体中文"></el-radio-button>
          <el-radio-button label="英语"></el-radio-button> -->
              <el-radio-button :label="chi">{{ $t("nav.chi") }}</el-radio-button>
              <el-radio-button :label="eng">{{ $t("nav.eng") }}</el-radio-button>
            </el-radio-group>
            <el-dropdown>
              <el-avatar
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
              ></el-avatar>
              <template #dropdown>
                <el-dropdown-menu>
                  <!-- <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item>退出登录</el-dropdown-item> -->
                  <el-dropdown-item>{{ $t("nav.personalCenter") }}</el-dropdown-item>
                  <el-dropdown-item @click="logout">{{
                    $t("nav.logout")
                  }}</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-header>

        <el-main>
          <!-- <el-color-picker v-model="colorPicker" />
          <el-table :data="tableData">
            <el-table-column prop="date" label="Date" width="140"></el-table-column>
            <el-table-column prop="name" label="Name" width="120"></el-table-column>
            <el-table-column prop="address" label="Address"> </el-table-column>
          </el-table> -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-config-provider>
</template>

<script>
import { defineComponent, ref, provide, computed } from "vue";
import { Expand, Fold } from "@element-plus/icons";
import { useI18n } from "vue-i18n";
import MyMenu from "../components/MyMenu.vue";

// ElementPlus组件国际化
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import en from "element-plus/lib/locale/lang/en";

export default defineComponent({
  components: {
    ElConfigProvider,
    MyMenu,
    Expand,
    Fold,
  },
  setup() {
    // 退出登录
    const logout = () => {
      localStorage.removeItem("Token");
      window.location.href = "/login";
    };

    // i18n
    // 自定义国际化
    const { locale } = useI18n(); // vue-i18n提供了一个钩子函数 useI18n(),暴露出locale属性用于切换语言
    locale.value = localStorage.getItem("locale") || "zh_CN"; // 要切换的语言
    const chi = useI18n().t("nav.chi");
    const eng = useI18n().t("nav.eng");
    let myLocale = useI18n().locale.value;
    // 切换按钮组选中值
    const toggle_locale = myLocale === "zh_CN" ? ref(chi) : ref(eng);
    // Element Plus组件国际化
    const elLocale_zh = ref(zhCn);
    const elLocale_en = ref(en);
    let elLocale = localStorage.getItem("locale") == "zh_CN" ? elLocale_zh : elLocale_en;
    // 单选按钮组监听事件
    const changeLanguage = (e) => {
      if (e == chi) {
        myLocale = "zh_CN";
        locale.value = "zh_CN";
        // 组件国际化
        const temp = elLocale_zh.value;
        elLocale_zh.value = elLocale_en.value;
        elLocale_en.value = temp;
      } else if (e == eng) {
        myLocale = "en_US";
        locale.value = "en_US";
        // 组件国际化
        const temp = elLocale_en.value;
        elLocale_en.value = elLocale_zh.value;
        elLocale_zh.value = temp;
      }
      localStorage.setItem("locale", myLocale);
    };

    // 侧边导航栏
    // 左侧菜单是否折叠：父组件初始化单选框组用，并传给子组件，初始化为展开状态
    const isCollapse = ref(false);
    // 将值传给自定义组件：provide('数据名称', 要传递的数据)
    provide("isCollapse", isCollapse);
    // 计算asideWidth的值，与isCollapse同步更新
    const asideWidth = computed(() => {
      return isCollapse.value == "true" ? "64px" : "200px";
    });
    // 切换菜单折叠与否
    const changeMenu = (e) => {
      // console.log(e);
      isCollapse.value = e ? "true" : "false";
    };
    const collapseMenu = () => {
      let current = isCollapse.value == "true" ? false : true;
      isCollapse.value = current ? "true" : "false";
    };

    let methods = {
      // 退出登录
      logout,
      // 切换语言
      changeLanguage,
      // 菜单折叠
      changeMenu,
      collapseMenu,
    };
    return {
      // toggle_locale: ref("简体中文"),
      // i18n
      chi,
      eng,
      toggle_locale,
      colorPicker: ref("#409EFF"),
      elLocale,
      // 折叠菜单
      // toggle_collapse: ref(true),
      toggle_collapse: ref(isCollapse.value),
      asideWidth,

      ...methods,
    };
  },
});
</script>

<style>
.el-container {
  height: auto;
  min-height: 1200px;
}
.el-header {
  background-color: var(--el-color-white);
  color: var(--el-text-color-primary);
  line-height: 60px;
  padding-left: 0;
}

.el-aside {
  color: var(--el-text-color-primary);
}

.flex-center-flex-end {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.flex-center-space-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.collapseBtn {
  width: 60px;
  height: 60px;
  cursor: pointer;
  color: var(--el-text-color-secondary);
  /* color: var(--el-text-color-placeholder); */
}
.collapseBtn:hover {
  background-color: var(--el-color-primary-light-9);
  border-color: var(--el-color-primary-light-7);
  color: var(--el-color-primary-light-2);
}

.collapseBtn .el-icon {
  font-size: 1.2em;
  width: 1.2em;
  height: 1.2em;
  line-height: 1.2em;
  padding-top: 0.9em;
}

.collapseBtn .el-icon svg {
  width: 1.2em;
  height: 1.2em;
}
</style>
