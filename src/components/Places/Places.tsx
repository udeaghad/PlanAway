import React, {useState, useRef, useEffect} from 'react';

import { 
  Box, 
  Typography, 
  InputLabel, 
  // Select, 
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
import Select, { SelectChangeEvent } from '@mui/material/Select';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddIcon from '@mui/icons-material/Add';
import { StyledAddButton} from './Style';
interface IPlaces {
  restaurants: null | {
    name: string;  
    location_id: string; 
    address: string; 
    distance_string?: string;
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
    distance_string?: string;
    phone: string;
    website?: string;
    rating?: string;
    photo?: string;
    subcategory?: {key: string; name: string}[];

  }[];
  handleSelectPlace: (id: string) => (event: React.MouseEvent<HTMLButtonElement>) => void;  
  alignment: string[];
  handleToggle: (event: React.MouseEvent<HTMLElement>, newAlignment: string[]) => void;
  restaurantRef: React.MutableRefObject<HTMLDivElement | null>;
  attractionRef: React.MutableRefObject<HTMLDivElement | null>;
  showAttractions: () => void;
  showRestaurants: () => void; 
  filter: string; 
  handleFilter: (event: SelectChangeEvent) => void;
  
}

const Places = ({restaurants, attractions, handleSelectPlace, alignment, handleToggle, restaurantRef, attractionRef, showAttractions,showRestaurants,handleFilter,filter}: IPlaces) => {
  
  // const [alignment, setAlignment] = useState(() => ['restaurants']);
  // const [filter, setFilter] = useState<string>('')

  // const [filteredRestaurant, setFilteredRestaurant] = useState<any>([])
  // const [filteredAttraction, setFilteredAttraction] = useState<any>([])

  // useEffect(() => {
  //   if (!restaurants || !attractions) return
  //   if (!filter) {
  //     setFilteredRestaurant(restaurants)
  //     setFilteredAttraction(attractions)
  //     return
  //   }
  //   const restaurantsFiltered = restaurants?.filter((restaurant: any) => Number(restaurant.rating) > Number(filter))
  //   const attractionsFiltered = attractions?.filter((attraction: any) => Number(attraction.rating) > Number(filter))

  //   setFilteredRestaurant(restaurantsFiltered)
  //   setFilteredAttraction(attractionsFiltered)    
  // }, [filter, restaurants, attractions])
  

  // const handleToggle = (event: React.MouseEvent<HTMLElement>,  newAlignment: string[] ) => {
  //   if (newAlignment?.length) {
  //     setAlignment(newAlignment);
  //   }
  // };

  // const attractionRef = useRef<HTMLDivElement>(null);
  // const restaurantRef = useRef<HTMLDivElement>(null);

  // const showAttractions = () => {
  //   if (attractionRef.current && restaurantRef.current) {
  //     attractionRef.current.style.display = "block";
  //     restaurantRef.current.style.display = "none";
  //   }
  // }

  // const showRestaurants = () => {
  //   if (attractionRef.current && restaurantRef.current) {
  //     attractionRef.current.style.display = "none";
  //     restaurantRef.current.style.display = "block";
  //   }
  // }

  // const handleFilter = (event: SelectChangeEvent) => {
  //  setFilter(event.target.value);
  // };

  return (
    <Box p={5} >
      <Typography variant="h6" gutterBottom textAlign="start" >
        Suggested Results in this Area
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
              label="Filter"
              value={filter}
              onChange={handleFilter}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value={2}>Rating Above 2.0</MenuItem>
              <MenuItem value={3}>Rating Above 3.0</MenuItem>
              <MenuItem value={4}>Rating Above 4.0</MenuItem>
            </Select>
          </FormControl>

          {/* <FormControl  sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="filter">Filter</InputLabel>
            <Select
              labelId="filter"
              id="filter-attractions"
              label="Filter"
              value={attractionFilter}
              onChange={handleFilter}
            >
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={3}>Rating Above 3.0</MenuItem>
              <MenuItem value={4}>Rating Above 4.0</MenuItem>
              <MenuItem value={4.5}>Rating Above 5.0</MenuItem>
            </Select>
          </FormControl> */}
        </Box>
      </Stack>

      <div style={{ height: "75vh", overflow: "auto", display: 'block' }} ref={restaurantRef}>

          { restaurants?.map((place: any) => {
            const { name,  location_id, address, distance_string, phone, website, rating, cuisine, photo} = place
            return (
          
              <Card elevation={3} key={location_id}  sx={{ maxWidth: 345, mt: "0.8rem" }}>
                <Typography gutterBottom variant="h6" component="div" textAlign="center" m="1rem">
                  {name}
                </Typography>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="150"
                  image={photo? photo.images.small.url : "/images/restaurant.png"}
                  alt={name}
                />
                <CardContent>
                  <Box sx={{display: "flex", justifyContent: "space-between", flexDirection: "column"}}>
                    <Typography variant="body2">
                      <span style={{fontWeight: "bold"}}>Address:</span> {" "} {address}
                    </Typography>

                    {phone && 
                      <Typography variant="body2">
                        <span style={{fontWeight: "bold"}}>Phone:</span> {" "} {phone}
                      </Typography>
                    }

                    {cuisine && cuisine.length > 0 && <Typography variant="body2">
                      <span style={{fontWeight: "bold"}}>Cuisine:</span> {" "} {cuisine?.map((c: any) => c.name).join(", ")}
                    </Typography>}

                    {/* <Typography variant="body2" color="text.secondary">
                      Distance: {" "} {distance_string}
                    </Typography> */}

                    {/* { rating && <Typography variant="body2" color="text.secondary">
                      Rating: {" "} {rating? <Rating name="read-only" value={Number(rating)} readOnly /> : "No Rating"}
                    </Typography>
                    } */}

                    {website && <Typography variant="body2">
                      <span style={{fontWeight: "bold"}}>Website:</span> {" "} {website}
                    </Typography>}
                    
                  </Box>
                </CardContent>
              </CardActionArea>
              <CardActions sx={{display: "flex", justifyContent: "space-around", alignItems: "center"}}>
                
                <Rating name="read-only" value={Number(rating)} readOnly />

                <Box sx={{display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "1.5rem"}}>
                  <StyledAddButton 
                      aria-label="add"
                      onClick={handleSelectPlace(location_id)}
                      >
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem", paddingLeft:'0.25rem', paddingRight:'0.25rem'}}>
                          <AddIcon fontSize="small" />
                          <Typography variant='button' color="#000000" fontSize={12}>
                          ADD TO LIST
                          </Typography>
                        </div>    
                    </StyledAddButton>
                </Box>
              </CardActions>
            </Card>
          )})}
      </div>

      <div style={{ height: "75vh", overflow: "auto", display: "none" }} ref={attractionRef}>
        
          { attractions?.map((place: any) => {
            const { name,  location_id, address, distance_string, phone, website, rating, subcategory, photo} = place
            return (
          
              <Card elevation={3} key={location_id}  sx={{ maxWidth: 345, mt: "0.8rem" }}>
                <Typography gutterBottom variant="h6" component="div" textAlign="center" m="1rem">
                  {name}
                </Typography>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="150"
                  image={photo? photo.images.small.url : "/images/restaurant.png"}
                  alt={name}
                />
                <CardContent>
                  <Box sx={{display: "flex", justifyContent: "space-between", flexDirection: "column"}}>
                    <Typography variant="body2">
                      <span style={{fontWeight: "bold"}}>Address:</span> {" "} {address}
                    </Typography>

                    {phone && 
                      <Typography variant="body2">
                        <span style={{fontWeight: "bold"}}>Phone:</span> {" "} {phone}
                      </Typography>
                    }

                    {subcategory && subcategory.length && 
                      <Typography variant="body2">
                        <span style={{fontWeight: "bold"}}>Category:</span> {" "} {subcategory?.map((c: any) => c.name).join(", ")}
                      </Typography>
                    }

                    {/* <Typography variant="body2" color="text.secondary">
                      Distance: {" "} {distance_string}
                    </Typography> */}

                    {/* <Typography variant="body2" color="text.secondary">
                      Rating: {" "} {rating? <Rating name="read-only" value={Number(rating)} readOnly /> : "No Rating"}
                    </Typography> */}

                    {website && 
                      <Typography variant="body2">
                        <span style={{fontWeight: "bold"}}>Website:</span> {" "} {website}
                      </Typography>
                    }
                    
                  </Box>
                </CardContent>
              </CardActionArea>
              <CardActions sx={{display: "flex", justifyContent: "space-around", alignItems: "center"}}>

                <Rating name="read-only" value={Number(rating)} readOnly />

                <Box sx={{display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "1.5rem"}}>
                  <StyledAddButton 
                    aria-label="add"
                    onClick={handleSelectPlace(location_id)}
                    >
                      <div style={{display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem", paddingLeft:'0.25rem', paddingRight:'0.25rem'}}>
                        <AddIcon fontSize="small" />
                        <Typography variant='button' color="#000000" fontSize={12}>
                        ADD TO LIST
                        </Typography>
                      </div>    
                  </StyledAddButton>
                </Box>
              </CardActions>
            </Card>
          )})}
      </div>


    </Box>
  )
}

export default Places;