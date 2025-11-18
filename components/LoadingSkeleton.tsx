'use client';

import React from 'react';
import { Box, Skeleton, Card, CardContent, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

interface LoadingSkeletonProps {
  count?: number;
  type?: 'card' | 'table' | 'list';
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ count = 3, type = 'card' }) => {
  const theme = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0.5 },
    visible: { opacity: 1 },
  };

  if (type === 'card') {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}
      >
        {Array.from({ length: count }).map((_, i) => (
          <motion.div key={i} variants={itemVariants}>
            <Card>
              <CardContent>
                <Skeleton variant="text" width="80%" height={40} sx={{ mb: 2 }} />
                <Skeleton variant="text" width="100%" height={30} sx={{ mb: 1 }} />
                <Skeleton variant="text" width="90%" height={20} />
                <Skeleton variant="rounded" width="100%" height={60} sx={{ mt: 2 }} />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    );
  }

  if (type === 'table') {
    return (
      <Box sx={{ width: '100%' }}>
        {Array.from({ length: count }).map((_, i) => (
          <Box key={i} sx={{ display: 'flex', gap: 2, mb: 2, p: 2 }}>
            <Skeleton variant="circular" width={40} height={40} />
            <Box sx={{ flex: 1 }}>
              <Skeleton variant="text" width="60%" height={24} sx={{ mb: 1 }} />
              <Skeleton variant="text" width="40%" height={20} />
            </Box>
          </Box>
        ))}
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      {Array.from({ length: count }).map((_, i) => (
        <Box key={i} sx={{ mb: 2 }}>
          <Skeleton variant="text" width="100%" height={28} sx={{ mb: 1 }} />
          <Skeleton variant="text" width="95%" height={20} />
        </Box>
      ))}
    </Box>
  );
};

export const MatchCardSkeleton: React.FC<{ count?: number }> = ({ count = 3 }) => {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 2 }}>
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i}>
          <CardContent>
            <Skeleton variant="text" width="70%" height={24} sx={{ mb: 1 }} />
            <Skeleton variant="text" width="50%" height={20} sx={{ mb: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton variant="text" width="15%" height={32} />
              <Skeleton variant="circular" width={40} height={40} />
            </Box>
            <Skeleton variant="text" width="80%" height={20} />
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};
