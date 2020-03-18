'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/api/getRestaurant', controller.restaurant.findAll);
  router.get('/api/getAds', controller.ads.getAds);
  router.get('/api/findRestaurant', controller.restaurant.findReByName);
  router.get('/api/getSuitsById', controller.layout.getSuitsById);
};
