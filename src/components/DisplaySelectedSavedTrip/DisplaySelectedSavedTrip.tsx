import { Box, Typography, IconButton, Card, CardContent } from '@mui/material';
import UpgradeIcon from '@mui/icons-material/Upgrade';

import { StyledViewMapButton, StyledViewMapBtnUpTab } from './Style';
import theme from '../../theme/theme'

interface IDisplaySelectedSavedTripProps {
  tripToOpen: {
    id: string;
    createdAt: string;
    origin: {
      details: {
        name: string;
        address?: string;
        lat: string;
        lng: string;
      },
      startDate: string;
      endDate: string;
      numberOfDays: number;
    },
    places: any[];
  }
  handleShowMap: (index: number) => void;
}

const DisplaySelectedSavedTrip = ({tripToOpen, handleShowMap}:IDisplaySelectedSavedTripProps) => {
  return (
    <Box> 
      { tripToOpen.places && tripToOpen.places.map((eachPlace: any, index: number) => (
        <div key={eachPlace.id} style={{marginBottom: "1rem"}} id={`${eachPlace.id}`}>
          <Box                            
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: theme.palette.primary.variant, 
              px: "1rem", 
              }}
          >
            <Typography variant="h6" component="div" sx={{color: "black"}}>
              Day {index + 1}
            </Typography>

            <Box sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
              <StyledViewMapButton 
                href='#goToMap'                              
                onClick={() => handleShowMap(index) }
              >
                View on Map

              </StyledViewMapButton>
                
              <StyledViewMapBtnUpTab 
                href='#map'
                onClick={() => handleShowMap(index) }
              >
                View on Map

              </StyledViewMapBtnUpTab>
                

              <IconButton sx={{color: theme.palette.secondary.variant}} aria-label="top" href='#top'>
                <Box 
                  sx={{
                    display: "flex", 
                    flexDirection: "column", 
                    justifyContent: "center", 
                    alignItems: "center"
                  }}
                >
                  <UpgradeIcon sx={{fontSize: "1.5rem"}} />
                  <Typography variant="caption" component="span">TOP</Typography>                                
                </Box>
              </IconButton>
            </Box>
            
          </Box>

          <div style={{width: "98%"}}>
            { eachPlace.items.map((item: any) => (
              <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", gap:"3%"}} key={item.location_id}>
                <Card sx={{width: "80%", mt: "0.5rem", px: "0.5rem" }} >                        
                  <CardContent>
                    <Box sx={{display: "flex", justifyContent: "space-between", flexDirection: "column"}}>
                      <Typography  variant="body1" component="div">
                        {item.name}
                      </Typography>

                      {item.address && <Typography variant="caption">
                        <span style={{fontWeight: "bold"}}>Address:</span> {" "} {item.address}
                      </Typography>}
                    </Box>
                  </CardContent> 
                </Card>                      
              </Box>
            ))}
          </div>
        </div>
      ))}
    </Box>
  )
}

export default DisplaySelectedSavedTrip