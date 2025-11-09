import { env } from './env'

export const apiClient = {
  async fetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${env.apiBaseUrl}${endpoint}`, {
      ...options,
      headers: {
        'X-RapidAPI-Key': env.rapidApiKey,
        'X-RapidAPI-Host': 'free-api-live-football-data.p.rapidapi.com',
        ...options.headers,
      },
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  },
}