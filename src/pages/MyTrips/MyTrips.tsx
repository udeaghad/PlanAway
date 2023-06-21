import React, {useEffect} from 'react'
import { useAppSelector } from '../../hooks/storeHooks'
import SavedTripsList from '../../components/SavedTripsList/SavedTripsList'

const MyTrips = () => {
  const {trips} = useAppSelector(state => state)
  return (
    <div>
        <SavedTripsList {...trips} />
    </div>
  )
}

export default MyTrips