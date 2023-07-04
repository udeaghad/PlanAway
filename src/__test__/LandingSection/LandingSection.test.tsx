import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import LandingSection from '../../components/LandingSection/LandingSection';

describe('LandingSectionComponent', () => {
  it('Should render LandingSection', () => {
    render(
      <BrowserRouter>
        <LandingSection />
      </BrowserRouter>
    );
    const landingBackgroundImage = screen.getByRole('img')
    expect(landingBackgroundImage).toBeInTheDocument();
    expect(landingBackgroundImage).toHaveAttribute('src', '/images/planaway-logo2.png')
    expect(landingBackgroundImage).toHaveAttribute('alt', 'logo-2')
    
  });
})