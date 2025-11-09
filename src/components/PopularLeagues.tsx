import { useQuery } from '@tanstack/react-query'
import { leagueApi } from '../lib/api/football-api'
import type { League } from '../types/api'
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
  Stack,
  Alert
} from '@mui/material'

interface PopularLeaguesProps {
  onLeagueSelect: (leagueId: number) => void
  selectedLeagueId: number | null
}

export function PopularLeagues({ onLeagueSelect, selectedLeagueId }: PopularLeaguesProps) {
  const { data: leagues, isLoading, error } = useQuery({
    queryKey: ['leagues', 'popular'],
    queryFn: leagueApi.getPopularLeagues,
    staleTime: 24 * 60 * 60 * 1000, // Cache for 24 hours since this rarely changes
  })

  if (isLoading) {
    return (
      <Box 
        sx={{ 
          height: '100vh',
          width: 220,
          bgcolor: 'background.paper',
          p: 2
        }}
      >
        <Skeleton variant="text" width={80} height={32} sx={{ mb: 1 }} />
        <Stack spacing={1}>
          {[...Array(10)].map((_, i) => (
            <Stack key={i} direction="row" spacing={1.5} alignItems="center" sx={{ px: 1.5 }}>
              <Skeleton variant="circular" width={20} height={20} />
              <Skeleton variant="text" width={140} height={24} />
            </Stack>
          ))}
        </Stack>
      </Box>
    )
  }

  if (error) {
    return (
      <Box 
        sx={{ 
          height: '100vh',
          width: 256,
          bgcolor: 'background.paper',
          p: 2
        }}
      >
        <Alert severity="error" sx={{ bgcolor: 'error.dark', color: 'error.light' }}>
          Error loading leagues: {error.message}
        </Alert>
      </Box>
    )
  }

  return (
    <Box
      component="aside"
      sx={{
        height: '100vh',
        width: 220,
        bgcolor: 'background.paper',
        py: 2,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Typography 
        variant="h6" 
        sx={{ 
          px: 2, 
          mb: 1, 
          fontSize: '1rem',
          fontWeight: 500
        }}
      >
        Top leagues
      </Typography>
      <List component="nav" sx={{ px: 1 }}>
        {leagues?.map((league: League) => (
          <ListItem key={league.id} disablePadding>
            <ListItemButton
              onClick={() => onLeagueSelect(league.id)}
              selected={selectedLeagueId === league.id}
              sx={{
                borderRadius: 1,
                py: 0.75,
                px: 1.5,
                '&.Mui-selected': {
                  bgcolor: 'action.selected',
                  '&:hover': {
                    bgcolor: 'action.selected',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 32 }}>
                <Box
                  component="img"
                  src={league.logo}
                  alt={`${league.name} logo`}
                  sx={{ 
                    width: 20, 
                    height: 20, 
                    objectFit: 'contain',
                    filter: 'grayscale(0.2)'
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary={league.name}
                primaryTypographyProps={{
                  variant: 'body2',
                  sx: {
                    fontSize: '0.875rem',
                    fontWeight: selectedLeagueId === league.id ? 500 : 400
                  }
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}