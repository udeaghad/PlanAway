import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import LoginMain from '../../components/LoginForm/LoginMain';

describe('LoginMain Component', () => {
  const handleLoginOnChange = jest.fn();
  const handleClose = jest.fn();
  const loginButtonDisabled = false;
  const handleLogin = jest.fn();
  const handleNavigateToSignUp = jest.fn();
  const loginData = {
    email: '',
    password: '',
  }
  const openBackDrop = false;

  it('Should render email address label', () => {
    render(
      <BrowserRouter>
        <LoginMain 
          handleLoginOnChange={handleLoginOnChange}
          handleClose={handleClose}
          loginButtonDisabled={loginButtonDisabled}
          handleLogin={handleLogin}
          handleNavigateToSignUp={handleNavigateToSignUp}
          loginData={loginData}
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
        <LoginMain 
          handleLoginOnChange={handleLoginOnChange}
          handleClose={handleClose}
          loginButtonDisabled={loginButtonDisabled}
          handleLogin={handleLogin}
          handleNavigateToSignUp={handleNavigateToSignUp}
          loginData={loginData}
          openBackDrop={openBackDrop}

        />
      </BrowserRouter>
    );
    const PasswordLabel = screen.getByText('Password');
    expect(PasswordLabel).toBeInTheDocument();
  });

  it('Should render email address input', () => {
    render(
      <BrowserRouter>
        <LoginMain 
          handleLoginOnChange={handleLoginOnChange}
          handleClose={handleClose}
          loginButtonDisabled={loginButtonDisabled}
          handleLogin={handleLogin}
          handleNavigateToSignUp={handleNavigateToSignUp}
          loginData={loginData}
          openBackDrop={openBackDrop}

        />
      </BrowserRouter>
    );
    const emailAddressInput = screen.getByRole('textbox', { name: /email address/i });
    expect(emailAddressInput).toBeInTheDocument();

    fireEvent.change(emailAddressInput, { target: { value: '123@emai' } });
    expect(handleLoginOnChange).toHaveBeenCalled();
  });

  it('Should render password input', () => {
    render(
      <BrowserRouter>
        <LoginMain 
          handleLoginOnChange={handleLoginOnChange}
          handleClose={handleClose}
          loginButtonDisabled={loginButtonDisabled}
          handleLogin={handleLogin}
          handleNavigateToSignUp={handleNavigateToSignUp}
          loginData={loginData}
          openBackDrop={openBackDrop}

        />
      </BrowserRouter>
    );
    const passwordInput = screen.getByTestId('password');
    expect(passwordInput).toBeInTheDocument();
    
    const passwordInputChildren = passwordInput.children.item(1)?.children.item(0);
    if (passwordInputChildren){
      fireEvent.change(passwordInputChildren, { target: { value: '123' } });
      expect(handleLoginOnChange).toHaveBeenCalled();
    }
  });

  it('Should render login button', () => {
    render(
      <BrowserRouter>
        <LoginMain 
          handleLoginOnChange={handleLoginOnChange}
          handleClose={handleClose}
          loginButtonDisabled={loginButtonDisabled}
          handleLogin={handleLogin}
          handleNavigateToSignUp={handleNavigateToSignUp}
          loginData={loginData}
          openBackDrop={openBackDrop}

        />
      </BrowserRouter>
    );
    const loginButton = screen.getByRole('button', { name: 'LOG IN' });
    expect(loginButton).toBeInTheDocument();

    fireEvent.click(loginButton);
    expect(handleLogin).toHaveBeenCalled();
  });

  it('Should render sign up button', () => {
    render(
      <BrowserRouter>
        <LoginMain 
          handleLoginOnChange={handleLoginOnChange}
          handleClose={handleClose}
          loginButtonDisabled={loginButtonDisabled}
          handleLogin={handleLogin}
          handleNavigateToSignUp={handleNavigateToSignUp}
          loginData={loginData}
          openBackDrop={openBackDrop}

        />
      </BrowserRouter>
    );
    const signUpButton = screen.getByRole('button', { name: 'SIGN UP' });
    expect(signUpButton).toBeInTheDocument();

    fireEvent.click(signUpButton);
    expect(handleNavigateToSignUp).toHaveBeenCalled();
  });

  it('Should render cancel button', () => {
    render(
      <BrowserRouter>
        <LoginMain 
          handleLoginOnChange={handleLoginOnChange}
          handleClose={handleClose}
          loginButtonDisabled={loginButtonDisabled}
          handleLogin={handleLogin}
          handleNavigateToSignUp={handleNavigateToSignUp}
          loginData={loginData}
          openBackDrop={openBackDrop}

        />
      </BrowserRouter>
    );
    const cancelButton = screen.getByRole('button', { name: 'CANCEL' });
    expect(cancelButton).toBeInTheDocument();

    fireEvent.click(cancelButton);
    expect(handleClose).toHaveBeenCalled();
  });

})