# JECloud 前端微应用项目骨架
JECloud前端微应用项目骨架是创建JECloud微应用项目的一种快捷方式，可以使用JECloud脚手架 `@jecloud/cli` 快速创建JECloud微应用业务项目。
><span style="color:red;">*请注意，此项目需要依赖JECloud平台才可使用，请预先安装JECloud低代码平台并确保网络互通。</span>

## 1.JECloud平台简介
JECloud是基于微服务架构的低代码平台，是新一代企业级APaaS平台，为企业数字化业务提供了按需使用、持续运行的业务中台能力。 快速满足企业多变的需求，允许个性化定制，提供支撑企业业务的完美解决方案，为企业业务的快速创新提供了重要支撑，加速企业数字化转型。

## 2. 项目介绍

```bash
# JECloud 微应用项目骨架目录说明

│  .browserslistrc      # 兼容浏览器配置文件
│  .commitlintrc.js     # Git 提交校验配置文件
│  .editorconfig        # 编辑器配置文件
│  .eslintignore        # eslint 忽略校验配置文件
│  .eslintrc.js         # eslint 校验配置文件
│  .gitattributes       # Git 配置文件，设置行末字符为LF
│  .gitignore           # Git 忽略提交配置文件
│  .prettierrc.js       # 代码格式化配置文件
│  babel.config.js      # babel配置文件
│  CHANGELOG.md         # Git 提交记录
│  package.json         
│  README.md 
├─.vscode               # vscode 项目配置目录，不建议私自修改
│      extensions.json  # vscode 推荐插件
│      settings.json    # vscode 常用配置
├─build                 # 项目构建目录
│     ├─hooks-git       # git 钩子函数
│     └─webapck         # webpack配置
├─service               # 系统文件，如果问题，可以反馈，不允许私自修改
├─public                # 静态资源
└─src                   # 源码文件

```

## 3. 开发环境
### node
`v 14.17.5`

### npm 
`v 6.14.14`

### JECloud npm私服地址
http://verdaccio.jecloud.net/



## 4. 项目命令

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
## 5. JECloud自定义微应用

[从零创建一个自定义微应用](https://doc.jepaas.com/docs/je-doc-jecloud-help/je-doc-jecloud-help-1e3u241se7mdt)

## 6. 资源手册

- [平台官网](http://jecloud.net)
- [平台演示](http://beta.jecloud.net)
- [帮助文档](https://doc.jepaas.com/docs/je-doc-jecloud-help/je-doc-jecloud-help-1e2ka6h6mrfhi)
- [BBS论坛](http://bbs.jepaas.com)

## 7. 联系我们

- 公司：北京凯特伟业科技有限公司
- 电话：010-82809807 / 400-0999-235
- QQ群：462151894

![](./docs/images/orcode.png)