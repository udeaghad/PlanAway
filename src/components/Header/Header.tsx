import React, {useState} from 'react';
import { useNavigate} from 'react-router-dom';
import { AppBar, Box, Toolbar } from '@mui/material';

import { MenuContainer, OtherDeviceMenu } from './Style';
import { useAppSelector, useAppDispatch } from '../../hooks/storeHooks';
import { signUpActions } from '../../features/auths/signUp/signUpSlice';
import { loginActions } from '../../features/auths/Login/loginSlice';
import { userActions } from '../../features/auths/user/userSlice';
import { msgAction } from '../../features/msgHandler/msgHandler';
import Logo from './Logo';
import NavItems from './NavItems';
import Hamburger from './Hamburger';

const Header = () => {
  const dispatch = useAppDispatch()
  const { user: {user}, trips } = useAppSelector((state) => state)
  
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  }
  const handleSignUp = () => {
    navigate("/SignUp")
    setAnchorEl(null);
  };
  const handleLogin = () => {
    navigate("/Login")
    setAnchorEl(null);
  };
  const handleSignOut = () => {
    dispatch(signUpActions.resetSignUp())
    dispatch(loginActions.resetLogin())
    dispatch(userActions.removeUser())
    dispatch(msgAction.getSuccessMsg("User Signed Out Successfully!"))
  }

  const handleGoToTrip = () => {
    navigate("/MyTrips")
  }

  
  return (
    <Box sx={{ width: "100%"}}>
      <AppBar position="sticky" color="inherit" sx={{ borderBottom: "3px solid gray", boxShadow: "none"}}>
        <Toolbar>
          <Box sx={{ flexGrow: 1, marginTop: "1%" }}>

            <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}} >

              <Logo />

              <MenuContainer>
                <Hamburger 
                  open={open}
                  handleClick={handleClick}
                  anchorEl={anchorEl}
                  handleClose={handleClose}
                  handleLogin={handleLogin}
                  handleSignUp={handleSignUp}
                  handleSignOut={handleSignOut}
                  user={user}
                  trips={trips}
                  handleGoToTrip={handleGoToTrip}
                  />                  
              </MenuContainer>
            

              <OtherDeviceMenu>                
                <NavItems
                  handleSignUp={handleSignUp}
                  handleLogin={handleLogin}
                  user={user}
                  trips={trips}
                  handleGoToTrip={handleGoToTrip}
                  handleSignOut={handleSignOut}
                />
              </OtherDeviceMenu>
              
            </Box> 
          
          </Box>
          
        </Toolbar>
      </AppBar>

    </Box>
  )
}

export default Header