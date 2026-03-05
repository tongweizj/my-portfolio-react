// Load the module dependencies
const Site = require('mongoose').model('Site');
const config = require('../../config/config');

//'read' controller method to display a user
exports.read = function (req, res) {
  // findOne 不传条件，默认返回集合中的第一条记录
  Site.findOne({}, (err, site) => {
    if (err) {
      return res.status(400).send({
        message: '无法获取站点信息',
      });
    }
    if (!site) {
      return res.status(404).send({
        message: '未找到站点配置记录',
      });
    }

    // 返回该对象
    res.json(site);
  });
};

exports.update = function (req, res) {
  console.log('req:', req.body);
  // 1. 查找唯一的一条记录
  Site.findOne({}, (err, site) => {
    if (err || !site) return res.status(400).send({ message: '未找到要更新的记录' });

    // 2. 更新字段 (确保这里拼写是 profile)
    console.log('req.body: ', req.body);
    site.profile = req.body.profile;
    site.project = req.body.project;
    site.blogname = req.body.blogname;
    site.blogdescription = req.body.blogdescription;

    // 3. 保存
    site.save((err) => {
      if (err) return res.status(400).send({ message: '保存失败' });
      res.json(site);
    });
  });
};
