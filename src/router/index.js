import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  // {
  //   path: '/login',
  //   component: () => import('@/views/login/index'),
  //   hidden: true,
  //   children: [
  //     {
  //       path: '',
  //       component: () => import('@/views/login/login'),
  //     },
  //     {
  //       path: '/forget', component: () => import('@/views/login/forget/index'),
  //     }
  //   ]
  // },
  // {
  //   path: '/forget', component: () => import('@/views/login/forget/index'),
  //   hidden: true
  // },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  //首页
  {
    path: '/',
    component: () => import('@/views/home/index'),
    // redirect: '/user',
    name: 'home',
    hidden: true,
    // children: [{
    //   path: 'home',
    //   meta: {
    //     title: '首页',
    //     icon: 'home'
    //   },
    //   component: () => import('@/views/home/index')
    // }]
  },
  //用户信息
  // {
  //   path: '/user',
  //   hidden: true,
  //   // component: Layout,
  //   redirect: '/user/index',
  //   name: 'user',
  //   children: [{
  //     path: 'index',
  //     meta: {
  //       title: '用户信息',
  //       icon: 'user'
  //     },
  //     component: () => import('@/views/user/index')
  //   }]
  // },
  // //患者登记
  // {
  //   path: '/patient',
  //   redirect: '/patient/register',
  //   component: Layout,
  //   name: 'patient',
  //   meta: {
  //     title: '患者管理',
  //     icon: 'patient'
  //   },
  //   children: [
  //     {
  //       path: 'register',
  //       name: 'patientRegister',
  //       meta: {
  //         title: '患者登记',
  //       },
  //       component: () => import('@/views/patient/register/index'),
  //     },
  //     {
  //       path: 'lists',
  //       name: 'patientLists',
  //       meta: {
  //         title: '登记列表',
  //       },
  //       component: () => import('@/views/patient/lists/index'),
  //     }
  //   ]
  // },
  //处方管理
  // {
  //   path: '/prescription',
  //   redirect: '/prescription/application',
  //   component: Layout,
  //   name: 'prescription',
  //   meta: {
  //     title: '处方管理',
  //     icon: 'prescription'
  //   },
  //   children: [
  //     {
  //       path: 'application',
  //       name: 'prescriptionApplication',
  //       meta: {
  //         title: '处方申请',
  //       },
  //       component: () => import('@/views/prescription/application/index'),
  //     },
  //     {
  //       path: 'printing',
  //       name: 'prescriptionPrinting',
  //       meta: {
  //         title: '处方打印',
  //       },
  //       component: () => import('@/views/prescription/printing/index'),
  //     },
  //     {
  //       path: 'lists',
  //       name: 'prescriptionLists',
  //       meta: {
  //         title: '处方列表',
  //       },
  //       component: () => import('@/views/prescription/lists/index'),
  //     }
  //   ]
  // },
  //药品管理
  // {
  //   path: '/drugs',
  //   redirect: '/drugs/index',
  //   component: Layout,
  //   children: [
  //     {
  //       path: '',
  //       name: 'drugs',
  //       meta: {
  //         title: '药品管理',
  //         icon: 'drugs'
  //       },
  //       component: () => import('@/views/drugs/index'),
  //     }
  //   ]
  // },
  //线上订单
  // {
  //   path: '/onlineOrder',
  //   redirect: '/onlineOrder/index',
  //   component: Layout,
  //   children: [
  //     {
  //       path: '',
  //       name: 'onlineOrder',
  //       meta: {
  //         title: '线上订单',
  //         icon: 'onlineOrder'
  //       },
  //       component: () => import('@/views/onlineOrder/index'),
  //     },
  //     {
  //       path: '/onlineOrder/detail/:id',
  //       name: 'onlineOrderDetail',
  //       hidden: true,
  //       meta: {
  //         title: '订单详情'
  //       },
  //       component: () => import('@/views/onlineOrder/detail')
  //     }
  //   ]
  // },
  //远程门诊
  // {
  //   path: '/outpatient',
  //   redirect: '/outpatient/index',
  //   component: Layout,
  //   children: [
  //     {
  //       path: '',
  //       name: 'outpatient',
  //       meta: {
  //         title: '远程门诊',
  //         icon: 'outpatient'
  //       },
  //       component: () => import('@/views/outpatient/index'),
  //     }
  //   ]
  // },

  // {
  //   path: '/outpatient',
  //   redirect: '/outpatient/register',
  //   component: Layout,
  //   name: 'outpatient',
  //   meta: {
  //     title: '远程门诊',
  //     icon: 'outpatient'
  //   },
  //   children: [
  //     {
  //       path: 'register',
  //       name: 'outpatientRegister',
  //       meta: {
  //         title: '挂号',
  //       },
  //       component: () => import('@/views/outpatient/register/index'),
  //     },
  //     {
  //       path: 'consultation',
  //       name: 'outpatientConsultation',
  //       meta: {
  //         title: '今日就诊',
  //       },
  //       component: () => import('@/views/outpatient/consultation/index'),
  //     },
  //     {
  //       path: 'visitingRecord',
  //       name: 'outpatientVisitingRecord',
  //       meta: {
  //         title: '就诊记录',
  //       },
  //       component: () => import('@/views/outpatient/visitingRecord/index'),
  //     }
  //   ]
  // },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
