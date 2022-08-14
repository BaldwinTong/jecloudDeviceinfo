# Git规范

## 分支命名规范
| 分支<div style="width:150px;"/>  | 命名<div style="width:100px;"/>  |  描述 |
| ------------ | ------------ | ------------ |
| 主分支  | master  | 负责记录上线版本的迭代，该分支代码与线上代码是完全一致的，且完全可用的  |
| 开发分支  | develop  | 该分支记录相对稳定的版本，所有的feature分支和bugfix分支都从该分支创建  |
| 功能分支  | feature/*  | 用于开发新的功能，不同的功能创建不同的功能分支，功能分支开发完成并自测通过之后，需要合并到 develop 分支，之后删除该分支  |
| bug修复分支  | bugfix/*  | 用于修复不紧急的bug，普通bug均需要创建bugfix分支开发，开发完成自测没问题后合并到 develop 分支后，删除该分支 |
| 线上bug修复分支  | hotfix/*  | 该分支只有在紧急情况下使用，从master分支创建，用于紧急修复线上bug，修复完成后，需要合并该分支到master分支以便上线，同时需要再合并到develop分支 |
| 发布分支  | release/*  | 用于代码上线准备，该分支从develop分支创建，创建之后由测试同学发布到测试环境进行测试，测试过程中发现bug需要开发人员在该release分支上进行bug修复，所有bug修复完后，在上线之前，需要合并该release分支到master分支和develop分支。【暂时放弃】 |

## 代码提交规范
Git 提交应当书写 commit message。message 的内容怎么写都行，但如何写比较合理是一个问题。开源社区有很多相关的规范，使用最广泛的则是Angular Git Commit Guidelines 规范，并且有众多相关的工具可以检测提交是否遵循了预定义的规范。

Angular 规范要求的 commit message 格式如下：
```
<type>(<scope>): <subject>
<空行>
<body>
<空行>
<footer>
```
### Header
包括三个字段：type(必需)、scope(可选)和subject(必需)。
#### Type
用于标识 commit 的类别，以便于快速识别本次提交的类型。只允许以下几个种标识：
```bash
'build'    # 主要目的是修改项目构建系统(例如 glup，webpack，rollup 的配置等)的提交
'ci'       # 主要目的是修改项目继续集成流程(例如 Travis，Jenkins，GitLab CI，Circle等)的提交
'docs'     # 文档更新
'feat'     # 新增功能 
'fix'      # bug 修复
'perf'     # 性能优化
'refactor' # 重构代码(既没有新增功能，也没有修复 bug)
'style'    # 不影响程序逻辑的代码修改(修改空白字符，补全缺失的分号等)
'test'     # 新增测试用例或是更新现有测试
'revert'   # 回滚某个更早之前的提交
'chore'    # 不属于以上类型的其他类型(日常事务)
```


`feat`，`fix` 是最常用的，也是`changelog`中可以生成的日志
#### Scope
用于标识 commit 影响的范围，可以省略。
#### Subject
本次修改的简短描述。基本要求为：
- 以动词开头，使用第一人称现在时，比如change，而不是changed或changes
- 第一个字母小写
- 结尾不加句号（.）

### Body
可省略。详细描述本次提交，比如此次变更的动机、变更后与之前的差异等。

### Footer
可省略。可以为 Breaking Changes 内容或关闭 issues 的关联语句。Breaking Changes 应当以 BREAKING CHANGE: 开头，然后在空格或两个空行后描述其详情。


## 常用操作

### 重命名文件（大小写）
```bash
# 进入要重命名文件的目录
cd src/views
# 通过 git mv 重命名
git mv App.vue app.vue
```

### 同步本地的远程分支
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
### 撤销已经提交到远程分支的代码
有时候我们提交了代码，发现有问题，需要撤销操作。这个时候我们就需要指定需要回退的版本， 回滚代码。

```bash
# 1.首先通过git log查看提交记录
git log

# 2.选中需要回退的版本。使用命令：git reset --soft 版本号
git reset --soft xxx

# 3.使用git log查看是否回退成功，确认回退成功
git log

# 4.同步到远程分支。命令：git push --force
git push --force

# 5.这个时候我们看远程分支上之前的提交已经撤销了。修改暂存到了本地。
```
