import { 
  Box, 
} from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { StyledLocationNameText, StyledLocationAddressText } from './Style';

interface IOrigin {
    startDate: string;
    endDate: string;
    details: {
      lat: string;
      lng: string;
      name: string;
      photo: {images: { medium: {url: string}}};
      address: string;      
    }
    numberOfDays: number;
    
    
}

const OriginCard = ({startDate, endDate, details, numberOfDays}: IOrigin) => {
  return (
    <div>
      {origin && 
        
        <Box  sx={{ maxWidth: "100%", p: "0.5rem" }}>
          <Box sx={{display: 'flex', flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start", margin:"0"}}>
            
            <div>
              
              <StyledLocationNameText 
                gutterBottom  
                ml={2} 
              >
                {details.name}
              </StyledLocationNameText>
            </div>

            <div style={{display: "flex", gap: "0.25rem"}}>
              <StyledLocationAddressText  gutterBottom ml={2}>
                {details.address}
              </StyledLocationAddressText >

              <EditOutlinedIcon sx={{fontSize: "1rem"}}/>
            </div>

            <div style={{display: "flex", gap: "0.25rem"}}>
              <StyledLocationAddressText gutterBottom ml={2}>
                {startDate} {" "} to {" "} {endDate}
              </StyledLocationAddressText >

              <EditOutlinedIcon sx={{fontSize: "1rem"}} />
            </div>
          </Box>
            
        </Box>
      
      }
    </div>
  )
}

export default OriginCard