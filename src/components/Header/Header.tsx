import React from 'react';
import { AppBar, Box, Toolbar, Typography, Stack } from '@mui/material';
import {NavLink} from 'react-router-dom';
import { MenuContainer, Img, OtherDeviceMenu } from './Style';

import Hamburger from './Hamburger';

const Header = () => {
  
  return (
    <Box sx={{ width: "100%"}}>
      <AppBar position="sticky" color="inherit" sx={{ borderBottom: "3px solid gray", boxShadow: "none"}}>
        <Toolbar>
          <Box sx={{ flexGrow: 1, marginTop: "1%" }}>

            <Stack flexDirection="row" justifyContent="space-between" alignItems="center">


                <Box sx={{display: "flex", justifyContent:"flex-start", alignItems: "center", ml: "5%"}}>
                  <NavLink
                    to="/"
                    style={{ textDecoration: 'none' }}
                  >
                    <Img src='images/planaway-logo.png' alt='logo' /> 
                  </NavLink>
                </Box> 
                
                <MenuContainer>
                  <Hamburger />                  
                </MenuContainer>
              

              <OtherDeviceMenu>
                <Box sx={{display:"flex", justifyContent:"flex-start", alignItems: "center", ml: "5%"}}>

                  <NavLink
                    to="/SignUp"
                    style={{ textDecoration: 'none', color: 'black' }}
                  >
                    <Typography variant="h5" component="div" mx={10} width="100%">Sign Up</Typography>
                  </NavLink>

                  <NavLink
                    to="/Login"
                    style={{ textDecoration: 'none', color: 'black' }}
                  >
                    <Typography variant="h5" component="div" mr={40}>Login</Typography>
                  </NavLink>
                </Box>
              </OtherDeviceMenu>
              
            </Stack> 
          
          </Box>
          
        </Toolbar>
      </AppBar>

    </Box>
  )
}

export default Header