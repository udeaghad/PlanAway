import React,{ useState } from 'react';                                                                                                                                                                                                   
import { Box, FormControl, Grid, InputBase, InputLabel, OutlinedInput, Stack, Typography, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Autocomplete } from '@react-google-maps/api';
                                                                                
interface IProps {
  onLoad: (autoC: google.maps.places.Autocomplete) => void;
  onPlaceChanged: () => void;
}                                                                                               
const LocationBar = ({onLoad, onPlaceChanged}: IProp ) => {  

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "#b3b3b3", marginTop: "0.5rem", p: "1.5rem" }}>
      <Grid container spacing={2} sx={{display: "flex", justifyContent: "space-around", alignItems: "center"}}>
        <Grid item xs={4}>

          <Stack spacing={2} direction="row">
            <div style={{width:"80%", marginLeft:"20%", display: "flex", justifyContent: "space-around", alignItems: "center", gap: "5px", padding: "5px", border: "1px #ccc solid", borderRadius: 99, backgroundColor: "#ccc"}}>
              <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                <InputBase type="search" placeholder="Search..." sx={{color: "gray"}}/>
              </Autocomplete>
              <div>
                <SearchIcon sx={{color: "gray"}}/>
              </div>
            </div>
                       
          </Stack>

          <Stack spacing={2} 
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Typography variant="subtitle2" gutterBottom sx={{marginLeft:"20%"}}>
              Where are you staying?
            </Typography>
          </Stack>
        </Grid>

        <Grid item xs={4} >
          <Stack spacing={2} 
            direction="row"
            justifyContent="center"
            alignItems="center"
            component="form"
            sx={{
              '& > :not(style)': { m: 1 }                           
            }}
            noValidate
            autoComplete="off"
          >

            <FormControl>
              <InputLabel htmlFor="startDate">Date</InputLabel>
                <OutlinedInput
                  id="startDate"
                  type="date"
                  label="startDate" 
                  defaultValue={new Date().toISOString().slice(0, 10)}                
                />
            </FormControl>

            <Typography variant="h6" component="div" sx={{color: "gray"}}>to</Typography>

            <FormControl>
              <InputLabel htmlFor="endDate">Date</InputLabel>
                <OutlinedInput
                  id="endDate"
                  type="date"
                  label="endDate"
                  defaultValue={new Date().toISOString().slice(0, 10)} 
                />
            </FormControl>
          </Stack>

          <Stack spacing={2} 
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="subtitle2" gutterBottom>
              How long are you staying?
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={4}>
        <Button 
          variant="contained" 
          sx={{
              borderRadius: 99, 
              backgroundColor: "#326299",
              '&:hover': {
                backgroundColor: '#5785b8f0',
                borderColor: '#5785b8f0',
                boxShadow: 'none',
              },
              textTransform: 'none',
              }}>Update</Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default LocationBar