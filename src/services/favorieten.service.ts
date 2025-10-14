import { ApiService } from './vkm-api.service'
import { KeuzeModulesService } from './keuzemodules.service'
import type { iVkm } from '@/vkm/iVkm'

export class FavorietenService {
  private static readonly endpoint = '/favorieten'

  // Voeg keuzemodule toe aan favorieten
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

  // Verwijder keuzemodule uit favorieten
  static async removeFavoriet(keuzemoduleId: number): Promise<void> {
    try {
      await ApiService.delete(`${this.endpoint}/${keuzemoduleId}`)
    } catch (error) {
      console.error('Error removing favoriet:', error)
      throw error
    }
  }

  // Haal alle favorieten op
  static async getFavorieten(): Promise<iVkm[]> {
    try {
      const response = await ApiService.get(this.endpoint)
      const favorietenData = response?.data || []
      
      // Als we alleen IDs krijgen, haal volledige data op
      if (favorietenData.length > 0 && typeof favorietenData[0] === 'number') {
        const allModules = await KeuzeModulesService.getAllKeuzeModules()
        return allModules.filter(module => favorietenData.includes(module.id))
      }
      
      // Als we al volledige keuzemodule data hebben
      return favorietenData
    } catch (error) {
      console.error('Error fetching favorieten:', error)
      return []
    }
  }

  // Haal alleen favoriet IDs op
  static async getFavorietenIds(): Promise<number[]> {
    try {
      const response = await ApiService.get(this.endpoint)
      const favorietenData = response?.data || []
      
      // Als we volledige keuzemodule data krijgen
      if (favorietenData.length > 0 && favorietenData[0]?.id) {
        return favorietenData.map((fav: iVkm) => fav.id)
      }
      
      // Als we alleen IDs krijgen
      return favorietenData
    } catch (error) {
      console.error('Error fetching favoriet IDs:', error)
      return []
    }
  }
}