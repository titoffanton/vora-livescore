export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL as string,
  rapidApiKey: import.meta.env.VITE_RAPID_API_KEY as string,
} as const

// Validate environment variables
Object.entries(env).forEach(([key, value]) => {
  if (!value) {
    throw new Error(`Environment variable ${key} is not defined`)
  }
})