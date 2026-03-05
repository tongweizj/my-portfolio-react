// Load the module dependencies:
//  config.js module and mongoose module
var config = require('./index'),
  mongoose = require('mongoose');
// Define the Mongoose configuration method
module.exports = function () {
  // Use Mongoose to connect to MongoDB
  const db = mongoose
    .connect(config.db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })
    .then(() => {
      console.log('DB Connected!');
      // 关键：连接成功后执行初始化检查
      seedSiteData();
    })
    .catch((err) => {
      console.log('Error');
    });

  // Load the 'User' model
  require('../app/models/user.server.model');
  // Load the 'Article' model
  require('../app/models/article.server.model');
  // Return the Mongoose connection instance
  require('../app/models/site.server.model');

  // 3. 定义初始化函数
  async function seedSiteData() {
    try {
      const Site = mongoose.model('Site');
      const count = await Site.countDocuments();

      if (count === 0) {
        console.log('--- 正在初始化默认站点数据 ---');
        const defaultSite = new Site({
          profile: '欢迎来到我的博客！这里是默认的个人简介。',
          project: '这是默认的项目列表描述。',
        });
        await defaultSite.save();
        console.log('✅ 默认 Site 记录创建成功！');
      } else {
        console.log('ℹ️ Site 数据已存在，无需初始化。');
      }
    } catch (err) {
      console.error('❌ 初始化 Site 数据失败:', err);
    }
  }
  return db;
};
