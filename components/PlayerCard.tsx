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
import { Player } from '@/lib/types';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { useFavorites } from '@/hooks/useFavorites';

interface PlayerCardProps {
  player: Player;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
  const theme = useTheme();
  const { isFavorite, toggleFavorite } = useFavorites();
  const isPlayerFavorite = isFavorite('player', player.id);

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <Link href={`/player/${player.id}`} style={{ textDecoration: 'none' }}>
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
          <CardContent sx={{ pb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
              {player.photo && (
                <Image
                  src={player.photo}
                  alt={player.name}
                  width={80}
                  height={80}
                  style={{
                    borderRadius: theme.shape.borderRadius,
                    objectFit: 'cover',
                  }}
                />
              )}
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  {player.name}
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.7, display: 'block' }}>
                  {player.role?.primary}
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.7, display: 'block' }}>
                  {player.nationality}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
              <Box>
                <Typography variant="caption" sx={{ opacity: 0.7 }}>
                  Age
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {player.age}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" sx={{ opacity: 0.7 }}>
                  Height
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {player.height || '-'}
                </Typography>
              </Box>
            </Box>
          </CardContent>
          <CardActions sx={{ justifyContent: 'space-between', pt: 0 }}>
            <Button size="small" color="primary">
              View Profile
            </Button>
            <IconButton
              size="small"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleFavorite({
                  type: 'player',
                  id: player.id,
                  name: player.name,
                  image: player.photo,
                });
              }}
              color={isPlayerFavorite ? 'error' : 'default'}
            >
              {isPlayerFavorite ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
          </CardActions>
        </Card>
      </Link>
    </motion.div>
  );
};
