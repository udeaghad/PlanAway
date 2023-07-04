import { FormControl, InputBase, InputLabel, OutlinedInput, Stack, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import {StyledLocationBarContainer, StyledLocationContainer, StyledSearchStack, StyledButton, StyledDateStack, StyledButtonContainer, StyleDateSection, StyledDateText} from './Style';

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
      <StyledLocationContainer >
        

          <StyledSearchStack data-testid='location-input'>
            <div style={{width: "10%"}}>
              <SearchIcon sx={{color: "gray", fontSize: "2rem", width: "100%"}}/>
            </div>
            <div style={{width: "90%"}}>
              <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                <InputBase 
                  type="search" 
                  placeholder="Hotel or Lodging Location" 
                  sx={{color: "gray", width: "100%", fontSize: "1rem"}}                  
                />
              </Autocomplete>
            </div>
                                   
          </StyledSearchStack>

          <Stack 
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            >
            <Typography variant="body1" gutterBottom >
              Where are you staying??
            </Typography>
          </Stack>
        </StyledLocationContainer>
        
        <StyleDateSection>

          <StyledDateStack>

            <FormControl sx={{width: "70%"}}>
              <InputLabel htmlFor="startDate" sx={{backgroundColor: "#fffef8", px: "10px", fontSize: "1.2rem"}}>Date</InputLabel>
                <OutlinedInput
                  id="startDate"
                  type="date"
                  label="startDate" 
                  value={date.startDate}
                  onChange={handleDateOnChange} 
                  sx={{backgroundColor: "#fffef8", border: "2px black solid", fontSize: "1rem"}} 

                />
            </FormControl>

            <Typography variant="body1" component="div">to</Typography>

            <FormControl sx={{width: "70%"}}>
              <InputLabel htmlFor="endDate" sx={{backgroundColor: "#fffef8", px: "10px", fontSize: "1.2rem"}}>Date</InputLabel>
                <OutlinedInput
                  id="endDate"
                  type="date"
                  label="endDate"
                  value={date.endDate}
                  onChange={handleDateOnChange}
                  sx={{backgroundColor: "#fffef8", border: "2px black solid", fontSize: "1rem"}} 
                />
            </FormControl>
          </StyledDateStack>
            <StyledDateText variant="subtitle1">
              How long are you staying?
            </StyledDateText>
          
        </StyleDateSection>
       

       
          <StyledButtonContainer>
            <StyledButton 
              variant="contained" 
              size="large"
              onClick={handleDateSubmit}
            >
              Add Activities
            </StyledButton>

          </StyledButtonContainer>
        
    </StyledLocationBarContainer>
  )
}

export default LocationBar