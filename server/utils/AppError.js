/**
 * 继承原生的 Error 类
 */
class AppError extends Error {
  constructor(message, statusCode) {
    super(message); // 调用父类构造函数设置 message

    this.statusCode = statusCode;
    // 根据状态码自动判断是 4xx 还是 5xx
    // 4xx 是 'fail' (客户端错)，5xx 是 'error' (服务器错)
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';

    // 标记这是一个“操作性错误”（Operational Error）
    // 比如：用户输入错误、数据库查不到。
    // 区别于“编程错误”（比如代码里拼写错误、变量未定义）
    this.isOperational = true;

    // 捕获堆栈跟踪，这样报错时能定位到具体代码行
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
