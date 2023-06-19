import React from 'react';
import { Menu, MenuItem, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';

interface MobileMenuProps {
  open: boolean;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  anchorEl: null | HTMLElement;
  handleClose: () => void;
  handleLogin: () => void;
  handleSignUp: () => void;
  handleSignOut: () => void;
  user: any;

}

const MobileMenu = ({open, handleClick, anchorEl, handleClose, handleLogin, handleSignUp, user, handleSignOut}: MobileMenuProps) => {
  return (
    <div>
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
        <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
      </div>  
      }
        
      </Menu>

    </div>
  )
}

export default MobileMenu