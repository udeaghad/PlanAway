import React from 'react';
import { Draggable, Droppable, DroppableProvided } from "react-beautiful-dnd";
import { 
  Box, 
  Typography, 
  Card,
  CardContent, 
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
    cuisine?: {name:string}[];
    subcategory?: {name: string}[]; 
  }[];
  handleRemovePlace: (id: string) => (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const PlacesForVisit = ({items, id, handleRemovePlace}: IPlaceForVisitProps ) => {
   

  return (
    <Droppable droppableId={id}>
      {(provided: DroppableProvided) => (
        <div ref={provided.innerRef} {...provided.droppableProps} style={{height:"20vh"}}>

          {items.length > 0 && items.map((item: any, index: number) => {
            const { name, location_id, address } = item

            return (
              <div key={location_id}>

              <Draggable draggableId={location_id} index={index} key={location_id}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >
                    <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", gap:"3%"}}>
                      <Card sx={{width: "80%", mt: "0.5rem", px: "0.5rem" }} >                        
                        <CardContent>
                          <Box sx={{display: "flex", justifyContent: "space-between", flexDirection: "column"}}>
                            <Typography  variant="body1" fontWeight="bold">
                              {name}
                            </Typography>

                            {address && <Typography variant="caption">
                              <span style={{fontWeight: "bold"}}>Address:</span> {" "} {address}
                            </Typography>}
                          </Box>
                        </CardContent> 
                      </Card>
                      <Box sx={{width: "15%"}}>
                        <StyledRemoveButton 
                          aria-label="remove"
                          onClick={handleRemovePlace(location_id)}
                        >
                          <RemoveIcon fontSize="small"/>
                        </StyledRemoveButton>
                      </Box>
                    </Box>
                  
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