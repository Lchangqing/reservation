'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/api/getRestaurant', controller.restaurant.findAll);
  router.get('/api/findRestaurant', controller.restaurant.findReByName);
  router.get('/api/findByid', controller.restaurant.findByid);
  router.post('/api/updateRe', controller.restaurant.updateRe);
  router.post('/api/upload', controller.restaurant.upload);
  router.get('/api/getAds', controller.ads.getAds);
  router.post('/api/updataAds', controller.ads.updataAds);
  router.get('/api/getMenusById', controller.dishes.getMenusById);
  router.get('/api/getCommandBydid', controller.dishes.getCommandBydid);
  router.post('/api/commitCommand', controller.dishes.commitCommand);
  router.post('/api/deleteDish', controller.dishes.deleteDish);
  router.post('/api/editDish', controller.dishes.editDish);
  router.post('/api/uploadDish', controller.dishes.uploadDish);
  router.post('/api/addDish', controller.dishes.addDish);
  router.get('/api/getUsers', controller.userinfo.getUsers);
  router.post('/api/userRegister', controller.userinfo.userRegister);
  router.get('/api/getOrderByid', controller.userinfo.getOrderByid);
  router.post('/api/deleteReserve', controller.userinfo.deleteReserve);
  router.get('/api/getSuitsById', controller.layout.getSuitsById);
  router.post('/api/reserve', controller.layout.reserve);
  router.post('/api/updateLayout', controller.layout.updateLayout);
};
