'use strict';
const Controller = require('egg').Controller;


class RestautantController extends Controller {
  async getAds() {
    const { ctx } = this;
    const result = await ctx.model.Ads.findAll(
      {
        include: [{ model: ctx.model.Restaurant }],
      }
    );
    const restaurant = result.map(item => item.restaurant);
    ctx.body = { code: 0, data: restaurant };
  }
}

module.exports = RestautantController;
