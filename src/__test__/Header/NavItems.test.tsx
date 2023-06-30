import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import NavItems from '../../components/Header/NavItems';

describe('NavItemsComponent', () => {
  const handleSignUp = jest.fn();
  const handleLogin = jest.fn();
  const handleSignOut = jest.fn();
  const handleGoToTrip = jest.fn();
  let trips: {data: any[]} = {
    data: []
  };
  let user: null | {data: {email: string}} = null;

  
  
  it('Should render Sign Up button', () => {
    
    render(
      <BrowserRouter>
        <NavItems 
        handleGoToTrip={handleGoToTrip}
        handleSignUp={handleSignUp}
        handleLogin={handleLogin}
        handleSignOut={handleSignOut}
        trips={trips}
        user={user}
      />
      </BrowserRouter>
    );
    const signUp = screen.getByRole('button', {name: 'Sign Up'});
    expect(signUp).toBeInTheDocument();

    fireEvent.click(signUp);
    expect(handleSignUp).toHaveBeenCalledTimes(1);

  });

  it('Should render Login button', () => {
      
      render(
        <BrowserRouter>
          <NavItems 
          handleGoToTrip={handleGoToTrip}
          handleSignUp={handleSignUp}
          handleLogin={handleLogin}
          handleSignOut={handleSignOut}
          trips={trips}
          user={user}
        />
        </BrowserRouter>
      );
      const login = screen.getByRole('button', {name: 'Login'});
      expect(login).toBeInTheDocument();
  
      fireEvent.click(login);
      expect(handleLogin).toHaveBeenCalledTimes(1);
  
    });

    it('Should render My Trips button', () => {
      trips = {
        data: [{trip1: 'trip1'}, {trip2: 'trip2'}]
      }
      user = {
        data: {
          email: 'abcd@email.com'
        }
      }
      render(
        <BrowserRouter>
          <NavItems
            handleGoToTrip={handleGoToTrip}
            handleSignUp={handleSignUp}
            handleLogin={handleLogin}
            handleSignOut={handleSignOut}
            trips={trips}
            user={user}
          />
        </BrowserRouter>
      );
      const myTrips = screen.getByRole('button', {name: 'My Trips'});
      expect(myTrips).toBeInTheDocument();

      fireEvent.click(myTrips);
      expect(handleGoToTrip).toHaveBeenCalledTimes(1);
    });

    it('Should render Sign Out button', () => {
      trips = {
        data: [{trip1: 'trip1'}, {trip2: 'trip2'}]
      }
      user = {
        data: {
          email: 'abcd@email.com',
        }
      }
      render(
        <BrowserRouter>
          <NavItems
            handleGoToTrip={handleGoToTrip}
            handleSignUp={handleSignUp}
            handleLogin={handleLogin}
            handleSignOut={handleSignOut}
            trips={trips}
            user={user}
          />
        </BrowserRouter>
      );
      const signOut = screen.getByRole('button', {name: 'Sign Out'});
      expect(signOut).toBeInTheDocument();

      fireEvent.click(signOut);
      expect(handleSignOut).toHaveBeenCalledTimes(1);
    });

    it('Should render user email', () => {
      trips = {
        data: [{trip1: 'trip1'}, {trip2: 'trip2'}]
        }
        
        user = {
          data: {
            email: 'abcd@email'
          }
        }
            render(
              <BrowserRouter>

                <NavItems
                  handleGoToTrip={handleGoToTrip}
                  handleSignUp={handleSignUp}
                  handleLogin={handleLogin}
                  handleSignOut={handleSignOut}
                  trips={trips}
                  user={user}
                />
              </BrowserRouter>
            );
            const userEmail = screen.getByText(`Hi ${user.data.email}!`);
            expect(userEmail).toBeInTheDocument();
    })
})