'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Commands = app.model.define('commands', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    rid: INTEGER,
    did: INTEGER,
    uid: INTEGER,
    name: STRING(255),
    command: STRING,
    date: STRING(255),
  }, {
    timestamps: false, // 去除createAt updateAt
    freezeTableName: true, // 使用自定义表名
    // 实例对应的表名
    tableName: 'commands',
  });

  return Commands;
};
