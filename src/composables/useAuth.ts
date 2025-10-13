import { ref, computed } from 'vue'

// Global auth state
const authToken = ref(localStorage.getItem('authToken'))

export function useAuth() {
  const isLoggedIn = computed(() => authToken.value !== null)
  
  const setToken = (token: string) => {
    localStorage.setItem('authToken', token)
    authToken.value = token
  }
  
  const removeToken = () => {
    localStorage.removeItem('authToken')
    authToken.value = null
  }
  
  return {
    isLoggedIn,
    setToken,
    removeToken,
    authToken
  }
}