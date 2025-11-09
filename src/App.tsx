import { useState } from 'react'
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { PopularLeagues } from './components/PopularLeagues'
import { LiveScores } from './components/LiveScores'
import { LeagueStandings } from './components/LeagueStandings'
import { Header } from './components/Header'
import './App.css'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    primary: {
      main: '#10b981', // emerald-500
    },
  },
})

function App() {
  const [selectedLeagueId, setSelectedLeagueId] = useState<number | null>(null)
  const [view, setView] = useState<'live' | 'standings'>('live')

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header onNavigate={setView} />
        <Box sx={{ display: 'flex', flex: 1 }}>
          <Box
            component="aside"
            sx={{
              width: 288,
              flexShrink: 0,
              height: 'calc(100vh - 64px)',
              position: 'sticky',
              top: 64,
              borderRight: 1,
              borderColor: 'divider',
              bgcolor: 'background.paper',
            }}
          >
            <PopularLeagues 
              selectedLeagueId={selectedLeagueId}
              onLeagueSelect={(id) => {
                setSelectedLeagueId(id)
                setView('standings')
              }}
            />
          </Box>
          <Box component="main" sx={{ flexGrow: 1, minWidth: 0 }}>
            {view === 'live' ? (
              <LiveScores />
            ) : (
              <LeagueStandings leagueId={selectedLeagueId} />
            )}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default App
