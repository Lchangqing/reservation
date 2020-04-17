import http from '../utils/http';
import { getCookie } from '../utils/tools';

//拿所有广告位的店铺信息
export const getAd = async (params) => await http({
  method: 'get',
  url: '/api/getAds',
  data: params
});

//通过rid拿广告位店铺信息
export const getAdsById = async (params) => await http({
  method: 'get',
  url: '/api/getAdsById',
  data: params
});

//拿所有店铺
export const getRestaurant = async (params) => await http({
  method: 'get',
  url: '/api/getRestaurant',
  data: params
})

//拿所有店铺
export const updataAds = async (params) => await http({
  method: 'post',
  url: '/api/updataAds',
  headers: {
    'x-csrf-token': getCookie("csrfToken"),
  },
  data: params,
})

//通过名字拿所有店铺
export const getReByName = async (params) => await http({
  method: 'get',
  url: '/api/findRestaurant',
  data: params
})

//根据店铺id拿所有的位置信息
export const getSuitsById = async (params) => await http({
  method: 'get',
  url: '/api/getSuitsById',
  data: params
})

//根据店铺id拿菜单
export const getMenusById = async (params) => await http({
  method: 'get',
  url: '/api/getMenusById',
  data: params
})

//预定
export const reserve = async (params) => await http({
  method: 'post',
  url: '/api/reserve',
  headers: {
    'x-csrf-token': getCookie("csrfToken"),
  },
  data: params,
})


//根据菜单具体菜品id拿评论
export const getCommandBydid = async (params) => await http({
  method: 'get',
  url: '/api/getCommandBydid',
  data: params
})

//发表评论
export const commitCommand = async (params) => await http({
  method: 'post',
  url: '/api/commitCommand',
  headers: {
    'x-csrf-token': getCookie("csrfToken"),
  },
  data: params,
})

//通过id拿店铺信息
export const getReById = async (params) => await http({
  method: 'get',
  url: '/api/findByid',
  data: params,
})

//更新饭店信息
export const updateRe = async (params) => await http({
  method: 'post',
  url: '/api/updateRe',
  headers: {
    'x-csrf-token': getCookie("csrfToken"),
  },
  data: params,
})

//更新饭店信息
export const updateLayout = async (params) => await http({
  method: 'post',
  url: '/api/updateLayout',
  headers: {
    'x-csrf-token': getCookie("csrfToken"),
  },
  data: params,
})

// 删除某条菜品
export const deleteDish = async (params) => await http({
  method: 'post',
  url: '/api/deleteDish',
  headers: {
    'x-csrf-token': getCookie("csrfToken"),
  },
  data: params,
})

// 修改某条菜品
export const editDish = async (params) => await http({
  method: 'post',
  url: '/api/editDish',
  headers: {
    'x-csrf-token': getCookie("csrfToken"),
  },
  data: params,
})

// 修改某条菜品图片
export const uploadDish = async (params) => await http({
  method: 'post',
  url: '/api/uploadDish',
  headers: {
    'x-csrf-token': getCookie("csrfToken"),
  },
  data: params,
})

// 增加菜品
export const addDish = async (params) => await http({
  method: 'post',
  url: '/api/addDish',
  headers: {
    'x-csrf-token': getCookie("csrfToken"),
  },
  data: params,
})

// 添加餐位信息
export const addLayout = async (params) => await http({
  method: 'post',
  url: '/api/addLayout',
  headers: {
    'x-csrf-token': getCookie("csrfToken"),
  },
  data: params,
})

// 增加店铺
export const addRestaurant = async (params) => await http({
  method: 'post',
  url: '/api/addRestaurant',
  headers: {
    'x-csrf-token': getCookie("csrfToken"),
  },
  data: params,
})

// 增加店铺
export const upload = async (params) => await http({
  method: 'post',
  url: '/api/upload',
  headers: {
    'x-csrf-token': getCookie("csrfToken"),
  },
  data: params,
})

// 删除店铺
export const deleteRestaurant = async (params) => await http({
  method: 'post',
  url: '/api/deleteRestaurant',
  headers: {
    'x-csrf-token': getCookie("csrfToken"),
  },
  data: params,
})