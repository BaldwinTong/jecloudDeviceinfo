<template>
  <a-affix>
    <a-row type="flex" align="middle" class="header">
      <a-col>
        <!-- 菜单 -->
        <a-menu v-model:selectedKeys="selectedKeys" mode="horizontal" class="menu">
          <a-menu-item v-for="item in tabs" :key="item.code">{{ item.text }} </a-menu-item>
        </a-menu>
      </a-col>
      <a-col flex="auto" style="padding-left: 20px">
        <!-- 搜索 -->
        <a-input placeholder="搜索图标名称" style="width: 200px" @change="onSearch">
          <template #prefix>
            <i class="fal fa-search" />
          </template>
        </a-input>
      </a-col>
    </a-row>
  </a-affix>
  <!-- 图标容器 -->
  <a-row style="padding: 20px 0" :wrap="true">
    <a-col v-for="icon in icons" :key="icon" :xl="3" :md="4" class="icons">
      <i :class="formatIcon(icon)" title="点击复制字体样式" @click="coopyCls"></i>
      <div class="name">{{ icon }}</div>
      <div class="cls">{{ formatIcon(icon) }}</div>
    </a-col>
  </a-row>
  <a-back-top />
</template>
<script>
  import { defineComponent, ref, computed } from 'vue';
  import { debounce, copy } from '@jecloud/utils';
  import names from '@/assets/fonts/names';
  import { message, Row, Col, Affix, Menu, BackTop, Input } from 'ant-design-vue';
  export default defineComponent({
    components: {
      AInput: Input,
      ARow: Row,
      ACol: Col,
      AAffix: Affix,
      AMenu: Menu,
      AMenuItem: Menu.Item,
      ABackTop: BackTop,
    },
    setup() {
      // 字体标签
      const tabs = [
        { code: 'light', text: '细体图标（默认）', cls: 'fal', name: 'solid' },
        { code: 'solid', text: '实心图标', cls: 'fas', name: 'solid' },
        { code: 'brands', text: '品牌图标', cls: 'fab', name: 'brands' },
      ];
      // 当前激活标签
      const selectedKeys = ref([tabs[0].code]);
      // 搜索关键字
      const keyword = ref('');

      const getSelectedInfo = function () {
        return tabs.find((item) => {
          return selectedKeys.value[0] === item.code;
        });
      };

      // 图标库
      const icons = computed(() => {
        const selected = getSelectedInfo();
        const _icons = names[selected.name];
        if (keyword.value) {
          return _icons.filter((item) => {
            return item.includes(keyword.value);
          });
        } else {
          return _icons;
        }
      });
      // 格式化图标样式
      const formatIcon = function (code) {
        return getSelectedInfo().cls + ' fa-' + code;
      };

      // 查询方法
      const searchFn = debounce((searchValue) => {
        keyword.value = searchValue;
      }, 300);
      const onSearch = function (e) {
        const input = e?.target;
        searchFn(input?.value);
      };
      // 容器滚动条，锁定顶部
      const coopyCls = function (e) {
        copy(e.target.getAttribute('class'));
        message.success('复制成功！');
      };
      return {
        selectedKeys,
        tabs,
        icons,
        coopyCls,
        onSearch,
        formatIcon,
      };
    },
  });
</script>
<style lang="less" scoped>
  .header {
    background-color: #f0f2f5;
    box-shadow: 2px 2px 10px #ddd;
    .menu {
      background-color: #f0f2f5;
    }
  }
  .icons {
    text-align: center;
    padding: 12px;
    i {
      font-size: 36px;
      cursor: pointer;
    }
    .name {
      font-size: 14px;
      padding-top: 10px;
    }
    .cls {
      font-size: 12px;
      color: #aaa;
      visibility: hidden;
    }
    &:hover .cls {
      visibility: visible;
    }
  }
</style>
