# Yalc 使用说明
>`yalc` 是一个可以在本地模拟 `npm package` 发布环境的工具。
`yalc` 主要本地化了一个 `npm` 的存储库，通过 `yalc publish` 可以把构建的产物发布到本地。通过 `yalc add <pkg>` 可以达到 `npm install <pkg>` 或 `yarn add <pkg>` 的效果。

## 简单使用

### 全局安装 yalc
```bash
yarn global add yalc
# 或
npm i -g yalc
```


### 发布，在组件开发目录下执行
```bash
yalc publish
```

### 在测试项目目录下
```bash
# 引用package
yalc add my-component-package
```


### 更新 yalc 中的引用，在组件开发目录下执行
```bash
yalc push
```


### 移除 yalc 安装的包，在测试项目目录下执行
```bash
yalc remove --all
```

## 参考文章
- [【开发实践】前端组件库的本地调试](https://juejin.cn/post/6932755152818569230)
- [官方文档](https://github.com/wclr/yalc)
