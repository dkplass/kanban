import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: {
          title: 'Dashboard',
          icon: 'grid'
        }
      }
    ]
  },
  {
    path: '/loop',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Loop',
        component: () => import('@/views/loop/index'),
        meta: {
          title: 'Loop_Status',
          icon: 'bounding-box-circles'
        }
      }
    ]
  },
  {
    path: '/node',
    component: Layout,
    redirect: '/node/index',
    name: 'node',
    meta: {
      title: 'Node',
      icon: 'diagram-2'
    },
    children: [
      {
        path: 'timespan',
        name: 'NodesTimespan',
        component: () => import('@/views/node/nodes-timespan'),
        meta: {
          title: 'Node_Timespan_Information'
        }
      },
      {
        path: 'balance',
        name: 'NodesBalance',
        component: () => import('@/views/node/nodes-balance'),
        meta: {
          title: 'Node_Balance'
        }
      }
    ]
  },
  {
    path: '/bad-reason',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'BadReason',
        component: () => import('@/views/product-badreason/index'),
        meta: {
          title: 'Product_Badreason',
          icon: 'exclamation-triangle-fill'
        }
      }
    ]
  },
  {
    path: '*',
    redirect: '/dashboard',
    hidden: true
  }
]

const createRouter = () => new Router({
  mode: 'history',
  base: '/kanban/',
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
