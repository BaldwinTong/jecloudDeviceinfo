<template>
  <IconPanel />
</template>
<script>
  import { defineComponent } from 'vue';
  import { Icon } from '@jecloud/ui';
  export default defineComponent({
    name: 'JeIconPage',
    components: { IconPanel: Icon.IconPanel },
  });
</script>
<style lang="less">
  #app {
    overflow: auto;
    height: 100%;
  }
</style>
