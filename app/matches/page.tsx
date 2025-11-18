'use client';

import React, { useState, Suspense } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Tabs,
  Tab,
  Card,
  CardContent,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { MatchCard } from '@/components/MatchCard';
import { MatchCardSkeleton } from '@/components/LoadingSkeleton';
import { LeagueSelector } from '@/components/LeagueSelector';
import { useMatches } from '@/hooks/useMatches';
import { getDateRange } from '@/utils/date';
import { Footer } from '@/components/Footer';

const majorEuropeanLeagues = [
  { id: 39, name: 'Premier League' },
  { id: 140, name: 'La Liga' },
  { id: 61, name: 'Ligue 1' },
  { id: 78, name: 'Bundesliga' },
  { id: 135, name: 'Serie A' },
  { id: 2, name: 'Champions League' },
  { id: 3, name: 'Europa League' },
];

export default function MatchesPage() {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [selectedLeague, setSelectedLeague] = useState<number>(39);

  const recentDateRange = getDateRange(-7);
  const upcomingDateRange = getDateRange(7);

  const recentMatches = useMatches({
    from: recentDateRange.from,
    to: recentDateRange.to,
    league: selectedLeague,
    status: 'finished',
  });

  const upcomingMatches = useMatches({
    from: upcomingDateRange.from,
    to: upcomingDateRange.to,
    league: selectedLeague,
    status: 'scheduled',
  });

  const isLoading = tabValue === 0 ? recentMatches.isLoading : upcomingMatches.isLoading;
  const data = tabValue === 0 ? recentMatches.data : upcomingMatches.data;

  const selectedLeagueName = majorEuropeanLeagues.find((l) => l.id === selectedLeague)?.name || 'All Leagues';

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
                Football Matches
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.7 }}>
                Browse recent and upcoming matches from major European leagues
              </Typography>
            </Box>
          </motion.div>

          {/* Filter Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <Card sx={{ mb: 4, p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Filter by League
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {majorEuropeanLeagues.map((league) => (
                  <Box
                    key={league.id}
                    onClick={() => setSelectedLeague(league.id)}
                    sx={{
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      background: selectedLeague === league.id ? 'primary.main' : 'action.hover',
                      color: selectedLeague === league.id ? 'primary.contrastText' : 'text.primary',
                      fontWeight: selectedLeague === league.id ? 600 : 500,
                      '&:hover': {
                        background: selectedLeague === league.id ? 'primary.dark' : 'action.selected',
                      },
                    }}
                  >
                    {league.name}
                  </Box>
                ))}
              </Box>
            </Card>
          </motion.div>

          {/* Tabs */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs
              value={tabValue}
              onChange={(e, newValue) => setTabValue(newValue)}
              sx={{
                '& .MuiTab-root': {
                  fontWeight: 600,
                  fontSize: '1rem',
                },
              }}
            >
              <Tab label="Recent Matches" />
              <Tab label="Upcoming Matches" />
            </Tabs>
          </Box>

          {/* Matches Grid */}
          <Box>
            {isLoading ? (
              <MatchCardSkeleton count={6} />
            ) : data?.response?.length ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Grid container spacing={2}>
                  {data.response.map((match) => (
                    <Grid item xs={12} sm={6} md={4} key={match.id}>
                      <MatchCard match={match} />
                    </Grid>
                  ))}
                </Grid>
              </motion.div>
            ) : (
              <Card>
                <CardContent sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="body1" sx={{ opacity: 0.7 }}>
                    No matches found for {selectedLeagueName}
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
