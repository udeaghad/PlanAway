import React from 'react'
import { 
  Box, 
  Typography, 
  Card, 
  CardActionArea, 
  CardMedia, 
  CardContent, 
  CardActions, 
} from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import { StyledRemoveButton } from './Style';

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

const PlaceList = ({placesToVisit, handleRemovePlace}: IPlaceListProps) => {
  return (
    <div>
      <Box>
        
        <div style={{ height: "55vh", overflow: "auto", paddingRight: "0.5rem", backgroundColor: "white" }}>

          { placesToVisit.map((place: any) => {
            const { name,  location_id, address, phone, website, cuisine, photo, subcategory} = place
            
            return (
          
              <Card elevation={3} key={location_id}  sx={{width: 345, mt: "0.8rem"}}>
                <Typography gutterBottom variant="h6" component="div" textAlign="center" m="1rem">
                  {name}
                </Typography>
                  
               
                <CardActionArea >
                
                  <CardMedia
                    component="img"
                    height="150"
                    image={photo?.images? photo.images.medium.url : "/images/restaurant.png"}
                    alt={name} 
                  />
                   
                  <CardContent>
                  
                  <Box sx={{display: "flex", justifyContent: "space-between", flexDirection: "column"}}>
                    <Typography variant="body2">
                      <span style={{fontWeight: "bold"}}>Address:</span> {" "} {address}
                    </Typography>

                    {phone && 
                      <Typography variant="body2">
                        <span style={{fontWeight: "bold"}}>Phone:</span> {" "} {phone}
                      </Typography>
                    }

                    {cuisine && cuisine.length > 0 && <Typography variant="body2">
                    <span style={{fontWeight: "bold"}}>Cuisine:</span> {" "} {cuisine?.map((c: any) => c.name).join(", ")}
                    </Typography>}
                    
                    {subcategory && subcategory.length > 0 &&  <Typography variant="body2">
                    <span style={{fontWeight: "bold"}}>Category:</span> {" "} {subcategory?.map((c: any) => c.name).join(", ")}
                    </Typography>}

                    {website && <Typography variant="body2">
                      <span style={{fontWeight: "bold"}}>Website:</span> {" "} {website}
                    </Typography>}
                    
                  </Box>
                </CardContent>
              </CardActionArea>
                <CardActions sx={{display: "flex", justifyContent: "flex-end", alignItems: "center", margin: "0 1rem 1rem 1rem"}}>
                    <StyledRemoveButton 
                      aria-label="remove"
                      onClick={ handleRemovePlace(location_id)}
                      >  
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem", paddingLeft:'0.25rem', paddingRight:'0.25rem',}}>
                          <RemoveIcon />
                          <Typography variant="button" color="#000000" fontSize={12}>
                            REMOVE 
                          </Typography>
                        </div>  
                    </StyledRemoveButton>
                  </CardActions>
              
            </Card>
          )})}
        </div>
    </Box>

    </div>
  )
}

export default PlaceList