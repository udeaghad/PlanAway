import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import JumpButtonMobile from '../../components/JumpButton/JumpButtonMobile';

describe('JumbButtonMobileComponent', () => {
  const dailyGroups = [
    {
      id: '1',
      items: [{
        name: 'CN Tower',
        location_id: '1234',
        address: '1234 Toronto',
        phone: '123456789',
        photo: {
          images: {
            medium: {
              url: 'https://unsplash.com/photos/7GX5a4bDGwQ',
            }
          }
        },
        latitude: 43.6532,
        longitude: -79.3832,
        rating: '4',
        order: 1,
      }]
    },
    {
      id: '2',
      items: [{
        name: 'Rogers Centre',
        location_id: '5678',
        address: '5678 Toronto',
        phone: '3456789',
        photo: {
          images: {
            medium: {
              url: 'https://unsplash.com/photos/7GX5a4bDGwQ',
            }
          }
        },
        latitude: 43.6532,
        longitude: -79.3832,
        rating: '4',
        order: 2,
      }]
    }
  ];

    it('Should render Jump To', () => {
      render(
        <BrowserRouter>
          <JumpButtonMobile
            dailyGroups={dailyGroups}
          />
        </BrowserRouter>
      );
      const jumpTo = screen.getByText('Jump To');
      expect(jumpTo).toBeInTheDocument();
    });
  });