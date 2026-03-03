// Load the 'users' controller
var site = require('../controllers/site.server.controller');
var users = require('../controllers/users.server.controller');
var express = require('express');
var router = express.Router();
// Define the routes module' method
module.exports = function (app) {
    // 需求 1: 拉取站点信息 (公开访问)
    app.route('/api/site')
       .get(site.read)
       .put(users.requiresLogin, site.update);

};

