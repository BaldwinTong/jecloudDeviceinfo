<template>
  <div class="je-layout-main-header">
    <a-row align="middle">
      <!-- logo -->
      <a-col class="je-layout-main-header-logo">
        <i :class="[APP_HTML_ICON]"></i>{{ APP_HTML_TITLE }}
      </a-col>

      <!-- 菜单 -->
      <a-col flex="auto">
        <a-menu
          theme="dark"
          class="je-layout-main-header-menu"
          mode="horizontal"
          :style="{ lineHeight: '64px' }"
        >
          <a-menu-item v-for="menu in menus" :key="menu.name" @click="openMenu(menu)">
            {{ $t(menu.text) }}
          </a-menu-item>
        </a-menu>
      </a-col>
      <a-col class="je-layout-main-header-actions">
        <div class="action">
          <a-popover trigger="click" placement="bottomRight" arrow-point-at-center>
            <template #content><Settings /> </template>
            <div class="action-settings"><i class="fal fa-cog"></i></div>
          </a-popover>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script>
  import { defineComponent } from 'vue';
  import { useRouter } from 'vue-router';
  import { Row, Col, Menu, Popover } from 'ant-design-vue';
  import { CLI_ENVS } from '@common/helper/constant';
  import Settings from './settings.vue';
  import { useMenu } from '@micro/hooks/use-menu';
  export default defineComponent({
    name: 'Header',
    components: {
      ARow: Row,
      ACol: Col,
      APopover: Popover,
      AMenu: Menu,
      AMenuItem: Menu.Item,
      Settings,
    },
    setup() {
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
        menus,
        APP_HTML_TITLE: VUE_APP_HTML_TITLE,
        APP_HTML_ICON: VUE_APP_HTML_ICON,
        openMenu,
      };
    },
  });
</script>
<style lang="less" scoped>
  @import '../../../common/assets/styles/theme-variable.less';
  .je-layout-main-header {
    padding: 0;
    background-color: @header-bg-color;
    border-bottom: 1px solid transparent;
    border-bottom-color: @header-border-bottom-color;
    :deep(&-menu) {
      transition-property: none;
      background-color: @header-bg-color !important;
      border-bottom-color: @header-text-color !important;
      .ant-menu-item {
        color: @header-text-color !important;
        transition-property: none;
      }
      .ant-menu-item-active,
      .ant-menu-item:hover,
      .ant-menu-item-selected {
        background-color: @header-menu-selected-bg-color !important;
      }
    }
    &-logo {
      padding: 0 20px;
      color: @header-text-color;
      font-size: 20px;
      font-weight: bold;
      min-width: 200px;
      i {
        margin-right: 10px;
      }
    }
    &-actions {
      display: flex;
      align-items: center;
      color: @header-text-color;
      .action {
        cursor: pointer;
        display: flex;
        padding: 0 20px;
        font-size: 24px;
        .action-settings {
          width: 34px;
          height: 34px;
          line-height: 34px;
          text-align: center;
        }
      }
    }
  }
</style>
