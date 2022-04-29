<template>
  <div class="je-layout-main-settings">
    <div class="je-layout-main-settings-lang">
      国际化：<Select ref="select" v-model:value="globalStore.locale" class="lang-select">
        <SelectOption v-for="(item, index) in globalStore.locales" :key="index" :value="item.code">
          {{ item.text }}
        </SelectOption>
      </Select>
    </div>

    <div class="je-layout-main-settings-theme">
      <ThemeColor mode="systemTheme" title="系统主题"></ThemeColor>
      <ThemeMode mode="darkMode" title="深色主题"></ThemeMode>
      <ThemeMode mode="grayMode" title="灰色模式"></ThemeMode>
      <ThemeMode mode="colorWeak" title="色弱模式"></ThemeMode>
    </div>
    <div v-if="globalStore.token" class="je-layout-main-settings-logout">
      <Button type="primary" block @click="logout">退出登录</Button>
    </div>
  </div>
</template>
<script>
  import { defineComponent } from 'vue';
  import { Button, Select } from 'ant-design-vue';
  import { logout } from '@common/helper/system';
  import { useGlobalStore } from '@common/store/global-store';
  import ThemeColor from '@common/components/theme/theme-color.vue';
  import ThemeMode from '@common/components/theme/theme-mode.vue';
  export default defineComponent({
    name: 'Settings',
    components: {
      Select,
      SelectOption: Select.Option,
      Button,
      ThemeColor,
      ThemeMode,
    },
    setup() {
      const globalStore = useGlobalStore();
      return { logout, globalStore };
    },
  });
</script>
<style lang="less" scoped>
  .je-layout-main-settings {
    &-theme {
      width: 300px;
    }
    &-logout {
      text-align: center;
      padding: 10px;
    }
    &-lang {
      text-align: center;
      padding: 10px;
      .lang-select {
        width: 110px;
      }
    }
  }
</style>
