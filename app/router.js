'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  const authRequired = middleware.authRequired();

  // page
  router.get('/', controller.home.index);
  router.get('/docs', controller.home.docs);
  router.get('/about', controller.home.about);

  // auth
  router.get('/auth/logout', controller.auth.logout);

  // contributor
  router.get('/contributors', controller.contributor.index);
  router.get('/contributors/:id', controller.contributor.show);

  // docker
  router.all('/templates', controller.template.index);
  router.get('/templates/new', authRequired, controller.template.new);
  router.get('/templates/:id', controller.template.show);
  router.post('/templates/create', authRequired, controller.template.create);

  // github oauth
  app.passport.mount('github');
};
