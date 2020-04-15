'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Userinfo = app.model.define('userinfo', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    rid: INTEGER,
    name: STRING(255),
    password: STRING(255),
    restaurant: STRING(255),
  }, {
    timestamps: false, // 去除createAt updateAt
    freezeTableName: true, // 使用自定义表名
    // 实例对应的表名
    tableName: 'userinfo',
    // fields: [ 'rid' ],
    // constraints: false,
  });

  return Userinfo;
};
