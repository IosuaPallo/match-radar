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
  selectedLeague: number | null;
  onLeagueChange: (leagueId: number) => void;
}

const majorEuropeanLeagues = [
  { id: 39, name: 'Premier League (England)' },
  { id: 140, name: 'La Liga (Spain)' },
  { id: 61, name: 'Ligue 1 (France)' },
  { id: 78, name: 'Bundesliga (Germany)' },
  { id: 135, name: 'Serie A (Italy)' },
  { id: 2, name: 'Champions League' },
  { id: 3, name: 'Europa League' },
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
          onChange={(e) => onLeagueChange(e.target.value as number)}
        >
          {majorEuropeanLeagues.map((league) => (
            <MenuItem key={league.id} value={league.id}>
              {league.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedLeague && (
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {majorEuropeanLeagues.map((league) => (
            <Chip
              key={league.id}
              label={league.name.split('(')[0].trim()}
              onClick={() => onLeagueChange(league.id)}
              color={selectedLeague === league.id ? 'primary' : 'default'}
              variant={selectedLeague === league.id ? 'filled' : 'outlined'}
              sx={{ cursor: 'pointer' }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};
