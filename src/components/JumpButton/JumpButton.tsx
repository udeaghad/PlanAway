import React from 'react';
import { Box, Typography } from '@mui/material';
import { StyledButton } from './Style';

interface JumpButtonProps {
  dailyGroups: {
    id: string;
    items: any[];
  }[];
}

const JumpButton = ({dailyGroups}: JumpButtonProps) => {
  return (
    <Box sx={{display: "flex", justifyContent:"flex-start", alignItems: "baseline", gap:"1rem"}}>
      <Typography variant="subtitle1" component="div" sx={{color: "black"}}>
        Jump to
      </Typography>

      <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem"}}>
        { dailyGroups.map((group: any, index: number) => ( 
          
          <StyledButton
            href={`#${group.id}`}
            key={group.id}
            variant="contained"              
            size="small"              
            >
              Day {index + 1}
          </StyledButton>
          
        ))}
      </Box>
    </Box>
  )
}

export default JumpButton