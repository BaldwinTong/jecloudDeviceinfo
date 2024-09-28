<!-- <template> <Welcome /> </template> -->
<template>
  <DeviceInfo></DeviceInfo>
</template>

<script>
  // import Welcome from '@common/components/welcome.vue';
  import DeviceInfo from '../views/deviceinfo/Index.vue';
  export default {
    name: 'Home',
    components: {
      // Welcome,
      DeviceInfo,
    },
  };
</script>
