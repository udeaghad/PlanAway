import React from 'react';
import { Droppable, DroppableProvided, Draggable } from 'react-beautiful-dnd';
import { Box, Typography, Stack, InputBase, Card, CardContent } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RemoveIcon from '@mui/icons-material/Remove';
import { StyledRemoveButton, StyledDragDropText } from './Style';

interface AddMoreActivitiesProps {
  onLoad: (autoC: google.maps.places.Autocomplete) => void;
  onPlaceChanged: () => void;
  newActivity: IActivity | null;
  setNewActivity: React.Dispatch<React.SetStateAction<IActivity | null>>;
  Autocomplete: any; 
}

interface IActivity {
  id: string;
  items: {
    name: string;
    location_id: string;
    address: string;
    phone?: string;
    photo?: {images:{medium: {url: string}}};
    latitude: number;
    longitude: number; 
    rating?: string; 
    order: number;
  }[]
}


const AddMoreActivitiesCard = (
  {
    onLoad, 
    onPlaceChanged, 
    newActivity, 
    setNewActivity, 
    Autocomplete
  }:AddMoreActivitiesProps) => {

  return (
    <Box sx={{mt: '2rem'}}>
      <Typography variant='h6' component='div' sx={{mb: '1rem'}}>
        Add More Activities
      </Typography>
      <Stack 
        spacing={2} 
        direction='row' 
        sx={{
          border: '2px black solid', 
          borderRadius: 99, 
          padding: '0.5rem', 
          mb:'1rem'
        }} 
        width={'90%'}
      >
          <div>
            <SearchIcon sx={{color: 'gray', marginTop: '0.3rem'}}/>
          </div>
          <div style={{width: '100%'}}>
            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
              <InputBase 
                type='search' 
                placeholder='Search restaurants, attractions and more' 
                sx={{width: '95%'}} 
              />
            </Autocomplete>
          </div>
                                
      </Stack>

      {newActivity && 
        <Droppable droppableId='ADD-ACTIVITY'>
        {(provided: DroppableProvided) => (
          <div 
            ref={provided.innerRef} 
            {...provided.droppableProps} 
            style={{height: '15vh', marginBottom: '3rem'}}
          >

            {newActivity.items.length > 0 && newActivity.items.map((item: any, index: number) => {
            
            return (
              <div key={item.location_id}> 
                <Draggable draggableId={item.location_id} index={index}>
                  {(provided) => (
                    <div 
                      ref={provided.innerRef} 
                      {...provided.draggableProps} 
                      {...provided.dragHandleProps}
                    >
                      <Box 
                        sx={{
                          display: 'flex', 
                          justifyContent: 'baseline', 
                          alignItems: 'center'}}
                      >
                        <Box>
                          <Card sx={{width: '95%', mt: '0.5rem', px: '0.5rem' }} >                        
                            <CardContent>
                              <Box 
                                sx={{
                                  display: 'flex', 
                                  justifyContent: 'space-between', 
                                  flexDirection: 'column'
                                }}
                              >
                                <Typography  variant='body1' component='div'>
                                  {item.name}
                                </Typography>

                                {item.address && <Typography variant='caption'>
                                  <span style={{fontWeight: 'bold'}}>Address:</span> {' '} {item.address}
                                </Typography>}
                              </Box>
                            </CardContent> 
                            <StyledDragDropText>
                              Drag and drop me to any day
                            </StyledDragDropText>
                          </Card>
                        </Box>
                        <Box>
                          <Box>
                            <StyledRemoveButton 
                              aria-label='remove'
                              onClick={() => setNewActivity(null)}
                            >
                              <RemoveIcon fontSize='small'/>
                            </StyledRemoveButton>
                          </Box>
                        </Box>
                      </Box>
                    </div>
                  
                  )}
                </Draggable>
              </div>
                
                ) })}
            {provided.placeholder}
          </div>
        )}
        </Droppable>
      }
      
    </Box>
  )
}

export default AddMoreActivitiesCard