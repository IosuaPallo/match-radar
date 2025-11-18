'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { PaletteMode } from '@mui/material';

interface ThemeContextType {
  mode: PaletteMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeMode = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    return { mode: 'dark' as PaletteMode, toggleTheme: () => {} };
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const EuroThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<PaletteMode>('dark');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('theme-mode') as PaletteMode | null;
      if (savedMode) {
        setMode(savedMode);
      } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setMode(prefersDark ? 'dark' : 'light');
      }
      setIsMounted(true);
    }
  }, []);

  const toggleTheme = () => {
    setMode((prevMode) => {
      const newMode = prevMode === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme-mode', newMode);
      return newMode;
    });
  };

  const theme = createTheme({
    palette: {
      mode,
      ...(mode === 'dark'
        ? {
            primary: {
              main: '#00a8ff',
              light: '#4dd0ff',
              dark: '#0085cc',
            },
            secondary: {
              main: '#1de9b6',
              light: '#72efdd',
              dark: '#00bfa5',
            },
            background: {
              default: '#0d1117',
              paper: '#161b22',
            },
            text: {
              primary: '#e6edf3',
              secondary: '#8b949e',
            },
            divider: '#30363d',
          }
        : {
            primary: {
              main: '#0066cc',
              light: '#0078d4',
              dark: '#004a99',
            },
            secondary: {
              main: '#00b4a6',
              light: '#0dd9cc',
              dark: '#008a80',
            },
            background: {
              default: '#ffffff',
              paper: '#f6f8fa',
            },
            text: {
              primary: '#24292f',
              secondary: '#57606a',
            },
            divider: '#d0d7de',
          }),
    },
    typography: {
      fontFamily: '"Geist", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      h1: {
        fontSize: '2.5rem',
        fontWeight: 700,
        lineHeight: 1.2,
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 700,
        lineHeight: 1.3,
      },
      h3: {
        fontSize: '1.5rem',
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h4: {
        fontSize: '1.25rem',
        fontWeight: 600,
        lineHeight: 1.5,
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.5,
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.43,
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: 8,
            padding: '8px 16px',
            fontSize: '0.95rem',
          },
          contained: {
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            border: mode === 'dark' ? '1px solid #30363d' : '1px solid #d0d7de',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            borderBottom: mode === 'dark' ? '1px solid #30363d' : '1px solid #d0d7de',
          },
        },
      },
      MuiTabs: {
        styleOverrides: {
          root: {
            borderBottom: mode === 'dark' ? '1px solid #30363d' : '1px solid #d0d7de',
          },
        },
      },
    },
  });

  if (!isMounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
