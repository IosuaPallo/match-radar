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
} from '@mui/material';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { TeamCard } from '@/components/TeamCard';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { useStandings } from '@/hooks/useLeagues';
import { Footer } from '@/components/Footer';
import { Search } from '@mui/icons-material';

const majorEuropeanLeagues = [
  { id: 39, name: 'Premier League' },
  { id: 140, name: 'La Liga' },
  { id: 61, name: 'Ligue 1' },
  { id: 78, name: 'Bundesliga' },
  { id: 135, name: 'Serie A' },
  { id: 2, name: 'Champions League' },
  { id: 3, name: 'Europa League' },
];

export default function TeamsPage() {
  const [selectedLeague, setSelectedLeague] = useState<number>(39);
  const [searchQuery, setSearchQuery] = useState('');

  const standings = useStandings(selectedLeague);

  const filteredTeams = React.useMemo(() => {
    if (!standings.data?.response?.[0]?.league?.standings) return [];
    const allTeams = standings.data.response[0].league.standings.flat();
    return allTeams.filter((entry: any) =>
      entry.team?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [standings.data, searchQuery]);

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
                Teams
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.7 }}>
                Explore top football teams and their standings
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
              </Box>

              {/* Search Box */}
              <TextField
                fullWidth
                placeholder="Search teams by name..."
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

          {/* Standings Table or Teams Grid */}
          <Box>
            {standings.isLoading ? (
              <LoadingSkeleton count={6} type="table" />
            ) : filteredTeams.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardContent sx={{ p: 0 }}>
                    <Box sx={{ overflowX: 'auto' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                          <tr>
                            <th
                              style={{
                                padding: '12px 16px',
                                textAlign: 'left',
                                borderBottom: `1px solid ${
                                  false ? '#30363d' : '#d0d7de'
                                }`,
                                fontWeight: 600,
                              }}
                            >
                              Position
                            </th>
                            <th
                              style={{
                                padding: '12px 16px',
                                textAlign: 'left',
                                borderBottom: `1px solid ${
                                  false ? '#30363d' : '#d0d7de'
                                }`,
                                fontWeight: 600,
                              }}
                            >
                              Team
                            </th>
                            <th
                              style={{
                                padding: '12px 16px',
                                textAlign: 'center',
                                borderBottom: `1px solid ${
                                  false ? '#30363d' : '#d0d7de'
                                }`,
                                fontWeight: 600,
                              }}
                            >
                              Played
                            </th>
                            <th
                              style={{
                                padding: '12px 16px',
                                textAlign: 'center',
                                borderBottom: `1px solid ${
                                  false ? '#30363d' : '#d0d7de'
                                }`,
                                fontWeight: 600,
                              }}
                            >
                              W-D-L
                            </th>
                            <th
                              style={{
                                padding: '12px 16px',
                                textAlign: 'center',
                                borderBottom: `1px solid ${
                                  false ? '#30363d' : '#d0d7de'
                                }`,
                                fontWeight: 600,
                              }}
                            >
                              GF-GA
                            </th>
                            <th
                              style={{
                                padding: '12px 16px',
                                textAlign: 'center',
                                borderBottom: `1px solid ${
                                  false ? '#30363d' : '#d0d7de'
                                }`,
                                fontWeight: 600,
                              }}
                            >
                              Points
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredTeams.map((entry: any, idx: number) => (
                            <tr key={idx}>
                              <td
                                style={{
                                  padding: '12px 16px',
                                  borderBottom: `1px solid ${
                                    false ? '#30363d' : '#d0d7de'
                                  }`,
                                  fontWeight: 600,
                                  color: '#00a8ff',
                                }}
                              >
                                {entry.rank}
                              </td>
                              <td
                                style={{
                                  padding: '12px 16px',
                                  borderBottom: `1px solid ${
                                    false ? '#30363d' : '#d0d7de'
                                  }`,
                                  fontWeight: 500,
                                }}
                              >
                                {entry.team?.name}
                              </td>
                              <td
                                style={{
                                  padding: '12px 16px',
                                  borderBottom: `1px solid ${
                                    false ? '#30363d' : '#d0d7de'
                                  }`,
                                  textAlign: 'center',
                                }}
                              >
                                {entry.all?.played || 0}
                              </td>
                              <td
                                style={{
                                  padding: '12px 16px',
                                  borderBottom: `1px solid ${
                                    false ? '#30363d' : '#d0d7de'
                                  }`,
                                  textAlign: 'center',
                                }}
                              >
                                {entry.all?.win}-{entry.all?.draw}-{entry.all?.lose}
                              </td>
                              <td
                                style={{
                                  padding: '12px 16px',
                                  borderBottom: `1px solid ${
                                    false ? '#30363d' : '#d0d7de'
                                  }`,
                                  textAlign: 'center',
                                }}
                              >
                                {entry.all?.goals?.for}-{entry.all?.goals?.against}
                              </td>
                              <td
                                style={{
                                  padding: '12px 16px',
                                  borderBottom: `1px solid ${
                                    false ? '#30363d' : '#d0d7de'
                                  }`,
                                  textAlign: 'center',
                                  fontWeight: 600,
                                  color: '#1de9b6',
                                }}
                              >
                                {entry.points}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <Card>
                <CardContent sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="body1" sx={{ opacity: 0.7 }}>
                    {searchQuery
                      ? 'No teams found matching your search'
                      : 'No team data available'}
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
