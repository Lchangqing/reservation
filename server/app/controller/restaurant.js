'use strict';
const Controller = require('egg').Controller;


class RestautantController extends Controller {
  async findAll() {
    const { ctx } = this;
    const result = await ctx.model.Restaurant.findAll();
    ctx.body = { code: 0, data: result };
  }

}

module.exports = RestautantController;
