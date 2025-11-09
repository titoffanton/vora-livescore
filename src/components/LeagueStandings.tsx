import { Box, Button, Container, Stack, Typography } from '@mui/material'
import { useLeagueStandings as useLeagueStandingsQuery } from '../lib/api/hooks'
import type { TeamStanding } from '../types/api'

interface LeagueStandingsProps {
  leagueId: number | null
}

export function LeagueStandings({ leagueId }: LeagueStandingsProps) {
  const { data: standings, isLoading, error } = useLeagueStandingsQuery(leagueId ?? 0)

  if (!leagueId) {
    return (
      <Box sx={{ 
        flex: 1, 
        p: 4, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <Typography color="text.secondary">
          Select a league to view standings
        </Typography>
      </Box>
    )
  }

  if (isLoading) {
    return (
      <Box sx={{ flex: 1, p: 4, mt: 8 }}>
        <Container maxWidth="xl">
          <Box sx={{ 
            '& .MuiSkeleton-root': { 
              bgcolor: 'background.paper',
              '&::after': {
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.04), transparent)'
              }
            }
          }}>
            <Typography variant="h5" component="div" sx={{ width: '250px', mb: 3 }}>
              <Box sx={{ height: 32, bgcolor: 'background.paper', borderRadius: 1 }} />
            </Typography>
            <Stack spacing={1}>
              {[...Array(20)].map((_, i) => (
                <Box key={i} sx={{ height: 48, bgcolor: 'background.paper', borderRadius: 1 }} />
              ))}
            </Stack>
          </Box>
        </Container>
      </Box>
    )
  }

  if (error) {
    return (
      <Box sx={{ flex: 1, p: 4, mt: 8 }}>
        <Container maxWidth="xl">
          <Box sx={{ 
            p: 2, 
            borderRadius: 1,
            bgcolor: 'error.dark',
            color: 'error.light',
            border: 1,
            borderColor: 'error.main'
          }}>
            Error loading standings: {error.message}
          </Box>
        </Container>
      </Box>
    )
  }

  return (
    <div className="flex-1 p-8 mt-16">
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h5" fontWeight="bold">League Standings</Typography>
          <Stack direction="row" spacing={1}>
            <Button variant="contained" color="primary">Table</Button>
            <Button color="inherit">Form</Button>
            <Button color="inherit">Home</Button>
            <Button color="inherit">Away</Button>
          </Stack>
        </Box>

        <Box sx={{ 
          bgcolor: 'background.paper',
          borderRadius: 1,
          overflow: 'hidden',
          boxShadow: 1 
        }}>
          <Box
            sx={{
              px: 3,
              py: 2,
              bgcolor: 'background.default',
              display: 'grid',
              gridTemplateColumns: '0.5fr 4fr repeat(8, 1fr)',
              gap: 2,
              '& > *': { color: 'text.secondary' }
            }}
          >
            <Typography>Pos</Typography>
            <Typography>Team</Typography>
            <Typography align="center">P</Typography>
            <Typography align="center">W</Typography>
            <Typography align="center">D</Typography>
            <Typography align="center">L</Typography>
            <Typography align="center">GF:GA</Typography>
            <Typography align="center">GD</Typography>
            <Typography align="center">Pts</Typography>
          </Box>

          {standings?.map((team: TeamStanding) => (
            <Box
              key={team.id}
              sx={{
                px: 3,
                py: 2,
                display: 'grid',
                gridTemplateColumns: '0.5fr 4fr repeat(8, 1fr)',
                gap: 2,
                alignItems: 'center',
                borderLeft: team.qualColor ? 4 : 0,
                borderLeftColor: team.qualColor || 'transparent',
                '&:hover': {
                  bgcolor: 'action.hover'
                },
                borderBottom: 1,
                borderBottomColor: 'divider'
              }}
            >
              <Typography fontWeight="medium">{team.idx}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography fontWeight="medium">{team.name}</Typography>
              </Box>
              <Typography align="center">{team.played}</Typography>
              <Typography align="center">{team.wins}</Typography>
              <Typography align="center">{team.draws}</Typography>
              <Typography align="center">{team.losses}</Typography>
              <Typography align="center">{team.scoresStr}</Typography>
              <Typography align="center">{team.goalConDiff > 0 ? `+${team.goalConDiff}` : team.goalConDiff}</Typography>
              <Typography align="center" fontWeight="bold">{team.pts}</Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </div>
  )
}