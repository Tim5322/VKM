// Environment configuration voor VKM app
export const config = {
  // NestJS Backend URL (MOET via environment variabele worden ingesteld)
  backendUrl: import.meta.env.VITE_BACKEND_URL!,
  
  // Development settings
  isDevelopment: import.meta.env.VITE_DEV_MODE === 'true',
  isDebug: import.meta.env.VITE_DEBUG === 'true',
}

// Helper functie om API URLs te maken (gebruik dit met je eigen endpoints)
export const getApiUrl = (endpoint: string): string => {
  return `${config.backendUrl}${endpoint}`
}

// Voorbeeld van hoe je het kunt gebruiken:
// const myApiUrl = getApiUrl('/api/whatever-your-endpoint-is')