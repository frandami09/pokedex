import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PageNotFound from '../views/PageNotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/pokemon/:name',
      name: 'pokemon',
      component: () => import('../views/PokemonView.vue'),
      props: true,
    },
    {
      name: 'NotFound',
      path: '/:pathMatch(.*)',
      component: PageNotFound
    },
  ]
})

export default router
