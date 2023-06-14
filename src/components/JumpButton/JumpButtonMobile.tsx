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
    <Box sx={{ minWidth: 120, maxWidth: 150 }}>
      <FormControl fullWidth>
        <InputLabel id="jump-to">Jump To</InputLabel>
        <Select
          labelId="jump-to"
          id="jump-to"
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