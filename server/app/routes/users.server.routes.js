// 使用 * as 语法将命名导出整合到 users 对象中
import * as users from '../controllers/users.server.controller.js';
import express from 'express';

// 在这个路由配置函数中通常不需要定义 router，除非你打算使用 app.use('/path', router)
// var router = express.Router();

// 使用 export default 替换 module.exports
export default function (app) {
  // 1. 用户列表（受保护）
  app.get('/users', users.requiresLogin, users.list);

  // 2. 创建用户 (注册)
  app.post('/', users.create);

  // 3. 用户 CURD 参数化路由
  app
    .route('/users/:userId')
    .get(users.read)
    .put(users.update)
    // 注意：如果你在控制器里把 delete 改名成了 deleteUser，这里也要同步修改
    .delete(users.deleteUser || users.delete);

  // 4. 设置 userId 参数中间件
  app.param('userId', users.userByID);

  // 5. 认证相关路由
  app.post('/signin', users.authenticate);
  app.get('/signout', users.signout);
  app.get('/read_cookie', users.isSignedIn);

  // 6. 受保护页面
  app.get('/welcome', users.welcome);
}
