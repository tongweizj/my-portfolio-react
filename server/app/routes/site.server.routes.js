// Load the controllers
import * as site from '../controllers/site.server.controller.js';
import * as users from '../controllers/users.server.controller.js';
import express from 'express';

// 如果你在这个文件中不需要使用独立的 router 对象，可以不定义它
// var router = express.Router();

// 使用 export default 替换 module.exports
export default function (app) {
  // 需求 1: 拉取站点信息 (公开访问)
  // 需求 2: 更新站点信息 (需要登录)
  app.route('/api/site').get(site.read).put(users.requiresLogin, site.update);
}
