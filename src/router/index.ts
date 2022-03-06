import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: '/chart',
        name: 'Chart',
        component: () => import('../views/Chart/index.vue')
      },
      {
        path: '/map',
        name: 'Map',
        component: () => import('../views/Map/index.vue')
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/Error/404.vue')
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
