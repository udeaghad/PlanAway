// import { Autocomplete } from '@react-google-maps/api';
// import { ulid } from 'ulid';
import { 
  Box, 
  Typography,  
  CardActionArea, 
  CardActions,
  Rating,
  CardMedia,
  CardContent,
  Card,
  IconButton,
  InputBase,
  Stack
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
// import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';



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
            <CardActions>
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
            </CardActions>
          </Box>
          <CardActionArea  sx={{display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
            <div style={{width: "100px"}}>
              <CardMedia
                component="img"
                // height={photo? photo.images.medium.height : "225"}
                // width={photo? photo.images.medium.width : "200"}
                image={newActivity.photo? newActivity.photo.images.medium.url : "/images/restaurant.png"}
                alt={newActivity.name} 
                sx={{objectFit: "cover", aspectRatio: "3/3", width: "100px", height: "100px"}}                 
              />

            </div>
            <CardContent>
              <Box sx={{display: "flex", justifyContent: "space-between", flexDirection: "column"}}>
                <Typography variant="body2" color="text.secondary">
                  Address: {" "} {newActivity.address}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Phone: {" "} {newActivity.phone}
                </Typography>

                { newActivity.rating && <Typography variant="body2" color="text.secondary">
                      Rating: {" "} {newActivity.rating? <Rating name="read-only" value={Number(newActivity.rating)} readOnly /> : "No Rating"}
                    </Typography>
                  }
                
              </Box>
            </CardContent>
          </CardActionArea>
          
        </Card>
      
        }


      </Box>
      {/* <Box>
        <Typography variant="h4" gutterBottom textAlign="start" margin="1rem">
          Places to Visit
        </Typography>
        <div style={{ height: "75vh", overflow: "auto", paddingRight: "0.5rem" }}>

            { placesToVisit.map((place: any) => {
              const { name,  location_id, address, distance_string, phone, website, rating, cuisine, photo, subcategory} = place
              
              return (
            
                <Card key={location_id}  sx={{ maxWidth: "90%", m: "0.8rem", p: "0.5rem" }}>
                  <Box sx={{display: 'flex', justifyContent: "space-between", alignItems: "center", margin:"0"}}>

                    <Typography gutterBottom variant="h5" component="div" textAlign="center" ml={5}>
                      {name}
                    </Typography>
                    <CardActions>
                      <IconButton 
                        aria-label="remove"
                        size="large"
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

                      { cuisine && cuisine.length > 0 &&                      
                        <Typography variant="body2" color="text.secondary">
                          Cuisine: {" "} {cuisine?.map((c: any) => c.name).join(", ")}
                        </Typography>
                      }


                      {subcategory && subcategory.length > 0 && 
                        <Typography variant="body2" color="text.secondary">
                          Category: {" "} {subcategory?.map((c: any) => c.name).join(", ")}
                        </Typography>
                      }

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
    </Box> */}
  </div>

  )
}

export default Activities