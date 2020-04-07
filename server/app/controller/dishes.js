'use strict';
const { Controller } = require('egg');
// 文件存储
const fs = require('fs');
const path = require('path');
const pump = require('mz-modules/pump');
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
    try {
      const { body } = ctx.request;
      const result = await ctx.model.Commands.create(body);
      ctx.body = { code: 0, data: result };
    } catch (error) {
      ctx.body = { code: -1, data: { msg: '获取数据失败' } };
    }
  }

  async deleteDish() {
    const { ctx } = this;
    try {
      const { body } = ctx.request;
      const result = await ctx.model.Dishes.destroy({ where: { id: body.id } });
      ctx.body = { code: 0, data: result };
    } catch (error) {
      ctx.body = { code: -1, data: { msg: '获取数据失败' } };
    }
  }

  async uploadDish() {
    const { ctx } = this;
    try {
      const parts = ctx.multipart();
      let stream, img;
      while ((stream = await parts()) != null) {
        if (!stream.filename) {
          break;
        }
        // 文件名为：时间戳+随机字符串+.文件后缀
        const filename = (new Date()).getTime() + Math.random().toString(36).substr(2) + path.extname(stream.filename).toLocaleLowerCase();
        // 上传图片的目录
        const target = 'E:/大四下/毕业设计/reservation/front/public/dishesImg/' + filename;
        img = 'dishesImg/' + filename;
        const writeStream = fs.createWriteStream(target);
        await pump(stream, writeStream);
      }
      this.ctx.body = { code: 0, data: { url: img } };
    } catch (error) {
      ctx.body = { code: -1, data: { msg: '获取数据失败' } };
    }
  }

  async editDish() {
    const { ctx } = this;
    try {
      console.log('ctx.request.body', ctx.request.body)
      const { id } = ctx.request.body;
      const dishes = await ctx.model.Dishes.findByPk(id);
      const result = await dishes.update({ ...ctx.request.body });
      ctx.body = { code: 0, data: result };
    } catch (error) {
      ctx.body = { code: -1, data: { msg: '数据更新失败' } };
    }
  }

  async addDish() {
    const { ctx } = this;
    try {
      const dishes = ctx.request.body;
      const result = await ctx.model.Dishes.create({ ...dishes });
      ctx.body = { code: 0, data: result };
    } catch (error) {
      ctx.body = { code: -1, data: { msg: '数据更新失败' } };
    }
  }
}
module.exports = DishesController;
