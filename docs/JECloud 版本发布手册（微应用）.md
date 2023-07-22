[TOC]
# JECloud 版本发布手册（微应用）
> 前端除了jecloud-libs项目外，其他项目发版流程都采用下面流程进行发版。
## 发版流程
### 1. 代码定版
确保`develop`分支代码是最新,最稳定代码。然后从`develop`分支新建版本分支`release/x.x.x`

```bash
# 切换develop分支
git checkout develop
# 新建版本分支
git checkout -b release/1.0.0
```
### 2. 生成发版记录
修改package.json的版本，生成changelog记录

```bash
# 1. 修改package.json版本为1.0.0
{"version": "1.0.0"}

# 2. 生成changelog记录
npm run changelog

# 3. 提交Git记录：
feat(version): release v1.0.0
```
### 3. 生成tag版本号

```bash
# 1. 生成tag
git tag v1.0.0

# 2. 推送tag
git push origin v1.0.0

# 3. 进入仓库，找到对应的tag号，增加 `发版记录` 的文档链接说明
```

### 4. 合并代码
打完tag版本号后，就可以进行代码合并了
```bash
# 需要合并develop，master，sourcecode分支

# 1. develop分支
git checkout develop
# 2. 合并代码
git merge release/1.0.0
# 3. 推送代码
git push

# 1. 切换master分支
git checkout master
# 2. 合并代码
git merge release/1.0.0
# 3. 推送代码
git push


# 1. 切换sourcecode分支
git checkout sourcecode
# 2. 合并代码
git merge release/1.0.0
# 3. 推送代码
git push
# 4. 添加客户源码仓库
git remote add sourcecode http://gitlab.xxx.com/xxx/xx.git
# 5. 推送到客户源码仓库的master分支，如果推送失败，先关闭master分支保护，再进行推送
git push sourcecode sourcecode:master -f
# 6. 增加客户源码仓库master分支的tag版本号，添加 `发版记录` 的文档链接说明

```

### 6. 前端项目骨架推送代码

```bash
# jecloud-cli 提油开源项目分支：opensource

# 1. 切换opensource分支
git checkout opensource
# 2. 合并代码
git merge release/1.0.0
# 3. 推送代码
git push
# 4. 添加码云开源前端项目骨架仓库
git remote add opensource https://gitee.com/xxx/xxx.git
# 5. 推送到前端项目骨架仓库的master分支，如果推送失败，先关闭master分支保护，再进行推送
git push opensource opensource:master -f
# 6. 增加前端项目骨架仓库master分支的tag版本号，添加 `发版记录` 的文档链接说明

```

### 7. 发版结束
## 常见问题
### 1. 撤销已经提交到远程分支的代码
有时候我们提交了代码，发现有问题，需要撤销操作。这个时候我们就需要指定需要回退的版本，回滚代码。

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

### 2. 推送本地代码到客户源码仓库失败
如果遇到下面的错误，请先关闭远程仓库对应分支的保护，然后再强制推送
```
E:\workspace\jecloud\pc\jecloud-libs>git push sourcecode sourcecode:master
To http://gitlab.suanbanyun.com/jecloud-sourcecode/frontend/jecloud-libs.git
 ! [rejected]        sourcecode -> master (non-fast-forward)
error: failed to push some refs to 'http://gitlab.suanbanyun.com/jecloud-sourcecode/frontend/jecloud-libs.git'
hint: Updates were rejected because a pushed branch tip is behind its remote
hint: counterpart. Check out this branch and integrate the remote changes
hint: (e.g. 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
```