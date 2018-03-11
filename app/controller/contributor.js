'use strict';

const Controller = require('egg').Controller;

class ContributorController extends Controller {
  async index() {
    const { ctx } = this;
    const contributors = await ctx.model.User.find({}, {
      displayName: 1,
      avatar: 1,
      username: 1,
    });
    await ctx.render('contributor/index.html', {
      title: 'Contributors',
      contributors,
    });
  }

  async show() {
    const { ctx } = this;
    const _id = ctx.params.id;
    const user = await ctx.model.User.findOne({
      _id,
    });
    if (!user) {
      ctx.throw(410);
      return;
    }
    const { githubJson: detail } = user;
    await ctx.render('contributor/detail.html', {
      title: 'Contributor',
      detail,
    });
  }
}

module.exports = ContributorController;
