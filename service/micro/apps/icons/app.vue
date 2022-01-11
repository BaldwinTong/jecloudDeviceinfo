<template>
  <IconPage />
</template>
<script>
  import { defineComponent } from 'vue';
  import { Icon } from '@jecloud/ui';
  export default defineComponent({
    components: {
      IconPage: Icon.Page,
    },
  });
</script>
