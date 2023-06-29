import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import AddMoreActivities from '../../components/AddMoreActivities/AddMoreActivitiesCard';

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

describe('AddMoreActivitiesComponent', () => { 
  const activityOnLoad = jest.fn();
  const onActivityPlaceChanged = jest.fn();
  const setNewActivity = jest.fn();
  const Autocomplete = jest.fn();

  
  
  it('Should render Add More Activities', () => {
    let newActivity = null;
    render(
      <BrowserRouter>       
        <AddMoreActivities
          onLoad={activityOnLoad}
          onPlaceChanged={onActivityPlaceChanged}
          newActivity={newActivity}
          setNewActivity={setNewActivity}
          Autocomplete={Autocomplete} 
        />
      </BrowserRouter>

    );
      const text = screen.getByText('Add More Activities');
      expect(text).toBeInTheDocument();   
  })

  it('Should render search box', () => {
    let newActivity = null;
    render(
      <BrowserRouter>       
        <AddMoreActivities
          onLoad={activityOnLoad}
          onPlaceChanged={onActivityPlaceChanged}
          newActivity={newActivity}
          setNewActivity={setNewActivity}
          Autocomplete={Autocomplete} 
        />
      </BrowserRouter>

    );
      const searchBox = screen.getByTestId('SearchIcon');
      expect(searchBox).toBeInTheDocument();  
  })

  it('Should render Activity Details', () => {
    let newActivity = {
      id: '1234abc',
      items: [{ 
        name: 'Zoo toronto',
        location_id: '1234',
        address: '1234 Toronto',
        phone: '0802354234',
        photo: {images:{medium: {url: 'https://www.google.com/'}}},
        latitude: 43.6532,
        longitude:  -79.3832,
        rating: '4', 
        order: 0,
      }]
    }
    render(
      <BrowserRouter>       
          <AddMoreActivities
           onLoad={activityOnLoad}
           onPlaceChanged={onActivityPlaceChanged}
           newActivity={newActivity}
           setNewActivity={setNewActivity}
           Autocomplete={Autocomplete}
          />
      </BrowserRouter>

    );
      const activityName = screen.getAllByText('Zoo toronto');
      const activityAddress = screen.getAllByText('1234 Toronto');
      const actionText = screen.getByText('Drag and drop me to any day');
      

      expect(activityName[0]).toBeInTheDocument(); 
      expect(activityAddress[0]).toBeInTheDocument(); 
      expect(actionText).toBeInTheDocument(); 
      
    })
})