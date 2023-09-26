# JECloud 微应用使用手册
JECloud 微应用的使用，可以灵活的进行业务的开发和管理。微应用共分为四个类型：菜单，插件，登录，初始配置。下面将对微应用的使用进行详细说明。
## 使用场景
### 菜单
单独的业务功能，不和其他业务进行交互，与平台功能同级展示，可以选择菜单类型。
### 插件
被其他业务功能调用时，才会进行展示操作，可以选择插件类型。
### 登录
需要自定义系统登录页面，可以选择登录类型，只允许有一个登录类型。
### 初始配置
系统初始化，未登录时执行业务操作，一般平台级插件使用。

## 使用案例
所有微应用的使用，都需要先挂接到系统的微应用里：【开发-核心引擎-微应用管理】
### 菜单
打开【开发-核心引擎-菜单管理】，添加插件类型的菜单，然后选择菜单类型的微应用即可。
### 插件
可以在平台功能的事件里进行注册，然后调用微应用，以功能按钮事件为例：

1、微应用注册事件，供主应用和其他微应用调用
```js
// 获取子应用store
const microStore = useMicroStore();

// 事件名称加上本应用的标识，方便其他应用使用
const microPrefix = 'xxx-'; // 如 table

// 注册事件
microStore.on(microPrefix + 'eventName',(...args)=>{
  // ...业务逻辑
})
```
  
2、按钮事件脚本调用微应用注册事件
```js
// 本函数，只有在主应用中有效
const admin = JE.useAdmin();

// 触发其他微应用事件
// microName 表示【微应用管理】中的应用编码
admin?.emitMicroEvent('microName','eventName',...args);

```

## 登录，初始配置
直接将开发好的微应用挂架到微应用管理即可，系统会自动解析。

## 微模块
平台引入微模块概念，可以使微应用自由挂接到任意dom元素。具体使用如下：
### 自定义插件
1、创建类型为【插件】的微应用，挂入到微应用管理

2、微应用注册渲染微模块的事件

```js
<!-- index.vue -->
<template>
  <div/>
</template>
<script>
  import { reactive, h } from 'vue';
  import { Input, renderVNode } from '@jecloud/ui';
  import { useMicroStore } from '@common/store/micro-store';
  export default {
    setup(){
      const microStore = useMicroStore();
      const childFuncCode = '子功能项编码';

      // 1. 功能扩展面板微模块
      microStore.on('extend-renderer', (container, { $grid }) => {
        const state = reactive({ value: 0 });
        // 列表加载数据事件
        $grid.store.on('load', () => {
          state.value++;
        });
        // 渲染组件，以Input为例，可以改为自己的业务组件
        renderVNode(container, () => h(Input, state));
      });

      // 2. 表单虚拟字段微模块
      microStore.on('display-renderer', (container, { $display }) => {
        const state = reactive({ value: $display.getValue(), disabled: false });
        // 值改变事件
        $display.on('change', (value) => {
          state.value = value;
        });
        // 组件属性改变事件
        $display.on('props-change', ({ disabled }) => {
          state.disabled = disabled;
        });
        // 渲染组件，以Input为例，可以改为自己的业务组件
        renderVNode(container, () => h(Input, state));
      });

      // 3. 子功能微模块
      // 注意：注册事件名必须与子功能项编码保持一致，否则无法触发事件
      microStore.on(childFuncCode, (container, { $child }) => {
        const state = reactive({ value: 0, readonly: false });
        // 表单切换数据事件
        $child.on('model-change', ({ model }) => {
          state.value = model.FIELD_NAME;
        });
        // 组件属性改变事件
        $child.on('props-change', ({ readonly }) => {
          state.readonly = readonly;
        });
        // 渲染组件，以Input为例，可以改为自己的业务组件
        renderVNode(container, () => h(Input, state));
      });

      // 4. 普通组件调用，如Modal窗口组件
      microStore.on('modal-renderer', (container, { value }) => {
        const state = reactive({
          value,
          'onUpdate:value': (val) => {
            state.value = val;
          },
        });
        // 渲染组件，以Input为例，可以改为自己的业务组件
        renderVNode(container, () => h(Input, state));
        return state;
      });
    }
  }
</script>
```

3、各类微模块调用示例

- 列表扩展面板：注册扩展面板的任意渲染事件，如`top-renderer`事件，返回插槽函数，可以注入微模块。
  ```js
  /**
    * 插槽函数
    * @param {HTMLElement} container 插槽dom
    * @param {Object} options 插槽配置项
    * @returns {Promise}
    */
  return (container, options) => {
    // 异步事件，需要返回，用于加载完组件后，刷新panel布局
    return JE.useAdmin()?.emitMicroEvent('微应用编码', 'extend-renderer', container, options);
  };
  ```

- 表单展示字段：注册展示字段的`renderer`事件，返回插槽函数，可以注入微模块。
  ```js
  /**
   * 插槽函数
    * @param {HTMLElement} container 插槽dom
    * @param {Object} options 插槽配置项
    * @returns {Promise}
    */
  return (container, options) => {
    return JE.useAdmin()?.emitMicroEvent('微应用编码', 'display-renderer', container, options);
  };
  ```

- 子功能：添加`微应用`类型子功能，配置项中配置上微应用的编码即可。

- 组件调用，以按钮点击事件为例
  ```js
  const microCode = '微应用编码';
  const admin = JE.useAdmin();
  const { ref, h } = JE.useVue();
  const containerRef = ref(); // 渲染dom
  let microState = null; // 微模块数据
  JE.window({
    title: '微模块',
    width: 200,
    height: 200,
    content() {
      return h('div', { ref: containerRef });
    },
    okButton() {
      console.log(microState);
    },
    onShow() {
      admin
        ?.emitMicroEvent(microCode, 'modal-renderer', containerRef.value, {
          value: '窗口微模块',
        })
        .then((state) => {
          microState = state;
        });
    },
  });
  ```

### 图表引擎插件
图表引擎提供了微模块注入事件，具体使用参考如下，以列表顶部扩展面板(top-renderer)为例：
```js
// 注：使用前，请先购买图表插件！

const { $func, $grid } = EventOptions;
const admin = JE.useAdmin();
return (dom,options)=>{
    // 图表配置
    const chartOptions = {
        code:'图表编码',// 图表编码
        style:'height:200px;',// 高度
        hideSearch:'left',// 隐藏查询区域：left,top,all,none
        params:{} // 默认参数，可以配合hideSearch使用
    };
    return admin?.emitMicroEvent('JE_PLUGIN_CHART_MODULE','chart-renderer',dom,chartOptions).then((chartRef)=>{
        // 列表刷新时，刷新图表
        $grid.store.on('load',()=>{
            const params = {};// 设置查询参数
            chartRef.value?.load(params);
        })
    });
}

```