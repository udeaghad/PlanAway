import { screen, render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import LoginDialogueBox from '../../components/SaveItineraryPopup/LoginDialogueBox';

describe('LoginDialogueBox Component', () => {
  const open = true;
  const handleClose = jest.fn();
  const handleLoginOnChange = jest.fn();
  const handleLogin = jest.fn();
  const loginButtonDisabled = false;
  const handleOpenSignUpDialogue = jest.fn();
  const openBackDropLogin = false;

  it('Should render login title', () => {
    render(
      <BrowserRouter>
        <LoginDialogueBox
          open={open}
          handleClose={handleClose}
          handleLoginOnChange={handleLoginOnChange}
          handleLogin={handleLogin}
          loginButtonDisabled={loginButtonDisabled}
          handleOpenSignUpDialogue={handleOpenSignUpDialogue}
          openBackDropLogin={openBackDropLogin}
        />
      </BrowserRouter>
    );

    const loginTitle = screen.getByText('Log In');
    expect(loginTitle).toBeInTheDocument();
  });

  it('Should render email label', () => {
    render(
      <BrowserRouter>
        <LoginDialogueBox
          open={open}
          handleClose={handleClose}
          handleLoginOnChange={handleLoginOnChange}
          handleLogin={handleLogin}
          loginButtonDisabled={loginButtonDisabled}
          handleOpenSignUpDialogue={handleOpenSignUpDialogue}
          openBackDropLogin={openBackDropLogin}
        />
      </BrowserRouter>
    );

    const emailLabel = screen.getByText('Email Address');
    expect(emailLabel).toBeInTheDocument();
  })

  it('Should render password label', () => {
    render(
      <BrowserRouter>
        <LoginDialogueBox
          open={open}
          handleClose={handleClose}
          handleLoginOnChange={handleLoginOnChange}
          handleLogin={handleLogin}
          loginButtonDisabled={loginButtonDisabled}
          handleOpenSignUpDialogue={handleOpenSignUpDialogue}
          openBackDropLogin={openBackDropLogin}
        />
      </BrowserRouter>
    );

    const passwordLabel = screen.getByText('Password');
    expect(passwordLabel).toBeInTheDocument();
  })

  it('Should render email input field', () => {
    render(
      <BrowserRouter>
        <LoginDialogueBox
          open={open}
          handleClose={handleClose}
          handleLoginOnChange={handleLoginOnChange}
          handleLogin={handleLogin}
          loginButtonDisabled={loginButtonDisabled}
          handleOpenSignUpDialogue={handleOpenSignUpDialogue}
          openBackDropLogin={openBackDropLogin}
        />
      </BrowserRouter>
      
    );

    const emailInput = screen.getByRole('textbox', { name: 'Email Address' });
    expect(emailInput).toBeInTheDocument();

    fireEvent.change(emailInput, { target: {value: 'abcde@email.com'}})
    expect(handleLoginOnChange).toHaveBeenCalled()
  });

  it('Should render password input', () => {
    render(
      <BrowserRouter>
        <LoginDialogueBox
          open={open}
          handleClose={handleClose}
          handleLoginOnChange={handleLoginOnChange}
          handleLogin={handleLogin}
          loginButtonDisabled={loginButtonDisabled}
          handleOpenSignUpDialogue={handleOpenSignUpDialogue}
          openBackDropLogin={openBackDropLogin}
        />
      </BrowserRouter>
      
    );

    const passwordInput = screen.getByTestId('password')
    expect(passwordInput).toBeInTheDocument();
    
    const passwordInputChildren = passwordInput.children.item(1)?.children.item(0);
    if (passwordInputChildren){
      fireEvent.change(passwordInputChildren, { target: { value: '123' } });
      expect(handleLoginOnChange).toHaveBeenCalled();
    }    
  })

  it('Should render Cancel button', () => {
    render(
      <BrowserRouter>
       <LoginDialogueBox
          open={open}
          handleClose={handleClose}
          handleLoginOnChange={handleLoginOnChange}
          handleLogin={handleLogin}
          loginButtonDisabled={loginButtonDisabled}
          handleOpenSignUpDialogue={handleOpenSignUpDialogue}
          openBackDropLogin={openBackDropLogin}
        />
      </BrowserRouter>
    );

    const cancelButton = screen.getByRole('button', { name: "CANCEL"})
    expect(cancelButton).toBeInTheDocument()

    fireEvent.click(cancelButton)
    expect(handleClose).toHaveBeenCalled()
  })

  it('Should render LOG IN button', () => {
    render(
      <BrowserRouter>
        <LoginDialogueBox
          open={open}
          handleClose={handleClose}
          handleLoginOnChange={handleLoginOnChange}
          handleLogin={handleLogin}
          loginButtonDisabled={loginButtonDisabled}
          handleOpenSignUpDialogue={handleOpenSignUpDialogue}
          openBackDropLogin={openBackDropLogin}
        />
      </BrowserRouter>
    );

    const loginButton = screen.getByRole('button', { name: 'LOG IN'})
    expect(loginButton).toBeInTheDocument();

    fireEvent.click(loginButton)
    expect(handleLogin).toHaveBeenCalled()
  })

  it('Should render text "\Don\'t have an account? \"', () => {
    render(
      <BrowserRouter>
        <LoginDialogueBox
          open={open}
          handleClose={handleClose}
          handleLoginOnChange={handleLoginOnChange}
          handleLogin={handleLogin}
          loginButtonDisabled={loginButtonDisabled}
          handleOpenSignUpDialogue={handleOpenSignUpDialogue}
          openBackDropLogin={openBackDropLogin}
        />
      </BrowserRouter>
    );

    const text = screen.getByText('Don\'t have an account?')
    expect(text).toBeInTheDocument()
  })

  it('Should render SIGN UP button', () => {
    render(
      <BrowserRouter>
        <LoginDialogueBox
          open={open}
          handleClose={handleClose}
          handleLoginOnChange={handleLoginOnChange}
          handleLogin={handleLogin}
          loginButtonDisabled={loginButtonDisabled}
          handleOpenSignUpDialogue={handleOpenSignUpDialogue}
          openBackDropLogin={openBackDropLogin}
        />
      </BrowserRouter>
    );

    const signUpButton = screen.getByRole('button', { name: 'SIGN UP'})
    expect(signUpButton).toBeInTheDocument()

    fireEvent.click(signUpButton)
    expect(handleOpenSignUpDialogue).toHaveBeenCalled()
  })

});