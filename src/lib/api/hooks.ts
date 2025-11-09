import { useQuery } from '@tanstack/react-query'
import { leagueApi, matchApi, teamApi, playerApi } from './football-api'

// Live matches hook
export const useLiveMatches = () => 
  useQuery({
    queryKey: ['matches', 'live'],
    queryFn: matchApi.getLiveMatches,
    refetchInterval: 30000,
  })

// League standings hook
export const useLeagueStandings = (leagueId: number) =>
  useQuery({
    queryKey: ['standings', leagueId],
    queryFn: () => leagueApi.getLeagueStandings(leagueId),
    staleTime: 5 * 60 * 1000,
  })

// Team details hook
export const useTeam = (teamId: number) =>
  useQuery({
    queryKey: ['team', teamId],
    queryFn: () => teamApi.getTeam(teamId),
    staleTime: 60 * 60 * 1000,
  })

// Player search hook
export const usePlayerSearch = (query: string) =>
  useQuery({
    queryKey: ['players', 'search', query],
    queryFn: () => playerApi.searchPlayers(query),
    enabled: query.length > 2,
  })