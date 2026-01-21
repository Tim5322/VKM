import { getApiUrl, config } from '../config/environment'

export class ApiService {
  
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
  
  static async get(endpoint: string) {
    try {
      const url = getApiUrl(endpoint)
      const headers = this.getHeaders()
      
      const response = await fetch(url, {
        method: 'GET',
        headers: headers,
      })
      
      if (!response.ok) {
        // Als 401 Unauthorized, verwijder token en redirect naar login
        if (response.status === 401) {
          localStorage.removeItem('authToken')
          window.location.href = '/login'
          return
        }
        const errorText = await response.text()
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
      }
      
      const data = await response.json()
      
      return {
        data: data,
        status: response.status
      }
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error)
      throw error
    }
  }
  
  static async post(endpoint: string, data: any, options: { skipAuth?: boolean } = {}) {
    try {
      const headers = options.skipAuth ? 
        { 'Content-Type': 'application/json' } : 
        this.getHeaders()
      
      const response = await fetch(getApiUrl(endpoint), {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
      })
      
      if (!response.ok) {
        if (response.status === 401 && !options.skipAuth) {
          localStorage.removeItem('authToken')
          window.location.href = '/login'
          return
        }
        
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
  
  static async checkBackendHealth(): Promise<boolean> {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000)
      
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