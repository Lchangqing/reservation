'use strict';
const Controller = require('egg').Controller;
const Op = require('sequelize').Op;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}
class RestautantController extends Controller {
  async findAll() {
    const { ctx } = this;
    const result = await ctx.model.Restaurant.findAll();
    ctx.body = { code: 0, data: result };
  }

  async findReByName() {
    const { ctx } = this;
    try {
      console.log('ctx.query', ctx.query);
      let name = '';
      if (typeof ctx.query.where === 'string') {
        name = JSON.parse(ctx.query.where).name;
      } else {
        name = ctx.query.where.name;
      }
      const result = await ctx.model.Restaurant.findAll({
        where: {
          name: {
            [Op.like]: `%${name}%`,
          },
        },
      });
      // console.log('name', result);
      ctx.body = { code: 0, data: result };
    } catch (error) {
      ctx.body = { code: -1, data: { msg: '获取数据失败' } };
    }
  }
}

module.exports = RestautantController;
