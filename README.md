# 骨架项目

## 项目介绍
骨架项目是JECloud前端所有微应用项目的项目模板，通过骨架项目可以快速的创建和开发JECloud前端微应用，他包含通用的应用架构，工具类，主子通讯等模块。

## 项目目录

```bash

│  .commitlintrc.js        # Git 提交校验配置文件
│  .editorconfig           # 编辑器配置文件
│  .eslintignore           # eslint 忽略校验配置文件
│  .eslintrc.js            # eslint 校验配置文件
│  .gitattributes          # Git 配置文件，设置行末字符为LF
│  .gitignore              # Git 忽略提交配置文件
│  .prettierrc.js          # 代码格式化配置文件
│  babel.config.js         # babel配置文件
│  CHANGELOG.md            # Git 提交记录
│  package.json            # 项目配置
│  README.md               # 说明文档
│  LICENSE                 # 开源协议文件
│  SUPPLEMENTAL_LICENSE.md # 补充协议文件
├─.vscode                  # vscode 项目配置目录，不建议私自修改
│      extensions.json     # vscode 推荐插件
│      settings.json       # vscode 常用配置
├─build                    # 项目构建目录
│     ├─hooks-git          # git 钩子函数
│     └─webapck            # webpack配置
├─docs                     # 帮助文档
├─service                  # 系统文件，如果问题，可以反馈，不允许私自修改
├─public                   # 静态资源
└─src                      # 源码文件

```

## 开发环境
### node
`v 14.18.3`

### npm 
`v 6.14.15`

### JECloud npm私服地址
http://verdaccio.jecloud.net/


## 基础库项目部署
本地项目调试之前，需要先把 [基础库项目](https://gitee.com/ketr/jecloud-pc-libs.git) 部署完成。
```bash
# 全局安装 lerna，yalc
npm install lerna,yalc -g

# 下载项目
git clone https://gitee.com/ketr/jecloud-pc-libs.git

# 安装依赖
npm run setup

# 发布基础库
npm run yalc:publish

```

## 项目命令

### 安装依赖
```bash
# 源码用户，安装本地基础库项目依赖
npm run setup

# 非源码用户，不需要部署基础库项目，直接安装npm包依赖
npm run setup:lib
```

### 启动服务
```bash
npm run dev
```

### 代码构建
```bash
npm run build
```
### Git代码提交
项目增加了Git提交规范，强烈建议使用 `commitizen`（格式化commit message的工具）来进行Git提交操作，请使用下面命令

```bash
npm run commit
```

### 生成Git提交记录

```bash
npm run changelog
```


## 开源协议
- [MIT](./LICENSE)
- [平台证书补充协议](./SUPPLEMENTAL_LICENSE.md)

## JECloud主目录
[JECloud 微服务架构低代码平台（点击了解更多）](https://gitee.com/ketr/jecloud.git)