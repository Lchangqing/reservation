import http from '../utils/http';
import { getCookie } from '../utils/tools';

export const getUsers = async (params) => await http({
  method: 'get',
  url: '/api/getUsers',
  data: params
})
export const userRegister = async (params) => await http({

  method: 'post',
  url: '/api/userRegister',
  headers: {
    'x-csrf-token': getCookie("csrfToken"), // 前后端不分离的情况加每次打开客户端，egg会直接在客户端的 Cookie 中写入密钥 ，密钥的 Key 就是 'scrfToken' 这个字段，所以直接获取就好了
  },
  data: params,

})

export const getOrderByid = async (params) => await http({
  method: 'get',
  url: '/api/getOrderByid',
  data: params
})

// 删除某条订单
export const deleteReserve = async (params) => await http({
  method: 'post',
  url: '/api/deleteReserve',
  headers: {
    'x-csrf-token': getCookie("csrfToken"),
  },
  data: params,
}) 