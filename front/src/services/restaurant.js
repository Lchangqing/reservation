import http from '../utils/http';

export const getAd = async (params) => await http({
  method:'get',
  url:'/api/getAds',
  data:params
});

export const getReByName = async (params) => await http({
  method:'get',
  url:'/api/findRestaurant',
  data:params
})

export const getSuitsById = async (params) => await http({
  method:'get',
  url:'/api/getSuitsById',
  data:params
}) 