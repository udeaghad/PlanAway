import React from 'react';
// import { useNavigate} from 'react-router-dom';
import { Menu, MenuItem, IconButton} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {Box, Typography, Avatar } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


// import MobileMenu from './MobileMenu'
// import { useAppSelector, useAppDispatch } from '../../hooks/storeHooks';
// import { signUpActions } from '../../features/auths/signUp/signUpSlice';
// import { loginActions } from '../../features/auths/Login/loginSlice';
// import { userActions } from '../../features/auths/user/userSlice';
// import { msgAction } from '../../features/msgHandler/msgHandler';

interface HamburgerProps {
  open: boolean;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  anchorEl: null | HTMLElement;
  handleClose: () => void;
  handleLogin: () => void;
  handleSignUp: () => void;
  handleSignOut: () => void;
  user: any;
  trips: any; 
  handleGoToTrip: () => void;

}

const Hamburger = ({open, handleClick, anchorEl, handleClose, handleLogin, handleSignUp, user, handleSignOut, trips, handleGoToTrip}: HamburgerProps) => {
  
  return (
    <div>
      {/* <MobileMenu
        open={open}
        handleClick={handleClick}
        anchorEl={anchorEl}
        handleClose={handleClose}
        handleLogin={handleLogin}
        handleSignUp={handleSignUp}
        handleSignOut={handleSignOut}
        user={user}
       /> */}


      <IconButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        < MenuIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {!user ? <div>
          <MenuItem onClick={handleSignUp}>Sign Up</MenuItem>
          <MenuItem onClick={handleLogin}>Login</MenuItem>
        </div>
        :
        <div>  
          
          <Box sx={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "flex-end", m: "0.5rem"}}> 
            <Avatar>
              <AccountCircleIcon sx={{fontSize: "2rem", color: "#0095a8"}}/>
            </Avatar>                 
            <Typography variant="caption" component="span">{user.data.email}</Typography>
          </Box>  

            { trips.data.length > 0 && 
                <MenuItem
              onClick={ handleGoToTrip }
              >
                My Trips
              </MenuItem>
            
            }   
                
          <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
        </div>  
        }
        
      </Menu>

    </div>
    
  )
}

export default Hamburger