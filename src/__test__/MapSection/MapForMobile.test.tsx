import { render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import MapForMobile from '../../components/MapSection/MapForMobile';

describe('MapForMobile Component', () => {
  const Marker = jest.fn();
  const map = null;
  const GoogleMap = jest.fn();
  const DirectionsRenderer = jest.fn();
  const directions = jest.fn();
  const setMap= jest.fn();
  const origin = {
    details: {
      lat: '0.45',
      lng: '2.46',
      name: 'abc'
    }
  }



  it('Should render map', () => {
    render(
      <BrowserRouter>
        <MapForMobile 
          map={map}
          Marker={Marker}
          setMap={setMap}
          origin={origin}
          directions={directions}
          DirectionsRenderer={DirectionsRenderer}
          GoogleMap={GoogleMap}

        />
      </BrowserRouter>
    );
    const Map = screen.getByTestId('Map');
    expect(Map).toBeInTheDocument();
  })

})