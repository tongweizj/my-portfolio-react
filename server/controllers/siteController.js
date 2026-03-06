import mongoose from 'mongoose';

const Site = mongoose.model('Site');

export const read = async (req, res) => {
  try {
    const site = await Site.findOne({});

    if (!site) {
      return res.status(404).send({
        message: '未找到站点配置记录',
      });
    }

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

    const { profile, project, blogname, blogdescription } = req.body;

    site.profile = profile;
    site.project = project;
    site.blogname = blogname;
    site.blogdescription = blogdescription;

    await site.save();
    res.json(site);
  } catch (err) {
    res.status(400).send({ message: '保存失败' });
  }
};
