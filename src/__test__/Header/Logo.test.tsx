import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Logo from '../../components/Header/Logo';

describe('LogoComponent', () => {
  it('Should render Logo', () => {
    render(
      <BrowserRouter>
        <Logo />
      </BrowserRouter>
    );
    const logo = screen.getByAltText('logo');
    const link = screen.getByRole('link');
    const img = screen.getByRole('img');
    expect(logo).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/')
    expect(img).toHaveAttribute('src', 'images/planaway-logo.png')
  });
});