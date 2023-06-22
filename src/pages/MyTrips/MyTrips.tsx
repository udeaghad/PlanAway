import React, {useEffect} from 'react';
import { useAppSelector } from '../../hooks/storeHooks'
import SavedTripsList from '../../components/SavedTripsList/SavedTripsList';
import DisplaySelectedSavedTrip from '../../components/DisplaySelectedSavedTrip/DisplaySelectedSavedTrip';
import OriginCard from '../../components/OriginCard/OriginCard';
import { Box, Paper } from '@mui/material';
import { StyledOriginCard, StyledSavedTripsListCont } from './Style';


const MyTrips = () => {
  const {trips} = useAppSelector(state => state)
  

  const [tripToOpen, setTripToOpen] = React.useState<any>(null)

  const handleOpenTrip = (tripId: string) => {
    const selectedTrip = trips.data.find(trip => trip.trip === tripId)
    setTripToOpen(selectedTrip)
  }

  useEffect(() => {
    console.log(tripToOpen)
  }, [tripToOpen])

  return (
    <div>
      <StyledSavedTripsListCont>
          <SavedTripsList {...trips} handleOpenTrip={handleOpenTrip} />
      </StyledSavedTripsListCont>
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