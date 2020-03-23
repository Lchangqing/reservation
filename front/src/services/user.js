import http from '../utils/http';

export const getUsers = async (params) => await http({
  method:'get',
  url:'/api/getUsers',
  data:params
})