import mongoose from 'mongoose';

const Site = mongoose.model('Site');

/**
 * 读取站点信息
 * 默认返回集合中的第一条记录
 */
export const read = async (req, res) => {
  try {
    // 改用 await，不再使用回调函数
    const site = await Site.findOne({});

    if (!site) {
      return res.status(404).send({
        message: '未找到站点配置记录',
      });
    }

    // 返回该对象
    res.json(site);
  } catch (err) {
    res.status(400).send({
      message: '无法获取站点信息',
    });
  }
};

/**
 * 更新站点信息
 */
export const update = async (req, res) => {
  try {
    console.log('开始更新，请求体:', req.body);

    // 1. 查找唯一的一条记录
    const site = await Site.findOne({});

    if (!site) {
      return res.status(400).send({ message: '未找到要更新的记录' });
    }

    // 2. 更新字段 (使用现代对象合并方式或手动赋值)
    const { profile, project, blogname, blogdescription } = req.body;

    site.profile = profile;
    site.project = project;
    site.blogname = blogname;
    site.blogdescription = blogdescription;

    // 3. 保存 (await 会处理保存逻辑)
    await site.save();

    console.log('保存成功');
    res.json(site);
  } catch (err) {
    console.error('更新失败:', err);
    res.status(400).send({ message: '保存失败' });
  }
};
