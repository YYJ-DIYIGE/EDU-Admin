<template>
  <div class="sider-section">
    <div class="logo-section">
      <div class="logo-title">EDU 后台</div>
    </div>
    <Menu class="menu-section" />
  </div>
</template>

<script>
import Menu from "./BasicLayoutSiderMenu.vue";
export default {
  components: {
    Menu
  }
};
</script>

<style type="text/css" lang="less">
.sider-section {
  position: relative;
  width: 240px;
  background-color: #fff;
  box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 0.05);
  transition: all 0.2s ease;
}

.logo-section {
  position: relative;
  height: 64px;
  background-color: #fff;
  box-shadow: 1px 1px 0 0 #e8e8e8;
  z-index: 1;
  display: flex;
  align-items: center;
  font-family: Futura, Helvetica Neue For Number, -apple-system,
    BlinkMacSystemFont, Segoe UI, Roboto, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, Helvetica Neue, Helvetica, Arial, sans-serif;
  .logo-title {
    width: 100%;
    text-align: center;
    font-size: 18px;
    font-weight: 600;
  }
}
</style>
