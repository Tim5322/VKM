import { getApiUrl, config } from '../config/environment'

// Basis API service voor communicatie met NestJS backend
export class ApiService {
  
  // Helper functie om headers op te halen inclusief JWT token
  private static getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }
    
    const token = localStorage.getItem('authToken')
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
    
    return headers
  }
  
  // Generieke GET request
  static async get(endpoint: string) {
    try {
      const response = await fetch(getApiUrl(endpoint), {
        method: 'GET',
        headers: this.getHeaders(),
      })
      
      if (!response.ok) {
        // Als 401 Unauthorized, verwijder token en redirect naar login
        if (response.status === 401) {
          localStorage.removeItem('authToken')
          window.location.href = '/login'
          return
        }
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return {
        data: await response.json(),
        status: response.status
      }
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error)
      throw error
    }
  }
  
  // Generieke POST request
  static async post(endpoint: string, data: any, options: { skipAuth?: boolean } = {}) {
    try {
      // Voor login endpoint geen auth header sturen
      const headers = options.skipAuth ? 
        { 'Content-Type': 'application/json' } : 
        this.getHeaders()
      
      const response = await fetch(getApiUrl(endpoint), {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
      })
      
      if (!response.ok) {
        // Als 401 Unauthorized, verwijder token en redirect naar login (maar niet voor login zelf)
        if (response.status === 401 && !options.skipAuth) {
          localStorage.removeItem('authToken')
          window.location.href = '/login'
          return
        }
        
        // Voor login endpoint, probeer response body te lezen voor betere error message
        if (endpoint === '/auth/login') {
          try {
            const errorData = await response.json()
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
          } catch {
            throw new Error(`HTTP error! status: ${response.status}`)
          }
        }
        
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const responseData = await response.json()
      
      return {
        data: responseData,
        status: response.status
      }
    } catch (error) {
      console.error(`Error posting to ${endpoint}:`, error)
      throw error
    }
  }
  
  // PUT request
  static async put(endpoint: string, data: any) {
    try {
      const response = await fetch(getApiUrl(endpoint), {
        method: 'PUT',
        headers: this.getHeaders(),
        body: JSON.stringify(data),
      })
      
      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('authToken')
          window.location.href = '/login'
          return
        }
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return {
        data: await response.json(),
        status: response.status
      }
    } catch (error) {
      console.error(`Error putting to ${endpoint}:`, error)
      throw error
    }
  }
  
  // DELETE request
  static async delete(endpoint: string) {
    try {
      const response = await fetch(getApiUrl(endpoint), {
        method: 'DELETE',
        headers: this.getHeaders(),
      })
      
      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('authToken')
          window.location.href = '/login'
          return
        }
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return {
        data: await response.json(),
        status: response.status
      }
    } catch (error) {
      console.error(`Error deleting ${endpoint}:`, error)
      throw error
    }
  }
  
  // Check of NestJS backend beschikbaar is
  static async checkBackendHealth(): Promise<boolean> {
    try {
      // AbortController voor timeout
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 seconden timeout
      
      const response = await fetch(`${config.backendUrl}/health`, {
        method: 'GET',
        signal: controller.signal,
      })
      
      clearTimeout(timeoutId)
      return response.ok
    } catch (error) {
      console.warn('NestJS backend is not available:', error)
      return false
    }
  }
}

// Voorbeeld van hoe je het kunt gebruiken:
// const result = await ApiService.get('/api/your-endpoint')
// const data = result.data
// const result = await ApiService.post('/api/your-endpoint', { some: 'data' })