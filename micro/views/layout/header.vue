<template>
  <a-layout-header class="header">
    <a-row align="middle">
      <a-col class="logo"><i :class="[APP_HTML_ICON]"></i>{{ APP_HTML_TITLE }}</a-col>
      <a-col flex="auto" class="menu">
        <a-menu theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }">
          <a-menu-item v-for="menu in menus" :key="menu.name" @click="openMenu(menu)">
            {{ $t(menu.text) }}
          </a-menu-item>
        </a-menu>
      </a-col>
      <a-col class="action">
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
        <a-popover trigger="click" placement="bottomRight">
          <template #content>
            <div class="theme">
              <i
                v-for="t in themes"
                :key="t.code"
                :class="[
                  'theme-color',
                  'fas',
                  theme.code === t.code ? 'fa-check-square' : 'fa-square',
                ]"
                :style="{ color: t.color }"
                @click="theme = t"
              ></i>
              <div> 暗色主题：<a-switch v-model:checked="dark" /> </div>
              <div> 灰色模式：<a-switch v-model:checked="gray" /> </div>
              <div> 色弱模式：<a-switch v-model:checked="colorWeek" /> </div>
            </div>
          </template>
          <div class="action-icon">
            <i class="fal fa-palette"></i>
          </div>
        </a-popover>
        <div v-if="globalStore.token" class="action-icon logout-icon" @click="logout">
          <i class="fal fa-sign-out-alt"></i>
        </div>
      </a-col>
    </a-row>
  </a-layout-header>
</template>
<script>
  import { defineComponent, ref, unref } from 'vue';
  import { Layout, Row, Col, Menu, Popover, Switch, Select } from 'ant-design-vue';
  import { CLI_ENVS } from '@micro/helper/constant';
  import { useMenu } from '@micro/hooks/use-menu';
  import { useTheme } from '@micro/hooks/use-theme';
  import { logout } from '@micro/helper/je';
  import { changeI18n } from '@micro/locales';
  import { useGlobalStore } from '@micro/store/global-store';
  import { useRouter } from 'vue-router';
  export default defineComponent({
    name: 'Header',
    components: {
      ALayoutHeader: Layout.Header,
      ARow: Row,
      ACol: Col,
      APopover: Popover,
      AMenu: Menu,
      AMenuItem: Menu.Item,
      ASwitch: Switch,
      ASelect: Select,
      ASelectOption: Select.Option,
    },
    setup() {
      const globalStore = useGlobalStore();
      const router = useRouter();
      // 系统变量
      const { VUE_APP_HTML_TITLE, VUE_APP_HTML_ICON } = CLI_ENVS;
      // 主题
      const { dark, gray, colorWeek, theme, themes } = useTheme();
      // 菜单数据
      const { menus } = useMenu();
      const openMenu = function (item) {
        if (item.redirect) {
          window.open(item.redirect);
        } else {
          router.push({ name: item.name });
        }
      };

      return {
        globalStore,
        themes,
        theme,
        dark,
        gray,
        colorWeek,
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
  .header {
    padding: 0;
    background-color: @layout-header-background;
    border-bottom-color: @layout-header-background;
    .logo {
      background-color: @layout-header-background;
      padding: 0 20px;
      color: #fff;
      font-size: 20px;
      font-weight: bold;
      min-width: 200px;
      i {
        margin-right: 10px;
      }
    }
    .action {
      display: flex;
      align-items: center;
      .lang-select {
        width: 100px;
        margin-right: 20px;
      }
      .action-icon {
        cursor: pointer;
        display: flex;
        padding: 0 20px;
        color: @primary-color;
        font-size: 24px;
        i {
          line-height: 64px;
        }
        &.logout-icon {
          color: @white;
        }
        &:hover {
          color: @white !important;
          background-color: @primary-color;
        }
      }
    }
  }
  .theme {
    text-align: center;
    width: 150px;
    .theme-color {
      font-size: 20px;
      margin: 8px;
      cursor: pointer;
    }
    & > div {
      margin: 10px;
    }
  }
</style>
