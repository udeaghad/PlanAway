import React, {useState} from 'react';
import { useNavigate} from 'react-router-dom';

import MobileMenu from './MobileMenu'

const Hamburger = () => {
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

  return (
    <div>
      <MobileMenu
        open={open}
        handleClick={handleClick}
        anchorEl={anchorEl}
        handleClose={handleClose}
        handleLogin={handleLogin}
        handleSignUp={handleSignUp}
       />
    </div>
  )
}

export default Hamburger