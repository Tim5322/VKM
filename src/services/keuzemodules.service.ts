import { ApiService } from './vkm-api.service'
import type { iVkm } from '@/vkm/iVkm'

export interface KeuzeModuleFilters {
  name?: string
  studycredit?: number
  level?: string
  location?: string
}

export class KeuzeModulesService {
  private static readonly endpoint = '/keuzemodules'

  // Haal alle keuzemodules op
  static async getAllKeuzeModules(): Promise<iVkm[]> {
    try {
      const response = await ApiService.get(this.endpoint)
      return response?.data || []
    } catch (error) {
      console.error('Error fetching keuzemodules:', error)
      return []
    }
  }

  // Zoek keuzemodules met filters
  static async searchKeuzeModules(filters: KeuzeModuleFilters): Promise<iVkm[]> {
    try {
      const queryParams = new URLSearchParams()
      
      if (filters.name) queryParams.append('name', filters.name)
      if (filters.studycredit) queryParams.append('studycredit', filters.studycredit.toString())
      if (filters.level) queryParams.append('level', filters.level)
      if (filters.location) queryParams.append('location', filters.location)

      const endpoint = `${this.endpoint}/search?${queryParams.toString()}`
      const response = await ApiService.get(endpoint)
      return response?.data || []
    } catch (error) {
      console.error('Error searching keuzemodules:', error)
      return []
    }
  }

  // Haal een specifieke keuzemodule op
  static async getKeuzeModuleById(id: number): Promise<iVkm | null> {
    try {
      const response = await ApiService.get(`${this.endpoint}/${id}`)
      return response?.data || null
    } catch (error) {
      console.error(`Error fetching keuzemodule ${id}:`, error)
      return null
    }
  }
}