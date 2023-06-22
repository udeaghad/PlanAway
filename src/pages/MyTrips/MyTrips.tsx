import React from 'react';
import { useAppSelector } from '../../hooks/storeHooks'
import SavedTripsList from '../../components/SavedTripsList/SavedTripsList';
import DisplaySelectedSavedTrip from '../../components/DisplaySelectedSavedTrip/DisplaySelectedSavedTrip';
import OriginCard from '../../components/OriginCard/OriginCard';
import { Box, Divider } from '@mui/material';
import { StyledOriginCard, StyledSavedTripsListCont } from './Style';


const MyTrips = () => {
  const {trips} = useAppSelector(state => state)
  

  const [tripToOpen, setTripToOpen] = React.useState<any>(null)

  const handleOpenTrip = (tripId: string) => {
    const selectedTrip = trips.data.find(trip => trip.id === tripId)
    setTripToOpen(selectedTrip)
  }

  return (
    <div>
      <StyledSavedTripsListCont>
          <SavedTripsList {...trips} handleOpenTrip={handleOpenTrip} />
      </StyledSavedTripsListCont>

      <Divider />
      { tripToOpen && 
      <Box>
        <StyledOriginCard>          
            <OriginCard {...tripToOpen.origin} />          
        </StyledOriginCard>
        
        <div>
          <DisplaySelectedSavedTrip {...tripToOpen} />
        </div>
      </Box>
      
      }


    </div>
  )
}

export default MyTrips