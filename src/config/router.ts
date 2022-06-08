import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () =>
      import(/* webpackChunkName: "home" */ '../pages/Home.vue')
  },
  {
    path: '/iframe',
    name: 'Iframe',
    component: () =>
      import(/* webpackChunkName: "iframe" */ '../pages/Iframe.vue')
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: () =>
      import(/* webpackChunkName: "detail" */ '../pages/Detail.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router