import { AppBar, Box, Toolbar, Typography, Grid } from '@mui/material';
import {NavLink} from 'react-router-dom'

const Header = () => {
  return (
    <Box sx={{mb: "7rem"}}>
      <AppBar position="fixed" color="inherit" sx={{height:"7rem", borderBottom: "3px solid gray", boxShadow: "none"}}>
        <Toolbar>
          <Box sx={{ flexGrow: 1, marginTop: "1rem" }}>

            <Grid container spacing={2} sx={{display: "flex", justifyContent: "center", alignItems:"center"}}>

              <Grid item xs={6}> 
                <div>
                  <img src='images/planaway-logo.png' alt='logo' width='200px' />                  
                </div>               
              </Grid>

              <Grid item xs={6}>
                <Box sx={{display: "flex", justifyContent: "flex-end", alignItems:"center"}}>
                  <NavLink
                    to="#"
                    style={{ textDecoration: 'none', color: 'black' }}
                  >
                    <Typography variant="h5" component="div" mx={10}>Sign Up</Typography>
                  </NavLink>

                  <NavLink
                    to="/Login"
                    style={{ textDecoration: 'none', color: 'black' }}
                  >
                    <Typography variant="h5" component="div" mr={40}>Login</Typography>
                  </NavLink>
                </Box>
              </Grid>
            </Grid> 
          
          </Box>
          
        </Toolbar>
      </AppBar>

    </Box>
  )
}

export default Header