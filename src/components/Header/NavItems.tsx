import React from 'react';
import { Box, Button, Typography } from '@mui/material';

interface INavItemsProps {
  handleSignUp: () => void;
  handleLogin: () => void;
  user: {
    data: {
      email: string; 
    }     
  };
  trips: {
    data: any[];
  };
  handleGoToTrip: () => void;
  handleSignOut: () => void;
}

const NavItems = ({handleSignUp, handleLogin, user, trips, handleGoToTrip, handleSignOut}:INavItemsProps ) => {
  return (
    <>
      { !user ?
        <Box>

          <Button
            variant="text"
            sx={{ color: 'black', mr: "5rem" }}
            onClick={ handleSignUp }
          >
            <Typography variant="h6">Sign Up</Typography>
          </Button>

          <Button
            variant="text"
            sx={{ color: 'black', mr: "10rem"}}
            onClick={ handleLogin }
          >
            <Typography variant="h6" component="div">Login</Typography>
          </Button>
        </Box>
        :
        <Box sx={{display: "flex",justifyCenter: "center", alignItems: "center", gap: "2rem"}}>
          <Box> 
            <Typography variant="subtitle1" component="span">Hi {user.data.email}!</Typography>
          </Box> 

          { trips.data.length > 0 && 
            <Button
            variant="text"
            sx={{ color: 'black', mr: "1rem"}}
            onClick={ handleGoToTrip }
            >
              <Typography variant="h6" component="div" >My Trips</Typography>
            </Button>

          }

          <Button
            variant="text"
            // to="/Login"
            sx={{ color: 'black', mr: "2rem"}}
            onClick={ handleSignOut }
          >
            <Typography variant="h6" component="div" >Sign Out</Typography>
          </Button>
        </Box>
      }
  
    </>
  )
}

export default NavItems