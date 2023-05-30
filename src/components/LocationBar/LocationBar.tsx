import { Box, FormControl, Grid, InputBase, InputLabel, OutlinedInput, Stack, Typography, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import {StyledLocationBarContainer, StyledLocationGridContainer, StyledSearchStack, StyledButton} from './Style';
// import { Autocomplete } from '@react-google-maps/api';

                                                                                
interface IProps {
  onLoad: (autoC: google.maps.places.Autocomplete) => void;
  onPlaceChanged: () => void;
  Autocomplete: any;
  handleDateOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDateSubmit: () => void;
  date: {
    startDate: string;
    endDate: string;
    numberOfDays: number;
  }
}                                                                                               
const LocationBar = ({onLoad, onPlaceChanged, Autocomplete, handleDateOnChange, handleDateSubmit, date}: IProps ) => {  
   
  return (
    <StyledLocationBarContainer>
      <StyledLocationGridContainer container >
        <Grid item xs={4}>

          <StyledSearchStack spacing={2} direction="row">
            <div>
              <SearchIcon sx={{color: "gray"}}/>
            </div>
            <div style={{width: "100%"}}>
              <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                <InputBase type="search" placeholder="Hotel or Lodging Location" sx={{color: "gray", width: "95%"}}/>
              </Autocomplete>
            </div>
                                   
          </StyledSearchStack>

          <Stack spacing={2} 
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Typography variant="subtitle1" gutterBottom sx={{marginLeft:"20%"}}>
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
              <InputLabel htmlFor="startDate" sx={{backgroundColor: "#fffef8", px: "10px"}}>Date</InputLabel>
                <OutlinedInput
                  id="startDate"
                  type="date"
                  label="startDate" 
                  value={date.startDate}
                  onChange={handleDateOnChange} 
                  sx={{backgroundColor: "#fffef8", border: "2px black solid"}} 

                />
            </FormControl>

            <Typography variant="body1" component="div">to</Typography>

            <FormControl>
              <InputLabel htmlFor="endDate" sx={{backgroundColor: "#fffef8", px: "10px"}}>Date</InputLabel>
                <OutlinedInput
                  id="endDate"
                  type="date"
                  label="endDate"
                  value={date.endDate}
                  onChange={handleDateOnChange}
                  sx={{backgroundColor: "#fffef8", border: "2px black solid"}} 
                />
            </FormControl>
          </Stack>

          {/* <Stack spacing={2} 
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
          > */}
            <Typography variant="subtitle1" gutterBottom sx={{marginLeft: "10%"}}>
              How long are you staying?
            </Typography>
          {/* </Stack> */}
        </Grid>

        <Grid item xs={4}>
        <StyledButton 
          variant="contained" 
          size="large"
          onClick={handleDateSubmit}
        >
          PLAN TRIP
        </StyledButton>
        </Grid>
      </StyledLocationGridContainer>
    </StyledLocationBarContainer>
  )
}

export default LocationBar