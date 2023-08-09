import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import SignUpMain from '../../components/SignUpForm/SignUpMain';

describe('SignUpMain', () => {
  const handleSignUpOnChange = jest.fn();
  const handleClose = jest.fn();
  const signUpButtonDisabled = false;
  const handleSignUp = jest.fn(); 
  const handleNavigateToLogin = jest.fn();
  const signUpData = {
    email: '',
    password: '',
    confirmPassword: ''
  }
  const openBackDrop = false;

  it('Should render email address label', () => {
    render(
      <BrowserRouter>
        <SignUpMain 
          handleSignUpOnChange={handleSignUpOnChange}
          handleClose={handleClose}
          signUpButtonDisabled={signUpButtonDisabled}
          handleSignUp={handleSignUp}
          handleNavigateToLogin={handleNavigateToLogin}
          signUpData={signUpData}
          openBackDrop={openBackDrop}
        />
      </BrowserRouter>
    );
    const EmailAddressLabel = screen.getByText('Email Address');
    expect(EmailAddressLabel).toBeInTheDocument();
  });

  it('Should render password label', () => {
    render(
      <BrowserRouter>
        <SignUpMain 
          handleSignUpOnChange={handleSignUpOnChange}
          handleClose={handleClose}
          signUpButtonDisabled={signUpButtonDisabled}
          handleSignUp={handleSignUp}
          handleNavigateToLogin={handleNavigateToLogin}
          signUpData={signUpData}
          openBackDrop={openBackDrop}
        />
      </BrowserRouter>
    );
    const PasswordLabel = screen.getByText('Password');
    expect(PasswordLabel).toBeInTheDocument();
  });

  it('Should render re-enter password label', () => {
    render(
      <BrowserRouter>
        <SignUpMain 
          handleSignUpOnChange={handleSignUpOnChange}
          handleClose={handleClose}
          signUpButtonDisabled={signUpButtonDisabled}
          handleSignUp={handleSignUp}
          handleNavigateToLogin={handleNavigateToLogin}
          signUpData={signUpData}
          openBackDrop={openBackDrop}
        />
      </BrowserRouter>
    );
    const ReEnterPasswordLabel = screen.getByText('Re-enter Password');
    expect(ReEnterPasswordLabel).toBeInTheDocument();
  });

  it('Should render email address input', () => {
    render(
      <BrowserRouter>
        <SignUpMain 
          handleSignUpOnChange={handleSignUpOnChange}
          handleClose={handleClose}
          signUpButtonDisabled={signUpButtonDisabled}
          handleSignUp={handleSignUp}
          handleNavigateToLogin={handleNavigateToLogin}
          signUpData={signUpData}
          openBackDrop={openBackDrop}
        />
      </BrowserRouter>
    );
    const emailAddressInput = screen.getByRole('textbox', { name: /email address/i });
    expect(emailAddressInput).toBeInTheDocument();

    fireEvent.change(emailAddressInput, { target: { value: '123@emai' } });
    expect(handleSignUpOnChange).toHaveBeenCalled();
  });

  it('Should render password input', () => {
    render(
      <BrowserRouter>
        <SignUpMain 
          handleSignUpOnChange={handleSignUpOnChange}
          handleClose={handleClose}
          signUpButtonDisabled={signUpButtonDisabled}
          handleSignUp={handleSignUp}
          handleNavigateToLogin={handleNavigateToLogin}
          signUpData={signUpData}
          openBackDrop={openBackDrop}
        />
      </BrowserRouter>
    );
    const passwordInput = screen.getByTestId('password');
    expect(passwordInput).toBeInTheDocument();
    
    const passwordInputChildren = passwordInput.children.item(1)?.children.item(0);
    if (passwordInputChildren){
      fireEvent.change(passwordInputChildren, { target: { value: '123' } });
      expect(handleSignUpOnChange).toHaveBeenCalled();
    }
  });

  it('Should render re-enter password input', () => {
    render(
      <BrowserRouter>
        <SignUpMain 
          handleSignUpOnChange={handleSignUpOnChange}
          handleClose={handleClose}
          signUpButtonDisabled={signUpButtonDisabled}
          handleSignUp={handleSignUp}
          handleNavigateToLogin={handleNavigateToLogin}
          signUpData={signUpData}
          openBackDrop={openBackDrop}
        />
      </BrowserRouter>
    );
    const passwordInput = screen.getByTestId('confirmPassword');
    expect(passwordInput).toBeInTheDocument();
    
    const passwordInputChildren = passwordInput.children.item(1)?.children.item(0);
    if (passwordInputChildren){
      fireEvent.change(passwordInputChildren, { target: { value: '123' } });
      expect(handleSignUpOnChange).toHaveBeenCalled();
    }
  });

  it('Should render sign up button', () => {
    render(
      <BrowserRouter>
        <SignUpMain 
          handleSignUpOnChange={handleSignUpOnChange}
          handleClose={handleClose}
          signUpButtonDisabled={signUpButtonDisabled}
          handleSignUp={handleSignUp}
          handleNavigateToLogin={handleNavigateToLogin}
          signUpData={signUpData}
          openBackDrop={openBackDrop}
        />
      </BrowserRouter>
    );
    const signUpButton = screen.getByRole('button', { name: 'SIGN UP' });
    expect(signUpButton).toBeInTheDocument();

    fireEvent.click(signUpButton);
    expect(handleSignUp).toHaveBeenCalled();
  });

  it('Should render cancel button', () => {
    render(
      <BrowserRouter>
        <SignUpMain 
          handleSignUpOnChange={handleSignUpOnChange}
          handleClose={handleClose}
          signUpButtonDisabled={signUpButtonDisabled}
          handleSignUp={handleSignUp}
          handleNavigateToLogin={handleNavigateToLogin}
          signUpData={signUpData}
          openBackDrop={openBackDrop}
        />
      </BrowserRouter>
    );
    const cancelButton = screen.getByRole('button', { name: 'CANCEL' });
    expect(cancelButton).toBeInTheDocument();

    fireEvent.click(cancelButton);
    expect(handleClose).toHaveBeenCalled();
  })

  it('Should render login button', () => {
    render(
      <BrowserRouter>
        <SignUpMain 
          handleSignUpOnChange={handleSignUpOnChange}
          handleClose={handleClose}
          signUpButtonDisabled={signUpButtonDisabled}
          handleSignUp={handleSignUp}
          handleNavigateToLogin={handleNavigateToLogin}
          signUpData={signUpData}
          openBackDrop={openBackDrop} 
        />
      </BrowserRouter>
    );
    const loginButton = screen.getByRole('button', { name: 'LOG IN' });
    expect(loginButton).toBeInTheDocument();

    fireEvent.click(loginButton);
    expect(handleNavigateToLogin).toHaveBeenCalled();
  });

});