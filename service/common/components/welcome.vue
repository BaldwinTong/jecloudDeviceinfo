<template>
  <div class="je-common-welcome">
    {{ name }}，{{ $t('welcome') }}<i class="fal fa-rocket-launch"></i>
  </div>
</template>

<script>
  import { computed } from 'vue';
  import { useGlobalStore } from '@common/store/global-store';
  export default {
    name: 'Demo',
    setup() {
      const globaleStore = useGlobalStore();
      const name = computed(() => {
        return globaleStore.currentAccount?.name;
      });
      return { name };
    },
  };
</script>
<style lang="less" scoped>
  .je-common-welcome {
    padding-top: 20px;
    text-align: center;
    font-size: 42px;
    font-weight: bold;
    color: @text-color;
    background-color: @component-background;
    i {
      color: @primary-color;
      margin-left: 10px;
    }
  }
</style>
