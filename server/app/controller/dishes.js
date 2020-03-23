'use strict';
const { Controller } = require('egg');
class DishesController extends Controller {
  async getMenusById() {
    const { ctx } = this;
    console.log('過來了', ctx.query.id);
    try {
      const id = ctx.query.id;
      const result = await ctx.model.Dishes.findAll({
        where: { rid: id },
      });
      ctx.body = { code: 0, data: result };
    } catch (error) {
      ctx.body = { code: -1, data: { msg: '获取数据失败' } };
    }
  }
}
module.exports = DishesController;
