'use client';

import React, { useState } from 'react';
import {
  Container,

  Typography,
  Box,
  Button,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { MatchCard } from '@/components/MatchCard';
import { PlayerCard } from '@/components/PlayerCard';
import { MatchCardSkeleton, LoadingSkeleton } from '@/components/LoadingSkeleton';
import { useMatches } from '@/hooks/useMatches';
import { useTopScorers } from '@/hooks/useLeagues';
import { getDateRange } from '@/utils/date';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Footer } from '@/components/Footer';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },
};

export default function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
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

  const topScorers = useTopScorers(selectedLeague);

  const heroSection = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Box
        sx={{
          background: 'linear-gradient(135deg, rgba(0, 168, 255, 0.1) 0%, rgba(29, 233, 182, 0.1) 100%)',
          borderRadius: 3,
          p: { xs: 3, md: 6 },
          mb: 4,
          textAlign: 'center',
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            background: 'linear-gradient(135deg, #00a8ff 0%, #1de9b6 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2,
          }}
        >
          Welcome to EuroMatchHub
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.8, mb: 3 }}>
          Your ultimate destination for European football statistics, live matches, and player insights
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/matches" style={{ textDecoration: 'none' }}>
            <Button variant="contained" size="large" sx={{ fontWeight: 600 }}>
              Explore Matches
            </Button>
          </Link>
          <Link href="/players" style={{ textDecoration: 'none' }}>
            <Button variant="outlined" size="large" sx={{ fontWeight: 600 }}>
              View Players
            </Button>
          </Link>
        </Box>
      </Box>
    </motion.div>
  );

  return (
    <Box sx={{ minHeight: '100vh', pb: 8 }}>
      <Header />

      <Container maxWidth="lg">
        <Box sx={{ py: { xs: 3, md: 6 } }}>
          {heroSection}

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Recent Matches Section */}
            <motion.div variants={itemVariants}>
              <Box sx={{ mb: 6 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 3,
                    flexWrap: 'wrap',
                    gap: 2,
                  }}
                >
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                      Recent Matches
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.7 }}>
                      Last 7 days
                    </Typography>
                  </Box>
                  <Link href="/matches?tab=recent" style={{ textDecoration: 'none' }}>
                    <Button
                      endIcon={<ArrowForwardIcon />}
                      sx={{ fontWeight: 600 }}
                    >
                      View All
                    </Button>
                  </Link>
                </Box>

                {recentMatches.isLoading ? (
                  <MatchCardSkeleton count={3} />
                ) : recentMatches.data?.matches?.length ? (
                  <Grid2 container spacing={2}>
                    {recentMatches.data.matches.slice(0, 3).map((match) => (
                      <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={match.id}>
                        <MatchCard match={match} />
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Card>
                    <CardContent sx={{ textAlign: 'center', py: 4 }}>
                      <Typography variant="body1" sx={{ opacity: 0.7 }}>
                        No recent matches found
                      </Typography>
                    </CardContent>
                  </Card>
                )}
              </Box>
            </motion.div>

            {/* Upcoming Matches Section */}
            <motion.div variants={itemVariants}>
              <Box sx={{ mb: 6 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 3,
                    flexWrap: 'wrap',
                    gap: 2,
                  }}
                >
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                      Upcoming Matches
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.7 }}>
                      Next 7 days
                    </Typography>
                  </Box>
                  <Link href="/matches?tab=upcoming" style={{ textDecoration: 'none' }}>
                    <Button
                      endIcon={<ArrowForwardIcon />}
                      sx={{ fontWeight: 600 }}
                    >
                      View All
                    </Button>
                  </Link>
                </Box>

                {upcomingMatches.isLoading ? (
                  <MatchCardSkeleton count={3} />
                ) : upcomingMatches.data?.matches?.length ? (
                  <Grid2 container spacing={2}>
                    {upcomingMatches.data.matches.slice(0, 3).map((match) => (
                      <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={match.id}>
                        <MatchCard match={match} />
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Card>
                    <CardContent sx={{ textAlign: 'center', py: 4 }}>
                      <Typography variant="body1" sx={{ opacity: 0.7 }}>
                        No upcoming matches found
                      </Typography>
                    </CardContent>
                  </Card>
                )}
              </Box>
            </motion.div>

            {/* Top Scorers Section */}
            <motion.div variants={itemVariants}>
              <Box sx={{ mb: 6 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 3,
                    flexWrap: 'wrap',
                    gap: 2,
                  }}
                >
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                      Top Scorers
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.7 }}>
                      This season
                    </Typography>
                  </Box>
                  <Link href="/players" style={{ textDecoration: 'none' }}>
                    <Button
                      endIcon={<ArrowForwardIcon />}
                      sx={{ fontWeight: 600 }}
                    >
                      View All
                    </Button>
                  </Link>
                </Box>

                {topScorers.isLoading ? (
                  <LoadingSkeleton count={3} type="card" />
                ) : topScorers.data?.scorers?.length ? (
                  <Grid2 container spacing={2}>
                    {topScorers.data.scorers.slice(0, 6).map((scorer: any, idx: number) => (
                      <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={idx}>
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
                            <Box sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center' }}>
                              <Box
                                sx={{
                                  width: 50,
                                  height: 50,
                                  borderRadius: '50%',
                                  background: 'linear-gradient(135deg, #00a8ff 0%, #1de9b6 100%)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontWeight: 700,
                                  color: 'white',
                                }}
                              >
                                {idx + 1}
                              </Box>
                              <Box flex={1}>
                                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                  {scorer.player?.name || '-'}
                                </Typography>
                                <Typography variant="caption" sx={{ opacity: 0.7 }}>
                                  {scorer.team?.name || '-'}
                                </Typography>
                              </Box>
                            </Box>
                            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
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
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Card>
                    <CardContent sx={{ textAlign: 'center', py: 4 }}>
                      <Typography variant="body1" sx={{ opacity: 0.7 }}>
                        No player data available
                      </Typography>
                    </CardContent>
                  </Card>
                )}
              </Box>
            </motion.div>
          </motion.div>
        </Box>
      </Container>

      <Footer />
    </Box>
  );
}
