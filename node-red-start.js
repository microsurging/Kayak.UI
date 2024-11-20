const express = require('express');
const settings = {
  httpAdminRoot: '/red',
  httpNodeRoot: '/api',
  userDir: './node-red-config',
  functionGlobalContext: {},
  // 其他Node-RED设置...
};

const server = express();
const red = require('node-red');

// 初始化Node-RED
red.init(server, settings);

// 加载Node-RED的http节点路由和管理UI
server.use(settings.httpAdminRoot, red.httpAdmin);
server.use(settings.httpNodeRoot, red.httpNode);

// 服务器监听3000端口
server.listen(3000, function () {
  console.log('Node-RED started on port 3000.');
});
