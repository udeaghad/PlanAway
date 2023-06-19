import React, {useState,useEffect} from 'react';
import { useNavigate} from 'react-router-dom';
import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import {NavLink} from 'react-router-dom';
import { MenuContainer, Img, OtherDeviceMenu } from './Style';
import { useAppSelector, useAppDispatch } from '../../hooks/storeHooks';
import { signUpActions } from '../../features/auths/signUp/signUpSlice';
import { loginActions } from '../../features/auths/Login/loginSlice';
import { userActions } from '../../features/auths/user/userSlice';
import { msgAction } from '../../features/msgHandler/msgHandler';

import Hamburger from './Hamburger';

const Header = () => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.user)

  useEffect(() => {
    console.log(user)
  }, [user])
  
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

  
  return (
    <Box sx={{ width: "100%"}}>
      <AppBar position="sticky" color="inherit" sx={{ borderBottom: "3px solid gray", boxShadow: "none"}}>
        <Toolbar>
          <Box sx={{ flexGrow: 1, marginTop: "1%" }}>

            <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}} >


                <Box sx={{display: "flex", justifyContent:"flex-start", alignItems: "center", ml: "5%"}}>
                  <NavLink
                    to="/"
                    style={{ textDecoration: 'none' }}
                  >
                    <Img src='images/planaway-logo.png' alt='logo' /> 
                  </NavLink>
                </Box> 


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
                    />                  
                </MenuContainer>
              

              <OtherDeviceMenu>
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
                  <Box sx={{display: "flex",justifyCenter: "center", alignItems: "center", gap: "5rem"}}>
                    <Box> 
                      <Typography variant="subtitle1" component="span">Hi {user.data.email? user.data.email : user.data.user.email}!</Typography>
                    </Box> 

                    <Button
                      variant="text"
                      // to="/Login"
                      sx={{ color: 'black', mr: "5rem"}}
                      onClick={ handleSignOut }
                    >
                      <Typography variant="h6" component="div" >Sign Out</Typography>
                    </Button>
                  </Box>
                      
                }
                
              </OtherDeviceMenu>
              
            </Box> 
          
          </Box>
          
        </Toolbar>
      </AppBar>

    </Box>
  )
}

export default Header