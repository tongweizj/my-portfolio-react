// 使用 * as 语法将 users 控制器中所有的命名导出打包到 users 对象中
import * as users from '../../app/controllers/users.server.controller.js';

import {
  create,
  list,
  articleByID,
  read,
  update,
  deleteArticle,
  hasAuthorization,
} from '../controllers/articles.server.controller.js';

export default function (app) {
  app.route('/api/articles').get(list).post(users.requiresLogin, create);

  app
    .route('/api/articles/:articleId')
    .get(read)
    .put(users.requiresLogin, hasAuthorization, update)
    .delete(users.requiresLogin, hasAuthorization, deleteArticle);

  app.param('articleId', articleByID);
}
