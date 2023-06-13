import React from 'react'
import {Box, InputLabel, MenuItem, FormControl, Button  } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface JumpButtonMobileProps {
  dailyGroups: {
    id: string;
    items: any[];
  }[];
}

const JumpButtonMobile = ({dailyGroups}: JumpButtonMobileProps) => {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="Jump-to">Jump To</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value=""
          label="Jump to"
        >
          { dailyGroups && dailyGroups.map((group: any, index: number) => (
            <MenuItem key={group.id} value={`#${group.id}`}>
             <Button variant="text" size="small" href={`#${group.id}`} >Day {index + 1}</Button>
            </MenuItem>
          ))}
          
        </Select>
      </FormControl>
    </Box>
  )
}

export default JumpButtonMobile