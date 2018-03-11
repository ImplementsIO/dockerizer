'use strict';

const mongoosePaginate = require('mongoose-paginate');

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const TemplateSchema = new Schema({
    templateRaw: { type: String },
    templateName: { type: String },
    templateType: { type: String },
    contributor: { type: String },
    templateEnvs: [],
    approved: {
      type: Boolean,
      default: true,
    },
  }, {
    autoIndex: false,
    timestamps: true,
  });

  TemplateSchema.plugin(mongoosePaginate);
  return mongoose.model('Template', TemplateSchema);
};
