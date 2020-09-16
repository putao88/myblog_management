/*
 * @Author: houxiaoling 
 * @Date: 2020-09-04 17:59:57 
 * @Last Modified by: houxiaoling
 * @Last Modified time: 2020-09-16 16:10:50
 */
import request from '@/utils/request'



let api = {
    getUrl: () => {
        return url;
    },
    login: ( data ) => {
        let url = '/login/adminLogin'
        return request({
            url: url,
            method: 'post',
            data
        })
    },
    logout: ( data ) => {
        let url = '/login/logout'
        return request({
            url: url,
            method: 'post',
            data
        })
    },
    getUserInfo: ( data ) => {
        let url = '/users/getUserInfo'
		return request({
            url: url,
            method: 'post',
            data
		})
    },
}

export { api }