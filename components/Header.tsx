'use client';

import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Container,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Brightness4,
  Brightness7,
  Menu as MenuIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useThemeMode } from '@/providers/ThemeProvider';
import Link from 'next/link';
import { motion } from 'framer-motion';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Matches', href: '/matches' },
  { label: 'Players', href: '/players' },
  { label: 'Teams', href: '/teams' },
];

export const Header: React.FC = () => {
  const { mode, toggleTheme } = useThemeMode();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky" sx={{ backdropFilter: 'blur(10px)' }}>
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 0, sm: 2 } }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #00a8ff 0%, #1de9b6 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  cursor: 'pointer',
                  letterSpacing: 0.5,
                }}
              >
                ⚽ EuroMatchHub
              </Typography>
            </motion.div>
          </Link>

          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 1 }}>
              {navLinks.map((link) => (
                <motion.div
                  key={link.href}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  <Link href={link.href} style={{ textDecoration: 'none' }}>
                    <Typography
                      component="span"
                      sx={{
                        color: 'inherit',
                        fontWeight: 500,
                        px: 2,
                        py: 1,
                        borderRadius: 1,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          background: 'rgba(0, 168, 255, 0.1)',
                          color: '#00a8ff',
                        },
                      }}
                    >
                      {link.label}
                    </Typography>
                  </Link>
                </motion.div>
              ))}
            </Box>
          )}

          <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
            <IconButton
              color="inherit"
              onClick={toggleTheme}
              sx={{
                '&:hover': {
                  background: 'rgba(0, 168, 255, 0.1)',
                },
              }}
            >
              {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
            </IconButton>

            {isMobile && (
              <>
                <IconButton
                  color="inherit"
                  onClick={handleMenuOpen}
                  sx={{
                    '&:hover': {
                      background: 'rgba(0, 168, 255, 0.1)',
                    },
                  }}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  PaperProps={{
                    sx: {
                      bgcolor: 'background.paper',
                      backgroundImage: 'none',
                    },
                  }}
                >
                  {navLinks.map((link) => (
                    <MenuItem
                      key={link.href}
                      onClick={handleMenuClose}
                      component={Link}
                      href={link.href}
                    >
                      {link.label}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
