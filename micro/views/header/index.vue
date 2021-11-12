<template>
  <a-layout-header class="header">
    <a-row align="middle">
      <a-col class="logo"><i :class="[APP_HTML_ICON]"></i>{{ APP_HTML_TITLE }}</a-col>
      <a-col flex="auto" class="menu">
        <a-menu
          v-model:selectedKeys="selectedKeys"
          theme="dark"
          mode="horizontal"
          :style="{ lineHeight: '64px' }"
        >
          <a-menu-item
            v-for="menu in menus"
            :key="menu.name"
            @click="$router.push({ name: menu.name })"
          >
            {{ $t(menu.text) }}
          </a-menu-item>
        </a-menu>
      </a-col>
      <a-col class="action">
        <a-select ref="select" v-model:value="locale" @change="changeLocale">
          <a-select-option v-for="(item, index) in locales" :key="index" :value="item.code">
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
                @click="changeTheme(t)"
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
        <div v-if="isLogin" class="action-icon logout-icon" @click="logout">
          <i class="fal fa-sign-out-alt"></i>
        </div>
      </a-col>
    </a-row>
  </a-layout-header>
</template>
<script>
  import { defineComponent, ref, watch, onMounted, computed } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { changeLocale, getLocale, SUPPORT_LOCALES } from '@/locales';
  import { Layout, Row, Col, Button, Menu, Popover, Switch, Select } from 'ant-design-vue';
  import { menus as _menus } from 'micro/router/menus';
  import { CLI_ENVS } from 'micro/helper/constant';
  import { useTheme } from '@/hooks/useTheme';
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
      const menus = ref(_menus);
      const router = useRouter();
      const route = useRoute();
      const locale = ref(getLocale());
      const locales = SUPPORT_LOCALES;
      const selectedKeys = ref([]);
      const setSelectInfo = function (name) {
        // 选择菜单
        selectedKeys.value = [name];
      };

      setSelectInfo(route.name);
      watch(
        () => route.name,
        (n, o) => {
          setSelectInfo(n);
          locale.value = getLocale();
        },
      );
      // 主题
      const { dark, gray, colorWeek, theme, changeTheme, themes } = useTheme();

      // 退出
      const logout = function () {
        JE.cookie.remove('authorization');
        router.push({ name: 'Login' });
      };
      const isLogin = computed(() => {
        return route.name !== 'Login';
      });
      return {
        isLogin,
        logout,
        changeTheme,
        themes,
        theme,
        dark,
        gray,
        colorWeek,
        selectedKeys,
        menus,
        locale,
        locales,
        changeLocale,
        APP_HTML_TITLE: CLI_ENVS.VUE_APP_HTML_TITLE,
        APP_HTML_ICON: CLI_ENVS.VUE_APP_HTML_ICON,
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
      .ant-select {
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
