'use strict';

const moment = require('moment');

module.exports = {
  formatDateTime(datatime) {
    return moment(datatime).format('DD/MM/YYYY, hh:mm:ss A');
  },

  formatPaginatedQuery({ limit, page, s }, opt = {}) {
    const searchKey = opt.searchKey || 'name';
    let query = {};
    let options = {};

    if (typeof s === 'undefined') {
      options = {
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 20,
      };
    }

    if (s === '') {
      options = {
        limit: 50,
      };
    }

    if (typeof s !== 'undefined' && s !== '') {
      query = {
        [searchKey]: {
          $regex: s,
        },
      };
      options = {
        limit: 50,
      };
    }

    return {
      query,
      options,
    };
  },

  formatMongoosePaginateData(response) {
    const { total, limit, docs: data } = response;
    const meta = {
      total,
      limit,
    };

    response.page && (meta.page = response.page);
    response.pages && (meta.pages = response.pages);
    response.offset && (meta.offset = response.offset);

    return {
      meta,
      data,
    };
  },
};
