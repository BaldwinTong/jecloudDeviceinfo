/**
 * 项目预览服务，默认端口+100，如3000，预览端口为3100
 */
const express = require('express');
const request = require('request');
const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const { resolve, getIPAdress } = require('../utils');

// 读取配置文件
let config = {};
['.env', '.env.development'].forEach((file) => {
  [file, file + '.local'].forEach((name) => {
    const filePath = resolve(name);
    if (fs.existsSync(filePath)) {
      config = Object.assign(config, dotenv.parse(fs.readFileSync(filePath)));
    }
  });
});

//路由代理
const { VUE_APP_SERVICE_PROXY, VUE_APP_SERVICE_PORT, VUE_APP_MICRO_CONFIG_PREFIX_SERVICE } = config;
const distDir = resolve('dist');

var app = express();
//跨域支持，可以测试cdn
app.use(cors());

//初始化路由,设定项目初始页面
var router = express.Router();
router.get('/', function (req, res, next) {
  res.sendFile(resolve(distDir, 'index.html'));
});
app.use('/', router);
//静态资源和node代码在一个目录下
app.use('/', express.static(distDir));

//子应用静态资源，确保跟主项目在同一个目录
const jecloud = resolve('../');
const files = fs.readdirSync(jecloud) || [];
files.forEach((name) => {
  if (name.startsWith('jecloud-')) {
    const folder = name.split('-').pop();
    const fileDist = path.resolve(jecloud, name, 'dist');
    app.use(`${VUE_APP_MICRO_CONFIG_PREFIX_SERVICE}/${folder}/`, express.static(fileDist));
  }
});

app.use('/', (req, res, next) => {
  var url = VUE_APP_SERVICE_PROXY + req.originalUrl;
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
const port = Number(VUE_APP_SERVICE_PORT) + 100; // 默认端口增加100
const server = '0.0.0.0';
app.listen(port, server, function () {
  console.log('\n', '预览服务已启动，请访问：', '\n');
  console.log(` http://localhost:${port}`);
  console.log(` http://${getIPAdress()}:${port}`);
});
