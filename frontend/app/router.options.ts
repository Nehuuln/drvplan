import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
  routes: (_routes) => [
    {
      name: 'home',
      path: '/',
      component: () => import('~/pages/index.vue').then(r => r.default || r)
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('~/pages/auth/login.vue').then(r => r.default || r)
    },
    {
      name: 'register',
      path: '/register',
      component: () => import('~/pages/auth/register.vue').then(r => r.default || r)
    },
    {
      name: 'dashboard',
      path: '/dashboard',
      component: () => import('~/pages/dashboard/index.vue').then(r => r.default || r)
    },
  ],
}