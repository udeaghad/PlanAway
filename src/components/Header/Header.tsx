import { AppBar, Box, Toolbar, Typography, Grid } from '@mui/material'

const Header = () => {
  return (
    <Box>
      <AppBar position="static" color="inherit">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>

            <Grid container spacing={2} sx={{display: "flex", justifyContent: "center", alignItems:"center"}}>
              <Grid item xs={2}>
                <Box sx={{p: 1, backgroundColor: "#b3b3b3", border: "1px #b3b3b3 solid", borderRadius: 2}}>
                  <Typography variant="h5" component="div" sx={{color: "white", textAlign: "center"}}>PlanAway</Typography>          
                </Box>         
              </Grid>

              <Grid item xs={10}>
                <Box sx={{display: "flex", justifyContent: "flex-end", alignItems:"center"}}>
                  <Typography variant="h6" component="div" mx={10}>Sign Up</Typography>
                  <Typography variant="h6" component="div" mr={40}>Login</Typography>
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