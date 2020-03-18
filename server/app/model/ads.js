'use strict';

module.exports = app => {
  const { INTEGER } = app.Sequelize;

  const Ads = app.model.define('ads', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    rid: { type: INTEGER },
    priority: { type: INTEGER },
  }, {
    timestamps: false, // 去除createAt updateAt
    freezeTableName: true, // 使用自定义表名
    // 实例对应的表名
    tableName: 'ads',
    // fields: [ 'rid' ],
    // constraints: false,
  });
  Ads.associate = function() {
    app.model.Ads.belongsTo(app.model.Restaurant, { foreignKey: 'rid' });
  };
  return Ads;
};
