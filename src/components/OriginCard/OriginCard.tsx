import React from 'react';
import { 
  Box, 
  Typography,  
  CardActionArea, 
  CardMedia,
  CardContent,
  Card,
} from '@mui/material';

interface IOrigin {
  origin: {
    startDate: string;
    endDate: string;
    details: {
      lat: string;
      lng: string;
      name: string;
      photo: {images: { medium: {url: string}}};
      address: string;      
    }
  }

}

const OriginCard = ({origin}: IOrigin) => {
  return (
    <div>
      {origin && 
        
        <Card  sx={{ maxWidth: "90%", m: "0.8rem", p: "0.5rem" }}>
          <Box sx={{display: 'flex', justifyContent: "space-between", alignItems: "center", margin:"0"}}>
            <Typography gutterBottom variant="h5" component="div" textAlign="center" ml={5}>
              {origin.details.name}
            </Typography>
            {/* <CardActions>
              <IconButton 
                aria-label="remove"
                size="large"
                color='primary'
                onClick={ () => handleNewActivity(newActivity)}
                >    
                  <AddCircleIcon fontSize="large" />
              </IconButton>
              <IconButton 
                aria-label="remove"
                size="large"
                color='primary'
                onClick={ () => setNewActivity(null)}
                >    
                  <CancelIcon fontSize="large" />
              </IconButton>
            </CardActions> */}
          </Box>
          <CardActionArea  sx={{display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
            <div style={{width: "100px"}}>
              <CardMedia
                component="img"
                // height={photo? photo.images.medium.height : "225"}
                // width={photo? photo.images.medium.width : "200"}
                image={origin.details.photo? origin.details.photo.images.medium.url : "/images/restaurant.png"}
                alt={origin.details.name} 
                sx={{objectFit: "cover", aspectRatio: "3/3", width: "100px", height: "100px"}}                 
              />

            </div>
            <CardContent>
              <Box sx={{display: "flex", justifyContent: "space-between", flexDirection: "column"}}>
                <Typography variant="subtitle1" color="text.secondary">
                  Address: {" "} {origin.details.address}
                </Typography> 
                <Box>
                  <Typography variant="subtitle1" color="text.secondary">
                    {origin.startDate} {" "} to {" "} {origin.endDate}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </CardActionArea>
          
        </Card>
      
        }


    </div>
  )
}

export default OriginCard