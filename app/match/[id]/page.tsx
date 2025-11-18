'use client';

import React, { useState } from 'react';
import {
  Container,

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
import Grid2 from '@mui/material/Grid2';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { useMatchDetails } from '@/hooks/useMatches';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { Footer } from '@/components/Footer';
import { ArrowBack } from '@mui/icons-material';

interface MatchDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default function MatchDetailsPage({ params }: MatchDetailsPageProps) {
  const [resolvedParams, setResolvedParams] = React.useState<{ id: string } | null>(null);
  const [tabValue, setTabValue] = useState(0);
  const theme = useTheme();

  React.useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  const matchId = resolvedParams ? parseInt(resolvedParams.id) : null;
  const matchDetails = useMatchDetails(matchId);

  if (!matchId) {
    return <LoadingSkeleton />;
  }

  const match = matchDetails.data;

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

  const isFinished = match.status === 'FINISHED';
  const isLive = match.status === 'LIVE' || match.status === 'IN_PLAY';
  const homeGoals = match.score.fullTime.home;
  const awayGoals = match.score.fullTime.away;
  const statusLabel = match.status === 'TIMED' ? 'Not Started' :
                      match.status === 'LIVE' || match.status === 'IN_PLAY' ? 'Live' :
                      match.status === 'FINISHED' ? 'Finished' :
                      match.status === 'POSTPONED' ? 'Postponed' :
                      match.status === 'CANCELLED' ? 'Cancelled' :
                      match.status === 'SUSPENDED' ? 'Suspended' :
                      match.status;

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
                    {match.competition?.name}
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
                    {statusLabel}
                  </Typography>
                </Box>

                {/* Match Score */}
                <Grid2 container spacing={3} sx={{ mb: 3 }}>
                  {/* Home Team */}
                  <Grid2 xs={12} sm={5}>
                    <Box sx={{ textAlign: 'center' }}>
                      {match.homeTeam.crest && (
                        <Image
                          src={match.homeTeam.crest}
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
                  </Grid2>

                  {/* Score */}
                  <Grid2 xs={12} sm={2}>
                    <Box sx={{ textAlign: 'center', py: 2 }}>
                      <Typography variant="h3" sx={{ fontWeight: 800, color: 'primary.main' }}>
                        {homeGoals !== null ? homeGoals : '-'}
                      </Typography>
                      <Typography variant="caption" sx={{ opacity: 0.7, display: 'block', mt: 1 }}>
                        vs
                      </Typography>
                      <Typography variant="h3" sx={{ fontWeight: 800, color: 'secondary.main' }}>
                        {awayGoals !== null ? awayGoals : '-'}
                      </Typography>
                    </Box>
                  </Grid2>

                  {/* Away Team */}
                  <Grid2 xs={12} sm={5}>
                    <Box sx={{ textAlign: 'center' }}>
                      {match.awayTeam.crest && (
                        <Image
                          src={match.awayTeam.crest}
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
                  </Grid2>
                </Grid2>

                {/* Match Info */}
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, pt: 3, borderTop: 1, borderColor: 'divider' }}>
                  <Box>
                    <Typography variant="caption" sx={{ opacity: 0.7 }}>
                      Date & Time
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {new Date(match.utcDate).toLocaleString()}
                    </Typography>
                  </Box>
                  {match.referees && match.referees.length > 0 && (
                    <Box>
                      <Typography variant="caption" sx={{ opacity: 0.7 }}>
                        Referee
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {match.referees[0]?.name || 'N/A'}
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
              <Tab label="Match Events" />
              <Tab label="Goals & Cards" />
              <Tab label="Referees" />
            </Tabs>
          </Box>

          {/* Tab Content */}
          {tabValue === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {match.goals && match.goals.length > 0 ? (
                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                      Match Events
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      {match.goals.map((goal: any, idx: number) => (
                        <Box key={idx} sx={{ p: 2, background: 'action.hover', borderRadius: 1 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              {goal.player?.name}
                            </Typography>
                            <Typography variant="caption" sx={{ opacity: 0.7 }}>
                              {goal.minute}'
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                            {goal.team?.crest && (
                              <Image
                                src={goal.team.crest}
                                alt={goal.team.name}
                                width={24}
                                height={24}
                              />
                            )}
                            <Typography variant="body2" sx={{ opacity: 0.7 }}>
                              {goal.team?.name}
                            </Typography>
                            {goal.type && (
                              <Typography variant="caption" sx={{ background: 'primary.main', color: 'primary.contrastText', px: 1, borderRadius: 0.5 }}>
                                {goal.type === 'OWN_GOAL' ? 'Own Goal' : goal.type === 'PENALTY' ? 'Penalty' : 'Regular'}
                              </Typography>
                            )}
                          </Box>
                          {goal.assist?.player && (
                            <Typography variant="caption" sx={{ opacity: 0.6, display: 'block', mt: 1 }}>
                              Assist: {goal.assist.player.name}
                            </Typography>
                          )}
                        </Box>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant="body1" sx={{ opacity: 0.7 }}>
                      No events recorded yet
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
              {match.bookings && match.bookings.length > 0 ? (
                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                      Yellow & Red Cards
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      {match.bookings.map((booking: any, idx: number) => (
                        <Box key={idx} sx={{ p: 2, background: 'action.hover', borderRadius: 1 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, alignItems: 'center' }}>
                            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                              <Box
                                sx={{
                                  width: 16,
                                  height: 24,
                                  background: booking.card === 'YELLOW' ? '#FFD700' : '#FF0000',
                                  borderRadius: 0.25,
                                }}
                              />
                              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                {booking.player?.name}
                              </Typography>
                            </Box>
                            <Typography variant="caption" sx={{ opacity: 0.7 }}>
                              {booking.minute}'
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                            {booking.team?.crest && (
                              <Image
                                src={booking.team.crest}
                                alt={booking.team.name}
                                width={24}
                                height={24}
                              />
                            )}
                            <Typography variant="body2" sx={{ opacity: 0.7 }}>
                              {booking.team?.name}
                            </Typography>
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant="body1" sx={{ opacity: 0.7 }}>
                      No cards in this match
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
              {match.referees && match.referees.length > 0 ? (
                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                      Match Officials
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      {match.referees.map((referee: any, idx: number) => (
                        <Box key={idx} sx={{ p: 2, background: 'action.hover', borderRadius: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {referee.name}
                          </Typography>
                          <Typography variant="caption" sx={{ opacity: 0.7 }}>
                            {referee.type}
                          </Typography>
                          {referee.nationality && (
                            <Typography variant="caption" sx={{ opacity: 0.7, display: 'block' }}>
                              {referee.nationality}
                            </Typography>
                          )}
                        </Box>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant="body1" sx={{ opacity: 0.7 }}>
                      Referee information not available
                    </Typography>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          )}
        </Box>
      </Container>

      <Footer />
    </Box>
  );
}
