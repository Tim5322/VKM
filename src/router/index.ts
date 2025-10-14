import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuth } from '@/composables/useAuth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
    },
    {
      path: '/favorieten',
      name: 'favorieten',
      component: () => import('../views/FavorietenView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/keuzemodules',
      name: 'keuzemodules', 
      component: () => import('../views/KeuzeModulesView.vue'),
      meta: { requiresAuth: true }
    },
  ],
})

// Route guard voor authenticatie
router.beforeEach((to, from, next) => {
  const { isLoggedIn } = useAuth()
  
  // Check of route authenticatie vereist
  const requiresAuth = to.meta?.requiresAuth === true
  
  // Als route authenticatie vereist maar gebruiker niet ingelogd
  if (requiresAuth && !isLoggedIn.value) {
    next('/login')
  } 
  // Als gebruiker ingelogd is en naar login/register gaat, redirect naar home
  else if (isLoggedIn.value && (to.name === 'login' || to.name === 'register')) {
    next('/')
  } 
  else {
    next()
  }
})

export default router
