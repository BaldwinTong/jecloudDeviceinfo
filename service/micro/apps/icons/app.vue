<template>
  <div ref="content" class="je-icon-page">
    <Affix :target="getTarget">
      <Row type="flex" align="middle" class="je-icon-page-header">
        <Col>
          <Menu v-model:selectedKeys="selectedKeys" mode="horizontal" class="je-icon-page-menu">
            <MenuItem v-for="item in fontIcons" :key="item.code">{{ item.text }}</MenuItem>
          </Menu>
        </Col>
        <Col flex="auto" style="padding-left: 20px">
          <Input placeholder="搜索图标名称" style="width: 200px" @change="onSearch">
            <template #icon>
              <i class="fal fa-search"></i>
            </template>
          </Input>
          <Button type="link" @click="open">
            <template #icon><i class="fal fa-question-circle"></i> </template>
            使用帮助
          </Button>
        </Col>
      </Row>
    </Affix>
    <Row style="padding: 20px 0" :wrap="true">
      <Col v-for="icon in icons" :key="icon" :xl="3" :md="4" class="je-icon-page-icons">
        <i :class="[formatIcon(icon)]" title="点击复制字体样式" @click="coopyCls"></i>
        <div class="name">{{ icon }}</div>
        <div class="cls">{{ formatIcon(icon) }}</div>
      </Col>
    </Row>
    <Modal
      v-model:visible="visible"
      title="使用帮助"
      ok-button
      show-footer
      :icon="'fal fa-question-circle'"
      resize
      :width="600"
      :height="300"
    >
      <p> 1. 系统统一使用<span class="red">“细体图标”</span>，有特殊说明，可以使用其他 </p>
      <p>
        2. 图标统一使用<span class="red">{{ getHtmlStr('i') }}</span
        >标签，编写规范：
        <span class="red">{{ getHtmlStr() }}</span>
      </p>
      <p> 3. 点击图标，可以直接复制图标样式，复制内容：<span class="red">fal fa-abacus</span> </p>
    </Modal>
    <BackTop :target="getTarget" />
  </div>
</template>
<script>
  import { defineComponent, ref, computed } from 'vue';
  import { debounce, copy } from '@jecloud/utils';
  import { message, Row, Col, Affix, Menu, BackTop, Input, Button } from 'ant-design-vue';
  import { Modal, Icon } from '@jecloud/ui';
  export default defineComponent({
    name: 'JeIconPage',
    components: {
      Modal,
      Row,
      Col,
      Affix,
      Menu,
      MenuItem: Menu.Item,
      BackTop,
      Input,
      Button,
    },
    setup() {
      const fontIcons = Icon.icons;
      // 当前激活标签
      const selectedKeys = ref([fontIcons[0].code]);
      // 搜索关键字
      const keyword = ref('');

      const getSelectedInfo = function () {
        return fontIcons.find((item) => {
          return selectedKeys.value[0] === item.code;
        });
      };

      // 图标库
      const icons = computed(() => {
        const selected = getSelectedInfo();
        const _icons = selected.icons;
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
        const { cls, prefix } = getSelectedInfo();
        return `${cls} ${prefix}-${code}`;
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

      // 帮助说明
      const visible = ref(false);
      const open = function () {
        visible.value = true;
      };
      const getHtmlStr = function (type) {
        if (type == 'i') {
          return '<i>';
        } else {
          return '<i class="fal fa-abacus"></i>';
        }
      };

      return {
        visible,
        open,
        getHtmlStr,
        coopyCls,
        onSearch,
        formatIcon,
        icons,
        selectedKeys,
        fontIcons,
        getTarget: () => {
          return document.getElementById('app') || document.body;
        },
      };
    },
  });
</script>
<style lang="less">
  #app {
    overflow: auto;
    height: 100%;
  }
  .je-icon-page {
    padding: 0;
    overflow: auto;
    &-header {
      background-color: @component-background;
      box-shadow: 2px 2px 10px @border-color-split;
      :deep(.ant-btn > i + span, .ant-btn > span + i, ) {
        margin-left: 8px;
      }
    }
    &-icons {
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
    .red {
      color: red;
    }
  }
</style>
