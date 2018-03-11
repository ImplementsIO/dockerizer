'use strict';

module.exports = appInfo => {
  const config = exports = {};

  config.keys = appInfo.name + '_1520681860737_8028';

  config.authCookieName = 'impl';

  // framework
  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.html': 'nunjucks',
    },
  };

  // middleware
  config.middleware = [
    'errorHandler',
  ];

  // database
  config.mongoose = {
    url: process.env.EGG_MONGOOSE_URL || 'mongodb://egg_dockerize:egg_dockerize@127.0.0.1:27017/egg_dockerize',
    options: {},
  };

  // passport
  config.passportGithub = {
    key: process.env.EGG_PASSPORT_GITHUB_CLIENT_ID || 'test',
    secret: process.env.EGG_PASSPORT_GITHUB_CLIENT_SECRET || 'test',
  };

  return config;
};
