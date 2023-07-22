
# Lerna使用说明

```bash
# 全局安装
npm i lerna -g

# 安装全部依赖
lerna bootstrap 

# 清除全部依赖,会删除packages下面所有项目的node_modules目录
lerna clean

# lerna 每次只能安装一个包

# 为packages下面单个项目安装依赖包

# 发布依赖
lerna add xxx packages/examples
# 等价于：cd packages/examples && npm i -S xxx

# 开发依赖
lerna add xxx --dev packages/examples
# 等价于：cd packages/examples && npm i -D xxx

# 为packages下面所有项目安装依赖包（不建议使用）
# 发布依赖
lerna add xxx
# 等价于
# cd packages/examples && npm i -S xxx
# cd packages/ui && npm i -S xxx
# cd packages/utils && npm i -S xxx

# 开发依赖
lerna add xxx --dev  
# 等价于
# cd packages/examples && npm i -D xxx
# cd packages/ui && npm i -D xxx
# cd packages/utils && npm i -D xxx
```
