import { ApiService } from './vkm-api.service'
import { KeuzeModulesService } from './keuzemodules.service'
import type { iVkm } from '@/vkm/iVkm'

export class FavorietenService {
  private static readonly endpoint = '/favorieten'

  // Voeg keuzemodule toe aan favorieten van ingelogde student
  static async addFavoriet(keuzemoduleId: number): Promise<void> {
    try {
      await ApiService.put(`${this.endpoint}/${keuzemoduleId}`, {})
    } catch (error: any) {
      // Als het een 409 conflict is, dan staat de module al in favorieten
      if (error.message?.includes('409')) {
        console.warn('Module already in favorites')
        return
      }
      console.error('Error adding favoriet:', error)
      throw error
    }
  }

  // Verwijder keuzemodule uit favorieten van ingelogde student
  static async removeFavoriet(keuzemoduleId: number): Promise<void> {
    try {
      await ApiService.delete(`${this.endpoint}/${keuzemoduleId}`)
    } catch (error) {
      console.error('Error removing favoriet:', error)
      throw error
    }
  }

  // Haal favoriet IDs op van ingelogde student
  static async getFavorietenIds(): Promise<number[]> {
    try {
      const response = await ApiService.get(this.endpoint)
      const data = response?.data
      
      // Zorg ervoor dat we altijd een array krijgen
      if (Array.isArray(data)) {
        return data
      }
      
      // Als data geen array is, probeer het te converteren
      if (data && typeof data === 'object') {
        // Misschien is het een object met een favorieten property
        if (Array.isArray(data.favorieten)) {
          return data.favorieten
        }
      }
      
      console.warn('Expected array from favorieten endpoint, got:', typeof data, data)
      return []
    } catch (error) {
      console.error('Error fetching favoriet IDs:', error)
      return []
    }
  }

  // Haal volledige favoriet keuzemodules op (IDs + volledige data)
  static async getFavorieten(): Promise<iVkm[]> {
    try {
      // Stap 1: Haal favoriet IDs op van ingelogde student
      const favorietIds = await this.getFavorietenIds()
      
      if (favorietIds.length === 0) {
        return []
      }
      
      // Stap 2: Haal alle keuzemodules op
      const allModules = await KeuzeModulesService.getAllKeuzeModules()
      
      // Stap 3: Filter alleen de favorieten
      const favorietModules = allModules.filter(module => favorietIds.includes(module.id))
      
      return favorietModules
    } catch (error) {
      console.error('Error fetching favorieten:', error)
      return []
    }
  }
}