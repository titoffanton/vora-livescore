import { AppBar, Box, Button, Container, IconButton, Stack, Toolbar, Typography } from '@mui/material'
import { Search as SearchIcon, LightMode as LightModeIcon, SportsFootball as SportsFootballIcon } from '@mui/icons-material'

interface HeaderProps {
  onNavigate: (view: 'live' | 'standings') => void
}

export function Header({ onNavigate }: HeaderProps) {
  return (
    <AppBar position="fixed" sx={{ bgcolor: 'background.paper' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Stack direction="row" alignItems="center" spacing={1}>
            <SportsFootballIcon sx={{ color: 'primary.main' }} fontSize="large" />
            <Typography variant="h6" fontWeight="bold">
              Vora LiveScore
            </Typography>
          </Stack>

          <Stack direction="row" spacing={2} sx={{ mx: 'auto' }}>
            <Button color="inherit" onClick={() => onNavigate('live')}>
              Live
            </Button>
            <Button color="inherit" disabled>Today</Button>
            <Button color="inherit" disabled>Fixtures</Button>
            <Button color="inherit" disabled>Results</Button>
          </Stack>

          <Box>
            <IconButton color="inherit">
              <SearchIcon />
            </IconButton>
            <IconButton color="inherit">
              <LightModeIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}