# JECloud 前端微应用项目
JECloud前端微应用项目是基于`jecloud-pc-archetype`骨架项目进行快速创建，开发。
><span style="color:red;">*请注意，此项目需要依赖JECloud平台才可使用，请预先安装JECloud低代码平台并确保网络互通。</span>

## JECloud平台简介
JECloud是基于微服务架构的低代码平台，是新一代企业级APaaS平台，为企业数字化业务提供了按需使用、持续运行的业务中台能力。 快速满足企业多变的需求，允许个性化定制，提供支撑企业业务的完美解决方案，为企业业务的快速创新提供了重要支撑，加速企业数字化转型。

## 项目介绍

```bash
# JECloud 前端微应用项目目录说明

│  .browserslistrc         # 兼容浏览器配置文件
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
## 开发教程

[从零创建一个自定义微应用](https://doc.jepaas.com/docs/je-doc-jecloud-help/je-doc-jecloud-help-1e3u241se7mdt)

## 系统演示

- [演示系统](http://example.jecloud.net)
- 默认用户名：admin
- 默认密码：123456

## 安装版体验

- [下载安装版（支持单机安装，多机安装）](https://jecloud.net/experience)
- [下载Docker-Compose版](https://jecloud.net/experience)


## 平台项目目录
### 前端项目
- [基础库项目](https://gitee.com/ketr/jecloud-pc-libs.git)
- [骨架项目](https://gitee.com/ketr/jecloud-pc-archetype.git)
- [主项目](https://gitee.com/ketr/jecloud-pc-admin.git)
- [资源表项目](https://gitee.com/ketr/jecloud-pc-table.git)
- [应用中心项目](https://gitee.com/ketr/jecloud-pc-function.git)
- [工作流项目](https://gitee.com/ketr/jecloud-pc-workflow.git)
- [RBAC项目](https://gitee.com/ketr/jecloud-pc-rbac.git)
- [菜单项目](https://gitee.com/ketr/jecloud-pc-menu.git)
- [数据源项目](https://gitee.com/ketr/jecloud-pc-datasource.git)
- [系统设置项目](https://gitee.com/ketr/jecloud-pc-settings.git)
- [登录项目](https://gitee.com/ketr/jecloud-pc-login.git)
- [系统展板项目](https://gitee.com/ketr/jecloud-pc-boards.git)

### 后端项目

- [Common基础项目](https://gitee.com/ketr/jecloud-common.git)
- [动态网关项目](https://gitee.com/ketr/jecloud-gateway.git)
- [元数据项目](https://gitee.com/ketr/jecloud-meta.git)
- [RBAC项目](https://gitee.com/ketr/jecloud-rbac.git)
- [工作流项目](https://gitee.com/ketr/jecloud-workflow.git)
- [文档项目](https://gitee.com/ketr/jecloud-document.git)
- [消息项目](https://gitee.com/ketr/jecloud-messasge.git)
- [连接器项目](https://gitee.com/ketr/jecloud-connector.git)
- [Demo项目](https://gitee.com/ketr/jecloud-demo.git)

### 中间件项目

- [认证中间件](https://gitee.com/ketr/jecloud-auth.git)
- [工作流中间件](https://gitee.com/ketr/jecloud-bpm.git)
- [JEIbatis](https://gitee.com/ketr/je-ibatis.git)
- [mxgraph封装](https://gitee.com/ketr/jecloud-mxgraph.git)
- [骨架项目](https://gitee.com/ketr/jecloud-service-archetype.git)

### 其他开源依赖

- Apollo配置中心
- XXL-Job分布式调度

## 资源手册

- [平台官网](http://jecloud.net)
- [平台演示](http://example.jecloud.net)
- [帮助文档](https://doc.jepaas.com/docs/je-doc-jecloud-help/je-doc-jecloud-help-1e2ka6h6mrfhi)
- [BBS论坛](http://bbs.jepaas.com)

## 开源协议
- [MIT](./LICENSE)
- [平台证书补充协议](./SUPPLEMENTAL_LICENSE.md)



## 联系我们

- 公司：北京凯特伟业科技有限公司
- 电话：18610941071
- 联系人：云先生

![公众号](docs/images/orcode.jpg)