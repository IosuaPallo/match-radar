'use client';

import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Typography,
} from '@mui/material';

interface LeagueSelectorProps {
  selectedLeague: string | null;
  onLeagueChange: (competitionCode: string) => void;
}

const majorEuropeanLeagues = [
  { code: 'PL', name: 'Premier League (England)' },
  { code: 'PD', name: 'La Liga (Spain)' },
  { code: 'FL1', name: 'Ligue 1 (France)' },
  { code: 'BL1', name: 'Bundesliga (Germany)' },
  { code: 'SA', name: 'Serie A (Italy)' },
  { code: 'CL', name: 'Champions League' },
  { code: 'EL', name: 'Europa League' },
];

export const LeagueSelector: React.FC<LeagueSelectorProps> = ({ selectedLeague, onLeagueChange }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <FormControl fullWidth sx={{ maxWidth: 300 }}>
        <InputLabel id="league-select-label">Select League</InputLabel>
        <Select
          labelId="league-select-label"
          id="league-select"
          value={selectedLeague || ''}
          label="Select League"
          onChange={(e) => onLeagueChange(e.target.value as string)}
        >
          {majorEuropeanLeagues.map((league) => (
            <MenuItem key={league.code} value={league.code}>
              {league.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedLeague && (
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {majorEuropeanLeagues.map((league) => (
            <Chip
              key={league.code}
              label={league.name.split('(')[0].trim()}
              onClick={() => onLeagueChange(league.code)}
              color={selectedLeague === league.code ? 'primary' : 'default'}
              variant={selectedLeague === league.code ? 'filled' : 'outlined'}
              sx={{ cursor: 'pointer' }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};
