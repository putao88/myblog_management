/*
 * @Author: houxiaoling 
 * @Date: 2020-09-04 17:59:57 
 * @Last Modified by: houxiaoling
 * @Last Modified time: 2020-09-15 16:22:21
 */
import fetch from '@/utils/fetch'



let api = {
    getUrl: () => {
        return url;
    },
    login: ( data ) => {
        let url = '/login/adminLogin'
        return fetch({
            url: url,
            method: 'post',
            data
        })
    },
    logout: ( data ) => {
        let url = '/login/logout'
        return fetch({
            url: url,
            method: 'post',
            data
        })
    },
    getUserInfo: ( data ) => {
        let url = '/users/getUserInfo'
		return fetch({
            url: url,
            method: 'post',
            data
		})
    },
}

export { api }