import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/Pages/Login/index'
import Authredirect from '@/Pages/Login/Authredirect'
import NoPower from '@/Pages/ErrorPage/NoPower'
import NotFound from '@/Pages/ErrorPage/NotFound'
import Layout from '@/Pages/Layout/index'
import Dashboard from '@/Pages/Dashboard/index'
import Article from '@/Pages/Article/index'
import Leacots from '@/Pages/Leacots/index'
import Permission from '@/Pages/Permission/index'






Vue.use(Router)

export const constantRouterMap = [
    { path: '/login', component: Login, hidden: true  },
    { path: '/authredirect', component: Authredirect, hidden: true  },
    { path: '/notFound', component: NotFound, hidden: true  },
    { path: '/noPower', component: NoPower, hidden: true },
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        name: '首页',
        icon: 'dashboard',
        hidden: true,
        children: [{ path: 'dashboard', component: Dashboard, name: '首页'  }]
    },
]
export default new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
})

export const asyncRouterMap = [
    {
        path: '/permission',
        component: Layout,
        redirect: '/permission/index',
        name: '权限测试',
        icon: 'lock',
        meta: { role: ['admin'] },
        noDropdown: true,
        children: [{ path: 'index', component: Permission, name: '权限测试页', meta: { role: ['admin'] }}]
      },
    {
        path: '/article',
        component: Layout,
        redirect: '/article/index',
        name: '文章管理',
        icon:'el-icon-document',
        noDropdown: true,
        children: [{ path: 'index', component: Article, name: '文章管理' }]
      },
      {
        path: '/leacots',
        component: Layout,
        redirect: '/leacots/index',
        name: '留言管理',
        icon:'el-icon-chat-dot-round',
        noDropdown: true,
        children: [{ path: 'index', component: Leacots, name: '留言管理',  }]
      },
]