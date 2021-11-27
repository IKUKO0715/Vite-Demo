<template>
  <!-- <el-menu :default-openeds="['1', '3']" style="height: 100%"> -->
  <el-menu
    router
    :default-active="currentPath"
    style="height: 100%; width: 100%"
    :collapse="menuCollapse"
    :collapse-transition="false"
    @open="handleOpen"
    @close="handleClose"
  >
    <el-sub-menu index="/">
      <template #title>
        <el-icon><location /></el-icon> <span>Navigator One</span>
      </template>

      <el-sub-menu index="/appListTable">
        <template #title><span>item one</span></template>
        <el-menu-item index="/appListTable">item one</el-menu-item>
        <el-menu-item index="/appListChart">item two</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>

    <el-menu-item index="2">
      <el-icon><icon-menu /></el-icon>
      <template #title>Navigator Two</template>
    </el-menu-item>

    <el-menu-item index="3" disabled>
      <el-icon><document /></el-icon>
      <template #title>Navigator Three</template>
    </el-menu-item>

    <el-menu-item index="4">
      <el-icon><setting /></el-icon>
      <template #title>Navigator Four</template>
    </el-menu-item>
  </el-menu>
</template>
<script>
import { defineComponent, inject, computed, getCurrentInstance } from "vue";
import { Location, Document, Menu as IconMenu, Setting } from "@element-plus/icons";

export default defineComponent({
  components: {
    Location,
    Document,
    Setting,
    IconMenu,
  },
  setup() {
    //调用 inject 函数，通过指定的数据名称获取到父级共享的数据：const customVal = inject("customVal");
    const isCollapse = inject("isCollapse");
    // 左侧菜单是否折叠：子组件绑定el-menu用
    const menuCollapse = computed(() => {
      return isCollapse.value == "true" ? true : false;
    });
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath);
    };
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath);
    };
    const { proxy } = getCurrentInstance();
    const currentPath = proxy.$route.path;

    let methods = {
      handleOpen,
      handleClose,
    };
    return {
      menuCollapse,
      currentPath,

      ...methods,
    };
  },
});
</script>
<style></style>
