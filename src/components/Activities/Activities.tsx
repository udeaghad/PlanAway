import React from 'react'
import { 
  Box, 
  Typography,  
  CardActionArea, 
  CardActions,
  Rating,
  CardMedia,
  CardContent,
  Card,
  IconButton
} from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';


interface IActivitiesProps {
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
  }[]
}


const Activities = ({placesToVisit}: IActivitiesProps) => {
  
  return (
    <div style={{ height: "75vh", overflow: "auto", paddingRight: "0.5rem" }}>

          { placesToVisit.map((place: any) => {
            const { name,  location_id, address, distance_string, phone, website, rating, cuisine, photo} = place
            return (
          
              <Card key={location_id}  sx={{ maxWidth: "90%", m: "0.8rem", p: "0.5rem" }}>
                <Box sx={{display: 'flex', justifyContent: "space-between", alignItems: "center", margin:"0"}}>

                  <Typography gutterBottom variant="h5" component="div" textAlign="center" ml={5}>
                    {name}
                  </Typography>
                  <CardActions>
                    <IconButton 
                      aria-label="delete"
                      size="large"
                      color='primary'
                      // onClick={handleSelectPlace(location_id)}
                      >    
                        <RemoveCircleIcon fontSize="large" />
                    </IconButton>
                  </CardActions>
                </Box>
              <CardActionArea  sx={{display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                <div style={{width: "100px"}}>
                <CardMedia
                  component="img"
                  // height={photo? photo.images.medium.height : "225"}
                  // width={photo? photo.images.medium.width : "200"}
                  image={photo? photo.images.medium.url : "/images/restaurant.png"}
                  alt={name} 
                  sx={{objectFit: "cover", aspectRatio: "3/3", width: "100px", height: "100px"}}                 
                />

                </div>
                <CardContent>
                  
                  <Box sx={{display: "flex", justifyContent: "space-between", flexDirection: "column"}}>
                    <Typography variant="body2" color="text.secondary">
                      Address: {" "} {address}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Phone: {" "} {phone}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      Cuisine: {" "} {cuisine?.map((c: any) => c.name).join(", ")}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      Distance: {" "} {distance_string}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      Rating: {" "} {rating? <Rating name="read-only" value={Number(rating)} readOnly /> : "No Rating"}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      Website: {" "} {website}
                    </Typography>
                    
                  </Box>
                </CardContent>
              </CardActionArea>
              
            </Card>
          )})}
      </div>

  )
}

export default Activities