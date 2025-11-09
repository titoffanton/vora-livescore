interface LeagueDetails {
  id: number
  type: string
  name: string
  selectedSeason: string
  latestSeason: string
  shortName: string
  country: string
  leagueColor: string
  dataProvider: string
}

export interface TeamStanding {
  name: string
  shortName: string
  id: number
  pageUrl: string
  deduction: number | null
  ongoing: string | null
  played: number
  wins: number
  draws: number
  losses: number
  scoresStr: string
  goalConDiff: number
  pts: number
  idx: number
  qualColor: string | null
}

export interface LeagueStandingsResponse {
  status: 'success' | 'error'
  response: {
    standing: TeamStanding[]
  }
}

export interface League {
  id: number
  name: string
  localizedName: string
  ccode: string
  logo: string
}

export interface PopularLeaguesResponse {
  status: 'success' | 'error'
  response: {
    popular: League[]
  }
}

export interface Team {
  id: number
  name: string
  logo: string
  winner?: boolean
}

interface TeamInfo {
  id: number
  score: number
  name: string
  longName: string
  redCards?: number
}

interface MatchStatus {
  utcTime: string
  numberOfHomeRedCards?: number
  numberOfAwayRedCards?: number
  halfs: {
    firstHalfStarted: string
    secondHalfStarted: string
    firstExtraHalfStarted?: string
    secondExtraHalfStarted?: string
  }
  periodLength: number
  finished: boolean
  started: boolean
  cancelled: boolean
  awarded: boolean
  scoreStr: string
  reason: {
    short: string
    shortKey: string
    long: string
    longKey: string
  }
}

export interface Match {
  id: number
  leagueId: number
  time: string
  home: TeamInfo
  away: TeamInfo
  eliminatedTeamId: number | null
  statusId: number
  tournamentStage: string
  status: MatchStatus
  timeTS: number
}

export interface Player {
  id: number
  name: string
  age: number
  nationality: string
  photo: string
  statistics: Array<{
    team: Team
    league: League
    games: {
      appearences: number
      lineups: number
      minutes: number
      position: string
      rating?: string
    }
    goals: {
      total: number
      assists: number
    }
  }>
}