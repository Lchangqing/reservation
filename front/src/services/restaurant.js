import http from '../utils/http';

export const getAd = async (params) => await http({
  method:'get',
  url:'/api/getRestaurantDetail',
  data:params
});