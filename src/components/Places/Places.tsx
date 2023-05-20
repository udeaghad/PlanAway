import React, {useState, useRef} from 'react';

import { 
  Box, 
  Typography, 
  InputLabel, 
  Select, 
  FormControl, 
  MenuItem, 
  Stack, 
  CardActionArea, 
  CardActions,
  Rating,
  CardMedia,
  CardContent,
  Card,
  IconButton,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material';

import AddCircleIcon from '@mui/icons-material/AddCircle';

interface IPlaces {
  restaurants: null | {
    name: string;  
    location_id: string; 
    address: string; 
    distance_string: string;
    phone: string;
    website?: string;
    rating?: number;
    cuisine?: {key: string; name: string};
    photo?: string;
    
  }[];
  attractions: null | {
    name: string;
    address: string;
    location_id: string;
    distance_string: string;
    phone: string;
    website?: string;
    rating?: string;
    photo?: string;
    subcategory?: {key: string; name: string}[];

  }[];
  handleSelectPlace: (id: string) => (event: React.MouseEvent<HTMLButtonElement>) => void;  
}

const Places = ({restaurants, attractions, handleSelectPlace}: IPlaces) => {
  
  const [alignment, setAlignment] = useState(() => ['restaurants']);

  const handleToggle = (event: React.MouseEvent<HTMLElement>,  newAlignment: string[] ) => {
    if (newAlignment?.length) {
      setAlignment(newAlignment);
    }
  };

  const attractionRef = useRef<HTMLDivElement>(null);
  const restaurantRef = useRef<HTMLDivElement>(null);

  const showAttractions = () => {
    if (attractionRef.current && restaurantRef.current) {
      attractionRef.current.style.display = "block";
      restaurantRef.current.style.display = "none";
    }
  }

  const showRestaurants = () => {
    if (attractionRef.current && restaurantRef.current) {
      attractionRef.current.style.display = "none";
      restaurantRef.current.style.display = "block";
    }
  }

  return (
    <Box p={5} >
      <Typography variant="h4" gutterBottom textAlign="start" margin="1rem">
        Recommended For you
      </Typography>

      <Stack direction="row" spacing={2} sx={{display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
        
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleToggle}
          aria-label="Restaurant or Attraction"
        >
          <ToggleButton 
            value="restaurants"
            sx={{ 
              borderTopLeftRadius: 25, 
              borderBottomLeftRadius: 25
            }}
            onClick={showRestaurants}
          >
            Restaurants
          </ToggleButton>

          <ToggleButton 
            value="attractions"
            sx={{ 
              borderTopRightRadius: 25,
              borderBottomRightRadius: 25,
            }}
            onClick={showAttractions}
          >
            Attractions
          </ToggleButton>
              
        </ToggleButtonGroup>


        <Box>

          <FormControl  sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="filter">Filter</InputLabel>
            <Select
              labelId="filter"
              id="filter"
              value="Filter"
              label="Filter"
              
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Stack>

      <div style={{ height: "75vh", overflow: "auto", display: 'block' }} ref={restaurantRef}>

          { restaurants?.map((place: any) => {
            const { name,  location_id, address, distance_string, phone, website, rating, cuisine, photo} = place
            return (
          
              <Card key={location_id}  sx={{ maxWidth: 345, mt: "0.8rem" }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height={photo? photo.images.small.height : "150"}
                  image={photo? photo.images.small.url : "/images/restaurant.png"}
                  alt={name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {name}
                  </Typography>
                  <Box sx={{display: "flex", justifyContent: "space-between", flexDirection: "column"}}>
                    <Typography variant="body2" color="text.secondary">
                      Address: {" "} {address}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Phone: {" "} {phone}
                    </Typography>

                    { cuisine && cuisine.length && <Typography variant="body2" color="text.secondary">
                      Cuisine: {" "} {cuisine?.map((c: any) => c.name).join(", ")}
                    </Typography>
                    }

                    <Typography variant="body2" color="text.secondary">
                      Distance: {" "} {distance_string}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      Rating: {" "} {rating? <Rating name="read-only" value={Number(rating)} readOnly /> : "No Rating"}
                    </Typography>

                    {website && <Typography variant="body2" color="text.secondary">
                      Website: {" "} {website}
                    </Typography>}
                    
                  </Box>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <IconButton 
                  aria-label="add"
                  onClick={handleSelectPlace(location_id)}
                  color='primary'
                  size="large"
                  >              
                  {/* <Fab size="small" color="primary" aria-label="add"> */}
                    <AddCircleIcon  fontSize='large'/>
                  {/* </Fab> */}
                </IconButton>
              </CardActions>
            </Card>
          )})}
      </div>

      <div style={{ height: "75vh", overflow: "auto", display: "none" }} ref={attractionRef}>
        
          { attractions?.map((place: any) => {
            const { name,  location_id, address, distance_string, phone, website, rating, subcategory, photo} = place
            return (
          
              <Card key={location_id}  sx={{ maxWidth: 345, mt: "0.8rem" }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height={photo? photo.images.small.height : "150"}
                  image={photo? photo.images.small.url : "/images/restaurant.png"}
                  alt={name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {name}
                  </Typography>
                  <Box sx={{display: "flex", justifyContent: "space-between", flexDirection: "column"}}>
                    <Typography variant="body2" color="text.secondary">
                      Address: {" "} {address}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Phone: {" "} {phone}
                    </Typography>

                    {subcategory && subcategory.length && <Typography variant="body2" color="text.secondary">
                      Category: {" "} {subcategory?.map((c: any) => c.name).join(", ")}
                    </Typography>}

                    <Typography variant="body2" color="text.secondary">
                      Distance: {" "} {distance_string}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      Rating: {" "} {rating? <Rating name="read-only" value={Number(rating)} readOnly /> : "No Rating"}
                    </Typography>

                    {website && <Typography variant="body2" color="text.secondary">
                      Website: {" "} {website}
                    </Typography>}
                    
                  </Box>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <IconButton 
                  aria-label="add"
                  onClick={handleSelectPlace(location_id)}
                  color='primary'
                  size="large"
                  >              
                  {/* <Fab size="small" color="primary" aria-label="add"> */}
                    <AddCircleIcon  fontSize='large'/>
                  {/* </Fab> */}
                </IconButton>
              </CardActions>
            </Card>
          )})}
      </div>


    </Box>
  )
}

export default Places;