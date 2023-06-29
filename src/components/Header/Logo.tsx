import React from 'react'
import { Box } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { StyledImg } from './Style'

const Logo = () => {
  return (
    <Box sx={{display: "flex", justifyContent:"flex-start", alignItems: "center", ml: "5%"}}>
      <NavLink
        to="/"
        style={{ textDecoration: 'none' }}
      >
        <StyledImg src='images/planaway-logo.png' alt='logo' /> 
      </NavLink>
    </Box> 
  )
}

export default Logo