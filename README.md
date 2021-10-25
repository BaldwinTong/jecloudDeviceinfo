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
│     └─webapck         # webpack配置
├─micro                 # 微应用入口，系统文件，如果问题，可以反馈，不允许私自修改
├─public                # 静态资源
└─src                   # 源码文件

```


## 项目安装
### cnpm：安装淘宝镜像
```
npm install -g cnpm -registry=https://registry.npm.taobao.org
```
### 安装依赖包
- 开发，调试阶段
  ```js
  1. 开发阶段，先下载项目：`jecloud-libs`，
  2. 进入`packages/ui`，执行`npm link`
  3. 进入`packages/utils`，执行`npm link`
  4. 执行完毕，会将 `@jecloud/ui`,`@jecloud/utils` 安装到全局依赖，便于进行本地开发调试
  5. 打开插件项目
  6. 执行 `npm link @jecloud/ui` ，关联本地依赖 `@jecloud/ui`
  7. 执行 `npm link @jecloud/utils` ，关联本地依赖 `@jecloud/utils`
  8. 执行 `cnpm i` 安装其他依赖

  `jecloud-libs` 未发布私有仓库时，先按照上述步骤开发，发包后，可以正常开发了
  ```

- 正常开发

  请使用提供的命令进行安装，由于项目使用了私有仓库的包，需要先安装私包，再安装其他依赖。
  ```bash
  # 安装所有依赖
  npm run setup
  ```

### 启动服务
```bash
npm run serve
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

## 同步本地的远程分支
开发过程当中，很多远程分支已被删除，但是本地没有同步，可以通过一下操作进行同步
```bash
# 查看本地分支和追踪情况
git remote show origin 

# 查看可被清理的分支
git remote prune origin --dry-run

# 清理缓存分支
git remote prune origin

# 查看分支
git branch -a
```
