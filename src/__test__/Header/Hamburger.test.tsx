import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Hambuger from '../../components/Header/Hamburger';

describe('HamburgerComponent', () => {  
  const handleClick = jest.fn();
  const handleClose = jest.fn();
  const handleLogin = jest.fn();
  const handleSignUp = jest.fn();
  const handleSignOut = jest.fn();
  const handleGoToTrip = jest.fn();
  let trips: {data: any[]} = {
    data: []
  };
  let user: null | {data: {email: string}} = null;

  it('Should render Hamburger button', () => {
    const open = false;
    const anchorEl = null;
    
    render(
      <BrowserRouter>
        <Hambuger 
          open={open}
          handleClick={handleClick}
          anchorEl={anchorEl}
          handleClose={handleClose}
          handleLogin={handleLogin}
          handleSignUp={handleSignUp}
          handleSignOut={handleSignOut}
          user={user}
          trips={trips}
          handleGoToTrip={handleGoToTrip}
        />
      </BrowserRouter>
    );
    const hamburger = screen.getByTestId('MenuIcon');
    expect(hamburger).toBeInTheDocument();

  });

  it('Should render Sign Up button', () => {
    const open = true;
    const anchorEl = document.createElement('div');
      
      render(
        <BrowserRouter>
          <Hambuger 
            open={open}
            handleClick={handleClick}
            anchorEl={anchorEl}
            handleClose={handleClose}
            handleLogin={handleLogin}
            handleSignUp={handleSignUp}
            handleSignOut={handleSignOut}
            user={user}
            trips={trips}
            handleGoToTrip={handleGoToTrip}
          />
        </BrowserRouter>
      );
      const signUp = screen.getByText('Sign Up');
      expect(signUp).toBeInTheDocument();

      fireEvent.click(signUp);
      expect(handleSignUp).toHaveBeenCalledTimes(1);
  
  });

  it('Should render Login button', () => {
    const open = true;
    const anchorEl = document.createElement('div');
      
      render(
        <BrowserRouter>
          <Hambuger 
            open={open}
            handleClick={handleClick}
            anchorEl={anchorEl}
            handleClose={handleClose}
            handleLogin={handleLogin}
            handleSignUp={handleSignUp}
            handleSignOut={handleSignOut}
            user={user}
            trips={trips}
            handleGoToTrip={handleGoToTrip}
          />
        </BrowserRouter>
      );
      const login = screen.getByText('Login');
      expect(login).toBeInTheDocument();

      fireEvent.click(login);
      expect(handleLogin).toHaveBeenCalledTimes(1);
  
  })

  it('Should render Sign Out button', () => {
    const open = true;
    const anchorEl = document.createElement('div');
    user = {
      data: {
        email: 'abcd@email.com',
      }
    };
    trips = {
      data: [
        {
          trip1: 'trip1'
        },
        {
          trip2: 'trip2'
        }
      ]
    };
      
      render(
        <BrowserRouter>
          <Hambuger 
            open={open}
            handleClick={handleClick}
            anchorEl={anchorEl}
            handleClose={handleClose}
            handleLogin={handleLogin}
            handleSignUp={handleSignUp}
            handleSignOut={handleSignOut}
            user={user}
            trips={trips}
            handleGoToTrip={handleGoToTrip}
          />
        </BrowserRouter>
      );
      const signOut = screen.getByText('Sign Out');
      expect(signOut).toBeInTheDocument();

      fireEvent.click(signOut);
      expect(handleSignOut).toHaveBeenCalledTimes(1);
  });

  it('Should render My Trips button', () => {
    const open = true;
    const anchorEl = document.createElement('div');
    user = {
      data: {
        email: '123a@email.com'
      }
    };
    trips = {
      data: [
        {
          trip1: 'trip1'
        },
        {
          trip2: 'trip2'
        }
      ]
    };
      
      render(
        <BrowserRouter>
          <Hambuger 
            open={open}
            handleClick={handleClick}
            anchorEl={anchorEl}
            handleClose={handleClose}
            handleLogin={handleLogin}
            handleSignUp={handleSignUp}
            handleSignOut={handleSignOut}
            user={user}
            trips={trips}
            handleGoToTrip={handleGoToTrip}
          />
        </BrowserRouter>
      );
      const myTrips = screen.getByText('My Trips');
      expect(myTrips).toBeInTheDocument();

      fireEvent.click(myTrips);
      expect(handleGoToTrip).toHaveBeenCalledTimes(1);
  });
});