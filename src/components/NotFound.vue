<template>
  <el-container style="height: 100%">
    <el-aside width="40%" style="background-color: #f2f2f2">
      <div style="height: 100%; width: 400px">
        <el-image src="/src/assets/404.png" style="margin-top: 150px"></el-image>
      </div>
    </el-aside>

    <el-main style="height: 936px">
      <div
        style="
          color: #ffffff;
          text-align: left;
          padding: 180px 0 0 100px;
          font-size: 16px;
        "
      >
        <h1 style="font-size: 200px; font-weight: bold">404</h1>
        <h1>Sorry!</h1>
        <h3 style="margin: 30px 0">The page you visited does not exist.</h3>
        <div style="margin: 20px 0">
          <p>The page you are looking for has been deleted or temporarily unavailable.</p>
          <p>
            Click the link below to continue browsing other information on the website.
          </p>
        </div>
        <div style="margin: 10px 0">
          <p>
            <a
              @click="toPrevious"
              style="color: #ffffff; text-decoration: none; cursor: pointer"
              >&gt;&gt;&nbsp;&nbsp;Return to the previous page</a
            >
          </p>
          <p>
            <a
              @click="toMain"
              style="color: #ffffff; text-decoration: none; cursor: pointer"
              >&gt;&gt;&nbsp;&nbsp;Back to the homepage of the site</a
            >
          </p>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import { defineComponent } from "vue";
import { Message, Menu, Setting } from "@element-plus/icons";

export default defineComponent({
  components: {
    Message,
    Setting,
    "icon-menu": Menu,
  },
  setup() {
    // 回到上一页
    const toPrevious = () => {
      window.history.back();
    };
    // 回到首页
    const toMain = () => {
      window.location.href = "/appList";
    };

    let methods = { toPrevious, toMain };
    return {
      ...methods,
    };
  },
});
</script>

<style>
.el-container {
  color: var(--el-color-primary);
  background-color: var(--el-color-primary);
}
.el-header {
  background-color: #ffffff;
  color: var(--el-text-color-primary);
  line-height: 60px;
}

.el-aside {
  color: var(--el-text-color-primary);
}

.flex-center-flex-end {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
p {
  padding: 5px 0;
}
</style>
