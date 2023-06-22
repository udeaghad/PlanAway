import React, {useEffect} from 'react';
import { useAppSelector } from '../../hooks/storeHooks'
import SavedTripsList from '../../components/SavedTripsList/SavedTripsList';
import DisplaySelectedSavedTrip from '../../components/DisplaySelectedSavedTrip/DisplaySelectedSavedTrip';
import OriginCard from '../../components/OriginCard/OriginCard';
import { Box, Paper } from '@mui/material';


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
      <div>
          <SavedTripsList {...trips} handleOpenTrip={handleOpenTrip} />
      </div>
      { tripToOpen && 
      <Box>
        <Box>
          <Paper sx={{width: "80%", m: "1rem"}}>
            <OriginCard {...tripToOpen.origin} />
          </Paper>
        </Box>
        
        <div>
          <DisplaySelectedSavedTrip {...tripToOpen} />
        </div>
      </Box>
      
      }


    </div>
  )
}

export default MyTrips