import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/index.js';

const User = mongoose.model('User');
const jwtExpirySeconds = 3600 * 60 * 24;
const jwtKey = config.secretKey;

// 7. 用户身份认证 (登录)
export const authenticate = async (req, res, next) => {
  try {
    const { username, password } = req.body.auth;
    const user = await User.findOne({ username });

    if (!user) {
      return res.json({ status: 'error', message: 'Invalid username/password!!!', data: null });
    }

    // 验证密码
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id, username: user.username }, jwtKey, {
        algorithm: 'HS256',
        expiresIn: jwtExpirySeconds,
      });

      res.cookie('token', token, { maxAge: jwtExpirySeconds * 1000, httpOnly: true });
      res.status(200).send({ screen: user.username });

      req.user = user;
      next();
    } else {
      res.json({ status: 'error', message: 'Invalid username/password!!!', data: null });
    }
  } catch (err) {
    return next(err);
  }
};

// 9. 登出
export const signout = (req, res) => {
  res.clearCookie('token');
  return res.status(200).json({ message: 'signed out' });
};
