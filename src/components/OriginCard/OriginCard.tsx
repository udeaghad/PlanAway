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
          <Box 
            sx={{
              display: 'flex', 
              flexDirection: "column", 
              justifyContent: "space-between", 
              alignItems: "flex-start", 
              margin:"0"
            }}
          >
            
            <div>
              
              <StyledLocationNameText 
<<<<<<< HEAD
                gutterBottom
                variant="h6"  
=======
                gutterBottom  
>>>>>>> 450b6784d949c9a77b90dfe073e2a7bb861fd20f
                ml={2} 
              >
                {details.name}
              </StyledLocationNameText>
            </div>

            <div style={{display: "flex", gap: "0.25rem"}}>
<<<<<<< HEAD
              <StyledLocationAddressText  gutterBottom ml={2} variant='body2'>
=======
              <StyledLocationAddressText  gutterBottom ml={2}>
>>>>>>> 450b6784d949c9a77b90dfe073e2a7bb861fd20f
                {details.address}
              </StyledLocationAddressText >

              <EditOutlinedIcon sx={{fontSize: "1rem"}}/>
            </div>

            <div style={{display: "flex", gap: "0.25rem"}}>
<<<<<<< HEAD
              <StyledLocationAddressText gutterBottom ml={2} variant='body2'>
=======
              <StyledLocationAddressText gutterBottom ml={2}>
>>>>>>> 450b6784d949c9a77b90dfe073e2a7bb861fd20f
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