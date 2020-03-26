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
      // 调用 rotateCsrfSecret 刷新用户的 CSRF token
      ctx.rotateCsrfSecret();
      ctx.body = { code: 0, data: result };
    } catch (error) {
      ctx.body = { code: -1, data: { msg: '获取数据失败' } };
    }
  }

  async userRegister() {
    const { ctx } = this;
    try {
      const { name, password } = ctx.request.body;
      const result = await ctx.model.Userinfo.findAll({
        where: { name },
      });
      if (result.length) {
        ctx.body = { code: 0, data: { exist: 1 } };
      } else {
        await ctx.model.Userinfo.create({ name, password });
        ctx.body = { code: 0, data: { exist: 0, name } };
      }
    } catch (error) {
      ctx.body = { code: -1, data: { msg: '数据插入失败' } };
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
