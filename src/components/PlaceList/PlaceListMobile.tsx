import React from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardActionArea, 
  CardMedia, 
  CardContent, 
  CardActions,
  Button 
} from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import { StyledMobileremoveBtn } from './Style';

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
    <Box sx={{m: "0 1rem 0.5rem 1rem", height: "45vh", overflow: "scroll", backgroundColor: "white", }}>
       { placesToVisit.map((place: any) => {
            const { name,  location_id, address, phone, website, cuisine, photo, subcategory} = place
            
            return (
              <Box key={location_id} sx={{display: "flex", my: "0.25rem"}}>
                <Card elevation={3} sx={{width: "85%"}}>
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
                </Card>
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