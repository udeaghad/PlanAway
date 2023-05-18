import React from 'react';

import { 
  Box, 
  Typography, 
  Button, 
  ButtonGroup, 
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
  IconButton
} from '@mui/material';

import AddCircleIcon from '@mui/icons-material/AddCircle';

interface IPlaces {
  places: null | {
    name: string;  
    location_id: string; 
    address: string; 
    distance_string: string;
    phone: string;
    website: string;
    rating?: number;
    cuisine?: string;
    photo?: string;
  }[];
  handleSelectPlace: (id: string) => (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Places = ({places, handleSelectPlace}: IPlaces) => {
  

  return (
    <Box p={5} >
      <Typography variant="h4" gutterBottom textAlign="start" margin="1rem">
        Recommended For you
      </Typography>

      <Stack direction="row" spacing={2} sx={{display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
        <ButtonGroup 
          variant="contained" aria-label="Disabled button group">
          <Button
            sx={{ 
              borderTopLeftRadius: 25, 
              borderBottomLeftRadius: 25, 
              boxShadow: "#ccc 0px 0px 0px 0px", 
              textTransform: "none", 
              backgroundColor: "#b3b3b3", 
              color: "white", 
              borderColor: "gray",
              '&:hover': {
                backgroundColor: 'gray',
                borderColor: 'gray',
                boxShadow: 'none',
              },
            }}
          >
            Restaurants
          </Button>

          <Button
            sx={{ 
              borderTopRightRadius: 25,
              borderBottomRightRadius: 25,
              boxShadow: "#ccc 0px 0px 0px 0px",
              textTransform: "none",
              backgroundColor: "#b3b3b3",
              color: "white",
              bordeColor: "gray",
              '&:hover': {
                backgroundColor: 'gray',
                borderColor: 'gray',
                boxShadow: 'none',
              },
            }}
          >
            Attractions
          </Button>        
        </ButtonGroup>

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

      <div style={{ height: "75vh", overflow: "auto" }}>

          { places?.map((place: any) => {
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

export default Places