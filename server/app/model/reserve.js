'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Reserve = app.model.define('reserve', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    number: INTEGER,
    uid: INTEGER,
    rid: INTEGER,
    time: STRING(255),
    smoking: STRING(255),
    window: STRING(255),
    table: STRING(255),
    name: STRING(255),
    phone: STRING(255),
    restaurant_name: STRING(255),
  }, {
    timestamps: false, // 去除createAt updateAt
    freezeTableName: true, // 使用自定义表名
    // 实例对应的表名
    tableName: 'reserve',
  });

  return Reserve;
};
