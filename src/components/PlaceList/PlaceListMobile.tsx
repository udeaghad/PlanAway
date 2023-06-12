import React from 'react';
import { 
  Box, 
  Typography, 
  CardActionArea,
  CardContent, 
  CardActions,
} from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import { StyledMobileremoveBtn, StyledCard } from './Style';

interface IPlaceListProps {
  placesToVisit: {
    name: string;
    location_id: string;
    address: string;
    distance_string?: string;
    phone?: string;
    website?: string;
    rating?: string;
    cuisine?: string;
    photo?: string;
    subcategory?: string;
  }[];
  handleRemovePlace: (id: string) => (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const PlaceListMobile = ({placesToVisit, handleRemovePlace}: IPlaceListProps) => {
  return (
    <Box sx={{m: "0 1rem 0.5rem 1rem", height: "35vh", overflow: "scroll", backgroundColor: "white", }}>
       { placesToVisit.map((place: any) => {
            const { name,  location_id, address} = place
            
            return (
              <Box key={location_id} sx={{display: "flex", my: "0.25rem"}}>
                <StyledCard elevation={3}>
                  <CardActionArea >
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        {name}
                      </Typography>
                      <Box sx={{display: "flex", justifyContent: "flex-start", flexDirection: "column"}}>
                        <Typography variant="body2">
                          {address}
                        </Typography>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </StyledCard>
                <CardActions sx={{width: "10%"}}>
                  <StyledMobileremoveBtn 
                    aria-label="remove"
                    onClick={ handleRemovePlace(location_id)}
                  >  
                      <RemoveIcon />
                  </StyledMobileremoveBtn>
                </CardActions>
              </Box>
            )
       })}

    </Box>
  )
}

export default PlaceListMobile