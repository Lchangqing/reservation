'use strict';
const { Controller } = require('egg');
class LayOutController extends Controller {
  async getSuitsById() {
    const { ctx } = this;
    try {
      const id = ctx.query.id;
      const result = await ctx.model.Layout.findAll({
        where: { rid: id },
      });
      ctx.body = { code: 0, data: result.shift() };
    } catch (error) {
      ctx.body = { code: -1, data: { msg: '获取数据失败' } };
    }
  }

  async reserve() {
    const { ctx } = this;
    try {
      const { number, layout, name, phone, restaurant_name, user, rid } = ctx.request.body;
      const { noon, night, stables, mtables, no_smoking, no_window } = layout;
      const restaurant = await this.ctx.model.Layout.findOne({ where: { rid } });
      let time,
        smoking,
        window,
        table;
      if (!noon.includes(number)) {
        time = '中午时段';
        await restaurant.update({ noon: noon.concat(number).join(',') });
      } else {
        time = '傍晚时段';
        await restaurant.update({ night: night.concat(number).join(',') });
      }
      if (stables.includes(number)) { table = '小桌（容纳1-6人）'; } else if (mtables.includes(number)) { table = '大桌（容纳6-12人）'; } else { table = '聚餐桌（容纳12-20人）'; }
      if (no_smoking.includes(number)) { smoking = '雅静无烟区'; } else { smoking = '热闹区'; }
      if (no_window.includes(number)) { window = '临窗'; } else { window = '不临窗'; }
      const result = await ctx.model.Reserve.create({ uid: user.id, rid, time, smoking, window, table, name, phone, number, restaurant_name });
      ctx.body = { code: 0, data: result };
    } catch (error) {
      ctx.body = { code: -1, data: { msg: '更新数据失败' } };
    }
  }

  async updateLayout() {
    const { ctx } = this;
    try {
      const { layout, id } = ctx.request.body;
      const restaurant = await this.ctx.model.Layout.findByPk(id);
      const result = await restaurant.update({ ...layout });
      ctx.body = { code: 0, data: result };
    } catch (error) {
      ctx.body = { code: -1, data: { msg: '更新数据失败' } };
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
