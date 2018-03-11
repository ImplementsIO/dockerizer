'use strict';

const handler = async (ctx, message, status = 500) => {
  ctx.status = status;
  if (ctx.acceptJSON) {
    ctx.body = {
      message,
    };
    return;
  }

  await ctx.render('error.html', {
    status,
    message: status === 404 ? 'The page is missing, find more info at <a href="/">Home</a>.' : message,
  });
};

module.exports = () => {
  return async function errorHandler(ctx, next) {
    try {
      await next();
      if (ctx.status === 404) {
        await handler(ctx, 'Not Found', 404);
      }
    } catch (err) {
      // 注意：自定义的错误统一处理函数捕捉到错误后也要 `app.emit('error', err, this)`
      // 框架会统一监听，并打印对应的错误日志
      ctx.app.emit('error', err, ctx);
      // if (ctx.app.config.env === 'prod') {
      //   const message = err.message;
      //   await handler(ctx, message, err.status);
      // }
      const message = err.message;
      await handler(ctx, message, err.status);
    }
  };
};
