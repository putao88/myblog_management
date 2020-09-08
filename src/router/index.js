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






Vue.use(Router)

export const constantRouterMap = [
    { path: '/login', component: Login, hidden: true  },
    { path: '/authredirect', component: Authredirect, hidden: true  },
    { path: '/notFound', component: NotFound, hidden: true  },
    { path: '/noPower', component: NoPower, hidden: true },
    {
        path: '/',
        component: Layout,
        redirect: 'dashboard',
        icon:'el-icon-s-data',
        hidden: true,
        children: [{ path: 'dashboard', component: Dashboard }]
    },
    {
        path: '/dashboard',
        component: Layout,
        name: '首页',
        icon:'el-icon-s-data',
        children: [{ path: 'index', component: Dashboard }]
      },
      {
        path: '/article',
        component: Layout,
        name: '文章管理',
        icon:'el-icon-document',
        children: [{ path: 'index', component: Article }]
      },
      {
        path: '/leacots',
        component: Layout,
        name: '留言管理',
        icon:'el-icon-chat-dot-round',
        children: [{ path: 'index', component: Leacots }]
      },
]
export default new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
})

export const asyncRouterMap = []