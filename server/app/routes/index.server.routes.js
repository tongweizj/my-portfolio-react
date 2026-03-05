// 导入控制器
import { render } from '../controllers/index.server.controller.js';

// 使用 export default 替换 module.exports
export default function (app) {
  // 处理根路径的 GET 请求
  app.get('/', render); // 访问 http://localhost:3000/
}
