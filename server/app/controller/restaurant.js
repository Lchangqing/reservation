'use strict';
const Controller = require('egg').Controller;
const Op = require('sequelize').Op;
// 文件存储
const fs = require('fs');
const path = require('path');
const pump = require('mz-modules/pump');
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

  async findByid() {
    const { ctx } = this;
    try {
      const { id } = ctx.query;
      const result = await ctx.model.Restaurant.findOne({
        where: { id },
      });
      ctx.body = { code: 0, data: result };
    } catch (error) {
      ctx.body = { code: -1, data: { msg: '获取数据失败' } };
    }
  }

  async updateRe() {
    const { ctx } = this;
    try {
      const { rid: id, datas } = ctx.request.body;
      console.log('-----28,rid', id, '-------datas', datas);
      const restaurant = await this.ctx.model.Restaurant.findByPk(id);
      const updateVal = {};
      datas.forEach(item => {
        console.log('item', item);
        updateVal[item.name] = item.val;
      });
      console.log('updateVal', updateVal);
      const result = await restaurant.update({ ...updateVal });
      ctx.body = { code: 0, data: result };
    } catch (error) {
      ctx.body = { code: -1, data: { msg: '数据更新失败' } };
    }
  }

  async upload() {
    const { ctx } = this;
    try {
      const parts = ctx.multipart({ autoFields: true });
      let stream,
        img_list = [];
      while ((stream = await parts()) != null) {
        if (!stream.filename) {
          break;
        }
        // 文件名为：时间戳+随机字符串+.文件后缀
        const filename = (new Date()).getTime() + Math.random().toString(36).substr(2) + path.extname(stream.filename).toLocaleLowerCase();
        // 上传图片的目录
        const target = 'E:/大四下/毕业设计/reservation/front/public/images3/' + filename;
        img_list.push('images3/' + filename);
        const writeStream = fs.createWriteStream(target);
        await pump(stream, writeStream);
      }
      this.ctx.body = { code: 0, data: { url: img_list[0] } };
    } catch (error) {
      ctx.body = { code: -1, data: { msg: '图片上传失败' } };
    }
  }

  async addRestaurant() {
    const { ctx } = this;
    try {
      const { restaurant, tables } = ctx.request.body;
      console.log('restaurant, tables', restaurant, tables)
      let result = await ctx.model.Restaurant.create({ ...restaurant });
      result = result.dataValues;
      console.log('result', result)
      const user = await ctx.model.Userinfo.findByPk(restaurant.uid);
      const result2 = await user.update({ rid: result.id, restaurant: result.name });
      console.log('result2完成')

      let no_window = '';
      let no_smoking = '';
      let stables = '';
      for (let i = 1; i <= tables; i++) {
        if (i === 1) {
          no_window = `${i}`;
          no_smoking = `${i}`;
          stables = `${i}`;
          continue;
        }
        no_window = no_window + `,${i}`;
        no_smoking = no_smoking + `,${i}`;
        stables = stables + `,${i}`;
      }
      console.log('no_window, no_smoking, stables, tables, rid: result.id', no_window, no_smoking, stables, tables, result.id);
      const result3 = await ctx.model.Layout.create({ no_window, no_smoking, stables, tables, rid: result.id });
      ctx.body = { code: 0, data: { result, result2, result3 } };
    } catch (error) {
      ctx.body = { code: -1, data: { msg: '数据插入失败' } };
    }
  }

  async deleteRestaurant() {
    const { ctx } = this;
    try {
      const { id } = ctx.request.body;
      await ctx.model.Commands.destroy({ where: { rid: id } });
      await ctx.model.Reserve.destroy({ where: { rid: id } });
      await ctx.model.Dishes.destroy({ where: { rid: id } });
      await ctx.model.Layout.destroy({ where: { rid: id } });
      await ctx.model.Restaurant.destroy({ where: { id } });
      const user = await ctx.model.Userinfo.findOne({ where: { rid: id } });
      if (user) {
        await user.update({ rid: null, restaurant: null });
      }
      ctx.body = { code: 0, data: 1 };
    } catch (error) {
      ctx.body = { code: -1, data: { msg: '店铺删除失败' } };
    }
  }
}

module.exports = RestautantController;
