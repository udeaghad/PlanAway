import React from "react";
import {
  Breadcrumbs as NavBreadcrumbs
} from '@mui/material';
import { useLocation, NavLink } from "react-router-dom";
import { StyledBreadcrumb, StyledBreadcrumbsCont} from './Style'


const BreadCrumbs = () => {
  const location = useLocation();

   const { pathname } = location;
  const pathnames = pathname.split("/").filter(x => x)
  
  return (
    <>
      {pathnames && pathnames.length > 0 &&
      
        <StyledBreadcrumbsCont>
          <NavBreadcrumbs>
            
            <StyledBreadcrumb component={NavLink} to="/" label="Home" />

            { pathnames.map((path: string,index: number) => {
              const name = path.split('-').join(' ')
              const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
              const isLast = index === pathnames.length-1;
              return isLast ? (
                <StyledBreadcrumb key={index} label={name} />
              ) : (
                <StyledBreadcrumb key={index} component={NavLink} to={routeTo} label={name} />
              );
            })}       
          </NavBreadcrumbs>
        </StyledBreadcrumbsCont>
      }
    
    </>

    
  )
}

export default BreadCrumbs;