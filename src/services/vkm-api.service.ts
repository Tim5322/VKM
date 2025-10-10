import { getApiUrl, config } from '../config/environment'

// Basis API service voor communicatie met NestJS backend
export class ApiService {
  
  // Generieke GET request
  static async get(endpoint: string) {
    try {
      const response = await fetch(getApiUrl(endpoint), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error)
      throw error
    }
  }
  
  // Generieke POST request
  static async post(endpoint: string, data: any) {
    try {
      const response = await fetch(getApiUrl(endpoint), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error(`Error posting to ${endpoint}:`, error)
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
// const data = await ApiService.get('/api/your-endpoint')
// const result = await ApiService.post('/api/your-endpoint', { some: 'data' })