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
  IconButton,
  Button,
  Stack,
  Grid,
} from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import { StyledRemoveButton } from './Style';

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

          {items.length > 0 && items.map((item: any, index: number) => {
            const { name, location_id, photo, address, phone, website, cuisine, subcategory } = item

            return (
              <div>

              <Draggable draggableId={location_id} index={index} key={location_id}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <Grid container spacing={2} sx={{display: "flex", justifyContent: "baseline", alignItems: "center"}}>
                      <Grid item xs={10} >
                        <Card sx={{width: "95%", mt: "0.5rem", px: "0.5rem" }} >                        
                          <CardContent>
                            <Box sx={{display: "flex", justifyContent: "space-between", flexDirection: "column"}}>
                              <Typography  variant="body1" component="div">
                                {name}
                              </Typography>

                              {address && <Typography variant="caption">
                                <span style={{fontWeight: "bold"}}>Address:</span> {" "} {address}
                              </Typography>}
                            </Box>
                          </CardContent> 
                        </Card>
                      </Grid>
                      <Grid item xs={2}>
                        <Box>
                          <StyledRemoveButton 
                            aria-label="remove"
                            onClick={handleRemovePlace(location_id)}
                          >
                            <RemoveIcon fontSize="small"/>
                          </StyledRemoveButton>
                        </Box>
                    </Grid>
                  </Grid>
                  
                  </div>
                )}
              </Draggable>
              </div>
            )
          })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}

export default PlacesForVisit