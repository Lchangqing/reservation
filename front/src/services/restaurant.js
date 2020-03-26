import http from '../utils/http';
import { getCookie } from '../utils/tools';

export const getAd = async (params) => await http({
  method: 'get',
  url: '/api/getAds',
  data: params
});

export const getReByName = async (params) => await http({
  method: 'get',
  url: '/api/findRestaurant',
  data: params
})

export const getSuitsById = async (params) => await http({
  method: 'get',
  url: '/api/getSuitsById',
  data: params
})

export const getMenusById = async (params) => await http({
  method: 'get',
  url: '/api/getMenusById',
  data: params
})

export const reserve = async (params) => await http({
  method: 'post',
  url: '/api/reserve',
  headers: {
    'x-csrf-token': getCookie("csrfToken"),
  },
  data: params,
})

export const getCommandBydid = async (params) => await http({
  method: 'get',
  url: '/api/getCommandBydid',
  data: params
})

export const commitCommand = async (params) => await http({
  method: 'post',
  url: '/api/commitCommand',
  headers: {
    'x-csrf-token': getCookie("csrfToken"),
  },
  data: params,
})