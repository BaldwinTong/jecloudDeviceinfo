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

## 业务项目更新规范

1、项目中关联骨架项目仓库地址：
```bash
 # 添加远程仓库
 git remote add template http://xxx/xxx.git

 # 查看是否添加成功
 git remote -v
```

2、切换本地骨架项目分支 template，更新仓库代码
```bash
# 切换 template 分支
git checkout template

# 更新template远程仓库的develop分支代码
git pull template develop
```

3、合并到本地代码

```bash
# 切换到本地代码
git checkout develop

# 合并代码，解决冲突
git merge template
```
## 源码开发规范
1、全局安装 [yalc](https://github.com/wclr/yalc)，进行本地调试开发

```bash
npm i -g yalc
```

2、下载项目 `jecloud-libs`，在 `jecloud-libs` 根目录执行命令 `npm run yalc:publish`，模拟npm发布本地调试包

3、下载 `业务项目`，如 `jecloud-core-table`

4、在 `业务项目` 根目录，执行命令 `npm run setup`安装依赖，进行本地开发调试

5、当 `jecloud-libs` 代码有变动，在 `jecloud-libs` 根目录执行命令 `npm run yalc:push` 同步代码

6、同步完代码，`业务项目` 执行 `npm run clean:vite`,清理`vite`缓存

7、注意事项：
``` bash
# 当控制台报错如下，请手动删除 node_modules/.ignored目录，再重新操作
 EPERM: operation not permitted, rename 'E:\workspace\jecloud\jecloud-cli\node_modules\@jecloud\utils' -> 'E:\workspace\jecloud\jecloud-cli\node_modules\.ignored\@jecloud\utils'
```