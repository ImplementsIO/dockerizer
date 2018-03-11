'use strict';

const Controller = require('egg').Controller;

const RULE_CREATE = {
  templateName: {
    type: 'string',
    required: true,
  },
  templateType: {
    type: 'string',
    required: true,
  },
  templateRaw: {
    type: 'string',
    required: true,
  },
  contributor: {
    type: 'string',
    required: true,
  },
};

class TemplateController extends Controller {
  async index() {
    const { ctx } = this;
    const { query, options } = ctx.helper.formatPaginatedQuery(
      ctx.method === 'POST' ? ctx.request.body : ctx.query,
      {
        searchKey: 'templateName',
      }
    );
    const templates = await ctx.model.Template.paginate(
      Object.assign({
        approved: true,
      }, query),
      options
    );
    const data = ctx.helper.formatMongoosePaginateData(templates);
    data.title = 'Templates';
    await this.ctx.render('template/index.html', data);
  }

  async show() {
    const { ctx } = this;
    const _id = ctx.params.id;
    const template = await ctx.model.Template.findOne({
      _id,
    });

    if (!template) {
      ctx.throw(410);
      return;
    }

    const contributor = await ctx.model.User.findOne(
      {
        githubId: template.contributor,
      },
      {
        displayName: 1,
        avatar: 1,
        username: 1,
      }
    );

    const isLogin = ctx.isAuthenticated();
    await ctx.render('template/detail.html', {
      title: 'Template',
      isLogin,
      template,
      contributor,
    });
  }

  async create() {
    const { ctx } = this;
    ctx.logger.debug(ctx.request.body);
    ctx.validate(RULE_CREATE, ctx.request.body);
    const {
      templateRaw,
      templateName,
      templateType,
      templateEnvs,
      contributor,
    } = ctx.request.body;

    const template = new ctx.model.Template({
      templateName,
      templateType,
      templateRaw,
      contributor,
    });
    template.templateEnvs = templateEnvs && templateEnvs.split(',') || [];
    await template.save();

    ctx.redirect(`/templates/${template._id}`);
  }

  async new() {
    const { ctx } = this;
    const { githubId } = ctx.user;
    await ctx.render('template/new.html', {
      title: 'Submit Template',
      contributor: githubId,
    });

  }
}

module.exports = TemplateController;
