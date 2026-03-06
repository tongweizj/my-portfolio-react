import express from 'express';
import * as site from '../controllers/siteController.js';
import * as users from '../controllers/usersController.js';
const router = express.Router();

router.route('/').get(site.read).put(users.requiresLogin, site.update);

export default router;
