/*
 * @Author: houxiaoling 
 * @Date: 2020-09-04 17:59:57 
 * @Last Modified by: houxiaoling
 * @Last Modified time: 2020-09-14 18:03:02
 */
import exp from './exp'
let { AxiosGet, AxiosPost } = exp
import fetch from '@/utils/fetch'


let url = 'http://127.0.0.1:3001'

let api = {
    getUrl: () => {
        return url;
    },
    login: ( data ) => {
        let uri = url + '/login/adminLogin'
        return fetch({
            url: uri,
            method: 'post',
            data
        })
    },
    getUserInfo: ( data,callback ) => {
        let uri = url + '/users/getUserInfo'
		AxiosPost({
			url: uri,
			data: data,
			reback: (res) => {
				callback(res)
			}
		})
    },
}

export { api }