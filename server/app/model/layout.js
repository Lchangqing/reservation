'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const LayOut = app.model.define('layout', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    rid: INTEGER,
    tables: INTEGER,
    stables: STRING(255),
    mtables: STRING(255),
    ltables: STRING(255),
    smoking: STRING(255),
    no_smoking: STRING(255),
    window: STRING(255),
    no_window: STRING(255),
    noon: STRING(255),
    night: STRING(255),
  }, {
    tableName: 'layout',
    timestamps: false,
  });
  return LayOut;
};
