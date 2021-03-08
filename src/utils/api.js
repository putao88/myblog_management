/*
 * @Author: houxiaoling 
 * @Date: 2020-09-04 17:59:57 
 * @Last Modified by: houxiaoling
 * @Last Modified time: 2021-01-26 14:38:18
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
    addArticle: ( data ) => {
        let url = '/articles/addArticle'
		return request({
            url: url,
            method: 'post',
            data
		})
    },
    updateArticle: ( data ) => {
        let url = '/articles/updateArticleBackend'
		return request({
            url: url,
            method: 'post',
            data
		})
    },
    deleteArtcle: ( data ) => {
        let url = '/articles/deleteArtcle'
		return request({
            url: url,
            method: 'post',
            data
		})
    },
    queryAllArticle: ( data ) => {
        let url = '/articles/queryAll'
		return request({
            url: url,
            method: 'get',
		})
    },
    getArticleById: ( data ) => {
        let url = '/articles/getArticleById'
		return request({
            url: url,
            method: 'post',
            data
		})
    },
    queryArticleClassify: ( data ) => {
        let url = '/articles/queryArticleClassify'
		return request({
            url: url,
            method: 'get',
		})
    },
    addArtcleClassify: ( data ) => {
        let url = '/articles/addArtcleClassify'
		return request({
            url: url,
            method: 'post',
            data
		})
    },
    updateArtcleClassify: ( data ) => {
        let url = '/articles/updateArtcleClassify'
		return request({
            url: url,
            method: 'post',
            data
		})
    },
    deleteArtcleClassify: ( data ) => {
        let url = '/articles/deleteArtcleClassify'
		return request({
            url: url,
            method: 'post',
            data
		})
	},
	getAllWhisper: ( data ) => {
        let url = '/whispers/queryAll'
		return request({
            url: url,
            method: 'get',
		})
	},
	deleteWhisper: ( data ) => {
        let url = '/whispers/deleteWhisper'
		return request({
            url: url,
            method: 'post',
            data
		})
	},
	updateWhisper: ( data,callback ) => {
        let url = '/whispers/updateWhisper'
		return request({
            url: url,
            method: 'post',
            data
		})
    },
	addWhisper: ( data ) => {
        let url = '/whispers/addWhisper'
		return request({
            url: url,
            method: 'post',
            data
		})
    },
}

export { api }