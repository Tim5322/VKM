import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

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
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

// Route guard voor authenticatie
router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('authToken') !== null
  
  // Routes die authenticatie vereisen
  const requiresAuth = ['dashboard'] // Voeg hier routes toe die login vereisen
  
  // Als route authenticatie vereist maar gebruiker niet ingelogd
  if (requiresAuth.includes(to.name as string) && !isLoggedIn) {
    next('/login')
  } 
  // Als gebruiker ingelogd is en naar login/register gaat, redirect naar home
  else if (isLoggedIn && (to.name === 'login' || to.name === 'register')) {
    next('/')
  } 
  else {
    next()
  }
})

export default router
