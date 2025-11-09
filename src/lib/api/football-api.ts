import { apiClient } from '../config/api-client'
import type { 
  Match, 
  Team, 
  Player, 
  PopularLeaguesResponse, 
  LeagueStandingsResponse 
} from '../../types/api'

/**
 * League-related API endpoints
 */
export const leagueApi = {
  /**
   * Get list of popular leagues
   */
  getPopularLeagues: async () => {
    const response = await apiClient.fetch<PopularLeaguesResponse>('/football-popular-leagues')
    return response.response.popular
  },

  /**
   * Get league standings for a specific league
   */
  getLeagueStandings: async (leagueId: number) => {
    const response = await apiClient.fetch<LeagueStandingsResponse>(
      `/football-get-standing-all?leagueid=${leagueId}`
    )
    return response.response.standing
  }
} as const

/**
 * Match-related API endpoints
 */
interface MatchesResponse {
  status: 'success' | 'error'
  response: {
    matches: Match[]
  }
}

export const matchApi = {
  /**
   * Get currently live matches
   */
  getLiveMatches: async () => {
    const currentDate = new Date()
    const dateStr = currentDate.toISOString().split('T')[0].replace(/-/g, '')
    const response = await apiClient.fetch<MatchesResponse>(`/football-get-matches-by-date?date=${dateStr}`)
    return response.response.matches
  },

  /**
   * Get matches for a specific date
   */
  getMatchesByDate: async (date: string) => {
    const dateStr = date.replace(/-/g, '')
    const response = await apiClient.fetch<MatchesResponse>(`/football-get-matches-by-date?date=${dateStr}`)
    return response.response.matches
  }
} as const

/**
 * Team-related API endpoints
 */
export const teamApi = {
  /**
   * Get team details
   */
  getTeam: async (teamId: number) => {
    // Mock implementation until we have the correct endpoint
    return {} as Team
  }
} as const

/**
 * Player-related API endpoints
 */
export const playerApi = {
  /**
   * Search for players
   */
  searchPlayers: async (query: string) => {
    // Mock implementation until we have the correct endpoint
    return [] as Player[]
  }
} as const