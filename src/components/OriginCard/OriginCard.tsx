import { 
  Box, 
  Typography,
} from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

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
              
              <Typography 
                gutterBottom 
                variant="h6" 
                component="div" ml={2} 
                
              >
                {details.name}
              </Typography>
            </div>

            <div style={{display: "flex", gap: "0.25rem"}}>
              <Typography gutterBottom variant="subtitle1" component="div" ml={2}>
                {details.address}
              </Typography>

              <EditOutlinedIcon />
            </div>

            <div style={{display: "flex", gap: "0.25rem"}}>
              <Typography gutterBottom variant="subtitle1" component="div" textAlign="center" ml={2}>
                {startDate} {" "} to {" "} {endDate}
              </Typography>

              <EditOutlinedIcon />
            </div>
          </Box>
            
        </Box>
      
      }
    </div>
  )
}

export default OriginCard