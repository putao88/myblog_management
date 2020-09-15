import { getToken, setToken, removeToken } from '@/utils/auth'
import { api } from '@/utils/api'

const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
        return new Promise((resolve, reject) => {
        api.login({ info: JSON.stringify(userInfo) }).then(res => {
            const data = res.data
            setToken(data.data.token)
            commit('SET_TOKEN', data.data.token)
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      },
  
      // 获取用户信息
      GetUserInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
          api.getUserInfo({ token:state.token }).then( res => {
            const data = res.data.data[0]
            commit('SET_ROLES', [data.role])
            commit('SET_NAME', data.name)
            commit('SET_AVATAR', data.avatar)
            resolve(res)
          }).catch(error => {
            reject(error)
          })
        })
      },
  

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        api.logout({ token:state.token }).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },
  }
}

export default user
