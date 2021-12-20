/**
 * 项目预览服务，默认端口+100，如3000，预览端口为3100
 */
const express = require('express');
const request = require('request');
const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const basePath = process.cwd();

// 读取配置文件
let config = {};
['.env', '.env.development'].forEach((file) => {
  [file, file + '.local'].forEach((name) => {
    const filePath = path.resolve(basePath, name);
    if (fs.existsSync(filePath)) {
      config = Object.assign(config, dotenv.parse(fs.readFileSync(filePath)));
    }
  });
});

//路由代理
const { VUE_APP_SERVE_PROXY, VUE_APP_SERVE_PORT } = config;
const distDir = path.resolve(basePath, 'dist');

var app = express();
//跨域支持，可以测试cdn
app.use(cors());

//初始化路由,设定项目初始页面
var router = express.Router();
router.get('/', function (req, res, next) {
  res.sendFile(path.resolve(distDir, 'index.html'));
});
app.use('/', router);
//静态资源和node代码在一个目录下
app.use('/', express.static(distDir));

app.use('/', (req, res, next) => {
  var url = VUE_APP_SERVE_PROXY + req.originalUrl;
  //如果请求出错，404
  req
    .pipe(request(url))
    .on('error', (err) => {
      console.error(err.message);
      console.error(url);
      res.status(404).end();
    })
    .pipe(res);
});

//启动服务
const port = Number(VUE_APP_SERVE_PORT) + 100; // 默认端口增加100
const server = '0.0.0.0';
app.listen(port, server, function () {
  console.log('\n', '预览服务已启动，请访问：http://localhost:' + port);
});
