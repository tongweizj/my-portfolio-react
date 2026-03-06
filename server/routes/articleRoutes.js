import express from 'express';
// 引入用户控制器（用于权限校验）
import * as users from '../controllers/usersController.js';
// 引入文章控制器
import {
  create,
  list,
  articleByID,
  read,
  update,
  deleteArticle,
  hasAuthorization,
} from '../controllers/articlesController.js';

const router = express.Router();

// --- 路径：/api/articles ---
router.route('/').get(list).post(users.requiresLogin, create);

// --- 路径：/api/articles/:articleId ---
router
  .route('/:articleId')
  .get(read)
  .put(users.requiresLogin, hasAuthorization, update)
  .delete(users.requiresLogin, hasAuthorization, deleteArticle);

// 设置参数拦截器
router.param('articleId', articleByID);

export default router;
