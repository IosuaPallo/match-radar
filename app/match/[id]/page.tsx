'use client';

import React, { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  Tabs,
  Tab,
  LinearProgress,
  useTheme,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { useMatchDetails, useMatchLineups, useMatchStatistics } from '@/hooks/useMatches';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { Footer } from '@/components/Footer';
import { ArrowBack } from '@mui/icons-material';

interface MatchDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default function MatchDetailsPage({ params }: MatchDetailsPageProps) {
  const [resolvedParams, setResolvedParams] = React.useState<{ id: string } | null>(null);
  const [tabValue, setTabValue] = useState(0);

  React.useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  const matchId = resolvedParams ? parseInt(resolvedParams.id) : null;
  const matchDetails = useMatchDetails(matchId);
  const matchLineups = useMatchLineups(matchId);
  const matchStats = useMatchStatistics(matchId);

  if (!matchId) {
    return <LoadingSkeleton />;
  }

  const match = matchDetails.data?.response?.[0];
  const theme = useTheme();

  if (matchDetails.isLoading) {
    return (
      <Box sx={{ minHeight: '100vh', pb: 8 }}>
        <Header />
        <Container maxWidth="lg">
          <LoadingSkeleton />
        </Container>
      </Box>
    );
  }

  if (!match) {
    return (
      <Box sx={{ minHeight: '100vh', pb: 8 }}>
        <Header />
        <Container maxWidth="lg">
          <Box sx={{ py: 4 }}>
            <Button
              component={Link}
              href="/matches"
              startIcon={<ArrowBack />}
              sx={{ mb: 3 }}
            >
              Back to Matches
            </Button>
            <Card>
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  Match details not found
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Container>
      </Box>
    );
  }

  const isFinished = match.status.short === 'FT' || match.status.short === 'AET' || match.status.short === 'PEN';
  const isLive = match.status.short === 'LIVE' || match.status.short === '1H' || match.status.short === '2H';

  return (
    <Box sx={{ minHeight: '100vh', pb: 8 }}>
      <Header />

      <Container maxWidth="lg">
        <Box sx={{ py: { xs: 3, md: 6 } }}>
          {/* Back Button */}
          <Button
            component={Link}
            href="/matches"
            startIcon={<ArrowBack />}
            sx={{ mb: 3 }}
          >
            Back to Matches
          </Button>

          {/* Match Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card
              sx={{
                mb: 4,
                p: 4,
                background: isLive ? 'rgba(255, 64, 64, 0.05)' : undefined,
                borderLeft: isLive ? '4px solid #ff4040' : undefined,
              }}
            >
              <CardContent sx={{ p: 0 }}>
                {/* League Info */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {match.league?.name}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      px: 2,
                      py: 1,
                      borderRadius: 1,
                      background: isLive ? 'rgba(255, 64, 64, 0.1)' : 'rgba(76, 175, 80, 0.1)',
                      color: isLive ? '#ff4040' : '#4caf50',
                    }}
                  >
                    {match.status.long}
                  </Typography>
                </Box>

                {/* Match Score */}
                <Grid container spacing={3} sx={{ mb: 3 }}>
                  {/* Home Team */}
                  <Grid item xs={12} sm={5}>
                    <Box sx={{ textAlign: 'center' }}>
                      {match.homeTeam.logo && (
                        <Image
                          src={match.homeTeam.logo}
                          alt={match.homeTeam.name}
                          width={80}
                          height={80}
                          style={{ marginBottom: 16, borderRadius: 8 }}
                        />
                      )}
                      <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        {match.homeTeam.name}
                      </Typography>
                    </Box>
                  </Grid>

                  {/* Score */}
                  <Grid item xs={12} sm={2}>
                    <Box sx={{ textAlign: 'center', py: 2 }}>
                      <Typography variant="h3" sx={{ fontWeight: 800, color: 'primary.main' }}>
                        {match.goals.home !== null ? match.goals.home : '-'}
                      </Typography>
                      <Typography variant="caption" sx={{ opacity: 0.7, display: 'block', mt: 1 }}>
                        vs
                      </Typography>
                      <Typography variant="h3" sx={{ fontWeight: 800, color: 'secondary.main' }}>
                        {match.goals.away !== null ? match.goals.away : '-'}
                      </Typography>
                    </Box>
                  </Grid>

                  {/* Away Team */}
                  <Grid item xs={12} sm={5}>
                    <Box sx={{ textAlign: 'center' }}>
                      {match.awayTeam.logo && (
                        <Image
                          src={match.awayTeam.logo}
                          alt={match.awayTeam.name}
                          width={80}
                          height={80}
                          style={{ marginBottom: 16, borderRadius: 8 }}
                        />
                      )}
                      <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        {match.awayTeam.name}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

                {/* Match Info */}
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, pt: 3, borderTop: 1, borderColor: 'divider' }}>
                  <Box>
                    <Typography variant="caption" sx={{ opacity: 0.7 }}>
                      Date & Time
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {new Date(match.date).toLocaleString()}
                    </Typography>
                  </Box>
                  {match.venue?.name && (
                    <Box>
                      <Typography variant="caption" sx={{ opacity: 0.7 }}>
                        Venue
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {match.venue.name}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </CardContent>
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
              <Tab label="Statistics" />
              <Tab label="Lineups" />
              <Tab label="Commentary" />
            </Tabs>
          </Box>

          {/* Tab Content */}
          {tabValue === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {matchStats.isLoading ? (
                <LoadingSkeleton />
              ) : matchStats.data?.response?.length > 0 ? (
                <Grid container spacing={3}>
                  {matchStats.data.response.map((stat: any, idx: number) => (
                    <Grid item xs={12} md={6} key={idx}>
                      <Card>
                        <CardContent>
                          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                            {stat.team?.name}
                          </Typography>

                          <Box sx={{ mb: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                              <Typography variant="body2">Possession</Typography>
                              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                {stat.possession}%
                              </Typography>
                            </Box>
                            <LinearProgress variant="determinate" value={stat.possession || 0} />
                          </Box>

                          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                            <Box>
                              <Typography variant="caption" sx={{ opacity: 0.7 }}>
                                Shots
                              </Typography>
                              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                {stat.shots?.total || 0}
                              </Typography>
                              <Typography variant="caption" sx={{ opacity: 0.7, display: 'block' }}>
                                {stat.shots?.on || 0} on target
                              </Typography>
                            </Box>
                            <Box>
                              <Typography variant="caption" sx={{ opacity: 0.7 }}>
                                Passes
                              </Typography>
                              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                {stat.passes?.total || 0}
                              </Typography>
                              <Typography variant="caption" sx={{ opacity: 0.7, display: 'block' }}>
                                {stat.passes?.accurate || 0} accurate
                              </Typography>
                            </Box>
                          </Box>

                          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 1, mt: 2 }}>
                            <Box>
                              <Typography variant="caption" sx={{ opacity: 0.7 }}>
                                Corners
                              </Typography>
                              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                {stat.corners || 0}
                              </Typography>
                            </Box>
                            <Box>
                              <Typography variant="caption" sx={{ opacity: 0.7 }}>
                                Fouls
                              </Typography>
                              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                {stat.fouls || 0}
                              </Typography>
                            </Box>
                            <Box>
                              <Typography variant="caption" sx={{ opacity: 0.7 }}>
                                Offsides
                              </Typography>
                              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                {stat.offsides || 0}
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
                      Match statistics not available yet
                    </Typography>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          )}

          {tabValue === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {matchLineups.isLoading ? (
                <LoadingSkeleton />
              ) : matchLineups.data?.response?.length > 0 ? (
                <Grid container spacing={3}>
                  {matchLineups.data.response.map((lineup: any, idx: number) => (
                    <Grid item xs={12} md={6} key={idx}>
                      <Card>
                        <CardContent>
                          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                            {lineup.team?.name}
                          </Typography>
                          <Typography variant="body2" sx={{ opacity: 0.7, mb: 2 }}>
                            Formation: {lineup.formation}
                          </Typography>

                          <TableContainer>
                            <Table size="small">
                              <TableHead>
                                <TableRow>
                                  <TableCell>Player</TableCell>
                                  <TableCell>Position</TableCell>
                                  <TableCell align="right">Rating</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {lineup.players?.slice(0, 11).map((player: any, pidx: number) => (
                                  <TableRow key={pidx}>
                                    <TableCell sx={{ fontWeight: 500 }}>
                                      {player.player?.name}
                                    </TableCell>
                                    <TableCell>{player.position}</TableCell>
                                    <TableCell align="right">
                                      {player.rating ? player.rating.toFixed(1) : '-'}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Card>
                  <CardContent sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant="body1" sx={{ opacity: 0.7 }}>
                      Lineups not available yet
                    </Typography>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          )}

          {tabValue === 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardContent sx={{ textAlign: 'center', py: 6 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    Live Commentary
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.7 }}>
                    Commentary updates coming soon
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </Box>
      </Container>
    </Box>
  );
}
