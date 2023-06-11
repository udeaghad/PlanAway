import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { motion } from 'framer-motion';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';



import { 
  Box, 
  Typography, 
  InputLabel, 
  FormControl, 
  MenuItem, 
  Stack, 
  CardActionArea, 
  CardActions,
  Rating,
  CardMedia,
  CardContent,
  Card,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
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
  restaurantCarousel: React.MutableRefObject<HTMLDivElement | null>;
  attractionCarousel: React.MutableRefObject<HTMLDivElement | null>;
  restaurantCarouselWidth: number;
  attractionCarouselWidth: number;
  // carousel: React.MutableRefObject<HTMLDivElement | null>;
  // carouselWidth: number;
  
}

const PlacesWithCarousel = ({restaurants, attractions, handleSelectPlace, alignment, handleToggle, restaurantRef, attractionRef, showAttractions,showRestaurants,handleFilter,  filter, restaurantCarousel, attractionCarousel, restaurantCarouselWidth, attractionCarouselWidth}: IPlaces) => {
  return (
    <Box >
        <Typography variant="h6" component="div" gutterBottom textAlign="start" ml={2} >
          Suggested Results in this Area
        </Typography>
      

      <Box sx={{display: "flex", justifyContent: "space-around", alignItems: "center", mx: "5%", flexWrap: "wrap", gap: "2rem"}}>

        <Box sx={{mr: "2rem"}}>

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
                borderBottomLeftRadius: 25,
                fontSize: "12px",
                padding: "5%"
              }}
              onClick={showRestaurants}
            >
              {/* <Typography variant="button" component="div" textAlign="center" > */}
                Restaurants
              {/* </Typography> */}
            </ToggleButton>

            <ToggleButton 
              value="attractions"
              sx={{ 
                borderTopRightRadius: 25,
                borderBottomRightRadius: 25,
                fontSize: "12px",
                padding: "5%"
              }}
              onClick={showAttractions}
            >
              Attractions
            </ToggleButton>
                
          </ToggleButtonGroup>
        </Box>
        


        <Box>

          <FormControl  sx={{ minWidth: 100, p: "1%" }} size="small">
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
        </Box>
      </Box>

      <div ref={restaurantRef} style={{display: "block", marginBottom:"5%"}}>
        <motion.div ref={restaurantCarousel} style={{cursor: "grab", overflow: "hidden"}}>
          <motion.div drag="x" dragConstraints={{ right: 0, left: -restaurantCarouselWidth }} style={{display: "flex", gap: "2%"}}>

            { restaurants?.map((place: any) => {
              const { name,  location_id, address, phone, website, rating, cuisine, photo, selected} = place
              return (
                <motion.div key={location_id} >
                    <Card elevation={3}  sx={{  width: 250, mx: "2%", my: "1rem", height: 400 }}> 
                      <Typography gutterBottom variant="subtitle1" component="div" textAlign="center" m="1rem">
                        {name}
                      </Typography>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="100"
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

                        </Box>
                      </CardContent>
                    </CardActionArea>
                    <CardActions sx={{display: "flex", justifyContent: "space-around", alignItems: "center"}}>
                      <Rating name="read-only" value={Number(rating)} readOnly size="small" />
                      <Box sx={{display: "flex", justifyContent: "baseline", alignItems: "center", gap: "1.5rem"}}>

                        {!selected?
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
                        :
                          <Box sx={{display: "flex", gap: "0.5rem", justifyContent: "baseline", alignItems: "center"}}>
                            <Typography variant="subtitle1" sx={{color: "green"}}>Added</Typography>
                            <CheckCircleIcon sx={{color: "green"}}/>

                          </Box>
                        }
                      </Box>
                    </CardActions>
                  </Card>
                  
            </motion.div>
            )})}
            
          </motion.div>
        </motion.div>

        
      </div>

      <div ref={attractionRef} style={{display:  "none"}}>
        <motion.div ref={attractionCarousel} style={{cursor: "grab", overflow: "hidden"}}>
          <motion.div drag="x" dragConstraints={{ right: 0, left: -attractionCarouselWidth }} style={{display: "flex", gap: "2%"}}>

          { attractions?.map((place: any) => {
            const { name,  location_id, address, phone, website, rating, subcategory, photo, selected} = place
            return (
              
              <motion.div key={location_id} >
                <Card elevation={3}  sx={{  width: 250, mx: "2%", my: "1rem", height: 400 }}> 
                <Typography gutterBottom variant="subtitle1" component="div" textAlign="center" m="1rem">
                    {name}
                  </Typography>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="100"
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
                      </Box>
                    </CardContent>
                  </CardActionArea>
                    <CardActions sx={{display: "flex", justifyContent: "space-around", alignItems: "center"}}>

                      <Rating name="read-only" value={Number(rating)} readOnly size="small" />

                      <Box sx={{display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "1.5rem"}}>
                        {!selected?
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
                          :
                            <Box sx={{display: "flex", gap: "0.5rem", justifyContent: "baseline", alignItems: "center"}}>
                              <Typography variant="subtitle1" sx={{color: "green"}}>Added</Typography>
                              <CheckCircleIcon sx={{color: "green"}}/>

                            </Box>
                        }
                      </Box>
                    </CardActions>
                </Card>
              </motion.div>
          
          )})}
          </motion.div>
        </motion.div>
      </div>
    </Box>
  )
}

export default PlacesWithCarousel