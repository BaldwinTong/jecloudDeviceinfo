# JECloud 开发规范
## 代码规范
[案例前端开发规范.pdf](./阿里前端开发规范.pdf)

## 基于GitLab看板开发规范
### 看板说明
- To Do：待办列表，近期计划要做的任务，不创建对应的功能分支

- Doing：开发中，所有开发中的issue，都有对应的功能分支
- Close：关闭，完成功能后，关闭issue，自动进入Close

### 开发流程

1. 新任务，在ToDo列表新建issue，增加对应标记

2. 开始工作，放入Doing列表
3. 从issue创建分支，命名规则：feature/#1 (类型/#issue编号)
4. 提交代码，关联issue
  ```bash
  # 提交内容末尾增加issue编号，多个以逗号分隔
  docs(issue): 关联issue提交规范[#3]
  ```

4. 合并请求

### Issue 标记说明
- bugfix：系统bug
- hotfix：线上紧急bug，优先级最高
- feature：新功能
- build：修改项目构建系统(例如 glup，webpack，rollup 的配置等)的提交
- docs：文档更新
- pref：性能优化
- refactor：重构代码（既没有新增功能，也没有修复bug）
- Doing：开发中
- To Do：待办列表
- v1.0.0: 平台版本号。平台每次增加版本，都会增加对应的版本标记； 每个issue都必须包含版本号标记，用于记录版本的改动

## 脚手架项目更新规范

1、项目中关联脚手架项目(jecloud-cli)仓库地址：
```bash
 # 添加远程仓库
 git remote add cli http://gitlab.suanbanyun.com/jecloud/frontend/jecloud-cli.git

 # 查看是否添加成功
 git remote -v
```

2、切换本地脚手架项目分支 cli，更新仓库代码
```bash
# 切换 cli 分支
git checkout cli

# 更新cli远程仓库的develop分支代码
git pull cli develop
```

3、合并到本地代码

```bash
# 切换到本地代码
git checkout develop

# 合并代码，解决冲突
git merge cli
```
