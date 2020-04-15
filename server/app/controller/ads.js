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
    // const restaurant = result.map(item => item.restaurant);
    const restaurant = result.map(item => { return { ...item.restaurant.dataValues, aid: item.dataValues.id, priority: item.dataValues.priority }; });
    ctx.body = { code: 0, data: restaurant };
  }

  async updataAds() {
    const { ctx } = this;
    try {
      let ads = ctx.request.body;
      ads = ads.map(item => {
        return { rid: item.rid, priority: item.npriority };
      });
      const result1 = await ctx.model.Ads.destroy({
        where: {},
        truncate: true,
      });
      console.log('result1', result1);
      const result2 = await ctx.model.Ads.bulkCreate(ads);
      ctx.body = { code: 0, data: result2 };
    } catch (error) {
      ctx.body = { code: -1, data: { msg: '数据更新失败' } };
    }
  }
}

module.exports = RestautantController;
