'use strict';

module.exports = app => {
  // app
  app.locals = {
    nav_menu: [
      {
        name: 'Home',
        href: '/',
      },
      {
        name: 'Docs',
        href: '/docs',
      },
      {
        name: 'About',
        href: '/about',
      },
      {
        name: 'Contributors',
        href: '/contributors',
      },
    ],
  };

  // passport
  const githubHandler = async (ctx, { profile }) => {
    let existUser = await ctx.model.User.findOne({
      githubId: profile.id,
    });

    // 用户不存在则创建
    if (!existUser) {
      existUser = new ctx.model.User({});
    }

    // 用户存在，更新字段
    existUser.avatar = profile._json.avatar_url;
    existUser.username = profile.username;
    existUser.githubId = profile.id;
    existUser.displayName = profile.displayName;
    existUser.githubJson = profile._json;
    await existUser.save();

    return existUser;
  };

  app.passport.verify(async (ctx, user) => {
    ctx.logger.debug('passport.verify', user);
    const existUser = await githubHandler(ctx, user);
    if (existUser) {
      // id存入Cookie, 用于验证过期.
      const authToken = existUser._id + '$$$$'; // 以后可能会存储更多信息，用 $$$$ 来分隔
      const opts = {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 30,
        signed: true,
        httpOnly: true,
      };
      ctx.cookies.set(app.config.authCookieName, authToken, opts); // cookie 有效期30天
    }
    return existUser;
  });

  app.passport.serializeUser(async (ctx, user) => {
    if (user) {
      return {
        _id: user._id,
      };
    }
    return user;
  });

  app.passport.deserializeUser(async (ctx, user) => {
    if (user && user._id) {
      const existUser = await ctx.model.User.findOne({
        _id: user._id,
      });
      return existUser;
    }
    return user;
  });
};
