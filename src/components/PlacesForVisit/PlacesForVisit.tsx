import React from 'react';
import { Draggable, Droppable, DroppableProvided } from "react-beautiful-dnd";
import { 
  Box, 
  Typography, 
  Card, 
  CardActionArea, 
  CardMedia, 
  CardContent, 
  CardActions, 
  IconButton
} from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

interface IPlaceForVisitProps {
  id: string;
  items: {
    address: string;
    location_id: string;
    latitude: string;
    longitude: string;
    name: string;
    photo: {
      images: {
        medium: {
          url: string;
        }
      }
    }
    phone: string;
    website: string;
    cuisine?: string;
    subcategory?: string  
  }[];
  handleRemovePlace: (id: string) => (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const PlacesForVisit = ({items, id, handleRemovePlace}: IPlaceForVisitProps ) => {

  return (
    <Droppable droppableId={id}>
      {(provided: DroppableProvided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          

          {items && items.map((item: any, index: number) => {
            const { name, location_id, photo, address, phone, website, cuisine, subcategory } = item

            return (
              <Draggable draggableId={location_id} index={index} key={location_id}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    {/* <Paper > */}
                      <Card sx={{ maxWidth: "90%", m: "0.8rem", px: "0.5rem" }} >
                        <Box sx={{display: 'flex', justifyContent: "space-between", alignItems: "center", margin:"0"}}>

                          <Typography  variant="subtitle2" component="div" textAlign="center" ml={5}>
                            {name}
                          </Typography>

                          <CardActions>
                            <IconButton 
                              aria-label="remove"
                              size="small"
                              color='primary'
                              onClick={ handleRemovePlace(location_id)}
                              >    
                                <RemoveCircleIcon fontSize="large" />
                            </IconButton>
                          </CardActions>
                        </Box>

                        <CardActionArea  sx={{display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                          <div style={{width: "100px"}}>
                            <CardMedia
                              component="img"
                              image={photo?.images? photo.images.medium.url : "/images/restaurant.png"}
                              alt={name} 
                              sx={{objectFit: "cover", aspectRatio: "2/2", width: "50px", height: "50px"}}                 
                            />

                          </div>
                          <CardContent>
                            
                            <Box sx={{display: "flex", justifyContent: "space-between", flexDirection: "column"}}>
                              <Typography variant="caption" color="text.secondary">
                                Address: {" "} {address}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                Phone: {" "} {phone}
                              </Typography>

                              {cuisine && <Typography variant="caption" color="text.secondary">
                                Cuisine: {" "} {cuisine?.map((c: any) => c.name).join(", ")}
                              </Typography>}
                              
                              {subcategory && subcategory.length &&  <Typography variant="caption" color="text.secondary">
                                Category: {" "} {subcategory?.map((c: any) => c.name).join(", ")}
                              </Typography>}

                              <Typography variant="caption" color="text.secondary">
                                Website: {" "} {website}
                              </Typography>
                              
                            </Box>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    {/* </Paper> */}
                  </div>
                )}
              </Draggable>
            )
          })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}

export default PlacesForVisit