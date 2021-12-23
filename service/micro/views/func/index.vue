<template>
  <div class="home">
    <a-typography-title>{{ funcCode }}</a-typography-title>
  </div>
</template>

<script>
  import { Typography } from 'ant-design-vue';
  export default {
    name: 'Demo',
    components: {
      ATypographyTitle: Typography.Title,
    },
    props: {
      funcCode: {
        type: String,
        default: '',
      },
    },
    setup(props) {},
  };
</script>
<style scoped>
  .home {
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
