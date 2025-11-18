'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,

  Link as MuiLink,
  useTheme,
} from '@mui/material';
import { Grid as Grid2 } from '@mui/material';
import { motion } from 'framer-motion';

const footerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const Footer: React.FC = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <Box
        sx={{
          borderTop: 1,
          borderColor: 'divider',
          py: { xs: 4, md: 6 },
          mt: 8,
          background: theme.palette.mode === 'dark'
            ? 'rgba(0, 168, 255, 0.02)'
            : 'rgba(0, 102, 204, 0.02)',
        }}
      >
        <Container maxWidth="lg">
          <Grid2 container spacing={4} sx={{ mb: 4 }}>
            {/* About */}
            <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
              <motion.div variants={itemVariants}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  ⚽ EuroMatchHub
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.7, lineHeight: 1.8 }}>
                  Your ultimate destination for European football statistics, live
                  matches, and player insights.
                </Typography>
              </motion.div>
            </Grid2>

            {/* Quick Links */}
            <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
              <motion.div variants={itemVariants}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  Quick Links
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {[
                    { label: 'Home', href: '/' },
                    { label: 'Matches', href: '/matches' },
                    { label: 'Players', href: '/players' },
                    { label: 'Teams', href: '/teams' },
                  ].map((link) => (
                    <MuiLink
                      key={link.href}
                      href={link.href}
                      sx={{
                        color: 'inherit',
                        opacity: 0.7,
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          opacity: 1,
                          color: 'primary.main',
                        },
                      }}
                    >
                      {link.label}
                    </MuiLink>
                  ))}
                </Box>
              </motion.div>
            </Grid2>

            {/* Leagues */}
            <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
              <motion.div variants={itemVariants}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  Major Leagues
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {[
                    'Premier League',
                    'La Liga',
                    'Bundesliga',
                    'Serie A',
                  ].map((league) => (
                    <Typography
                      key={league}
                      variant="body2"
                      sx={{
                        opacity: 0.7,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          opacity: 1,
                          color: 'primary.main',
                        },
                      }}
                    >
                      {league}
                    </Typography>
                  ))}
                </Box>
              </motion.div>
            </Grid2>

            {/* Stats */}
            <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
              <motion.div variants={itemVariants}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  Coverage
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography variant="body2" sx={{ opacity: 0.7 }}>
                    📊 7+ European Leagues
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.7 }}>
                    🏆 International Cups
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.7 }}>
                    ⚡ Live Updates
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.7 }}>
                    📈 Player Stats
                  </Typography>
                </Box>
              </motion.div>
            </Grid2>
          </Grid2>

          {/* Divider */}
          <Box sx={{ borderTop: 1, borderColor: 'divider', py: 3 }}>
            <motion.div variants={itemVariants}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: 2,
                }}
              >
                <Typography variant="body2" sx={{ opacity: 0.6 }}>
                  © {currentYear} EuroMatchHub. All rights reserved. Data powered by
                  football-data.org.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <MuiLink
                    href="#"
                    sx={{
                      opacity: 0.6,
                      transition: 'all 0.2s ease',
                      '&:hover': { opacity: 1 },
                    }}
                  >
                    Privacy
                  </MuiLink>
                  <MuiLink
                    href="#"
                    sx={{
                      opacity: 0.6,
                      transition: 'all 0.2s ease',
                      '&:hover': { opacity: 1 },
                    }}
                  >
                    Terms
                  </MuiLink>
                </Box>
              </Box>
            </motion.div>
          </Box>
        </Container>
      </Box>
    </motion.footer>
  );
};
