import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import OriginCard from '../../components/OriginCard/OriginCard';

describe('OriginCard Component', () => {
  const origin = {
    startDate: '2021-08-01',
    endDate: '2021-08-02',
    details: {
      lat: '0.45',
      lng: '2.46',
      name: 'Toronto',
      photo: {images: { medium: {url: 'https://unsplash.com/photos/7GX5a4bDGwQ'}}},
      address: '1234 Toronto',
    },
    numberOfDays: 2,
  };

  it('Should render start and end date', () => {  
    render(
      <BrowserRouter>
        <OriginCard {...origin} />
      </BrowserRouter>
    );

    const endDate = screen.getByText('2021-08-01 to 2021-08-02');
    expect(endDate).toBeInTheDocument();    
  });

  it('Should render location name', () => {
    render(
      <BrowserRouter>
        <OriginCard {...origin} />
      </BrowserRouter>
    );

    const locationName = screen.getByText('Toronto');
    expect(locationName).toBeInTheDocument();    
  });

  it('Should render location address', () => {
    render(
      <BrowserRouter>
        <OriginCard {...origin} />
      </BrowserRouter>
    );

    const locationAddress = screen.getByText('1234 Toronto');
    expect(locationAddress).toBeInTheDocument();    
  })
})