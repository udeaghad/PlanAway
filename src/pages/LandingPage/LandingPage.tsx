import LandingSection from '../../components/LandingSection/LandingSection';
import { StyledContainer, StyledProgressBar } from './style'; 
import LocationMainBar from '../../components/LocationBar/LocationMainBar';



const LandingPage = () => {
  

  return (
    <>
      <div>
        <LocationMainBar />
      </div>

      <StyledContainer>
        <StyledProgressBar>
          <img src="/images/Progress-0.png" alt="loading-bar" />
        </StyledProgressBar>
          
        <div> 
          <LandingSection />
          
        </div>

      
      </StyledContainer>
    </>
  )
}

export default LandingPage