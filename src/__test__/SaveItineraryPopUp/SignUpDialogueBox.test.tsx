import { screen, render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import SignUpDialogueBox from '../../components/SaveItineraryPopup/SignUpDialogueBox';

describe('SignUpDialogueBox component', () => {
  const openSignUp = true;
  const handleCloseSignUpDialogue = jest.fn();
  const handleSignUpOnChange =jest.fn();
  const signUpButtonDisabled = false;
  const handleSignUp = jest.fn();
  const openBackDropSignUp = false;
  const handleClickOpen = jest.fn()


  it('Should render Create Account heading', () => {
    render(
      <BrowserRouter>
        <SignUpDialogueBox
          openSignUp={openSignUp}
          handleCloseSignUpDialogue={handleCloseSignUpDialogue}
          handleSignUpOnChange={handleSignUpOnChange}
          signUpButtonDisabled={signUpButtonDisabled}
          handleSignUp={handleSignUp}
          handleClickOpen={handleClickOpen}
          openBackDropSignUp={openBackDropSignUp}
        />
      </BrowserRouter>
    );

    const createAccountHeading = screen.getByRole('heading', {name: 'Create Account'})
    expect(createAccountHeading).toBeInTheDocument()
  })

  it('Should render email label', () => {
    render(
      <BrowserRouter>
        <SignUpDialogueBox
          openSignUp={openSignUp}
          handleCloseSignUpDialogue={handleCloseSignUpDialogue}
          handleSignUpOnChange={handleSignUpOnChange}
          signUpButtonDisabled={signUpButtonDisabled}
          handleSignUp={handleSignUp}
          handleClickOpen={handleClickOpen}
          openBackDropSignUp={openBackDropSignUp}
        />
      </BrowserRouter>
    );

    const emailLabel = screen.getByText('Email Address');
    expect(emailLabel).toBeInTheDocument();
  })

  it('Should render password label', () => {
    render(
      <BrowserRouter>
        <SignUpDialogueBox
          openSignUp={openSignUp}
          handleCloseSignUpDialogue={handleCloseSignUpDialogue}
          handleSignUpOnChange={handleSignUpOnChange}
          signUpButtonDisabled={signUpButtonDisabled}
          handleSignUp={handleSignUp}
          handleClickOpen={handleClickOpen}
          openBackDropSignUp={openBackDropSignUp}
        />
      </BrowserRouter>
    );

    const passwordLabel = screen.getByText('Password');
    expect(passwordLabel).toBeInTheDocument();
  })

  it('Should render email input field', () => {
    render(
      <BrowserRouter>
        <SignUpDialogueBox
          openSignUp={openSignUp}
          handleCloseSignUpDialogue={handleCloseSignUpDialogue}
          handleSignUpOnChange={handleSignUpOnChange}
          signUpButtonDisabled={signUpButtonDisabled}
          handleSignUp={handleSignUp}
          handleClickOpen={handleClickOpen}
          openBackDropSignUp={openBackDropSignUp}
        />
      </BrowserRouter>
    );

    const emailInput = screen.getByRole('textbox', { name: 'Email Address' });
    expect(emailInput).toBeInTheDocument();

    fireEvent.change(emailInput, { target: {value: 'abcde@email.com'}})
    expect(handleSignUpOnChange).toHaveBeenCalled()
  });

  it('Should render password input', () => {
    render(
      <BrowserRouter>
        <SignUpDialogueBox
          openSignUp={openSignUp}
          handleCloseSignUpDialogue={handleCloseSignUpDialogue}
          handleSignUpOnChange={handleSignUpOnChange}
          signUpButtonDisabled={signUpButtonDisabled}
          handleSignUp={handleSignUp}
          handleClickOpen={handleClickOpen}
          openBackDropSignUp={openBackDropSignUp}
        />
      </BrowserRouter>
    );


    const passwordInput = screen.getByTestId('password')
    expect(passwordInput).toBeInTheDocument();
    
    const passwordInputChildren = passwordInput.children.item(1)?.children.item(0);
    if (passwordInputChildren){
      fireEvent.change(passwordInputChildren, { target: { value: '123' } });
      expect(handleSignUpOnChange).toHaveBeenCalled();
    }    
  })

  it('Should render Cancel button', () => {
    render(
      <BrowserRouter>
        <SignUpDialogueBox
          openSignUp={openSignUp}
          handleCloseSignUpDialogue={handleCloseSignUpDialogue}
          handleSignUpOnChange={handleSignUpOnChange}
          signUpButtonDisabled={signUpButtonDisabled}
          handleSignUp={handleSignUp}
          handleClickOpen={handleClickOpen}
          openBackDropSignUp={openBackDropSignUp}
        />
      </BrowserRouter>
    );

    const cancelButton = screen.getByRole('button', { name: "CANCEL"})
    expect(cancelButton).toBeInTheDocument()

    fireEvent.click(cancelButton)
    expect(handleCloseSignUpDialogue).toHaveBeenCalled()
  })


  it('Should render SIGN UP button', () => {
    render(
      <BrowserRouter>
        <SignUpDialogueBox
          openSignUp={openSignUp}
          handleCloseSignUpDialogue={handleCloseSignUpDialogue}
          handleSignUpOnChange={handleSignUpOnChange}
          signUpButtonDisabled={signUpButtonDisabled}
          handleSignUp={handleSignUp}
          handleClickOpen={handleClickOpen}
          openBackDropSignUp={openBackDropSignUp}
        />
      </BrowserRouter>
    );

    const signUpButton = screen.getByRole('button', { name: 'SIGN UP'})
    expect(signUpButton).toBeInTheDocument();

    fireEvent.click(signUpButton)
    expect(handleSignUp).toHaveBeenCalled()
  })

  it('Should render text "\Already have an account? \"', () => {
    render(
      <BrowserRouter>
        <SignUpDialogueBox
          openSignUp={openSignUp}
          handleCloseSignUpDialogue={handleCloseSignUpDialogue}
          handleSignUpOnChange={handleSignUpOnChange}
          signUpButtonDisabled={signUpButtonDisabled}
          handleSignUp={handleSignUp}
          handleClickOpen={handleClickOpen}
          openBackDropSignUp={openBackDropSignUp}
        />
      </BrowserRouter>
    );  

    const text = screen.getByText('Already have an account?')
    expect(text).toBeInTheDocument()
  })

  it('Should render Log In button', () => {
    render(
      <BrowserRouter>
        <SignUpDialogueBox
          openSignUp={openSignUp}
          handleCloseSignUpDialogue={handleCloseSignUpDialogue}
          handleSignUpOnChange={handleSignUpOnChange}
          signUpButtonDisabled={signUpButtonDisabled}
          handleSignUp={handleSignUp}
          handleClickOpen={handleClickOpen}
          openBackDropSignUp={openBackDropSignUp}
        />
      </BrowserRouter>
    );  

    const loginButton = screen.getByRole('button', { name: 'Log In'})
    expect(loginButton).toBeInTheDocument()

    fireEvent.click(loginButton)
    expect(handleClickOpen).toHaveBeenCalled()
  })


})