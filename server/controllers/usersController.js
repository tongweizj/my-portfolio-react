import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/index.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/AppError.js';

const User = mongoose.model('User');
const jwtExpirySeconds = 3600 * 60 * 24;
const jwtKey = config.secretKey;

// 错误处理私有函数
const getErrorMessage = (err) => {
  let message = '';
  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        message = 'Username already exists';
        break;
      default:
        message = 'Something went wrong';
    }
  } else {
    for (const errName in err.errors) {
      if (err.errors[errName].message) message = err.errors[errName].message;
    }
  }
  return message;
};

// 1. 创建用户 (不再使用 export default，改为命名导出)
// export const create = async (req, res, next) => {
//   try {
//     const user = new User(req.body);
//     const savedUser = await user.save();
//     res.json(savedUser);
//   } catch (err) {
//     // 传递给 Express 统一错误处理中间件
//     return next(err);
//   }
// };

export const create = catchAsync(async (req, res, next) => {
  const user = new User(req.body);
  const savedUser = await user.save();

  if (!savedUser) {
    // 配合自定义错误类使用（可选）
    return next(new AppError('Fail to create user', 404));
  }

  res.json(savedUser);
});

// 2. 获取用户列表
export const list = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    return next(err);
  }
};

// 3. 读取当前用户
export const read = (req, res) => {
  res.json(req.user);
};

// 4. 根据 ID 加载用户 (中间件)
export const userByID = async (req, res, next, id) => {
  try {
    const user = await User.findOne({ _id: id });
    if (!user) return next(new Error('Failed to load user ' + id));
    req.user = user;
    next();
  } catch (err) {
    return next(err);
  }
};

// 5. 更新用户
export const update = async (req, res, next) => {
  try {
    console.log(req.body);
    // 使用 findByIdAndUpdate 的最新 Promise 写法
    const user = await User.findByIdAndUpdate(req.user.id, req.body, { new: true });
    res.json(user);
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

// 6. 删除用户
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.user.id);
    res.json(user);
  } catch (err) {
    return next(err);
  }
};

// 10. 检查是否已登录
export const isSignedIn = (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.send({ screen: 'auth' }).end();

  try {
    const payload = jwt.verify(token, jwtKey);
    res.json(payload);
  } catch (e) {
    return res.status(401).end();
  }
};

// // 8. 欢迎页 (验证 Token)
// export const welcome = (req, res) => {
//   const token = req.cookies.token;
//   if (!token) return res.status(401).end();

//   try {
//     const payload = jwt.verify(token, jwtKey);
//     res.json(payload);
//   } catch (e) {
//     const status = e instanceof jwt.JsonWebTokenError ? 401 : 400;
//     return res.status(status).end();
//   }
// };

// // 11. 权限拦截中间件
// export const requiresLogin = (req, res, next) => {
//   const token = req.cookies.token;
//   if (!token) return res.send({ screen: 'auth' }).end();

//   try {
//     const payload = jwt.verify(token, jwtKey);
//     req.id = payload.id;
//     next();
//   } catch (e) {
//     return res.status(401).end();
//   }
// };
