import React from 'react';
import { useAppSelector } from '../../hooks/storeHooks'
import SavedTripsList from '../../components/SavedTripsList/SavedTripsList'

const MyTrips = () => {
  const {trips} = useAppSelector(state => state)

  const [tripToOpen, setTripToOpen] = React.useState<any>(null)

  const handleOpenTrip = (tripId: string) => {
    const selectedTrip = trips.data.find(trip => trip.trip === tripId)
    setTripToOpen(selectedTrip)
  }

  return (
    <div>
        <SavedTripsList {...trips} handleOpenTrip={handleOpenTrip} />
    </div>
  )
}

export default MyTrips