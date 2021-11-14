# Mock 数据说明
项目已经集成mock数据插件，可以直接在 `mock/data` 目录下创建自己的mock数据

## 目录说明
```bash
mock            
├─data           # mock 数据目录，放在别的目录不起效
│   └─demo.js    # demo 示例文件
└─util.js        # 工具类，常用的数据结果接口

```

## 用法说明
1. `mock/data` 目录创建自己业务的mock数据 `xxx.js`

2. 通过 `createMock` 创建接口数据
3. 业务数据返回结果，可以使用 `util.js` 里面的 `resultInfo` , `resultList`
4. 具体使用方法，参考 `demo.js`
5. 正常编写api接口，请求数据验证