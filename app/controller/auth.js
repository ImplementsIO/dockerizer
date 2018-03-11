'use strict';

const Controller = require('egg').Controller;

class AuthController extends Controller {
  async logout() {
    const { ctx } = this;
    ctx.logout();
    ctx.redirect('/');
  }
}

module.exports = AuthController;
