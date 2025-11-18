'use client';

import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Match } from '@/lib/types';
import { formatDate, formatTime } from '@/utils/date';

interface MatchCardProps {
  match: Match;
}

export const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isFinished = match.status === 'FINISHED';
  const isLive = match.status === 'LIVE' || match.status === 'IN_PLAY';
  const isScheduled = match.status === 'TIMED';

  const getStatusColor = () => {
    if (isFinished) return 'success';
    if (isLive) return 'error';
    return 'default';
  };

  const homeGoals = match.score.fullTime.home;
  const awayGoals = match.score.fullTime.away;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <Link href={`/match/${match.id}`} style={{ textDecoration: 'none' }}>
        <Card
          sx={{
            height: '100%',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            background: isLive ? 'rgba(255, 64, 64, 0.05)' : undefined,
            borderLeft: isLive ? '4px solid #ff4040' : undefined,
            '&:hover': {
              boxShadow: theme.palette.mode === 'dark'
                ? '0 20px 40px rgba(0, 168, 255, 0.15)'
                : '0 20px 40px rgba(0, 102, 204, 0.1)',
            },
          }}
        >
          <CardContent sx={{ p: isMobile ? 2 : 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="caption" sx={{ opacity: 0.7 }}>
                {match.competition?.name}
              </Typography>
              <Chip
                label={isLive ? '🔴 LIVE' : isFinished ? 'Finished' : 'Upcoming'}
                color={getStatusColor()}
                variant="outlined"
                size="small"
                sx={{
                  fontWeight: 600,
                  ...(isLive && {
                    animation: 'pulse 2s infinite',
                    '@keyframes pulse': {
                      '0%, 100%': { opacity: 1 },
                      '50%': { opacity: 0.7 },
                    },
                  }),
                }}
              />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="caption" sx={{ opacity: 0.7 }}>
                {formatDate(match.utcDate)}
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.7 }}>
                {formatTime(match.utcDate)}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box sx={{ flex: 1, textAlign: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center', mb: 1 }}>
                  {match.homeTeam.crest && (
                    <Image
                      src={match.homeTeam.crest}
                      alt={match.homeTeam.name}
                      width={32}
                      height={32}
                      style={{ borderRadius: 4 }}
                    />
                  )}
                  <Typography
                    variant={isMobile ? 'body2' : 'body1'}
                    sx={{ fontWeight: 600, flex: 1, textAlign: 'right' }}
                  >
                    {match.homeTeam.name}
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  px: isMobile ? 1 : 2,
                  py: 1,
                  textAlign: 'center',
                  minWidth: isMobile ? 50 : 80,
                }}
              >
                <Typography
                  variant={isMobile ? 'h6' : 'h5'}
                  sx={{
                    fontWeight: 800,
                    color: 'primary.main',
                  }}
                >
                  {isFinished ? (
                    `${homeGoals} - ${awayGoals}`
                  ) : isLive ? (
                    <>
                      <span style={{ fontSize: '0.8em', color: 'inherit', opacity: 0.7 }}>
                        {match.minute}'
                      </span>
                    </>
                  ) : (
                    'vs'
                  )}
                </Typography>
              </Box>

              <Box sx={{ flex: 1, textAlign: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center', mb: 1 }}>
                  <Typography
                    variant={isMobile ? 'body2' : 'body1'}
                    sx={{ fontWeight: 600, flex: 1, textAlign: 'left' }}
                  >
                    {match.awayTeam.name}
                  </Typography>
                  {match.awayTeam.crest && (
                    <Image
                      src={match.awayTeam.crest}
                      alt={match.awayTeam.name}
                      width={32}
                      height={32}
                      style={{ borderRadius: 4 }}
                    />
                  )}
                </Box>
              </Box>
            </Box>

            {match.season && (
              <Typography variant="caption" sx={{ opacity: 0.6, display: 'block', mt: 2 }}>
                📍 Season {match.season.id}
              </Typography>
            )}
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};
