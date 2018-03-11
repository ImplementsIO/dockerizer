'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const count = await ctx.model.Template.count();
    await ctx.render('page/home.html', {
      title: 'Home',
      count,
    });
  }

  async docs() {
    await this.ctx.render('page/docs.html', {
      title: 'Docs',
    });
  }

  async about() {
    await this.ctx.render('page/about.html', {
      title: 'About',
    });
  }
}

module.exports = HomeController;
