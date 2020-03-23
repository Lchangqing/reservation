'use strict';
const { Controller } = require('egg');
class UserinfoController extends Controller {
  async getUsers() {
    const { ctx } = this;
    try {
      const { name, password } = ctx.query;
      const result = await ctx.model.Userinfo.findAll({
        where: { name, password },
      });
      ctx.body = { code: 0, data: result };
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
module.exports = UserinfoController;
