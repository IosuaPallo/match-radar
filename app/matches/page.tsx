'use client';

import React, { useState, Suspense } from 'react';
import {
  Container,

  Typography,
  Box,
  Tabs,
  Tab,
  Card,
  CardContent,
  useTheme,
} from '@mui/material';
import { Grid as Grid2 } from '@mui/material';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { MatchCard } from '@/components/MatchCard';
import { MatchCardSkeleton } from '@/components/LoadingSkeleton';
import { LeagueSelector } from '@/components/LeagueSelector';
import { useMatches } from '@/hooks/useMatches';
import { getDateRange } from '@/utils/date';
import { Footer } from '@/components/Footer';

const majorEuropeanLeagues = [
  { code: 'PL', name: 'Premier League' },
  { code: 'PD', name: 'La Liga' },
  { code: 'FL1', name: 'Ligue 1' },
  { code: 'BL1', name: 'Bundesliga' },
  { code: 'SA', name: 'Serie A' },
  { code: 'CL', name: 'Champions League' },
  { code: 'EL', name: 'Europa League' },
];

export default function MatchesPage() {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [selectedLeague, setSelectedLeague] = useState<string>('PL');

  const recentDateRange = getDateRange(-7);
  const upcomingDateRange = getDateRange(7);

  const recentMatches = useMatches({
    from: recentDateRange.from,
    to: recentDateRange.to,
    competitionCode: selectedLeague,
    status: 'FINISHED',
  });

  const upcomingMatches = useMatches({
    from: upcomingDateRange.from,
    to: upcomingDateRange.to,
    competitionCode: selectedLeague,
    status: 'TIMED',
  });

  const isLoading = tabValue === 0 ? recentMatches.isLoading : upcomingMatches.isLoading;
  const data = tabValue === 0 ? recentMatches.data : upcomingMatches.data;

  const selectedLeagueName = majorEuropeanLeagues.find((l) => l.code === selectedLeague)?.name || 'All Leagues';

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
            ) : data?.matches?.length ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Grid2 container spacing={2}>
                  {data.matches.map((match) => (
                    <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={match.id}>
                      <MatchCard match={match} />
                    </Grid2>
                  ))}
                </Grid2>
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
