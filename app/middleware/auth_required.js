'use strict';

module.exports = () => {
  /*
   * 需要用户登录
   */

  return async function(ctx, next) {
    if (!ctx.isAuthenticated()) {
      ctx.throw(403, 'Authentication Required');
      return;
    }
    await next();
  };
};
