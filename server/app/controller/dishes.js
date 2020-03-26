'use strict';
const { Controller } = require('egg');
class DishesController extends Controller {
  async getMenusById() {
    const { ctx } = this;
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

  async getCommandBydid() {
    const { ctx } = this;
    try {
      const { id } = ctx.query;
      const result = await ctx.model.Commands.findAll({
        where: { did: id },
      });
      ctx.body = { code: 0, data: result };
    } catch (error) {
      ctx.body = { code: -1, data: { msg: '获取数据失败' } };
    }
  }

  async commitCommand() {
    const { ctx } = this;
    console.log('过来了')
    try {
      console.log('----33')
      const { body } = ctx.request;
      console.log('-----body')
      const result = await ctx.model.Commands.create(body);
      ctx.body = { code: 0, data: result };
    } catch (error) {
      ctx.body = { code: -1, data: { msg: '获取数据失败' } };
    }
  }
}
module.exports = DishesController;
