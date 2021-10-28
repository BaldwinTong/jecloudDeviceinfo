# Yarn 使用说明
## 全局安装 yarn
```bash
npm install -g yarn
```

## 初始化一个新项目
```bash
yarn init
```

## 添加依赖包

```bash
yarn add [package]
yarn add [package]@[version]
yarn add [package]@[tag]
```
## 添加全局依赖包
```bash
yarn global add [package]
```

## 将依赖项添加到不同依赖项类别中

```bash
yarn add [package]              # dependencies
yarn add [package] --dev        # devDependencies
yarn add [package] --peer       # peerDependencies
yarn add [package] --optional   # optionalDependencies
```

## 升级依赖包
```bash
yarn upgrade [package]
yarn upgrade [package]@[version]
yarn upgrade [package]@[tag]
```

## 移除依赖包
```bash
yarn remove [package]
```

## 安装项目的全部依赖
```bash
yarn
# 或者
yarn install
```
