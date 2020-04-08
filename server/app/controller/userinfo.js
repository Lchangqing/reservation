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

  async getOrderByid() {
    const { ctx } = this;
    try {
      console.log('...ctx.query.body ', { ...ctx.query })
      const result = await ctx.model.Reserve.findAll({
        where: { ...ctx.query },
      });
      ctx.body = { code: 0, data: result };
    } catch (error) {
      ctx.body = { code: -1, data: { msg: '数据获取失败' } };
    }
  }

  async deleteReserve() {
    const { ctx } = this;
    try {
      const order = ctx.request.body;
      const restaurant = await this.ctx.model.Layout.findOne({ where: { rid: order.rid } });
      let { night, noon } = restaurant.dataValues;
      if (order.time.includes('中午') && noon) {
        noon = noon.split(',');
        const index = noon.indexOf(`${order.number}`);
        if (index > -1) {
          noon.splice(index, 1);
        }
        await restaurant.update({ noon: noon.join(',') });
      } else if (order.time.includes('傍晚') && night) {
        night = night.split(',');
        const index = night.indexOf(`${order.number}`);
        if (index > -1) {
          night.splice(index, 1);
        }
        await restaurant.update({ night: night.join(',') });
      }
      const result = await ctx.model.Reserve.destroy({ where: { id: order.id } });
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
