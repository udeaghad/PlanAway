import React, {useState} from 'react';
import { useNavigate} from 'react-router-dom';

import MobileMenu from './MobileMenu'
import { useAppSelector, useAppDispatch } from '../../hooks/storeHooks';
import { signUpActions } from '../../features/auths/signUp/signUpSlice';
import { loginActions } from '../../features/auths/Login/loginSlice';
import { userActions } from '../../features/auths/user/userSlice';
import { msgAction } from '../../features/msgHandler/msgHandler';

const Hamburger = () => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.user)
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
    <div>
      <MobileMenu
        open={open}
        handleClick={handleClick}
        anchorEl={anchorEl}
        handleClose={handleClose}
        handleLogin={handleLogin}
        handleSignUp={handleSignUp}
        handleSignOut={handleSignOut}
        user={user}
       />
    </div>
  )
}

export default Hamburger