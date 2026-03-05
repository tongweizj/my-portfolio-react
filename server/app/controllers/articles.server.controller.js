import mongoose from 'mongoose';
const { model } = mongoose;
const Article = model('Article');
const User = model('User');

// 私有函数，不需要导出
const getErrorMessage = (err) => {
  if (err.errors) {
    for (let errName in err.errors) {
      if (err.errors[errName].message) return err.errors[errName].message;
    }
  } else {
    return 'Unknown server error';
  }
};

// 1. 创建文章
export const create = async (req, res) => {
  try {
    console.log('收到请求体:', req.body);
    // 1. 显式解构你需要的字段，绝对不要解构 _id
    const { title, content, slug, status } = req.body;

    // 2. 创建一个纯净的数据对象，不带任何多余属性
    const articleData = {
      title: title || '',
      content: content || '',
      slug: slug || `post-${Date.now()}`,
      status: status || 'draft',
    };

    const article = new Article(articleData);
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(400).send({ message: 'User not found' });
    }

    article.creator = user._id;
    const savedArticle = await article.save();

    res.status(200).json(savedArticle);
  } catch (err) {
    console.error('Mongoose 报错详情:', err);
    res.status(400).send({
      message: getErrorMessage(err),
    });
  }
};

// 2. 列表查询
export const list = async (req, res) => {
  try {
    const articles = await Article.find()
      .sort('-created')
      .populate('creator', 'username nickName email');
    res.status(200).json(articles);
  } catch (err) {
    res.status(400).send({
      message: getErrorMessage(err),
    });
  }
};

// 3. 中间件：根据 ID 加载文章
export const articleByID = async (req, res, next, id) => {
  try {
    const article = await Article.findById(id).populate('creator', 'username nickName email');
    if (!article) return next(new Error('Failed to load article ' + id));

    req.article = article;
    next();
  } catch (err) {
    return next(err);
  }
};

// 4. 读取单篇
export const read = (req, res) => {
  res.status(200).json(req.article);
};

// 5. 更新文章
export const update = async (req, res) => {
  try {
    const article = req.article;
    // 使用 Object.assign 批量更新属性
    Object.assign(article, req.body);

    await article.save();
    res.status(200).json(article);
  } catch (err) {
    res.status(400).send({
      message: getErrorMessage(err),
    });
  }
};

// 6. 删除文章
export const deleteArticle = async (req, res) => {
  try {
    const article = req.article;
    await article.deleteOne(); // Mongoose 6+ 建议使用 deleteOne 而不是 remove
    res.status(200).json(article);
  } catch (err) {
    res.status(400).send({
      message: getErrorMessage(err),
    });
  }
};

// 7. 权限校验中间件
export const hasAuthorization = (req, res, next) => {
  // 注意：这里需要确保 req.id 在之前的中间件中已被赋值
  if (req.article.creator.id !== req.id) {
    return res.status(403).send({
      message: 'User is not authorized',
    });
  }
  next();
};
