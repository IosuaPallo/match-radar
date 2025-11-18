'use client';

import React, { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  TextField,
  Card,
  CardContent,
  InputAdornment,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { PlayerCard } from '@/components/PlayerCard';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { useTopScorers } from '@/hooks/useLeagues';
import { Footer } from '@/components/Footer';
import { Search } from '@mui/icons-material';

const majorEuropeanLeagues = [
  { code: 'PL', name: 'Premier League' },
  { code: 'PD', name: 'La Liga' },
  { code: 'FL1', name: 'Ligue 1' },
  { code: 'BL1', name: 'Bundesliga' },
  { code: 'SA', name: 'Serie A' },
  { code: 'CL', name: 'Champions League' },
  { code: 'EL', name: 'Europa League' },
];

export default function PlayersPage() {
  const theme = useTheme();
  const [selectedLeague, setSelectedLeague] = useState<string>('PL');
  const [searchQuery, setSearchQuery] = useState('');

  const topScorers = useTopScorers(selectedLeague);

  const filteredPlayers = React.useMemo(() => {
    if (!topScorers.data?.scorers) return [];
    return topScorers.data.scorers.filter((scorer: any) =>
      scorer.player?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [topScorers.data?.scorers, searchQuery]);

  return (
    <Box sx={{ minHeight: '100vh', pb: 8 }}>
      <Header />

      <Container maxWidth="lg">
        <Box sx={{ py: { xs: 3, md: 6 } }}>
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Box sx={{ mb: 4 }}>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                Players
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.7 }}>
                Discover top players from European football leagues
              </Typography>
            </Box>
          </motion.div>

          {/* Search and Filter Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <Card sx={{ mb: 4, p: 3 }}>
              {/* League Filter */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Filter by League
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {majorEuropeanLeagues.map((league) => (
                    <Box
                      key={league.code}
                      onClick={() => setSelectedLeague(league.code)}
                      sx={{
                        px: 2,
                        py: 1,
                        borderRadius: 2,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        background: selectedLeague === league.code ? 'primary.main' : 'action.hover',
                        color: selectedLeague === league.code ? 'primary.contrastText' : 'text.primary',
                        fontWeight: selectedLeague === league.code ? 600 : 500,
                        '&:hover': {
                          background: selectedLeague === league.code ? 'primary.dark' : 'action.selected',
                        },
                      }}
                    >
                      {league.name}
                    </Box>
                  ))}
                </Box>
              </Box>

              {/* Search Box */}
              <TextField
                fullWidth
                placeholder="Search players by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
            </Card>
          </motion.div>

          {/* Players Grid */}
          <Box>
            {topScorers.isLoading ? (
              <LoadingSkeleton count={6} type="card" />
            ) : filteredPlayers.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Grid container spacing={2}>
                  {filteredPlayers.map((scorer: any, idx: number) => (
                    <Grid item xs={12} sm={6} md={4} key={idx}>
                      <Card
                        sx={{
                          height: '100%',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            boxShadow: theme.palette.mode === 'dark'
                              ? '0 20px 40px rgba(0, 168, 255, 0.15)'
                              : '0 20px 40px rgba(0, 102, 204, 0.1)',
                          },
                        }}
                      >
                        <CardContent>
                          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                            <Box
                              sx={{
                                width: 80,
                                height: 80,
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #00a8ff 0%, #1de9b6 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 700,
                                color: 'white',
                                fontSize: '2rem',
                              }}
                            >
                              #{idx + 1}
                            </Box>
                            <Box sx={{ flex: 1 }}>
                              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                {scorer.player?.name}
                              </Typography>
                              <Typography variant="caption" sx={{ opacity: 0.7, display: 'block' }}>
                                {scorer.team?.name}
                              </Typography>
                            </Box>
                          </Box>

                          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2 }}>
                            <Box>
                              <Typography variant="caption" sx={{ opacity: 0.7 }}>
                                Goals
                              </Typography>
                              <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main' }}>
                                {scorer.goals || 0}
                              </Typography>
                            </Box>
                            <Box>
                              <Typography variant="caption" sx={{ opacity: 0.7 }}>
                                Assists
                              </Typography>
                              <Typography variant="h5" sx={{ fontWeight: 700, color: 'secondary.main' }}>
                                {scorer.assists || 0}
                              </Typography>
                            </Box>
                            <Box>
                              <Typography variant="caption" sx={{ opacity: 0.7 }}>
                                Matches
                              </Typography>
                              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                                {scorer.playedMatches || 0}
                              </Typography>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </motion.div>
            ) : (
              <Card>
                <CardContent sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="body1" sx={{ opacity: 0.7 }}>
                    {searchQuery
                      ? 'No players found matching your search'
                      : 'No player data available'}
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Box>
        </Box>
      </Container>

      <Footer />
    </Box>
  );
}
