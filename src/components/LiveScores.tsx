import { useLiveMatches } from '../lib/api/hooks'
import {
  Box,
  Button,
  Container,
  Skeleton,
  Stack,
  Typography,
  Alert,
  Card,
  CardContent,
  Chip,
  Fade
} from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'

export function LiveScores() {
  const { data: matches, isLoading, error } = useLiveMatches()

  if (isLoading) {
    return (
      <Box sx={{ flex: 1, p: 4 }}>
        <Container maxWidth="xl">
          <Typography variant="h5" sx={{ mb: 3 }}>Live Matches</Typography>
          <Stack spacing={2}>
            {[...Array(5)].map((_, i) => (
              <Card key={i} variant="outlined">
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Skeleton width={120} height={20} />
                    <Skeleton width={60} height={24} />
                    <Skeleton width={120} height={20} />
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Container>
      </Box>
    )
  }

  if (error) {
    return (
      <Box sx={{ flex: 1, p: 4 }}>
        <Container maxWidth="xl">
          <Alert severity="error" sx={{ bgcolor: 'error.dark', color: 'error.light' }}>
            Error loading matches: {error.message}
          </Alert>
        </Container>
      </Box>
    )
  }

  return (
    <Box component="main" sx={{ flex: 1, p: 4 }}>
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h5">Live Matches</Typography>
          <Stack direction="row" spacing={1}>
            <Button variant="contained" size="small">All</Button>
            <Button color="inherit" size="small">Important</Button>
            <Button color="inherit" size="small">Goals</Button>
          </Stack>
        </Box>

        <Stack spacing={2}>
          {matches?.length === 0 ? (
            <Card variant="outlined" sx={{ p: 4, textAlign: 'center' }}>
              <AddIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No Live Matches
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Check back later for live match updates
              </Typography>
            </Card>
          ) : (
            matches?.map((match) => (
              <Fade key={match.id} in={true}>
                <Card 
                  variant="outlined" 
                  sx={{ 
                    '&:hover': { 
                      bgcolor: 'action.hover',
                      cursor: 'pointer'
                    }
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="body2" color="text.secondary">
                          League ID: {match.leagueId}
                        </Typography>
                      </Stack>
                      <Chip
                        label={match.status?.reason?.short ?? "Unknown"}
                        size="small"
                        color={match.status?.started && !match.status?.finished ? "success" : undefined}
                        variant={match.status?.started && !match.status?.finished ? "filled" : "outlined"}
                      />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ flex: 1 }}>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Typography>
                            {match.home.name}
                            {match.home.redCards ? ` 🟥 x${match.home.redCards}` : ''}
                          </Typography>
                        </Stack>
                      </Box>

                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          gap: 2,
                          p: 1,
                          bgcolor: 'background.default',
                          borderRadius: 1,
                          minWidth: 120
                        }}
                      >
                        <Typography variant="h5" fontWeight="bold">{match.home.score}</Typography>
                        <Typography variant="h5" color="text.disabled">-</Typography>
                        <Typography variant="h5" fontWeight="bold">{match.away.score}</Typography>
                      </Box>

                      <Box sx={{ flex: 1 }}>
                        <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-end">
                          <Typography>
                            {match.away.name}
                            {match.away.redCards ? ` 🟥 x${match.away.redCards}` : ''}
                          </Typography>
                        </Stack>
                      </Box>
                    </Box>

                    <Box 
                      sx={{ 
                        mt: 2, 
                        pt: 2, 
                        borderTop: 1, 
                        borderColor: 'divider' 
                      }}
                    >
                      <Stack 
                        direction="row" 
                        justifyContent="space-between" 
                        alignItems="center"
                      >
                        <Typography variant="body2" color="text.secondary">
                          Match Time: {match.time}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Stage: {match.tournamentStage}
                        </Typography>
                      </Stack>
                    </Box>
                  </CardContent>
                </Card>
              </Fade>
            ))
          )}
        </Stack>
      </Container>
    </Box>
  )
}