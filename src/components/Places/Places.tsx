import React from 'react';
import { Box, Typography, Button, ButtonGroup, InputLabel, Select, FormControl, MenuItem, Stack} from '@mui/material';

const Places = () => {
  return (
    <Box p={5}>
      <Typography variant="h4" gutterBottom textAlign="start" margin="1rem">
        Recommended For you
      </Typography>

      <Stack direction="row" spacing={2} sx={{display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
        <ButtonGroup 
          variant="contained" aria-label="Disabled button group">
          <Button
            sx={{ 
              borderTopLeftRadius: 25, 
              borderBottomLeftRadius: 25, 
              boxShadow: "#ccc 0px 0px 0px 0px", 
              textTransform: "none", 
              backgroundColor: "#b3b3b3", 
              color: "white", 
              borderColor: "gray",
              '&:hover': {
                backgroundColor: 'gray',
                borderColor: 'gray',
                boxShadow: 'none',
              },
            }}
          >
            Restaurants
          </Button>

          <Button
            sx={{ 
              borderTopRightRadius: 25,
              borderBottomRightRadius: 25,
              boxShadow: "#ccc 0px 0px 0px 0px",
              textTransform: "none",
              backgroundColor: "#b3b3b3",
              color: "white",
              bordeColor: "gray",
              '&:hover': {
                backgroundColor: 'gray',
                borderColor: 'gray',
                boxShadow: 'none',
              },
            }}
          >
            Attractions
          </Button>        
        </ButtonGroup>

        <Box>

          <FormControl  sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="filter">Filter</InputLabel>
            <Select
              labelId="filter"
              id="filter"
              value="Filter"
              label="Filter"
              
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Stack>
    </Box>
  )
}

export default Places