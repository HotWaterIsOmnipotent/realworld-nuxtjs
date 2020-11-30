import { request } from '@/plugins/request';

/**
 * 用户登录
 * @param {Object} data 
 * @param {Object} data.user 
 * @param {String} data.user.email
 * @param {String} data.user.password
 */
export const login = data => {
  return request({
    method: 'POST',
    url: '/api/users/login',
    data
  })
}

/**
 * 用户注册
 * @param {Object} data 
 * @param {Object} data.user 
 * @param {String} data.user.username
 * @param {String} data.user.email
 * @param {String} data.user.password
 */
export const regsister = data => {
  return request({
    method: 'POST',
    url: '/api/users',
    data
  })
}