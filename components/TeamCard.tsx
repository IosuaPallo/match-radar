'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  Button,
  IconButton,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Team } from '@/lib/types';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { useFavorites } from '@/hooks/useFavorites';

interface TeamCardProps {
  team: Team;
}

export const TeamCard: React.FC<TeamCardProps> = ({ team }) => {
  const theme = useTheme();
  const { isFavorite, toggleFavorite } = useFavorites();
  const isTeamFavorite = isFavorite('team', team.id);

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <Link href={`/team/${team.id}`} style={{ textDecoration: 'none' }}>
        <Card
          sx={{
            height: '100%',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: theme.palette.mode === 'dark'
                ? '0 20px 40px rgba(0, 168, 255, 0.15)'
                : '0 20px 40px rgba(0, 102, 204, 0.1)',
            },
          }}
        >
          <CardContent sx={{ pb: 1, textAlign: 'center' }}>
            {team.logo && (
              <Image
                src={team.logo}
                alt={team.name}
                width={120}
                height={120}
                style={{
                  margin: '0 auto',
                  display: 'block',
                  marginBottom: 16,
                }}
              />
            )}
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
              {team.name}
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.7 }}>
              {team.country}
            </Typography>
            {team.founded && (
              <Typography variant="caption" sx={{ opacity: 0.7, display: 'block', mt: 0.5 }}>
                Founded: {team.founded}
              </Typography>
            )}
          </CardContent>
          <CardActions sx={{ justifyContent: 'space-between', pt: 0 }}>
            <Button size="small" color="primary">
              View Team
            </Button>
            <IconButton
              size="small"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleFavorite({
                  type: 'team',
                  id: team.id,
                  name: team.name,
                  image: team.logo,
                });
              }}
              color={isTeamFavorite ? 'error' : 'default'}
            >
              {isTeamFavorite ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
          </CardActions>
        </Card>
      </Link>
    </motion.div>
  );
};
