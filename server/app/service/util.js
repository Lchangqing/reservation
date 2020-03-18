'use strict';
/*
|--------------------------------------------------------------------------
| Utils杂七杂八的工具函数
|--------------------------------------------------------------------------
|
*/
const Service = require('egg').Service;
class Utils extends Service {

  // 过滤ctx参数(对象参数)中的真值
  filterTure(obj) {
    const param = {};
    if (obj === null || obj === undefined || obj === '') return param;
    if (typeof obj === 'string') {
      obj = JSON.parse(obj);
      const _param = {};
      for (const key in obj) {
        if (typeof obj[key] === 'number') { // type等属性为-1时不查询
          _param[key] = obj[key] > -1 ? obj[key] : null;
        } else {
          _param[key] = obj[key];
        }
      }
      for (const key in _param) { // filter the true item
        if (_param[key] !== null && _param[key] !== undefined && _param[key] !== '') {
          param[key] = _param[key];
        }
      }
    }

    return param;
  }
}

module.exports = Utils;
