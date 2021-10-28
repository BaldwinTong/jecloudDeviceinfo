# jcloud-cli
## 项目介绍
JECloud 插件脚手架项目
```bash
# 目录说明
jecloud-cli            
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
│  package-lock.json    
│  package.json         
│  README.md 
├─.vscode               # vscode 项目配置目录，不建议私自修改
│      extensions.json  # vscode 推荐插件
│      settings.json    # vscode 常用配置
├─build                 # 项目构建目录
│     ├─hooks-git       # git 钩子函数
│     ├─typescript      # 方便项目进行ts调试，增加了ts支持
│     └─webapck         # webpack配置
├─micro                 # 微应用入口，系统文件，如果问题，可以反馈，不允许私自修改
├─public                # 静态资源
└─src                   # 源码文件

```

## 开发环境
### node
`v 14.17.5`

### npm 
`v 6.14.14`

### [Yalc](https://github.com/wclr/yalc)
`Yalc` 是一个可以在本地模拟 npm package 发布环境的工具。
`yalc` 主要本地化了一个 `npm` 的存储库，通过 `yalc publish` 可以把构建的产物发布到本地。通过 `yalc add <pkg>` 可以达到 `npm install <pkg>` 或 `yarn add <pkg>` 的效果。


```bash
# 全局安装，本项目采用yalc进行本地调试
npm i -g yalc
```

### 开发模式
### 本地调试开发
1. 全局安装 `yalc`，进行本地调试开发

2. 下载项目 `jecloud-libs`，在 `jecloud-libs` 根目录执行命令 `npm run yalc:publish`，模拟npm发布本地调试包
3. 下载 `业务项目`，如 `jecloud-core-table`
4. 在 `业务项目` 根目录，执行命令 `npm run setup` 安装依赖，进行本地开发调试
5. 当 `jecloud-libs` 代码有变动，在 `jecloud-libs` 根目录执行命令 `npm run yalc:push` 同步代码

### 私服依赖开发
1. 下载 `业务项目`，如 `jecloud-core-table`

2. 执行命令 `npm run setup:regist` 安装依赖，进行本地开发




## 项目命令

### 安装依赖
由于使用了私有包，请使用命令安装，不要使用` npm i` 进行安装依赖
```bash
# 快捷安装命令，可以自行调整
npm run setup
# 安装本地调试依赖，请先确保全局已经安装`yalc`
npm run setup:yalc
# 安装私服包，请先确保全局已经安装`yalc`
npm run setup:regist
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

## 私有仓库
### 地址
http://39.106.75.216:4873/
### 包
- @jecloud/ui ：UI库
- @jecloud/utils ：工具库
### 安装私有仓库包

项目使用时，先安装私有仓库包，然后再进行其他包的安装
```bash
# 先安装私有仓库包
cnpm i -D @jecloud/ui @jecloud/utils --registry=http://39.106.75.216:4873/

# 再安装其他依赖
cnpm i
```
