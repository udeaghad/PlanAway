import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import DisplaySelectedSavedTrip from '../../components/DisplaySelectedSavedTrip/DisplaySelectedSavedTrip';

describe('DisplaySelectedSavedTripComponent', () => {
  const TripToOpen = {
    id: '1234abcd',
    createdAt: '2021-10-06T17:05:57.000Z',
    origin: {
      details: {
        name: 'Toronto',
        address: 'Toronto, ON, Canada',
        lat: '43.6532',
        lng: '-79.3832',
      },
      startDate: '2021-10-06',
      endDate: '2021-10-10',
      numberOfDays: 2,
    },
    places: [
      {
        id: '567abcd',
        items: [
          {
            name: 'CN Tower',
            location_id: '1234',
            address: '1234 Toronto',
          }
        ]
      },
      {
        id: '8910abcd',
        items: [
          {
            name: 'Rogers Centre',
            location_id: '4567',
            address: '1234 venue street',
          }
        ]
      }
    ]
  }

  const handleShowMap = jest.fn();

  it('Should render Days', () => {
    render(
      <BrowserRouter>       
          <DisplaySelectedSavedTrip
            tripToOpen={TripToOpen}
            handleShowMap={handleShowMap}
          />
      </BrowserRouter>

    );
      const day1 = screen.getByText('Day 1');
      const day2 = screen.getByText('Day 2');
      expect(day1).toBeInTheDocument();
      expect(day2).toBeInTheDocument();
      
  })

  it('Should render Places', () => {
    render(
      <BrowserRouter>       
          <DisplaySelectedSavedTrip
            tripToOpen={TripToOpen}
            handleShowMap={handleShowMap}
          />
      </BrowserRouter>

    );
      const place1 = screen.getByText('CN Tower');
      const place2 = screen.getByText('Rogers Centre');
      const address1 = screen.getByText('1234 Toronto');
      const address2 = screen.getByText('1234 venue street');
      expect(place1).toBeInTheDocument();
      expect(place2).toBeInTheDocument();
      expect(address1).toBeInTheDocument();
      expect(address2).toBeInTheDocument();
      
  })

  it('Should render Show Map Button', () => {
    render(
      <BrowserRouter>       
          <DisplaySelectedSavedTrip
            tripToOpen={TripToOpen}
            handleShowMap={handleShowMap}
          />
      </BrowserRouter>

    );
      const showMapButton = screen.getAllByText('View on Map');
      expect(showMapButton).toHaveLength(4);     
      
  })

  it('Should render href for Show Map Button', () => {
    render(
      <BrowserRouter>       
          <DisplaySelectedSavedTrip
            tripToOpen={TripToOpen}
            handleShowMap={handleShowMap}
          />
      </BrowserRouter>

    );
      const showMapButton = screen.getAllByText('View on Map');
      expect(showMapButton[0]).toHaveAttribute('href', '#goToMap');
      expect(showMapButton[1]).toHaveAttribute('href', '#map');
      
  })

  it('Should render Top Button', () => {
    render(
      <BrowserRouter>       
          <DisplaySelectedSavedTrip
            tripToOpen={TripToOpen}
            handleShowMap={handleShowMap}
          />
      </BrowserRouter>

    );
      const topButton = screen.getAllByText('TOP');
      const topButtonIcon = screen.getAllByTestId('UpgradeIcon');
      expect(topButton[0]).toBeInTheDocument();
      expect(topButtonIcon[0]).toBeInTheDocument();  
      
  })


})