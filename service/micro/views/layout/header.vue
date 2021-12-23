<template>
  <a-layout-header class="je-layout-header">
    <a-row align="middle">
      <!-- logo -->
      <a-col class="je-layout-header-logo">
        <i :class="[APP_HTML_ICON]"></i>{{ APP_HTML_TITLE }}
      </a-col>

      <!-- 菜单 -->
      <a-col flex="auto">
        <a-menu
          theme="dark"
          class="je-layout-menu-top"
          mode="horizontal"
          :style="{ lineHeight: '64px' }"
        >
          <a-menu-item v-for="menu in menus" :key="menu.name" @click="openMenu(menu)">
            {{ $t(menu.text) }}
          </a-menu-item>
        </a-menu>
      </a-col>
      <a-col class="je-layout-header-actions">
        <!-- 国际化 -->
        <a-select
          ref="select"
          v-model:value="globalStore.locale"
          class="lang-select"
          @change="changeI18n"
        >
          <a-select-option
            v-for="(item, index) in globalStore.locales"
            :key="index"
            :value="item.code"
          >
            {{ item.text }}
          </a-select-option>
        </a-select>

        <!-- 主题 -->
        <a-popover trigger="click" placement="bottomRight">
          <template #content>
            <div class="je-settings-theme">
              <ThemeColor mode="systemTheme" title="系统主题"></ThemeColor>
              <ThemeMode mode="darkMode" title="深色主题"></ThemeMode>
              <ThemeMode mode="grayMode" title="灰色模式"></ThemeMode>
              <ThemeMode mode="colorWeak" title="色弱模式"></ThemeMode>
            </div>
          </template>
          <div class="action">
            <i class="fal fa-palette"></i>
          </div>
        </a-popover>
        <!-- 退出 -->
        <div v-if="globalStore.token" class="action logout-icon" @click="logout">
          <i class="fal fa-sign-out-alt"></i>
        </div>
      </a-col>
    </a-row>
  </a-layout-header>
</template>
<script>
  import { defineComponent, ref, unref } from 'vue';
  import { useRouter } from 'vue-router';
  import { Layout, Row, Col, Menu, Popover, Switch, Select } from 'ant-design-vue';
  import { CLI_ENVS } from '@common/helper/constant';
  import { logout } from '@common/helper/system';
  import { changeI18n } from '@common/locales';
  import { useGlobalStore } from '@common/store/global-store';
  import ThemeColor from '@common/components/theme/theme-color.vue';
  import ThemeMode from '@common/components/theme/theme-mode.vue';
  import { useMenu } from '@micro/hooks/use-menu';
  export default defineComponent({
    name: 'Header',
    components: {
      ALayoutHeader: Layout.Header,
      ARow: Row,
      ACol: Col,
      APopover: Popover,
      AMenu: Menu,
      AMenuItem: Menu.Item,
      ASelect: Select,
      ASelectOption: Select.Option,
      ThemeColor,
      ThemeMode,
    },
    setup() {
      const globalStore = useGlobalStore();
      const router = useRouter();
      // 系统变量
      const { VUE_APP_HTML_TITLE, VUE_APP_HTML_ICON, PUBLIC_PATH } = CLI_ENVS;
      // 菜单数据
      const { menus } = useMenu();
      const openMenu = function (item) {
        if (item.redirect) {
          const path = (PUBLIC_PATH + item.redirect).replace('//', '/');
          window.open(path);
        } else {
          router.push({ name: item.name });
        }
      };

      return {
        globalStore,
        menus,
        APP_HTML_TITLE: VUE_APP_HTML_TITLE,
        APP_HTML_ICON: VUE_APP_HTML_ICON,
        openMenu,
        logout,
        changeI18n,
      };
    },
  });
</script>
<style lang="less" scoped>
  .je-layout-header {
    padding: 0;
    .je-layout-header-logo {
      padding: 0 20px;
      color: #fff;
      font-size: 20px;
      font-weight: bold;
      min-width: 200px;
      i {
        margin-right: 10px;
      }
    }
    .je-layout-header-actions {
      display: flex;
      align-items: center;
      .lang-select {
        width: 100px;
        margin-right: 20px;
      }
      .action {
        cursor: pointer;
        display: flex;
        padding: 0 20px;
        color: @white;
        font-size: 24px;
        i {
          line-height: 64px;
        }
      }
    }
  }
</style>
