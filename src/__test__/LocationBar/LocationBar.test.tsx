import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import LocationBar from '../../components/LocationBar/LocationBar';


describe('LocationBarComponent', () => {
  const onLoad = jest.fn();
  const onPlaceChanged = jest.fn();
  const Autocomplete = jest.fn();
  const handleDateOnChange = jest.fn();
  const handleDateSubmit = jest.fn();
  const date = {
    startDate: '2021-08-01',
    endDate: '2021-08-02',
    numberOfDays: 2,
  }

  it('Should render Search Icon', () => {
    render(
      <BrowserRouter>
        <LocationBar 
          onLoad={onLoad}
          onPlaceChanged={onPlaceChanged}
          Autocomplete={Autocomplete}
          handleDateOnChange={handleDateOnChange}
          handleDateSubmit={handleDateSubmit}
          date={date}   
        />
      </BrowserRouter>
    );
    const SearchIcon = screen.getByTestId('SearchIcon');
    expect(SearchIcon).toBeInTheDocument();
  });

  it('Should render Search  text', () => {
    render(
      <BrowserRouter>
        <LocationBar 
          onLoad={onLoad}
          onPlaceChanged={onPlaceChanged}
          Autocomplete={Autocomplete}
          handleDateOnChange={handleDateOnChange}
          handleDateSubmit={handleDateSubmit}
          date={date}   
        />
      </BrowserRouter>
    );
    const SearchText = screen.getByText('Where are you staying??');
    expect(SearchText).toBeInTheDocument();
  });

  it('Should render \"How long are you staying?\"', () => {
    render(
      <BrowserRouter>
        <LocationBar 
          onLoad={onLoad}
          onPlaceChanged={onPlaceChanged}
          Autocomplete={Autocomplete}
          handleDateOnChange={handleDateOnChange}
          handleDateSubmit={handleDateSubmit}
          date={date}   
        />
      </BrowserRouter>
    );
    const HowLongText = screen.getByText('How long are you staying?');
    expect(HowLongText).toBeInTheDocument();
  });

  it('Should render Date text', () => {
    render(
      <BrowserRouter>
        <LocationBar 
          onLoad={onLoad}
          onPlaceChanged={onPlaceChanged}
          Autocomplete={Autocomplete}
          handleDateOnChange={handleDateOnChange}
          handleDateSubmit={handleDateSubmit}
          date={date}   
        />
      </BrowserRouter>
    );
    const DateText = screen.getAllByLabelText('Date');
    expect(DateText).toHaveLength(2);
  })

  it('Should render start date', () => {
    render(
      <BrowserRouter>
        <LocationBar 
          onLoad={onLoad}
          onPlaceChanged={onPlaceChanged}
          Autocomplete={Autocomplete}
          handleDateOnChange={handleDateOnChange}
          handleDateSubmit={handleDateSubmit}
          date={date}   
        />
      </BrowserRouter>
    );
    const startDate = screen.getByDisplayValue('2021-08-01');
    expect(startDate).toBeInTheDocument();
  });

  it('Should render end date', () => {
    render(
      <BrowserRouter>
        <LocationBar 
          onLoad={onLoad}
          onPlaceChanged={onPlaceChanged}
          Autocomplete={Autocomplete}
          handleDateOnChange={handleDateOnChange}
          handleDateSubmit={handleDateSubmit}
          date={date}   
        />
      </BrowserRouter>
    );
    const endDate = screen.getByDisplayValue('2021-08-02');
    expect(endDate).toBeInTheDocument();
  });

  it('Should render Add Activities Button', () => {
    render(
      <BrowserRouter>
        <LocationBar 
          onLoad={onLoad}
          onPlaceChanged={onPlaceChanged}
          Autocomplete={Autocomplete}
          handleDateOnChange={handleDateOnChange}
          handleDateSubmit={handleDateSubmit}
          date={date}   
        />
      </BrowserRouter>
    );

    const AddActivitiesButton = screen.getByRole('button', {name: 'Add Activities'});
    expect(AddActivitiesButton).toBeInTheDocument();

    fireEvent.click(AddActivitiesButton);
    expect(handleDateSubmit).toHaveBeenCalledTimes(1);
  })

})