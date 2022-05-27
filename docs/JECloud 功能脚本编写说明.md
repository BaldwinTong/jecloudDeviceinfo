# 功能事件代码编写说明
## 1. 事件传入参数
  编辑器内，暴露了可以直接在代码中使用的全局变量如下：

- **EventOptions**：事件参数，包含了当前事件中的所有参数

    ```js
      const $func = EventOptions.$func; // 功能对象，所有事件都包含
      // ... 其他事件参数
    ```
-  **JE**：公共类库，提供了常用的类库

    ```js
      const vue = JE.useVue();        // Vue库
      const ui = JE.useUi();          // UI库
      const utils = JE.useUtils();    // 工具库
      const system = JE.useSystem();  // 系统类库
    ```

## 2. 事件返回参数
  编辑器内，可以直接使用return关键字，进行返回参数

- **普通出参**：直接 return ... 即可
  ```js
    //...业务代码
    return true;
  ```

- **异步出参**：return Promise
  ```js
    const utils = JE.useUtils(); // 工具库
    const deferred = utils.createDeferred(); // Promise异步队列函数
    // 业务逻辑执行完毕，可以调用 deferred.resolve()
    // 业务逻辑执行失败，可以调用 deferred.reject();
    return deferred.promise;
  ```

- **视图出参**：必须返回 VNode，否则无法正确显示
    ```js
      const { h } = JE.useVue();
      return h('div',{style:{}},'html内容');
    ```