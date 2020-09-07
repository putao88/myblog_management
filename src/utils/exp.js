import axios from 'axios'; // 引入axios库
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'


const exp = {
    AxiosGet: (v = { url: '', data: {}, reback: () => { } }) => {
        let { url, data, reback } = v
        data = data || {}
        axios({
            method: 'get',
            url: url,
            data: data,
            timeout: 300000,
            headers: {'Content-Type': 'application/json;charset=utf-8', 'token': '12ssDDdd'}
        })
            .then(function (response) {
                reback(response.data)
            })
            .catch(function (error) {
                console.log(error);
                reback(error)
            });
    },
    AxiosPost: (v = { url: '', data: {}, reback: () => { } }) => {
        let { url, data, reback } = v
        data = data || {}
        axios({
            method: 'post',
            url: url,
            data: data,
            timeout: 300000,
            headers: {'Content-Type': 'application/json;charset=utf-8'},
        })
            .then(function (response) {
                reback(response.data)
            })
            .catch(function (error) {
                console.log(error);
                reback(error)
            });
    }
}

export default exp
  