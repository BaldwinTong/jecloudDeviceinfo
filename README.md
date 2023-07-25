# JECloud 前端骨架项目
> [JECloud 微服务架构低代码平台（点击了解更多）](https://gitee.com/ketr/jecloud.git)

## 项目介绍
JECloud 前端骨架项目是所有前端微应用项目的项目模板，包含通用的架构，工具类，主子通讯等模块，也可以使用骨架项目快速创建，开发自有的前端微应用项目。

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



## 项目命令

### 全局安装 [yalc](./docs/Yalc%20使用说明.md)
```bash
npm install yalc -g
```

### 安装依赖
```bash
npm run setup
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
