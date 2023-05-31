import React from 'react';
import { 
  Box, 
  Typography,  
  CardActionArea, 
  CardMedia,
  CardContent,
  Card,
  Paper
} from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

interface IOrigin {
    startDate: string;
    endDate: string;
    details: {
      lat: string;
      lng: string;
      name: string;
      photo: {images: { medium: {url: string}}};
      address: string;      
    }
    numberOfDays: number;
    
}

const OriginCard = ({startDate, endDate, details, numberOfDays}: IOrigin) => {
  return (
    <div>
      {origin && 
        
        <Paper elevation={3}  sx={{ maxWidth: "90%", m: "0.8rem", p: "0.5rem" }}>
          <Box sx={{display: 'flex', flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start", margin:"0"}}>
            
            <div>
              
              <Typography 
                gutterBottom 
                variant="h6" 
                component="div" ml={2} 
                
              >
                {details.name}
              </Typography>
            </div>

            <div style={{display: "flex", gap: "0.25rem"}}>
              <Typography gutterBottom variant="subtitle1" component="div" ml={2}>
                {details.address}
              </Typography>

              <EditOutlinedIcon />
            </div>

            <div style={{display: "flex", gap: "0.25rem"}}>
              <Typography gutterBottom variant="subtitle1" component="div" textAlign="center" ml={2}>
                {startDate} {" "} to {" "} {endDate}
              </Typography>

              <EditOutlinedIcon />
            </div>
          </Box>
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
          {/* </Box>
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
          </CardActionArea> */}
          
        </Paper>
      
        }


    </div>
  )
}

export default OriginCard