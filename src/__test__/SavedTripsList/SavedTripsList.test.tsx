import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import SavedTripsList from '../../components/SavedTripsList/SavedTripsList';

describe('SavedTripsList Component', () => {
  const isLoading = false;
  const error =  null;
  const successful = true;
  const handleOpenTrip = jest.fn();
  const data = [
    {
      id: '1',
      createdAt: '2021-08-17T00:00:00.000Z',
      origin: {
        startDate: '2021-0-01',
        endDate: '2021-08-02',        
        numberOfDays: 2,
        details: {
          name: 'Toronto'
        },
      },
    },
  ];

  it('Should render trip name', () => {
    render(
      <BrowserRouter>
        <SavedTripsList
          isLoading={isLoading}
          error={error}
          successful={successful}
          data={data}
          handleOpenTrip={handleOpenTrip}
        />
      </BrowserRouter>
    );

    const originName = screen.getByText('Toronto');
    expect(originName).toBeInTheDocument();
  });

  it('Should render trip start date', () => {
    render(
      <BrowserRouter>
        <SavedTripsList
          isLoading={isLoading}
          error={error}
          successful={successful}
          data={data}
          handleOpenTrip={handleOpenTrip}
        />
      </BrowserRouter>
    );

    const startDate = screen.getByText('2021-0-01');
    expect(startDate).toBeInTheDocument();
  });

  it('Should render trip end date', () => {
    render(
      <BrowserRouter>
        <SavedTripsList
          isLoading={isLoading}
          error={error}
          successful={successful}
          data={data}
          handleOpenTrip={handleOpenTrip}
        />
      </BrowserRouter>
    );

    const endDate = screen.getByText('2021-08-02');
    expect(endDate).toBeInTheDocument();
  });

  it('Should render trip number of days', () => {
    render(
      <BrowserRouter>
        <SavedTripsList
          isLoading={isLoading}
          error={error}
          successful={successful}
          data={data}
          handleOpenTrip={handleOpenTrip}
        />
      </BrowserRouter>
    );

    const numberOfDays = screen.getByText('2');
    expect(numberOfDays).toBeInTheDocument();
  });

  it('Should render trip createdAt', () => {
    render(
      <BrowserRouter>
        <SavedTripsList
          isLoading={isLoading}
          error={error}
          successful={successful}
          data={data}
          handleOpenTrip={handleOpenTrip}
        />
      </BrowserRouter>
    );

    const createdAt = screen.getByText('August 17th 2021, 1:00:00 am');
    expect(createdAt).toBeInTheDocument();
  });

  
  it('Should render button to open trip', () => {
    render(
      <BrowserRouter>
        <SavedTripsList
          isLoading={isLoading}
          error={error}
          successful={successful}
          data={data}
          handleOpenTrip={handleOpenTrip}
        />
      </BrowserRouter>
    );

    const openTripButton = screen.getByRole('button', { name: 'Open' });
    expect(openTripButton).toBeInTheDocument();
  })
  
  it('Should render table heading Actions', () => {
    render(
      <BrowserRouter>
        <SavedTripsList
          isLoading={isLoading}
          error={error}
          successful={successful}
          data={data}
          handleOpenTrip={handleOpenTrip}
        />
      </BrowserRouter>
    );

    const actions = screen.getByText('Actions');
    expect(actions).toBeInTheDocument();
  })

  it('Should render heading Date Created', () => {
    render(
      <BrowserRouter>
        <SavedTripsList
          isLoading={isLoading}
          error={error}
          successful={successful}
          data={data}
          handleOpenTrip={handleOpenTrip}
        />
      </BrowserRouter>
    );

    const dateCreated = screen.getByText('Date Created');
    expect(dateCreated).toBeInTheDocument();
  })

  it('Should render heading Number of Days', () => {
    render(
      <BrowserRouter>
        <SavedTripsList
          isLoading={isLoading}
          error={error}
          successful={successful}
          data={data}
          handleOpenTrip={handleOpenTrip}
        />
      </BrowserRouter>
    );
    
    const numberOfDays = screen.getByText('No.of Days for trip');
    expect(numberOfDays).toBeInTheDocument();
  })

  it('Should render heading End Date', () => {
    render(
      <BrowserRouter>
        <SavedTripsList 
          isLoading={isLoading}
          error={error}
          successful={successful}
          data={data}
          handleOpenTrip={handleOpenTrip}
        /> 
      </BrowserRouter>
    );

    const endDate = screen.getByText('End Date');
    expect(endDate).toBeInTheDocument();
  })

  it('Should render heading Start Date', () => {
    render(
      <BrowserRouter>
        <SavedTripsList 
          isLoading={isLoading}
          error={error}
          successful={successful}
          data={data}
          handleOpenTrip={handleOpenTrip}
        /> 
      </BrowserRouter>
    );

    const startDate = screen.getByText('Start Date');
    expect(startDate).toBeInTheDocument();
  });

  it('Should render heading Take Off Place/Origin', () => {
    render(
      <BrowserRouter>
        <SavedTripsList 
          isLoading={isLoading}
          error={error}
          successful={successful}
          data={data}
          handleOpenTrip={handleOpenTrip}
        /> 
      </BrowserRouter>
    );

    const origin = screen.getByText('Take Off Place/Origin');
    expect(origin).toBeInTheDocument();
  });

})