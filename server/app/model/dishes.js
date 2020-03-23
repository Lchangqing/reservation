'use strict';
module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Dishes = app.model.define('dishes', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    rid: INTEGER,
    price: INTEGER,
    classify: STRING(255),
    describe: STRING(255),
    img: STRING(255),
    name: STRING(255),
  }, {
    tableName: 'dishes',
    timestamps: false,
  });
  return Dishes;
};
