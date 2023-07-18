import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import PlacesForVisit from '../../components/PlacesForVisit/PlacesForVisit';

jest.mock('react-beautiful-dnd', () => ({
  Droppable: ({ children }: any) =>
    children(
      {
        draggableProps: {
          style: {},
        },
        innerRef: jest.fn(),
      },
      {}
    ),
  Draggable: ({ children }: any) =>
    children(
      {
        draggableProps: {
          style: {},
        },
        innerRef: jest.fn(),
      },
      {}
    ),
}));


describe('PlacesForVisit Component', () => {
  const id = '123';
  const items = [
    {
      name: 'XYZ Restaurant',
      location_id: '1234',
      address: '1234 Toronto',
      distance_string: '1.2 km',
      phone: '1234567890',
      website: 'https://www.xyz.com',
      rating: '4.5',
      cuisine:[{ name: 'Chinese'}, {name: 'Indian'}],
      photo: {images: { medium: {url: 'https://unsplash.com/photos/7GX5a4bDGwQ'}}},
      subcategory: [{name: 'Restaurant'}],
      latitude: '43.1234',
      longitude: '-79.1234',
    },
  ];
  const handleRemovePlace = jest.fn();

  it('Should render place name', () => {
    render(
      <BrowserRouter>
        <PlacesForVisit
          items={items}
          id={id}
          handleRemovePlace={handleRemovePlace}
        />
      </BrowserRouter>
    );

    const placeName = screen.getByText('XYZ Restaurant');
    expect(placeName).toBeInTheDocument();
  });

  it('Should render place address', () => {
    render(
      <BrowserRouter>
        <PlacesForVisit
          items={items}
          id={id}
          handleRemovePlace={handleRemovePlace}
        />
      </BrowserRouter>
    );

    const placeAddress = screen.getByText('1234 Toronto');
    expect(placeAddress).toBeInTheDocument();
  });

  it('Should render remove button', () => {
    render(
      <BrowserRouter>
        <PlacesForVisit
          items={items}
          id={id}
          handleRemovePlace={handleRemovePlace}
        />
      </BrowserRouter>
    );

    const removeButton = screen.getByRole('button', { name: 'remove' });
    expect(removeButton).toBeInTheDocument();

    fireEvent.click(removeButton);
    expect(handleRemovePlace).toHaveBeenCalled();
  })
});