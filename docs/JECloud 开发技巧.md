
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

# 3. 功能脚本中，触发其他微应用事件
```js
// 本函数，只有在主应用中有效
const admin = JE.useAdmin();

// 触发其他微应用事件
// microName 表示【微应用管理】中的应用编码
admin?.emitMicroEvent('microName','eventName',...args);

```

# 4. WebSocket 监听
- 子应用监听
```js
// 获取子应用store
const microStore = useMicroStore();
// 注册事件
microStore.on('websocket-message',(message)=>{
  // ...业务逻辑
})

```
- 主应用监听

```js
// 获取websocket store
const webSocketStore = useWebSocketStore();
// 注册事件
webSocketStore.on('message',(message)=>{
  // ...业务逻辑
})
```

- 事件脚本监听
```js
const { Modal } = JE.useUi();
const { ref, h } = JE.useVue();
const admin = JE.useAdmin();
if(!admin) return;
const messages = ref([]);
// 注册监听事件
const watchFn = admin?.watchWebSocket((message)=>{
  messages.value.push(message);
  console.log(message)
});
// 查看消息内容
Modal.window({
  content(){
    // 实时更新数据
    return messages.value.map((msg)=>{
        return h('div',msg.content)
    })
  },
  onClose(){
    // 停止监听，防止重复执行
    watchFn();
  }
})
```
