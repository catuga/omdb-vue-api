import HomeView from '../views/HomeView.vue'
import MovieDetailView from '@/views/MovieDetailView.vue'
import MoviesListView from '@/views/MoviesListView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/results',
      name: 'results',
      component: MoviesListView
    },
    {
      path: '/detail',
      name: 'detail',
      component: MovieDetailView
    }
  ]
})

export default router
