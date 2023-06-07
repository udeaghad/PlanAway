import { 
  Box, 
  Typography,  
  CardActionArea, 
  CardActions,
  Rating,
  CardMedia,
  CardContent,
  Card,
  InputBase,
  Stack
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import { StyledAddButton, StyledRemoveButton } from './Style';



interface IActivitiesProps {  
  handleNewActivity: (activity: IActivity) => void;
  onLoad: (autoC: google.maps.places.Autocomplete) => void;
  onPlaceChanged: () => void;
  newActivity: IActivity | null;
  setNewActivity: React.Dispatch<React.SetStateAction<IActivity | null>>;
  Autocomplete: any;
  placeholder: string;
}

interface IActivity {
  name: string;
  location_id: string;
  address: string;
  phone?: string;
  photo?: {images:{medium: {url: string}}};
  latitude: number;
  longitude: number; 
  rating?: string; 
}


const Activities = ({handleNewActivity, onLoad, onPlaceChanged, newActivity, setNewActivity, Autocomplete, placeholder }: IActivitiesProps) => {

  return (
    <div>
      <Box>       

        <Stack spacing={2} direction="row" sx={{border: "2px black solid", borderRadius: 99, padding: "0.5rem"}} width={"90%"}>
            <div>
              <SearchIcon sx={{color: "gray", marginTop: "0.3rem"}}/>
            </div>
            <div style={{width: "100%"}}>
              <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                <InputBase type="search" placeholder={placeholder} sx={{width: "95%"}}/>
              </Autocomplete>
            </div>
                                   
        </Stack>

      {newActivity && 
        
        <Card  sx={{ maxWidth: "90%", m: "0.8rem", p: "0.5rem" }}>
          <Box sx={{display: 'flex', justifyContent: "space-between", alignItems: "center", margin:"0"}}>
            <Typography gutterBottom variant="h5" component="div" textAlign="center" ml={5}>
              {newActivity.name}
            </Typography>            
          </Box>
          <CardActionArea  sx={{display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
            <div style={{width: "100px"}}>
              <CardMedia
                component="img"
                image={newActivity.photo? newActivity.photo.images.medium.url : "/images/restaurant.png"}
                alt={newActivity.name} 
                sx={{objectFit: "cover", aspectRatio: "3/3", width: "100px", height: "100px"}}                 
              />

            </div>
            <CardContent>
              <Box sx={{display: "flex", justifyContent: "space-between", flexDirection: "column"}}>
                <Typography variant="body2" color="text.secondary">
                <span style={{fontWeight: "bold"}}>Address:</span> {" "} {newActivity.address}
                </Typography>

                { newActivity.phone &&
                <Typography variant="body2" color="text.secondary">
                  <span style={{fontWeight: "bold"}}>Phone:</span> {" "} {newActivity.phone}
                </Typography>
                } 

              </Box>
            </CardContent>            
          </CardActionArea>
          <CardActions sx={{display: "flex", justifyContent: "space-around", alignItems: "center"}}>
              <Rating name="read-only" value={Number(newActivity.rating)} readOnly />
              <Box sx={{display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "1.5rem"}}>
                <StyledAddButton 
                  aria-label="add"
                  onClick={ () => handleNewActivity(newActivity)}
                  >
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem", paddingLeft:'0.25rem', paddingRight:'0.25rem'}}>
                      <AddIcon fontSize="small" />
                      <Typography variant='button' color="#000000" fontSize={12}>
                      ADD TO LIST
                      </Typography>
                    </div>    
                </StyledAddButton>
                <StyledRemoveButton
                  aria-label="remove"
                  onClick={ () => setNewActivity(null)}
                  >    
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem", paddingLeft:'0.25rem', paddingRight:'0.25rem'}}>
                      < ClearIcon fontSize="small" />
                      <Typography variant='button' color="#000000" fontSize={12}>
                      CANCEL
                      </Typography>
                    </div>    
                </StyledRemoveButton>
              </Box>
            </CardActions>
          
        </Card>
      
        }


      </Box>
      
  </div>

  )
}

export default Activities