import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Activities from '../../components/Activities/Activities';

describe('ActivitiesComponent', () => {
  const handleNewActivity = jest.fn();
  const activityOnLoad = jest.fn();
  const onActivityPlaceChanged = jest.fn();
  const setNewActivity = jest.fn();
  const Autocomplete = jest.fn();

  
  
  it('Should render search box', () => {
    let newActivity = null;
    render(
      <BrowserRouter>       
          <Activities
           handleNewActivity={handleNewActivity} 
           onLoad={activityOnLoad}
           onPlaceChanged={onActivityPlaceChanged}
           newActivity={newActivity}
           setNewActivity={setNewActivity}
           Autocomplete={Autocomplete}
           placeholder='Search local activities' 
          />
      </BrowserRouter>

    );
      const searchBox = screen.getByTestId('SearchIcon');
      expect(searchBox).toBeInTheDocument();
      
  })

  it('Should render Activity Details', () => {
    const newActivity = {
        name: 'Zoo toronto',
        location_id: '1234',
        address: '1234 Toronto',
        phone: '0802354234',
        photo: {images:{medium: {url: 'https://www.google.com/'}}},
        latitude: 43.6532,
        longitude:  -79.3832,
        rating: '4', 
      }
    render(
      <BrowserRouter>       
          <Activities
           handleNewActivity={handleNewActivity} 
           onLoad={activityOnLoad}
           onPlaceChanged={onActivityPlaceChanged}
           newActivity={newActivity}
           setNewActivity={setNewActivity}
           Autocomplete={Autocomplete}
           placeholder='Search local activities' 
          />
      </BrowserRouter>

    );
      const activityName = screen.getAllByText('Zoo toronto');
      const activityAddress = screen.getAllByText('1234 Toronto');
      const activityPhone = screen.getByText('0802354234');
      const activityPhoto = screen.getByAltText('Zoo toronto');
  

      expect(activityName[0]).toBeInTheDocument(); 
      expect(activityAddress[0]).toBeInTheDocument();  
      expect(activityPhone).toBeInTheDocument(); 
      expect(activityPhoto).toBeInTheDocument(); 
      
  })

  it('Should render Add button', () => {
    const newActivity = {
        name: 'Zoo toronto',
        location_id: '1234',
        address: '1234 Toronto',
        phone: '0802354234',
        photo: {images:{medium: {url: 'https://www.google.com/'}}},
        latitude: 43.6532,
        longitude:  -79.3832,
        rating: '4', 
      }
    render(
      <BrowserRouter>       
          <Activities
           handleNewActivity={handleNewActivity} 
           onLoad={activityOnLoad}
           onPlaceChanged={onActivityPlaceChanged}
           newActivity={newActivity}
           setNewActivity={setNewActivity}
           Autocomplete={Autocomplete}
           placeholder='Search local activities' 
          />
      </BrowserRouter>

    );
      const addButton = screen.getAllByTestId('AddIcon');
      expect(addButton[0]).toBeInTheDocument();

      const addBtn = screen.getByTestId('add-activity');
      expect(addBtn.innerHTML).toContain('ADD TO LIST');

      fireEvent.click(addBtn);
      expect(handleNewActivity).toHaveBeenCalled();
  })

  it('Should render Remove button', () => {
    const newActivity = {
        name: 'Zoo toronto',
        location_id: '1234',
        address: '1234 Toronto',
        phone: '0802354234',
        photo: {images:{medium: {url: 'https://www.google.com/'}}},
        latitude: 43.6532,
        longitude:  -79.3832,
        rating: '4', 
      }
    render(
      <BrowserRouter>       
          <Activities
           handleNewActivity={handleNewActivity} 
           onLoad={activityOnLoad}
           onPlaceChanged={onActivityPlaceChanged}
           newActivity={newActivity}
           setNewActivity={setNewActivity}
           Autocomplete={Autocomplete}
           placeholder='Search local activities' 
          />
      </BrowserRouter>

    );
      const removeButton = screen.getAllByTestId('RemoveIcon');
      expect(removeButton[0]).toBeInTheDocument();

      const removeBtn = screen.getByTestId('remove-activity');
      expect(removeBtn.innerHTML).toContain('CANCEL')

      fireEvent.click(removeBtn);
      expect(setNewActivity).toHaveBeenCalled();

    })
})