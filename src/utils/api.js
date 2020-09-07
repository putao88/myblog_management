/*
 * @Author: houxiaoling 
 * @Date: 2020-09-04 17:59:57 
 * @Last Modified by: houxiaoling
 * @Last Modified time: 2020-09-07 17:44:00
 */
import exp from './exp'
let { AxiosGet, AxiosPost } = exp

let url = 'http://127.0.0.1:3001'

let api = {
    getUrl: () => {
        return url;
    },
    login: ( data,callback ) => {
        let uri = url + '/login/adminLogin'
		AxiosPost({
			url: uri,
			data: data,
			reback: (res) => {
				callback(res)
			}
		})
    },
    getUserInfo: ( data,callback ) => {
        let uri = url + '/user/getUserInfo'
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