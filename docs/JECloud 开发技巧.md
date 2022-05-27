
# 1. 微应用注册事件，供主应用和其他微应用调用
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

# 2. 微应用触发主应用和其他微应用事件
```js
// 获取子应用store
const microStore = useMicroStore();

// 触发主应用事件
microStore.emitAdmin('eventName',...args);

// 触发其他微应用事件
// microName 表示【微应用管理】中的应用编码
microStore.emitMicro('microName','eventName',...args);

```

# 3. 功能脚本中，其他微应用事件
```js
// 本函数，只有在主应用中有效
const { emitMicroEvent } = JE.useSystem();

// 触发其他微应用事件
// microName 表示【微应用管理】中的应用编码
emitMicroEvent('microName','eventName',...args);

```