'use strict';
const { Controller } = require('egg');
class LayOutController extends Controller {
  async getSuitsById() {
    const { ctx } = this;
    try {
      const id = ctx.query.id;
      const result = await ctx.model.Layout.findAll({
        where: { id },
      });
      ctx.body = { code: 0, data: result.shift() };
    } catch (error) {
      ctx.body = { code: -1, data: { msg: '获取数据失败' } };
    }
  }

  success(data) {
    this.ctx.body = {
      success: true,
      data,
    };
  }

  notFound(msg) {
    msg = msg || 'not found';
    this.ctx.throw(404, msg);
  }
}
module.exports = LayOutController;
