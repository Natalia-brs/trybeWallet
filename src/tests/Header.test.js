import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Header from '../components/Header';
import App from '../App';

describe('Testanto o componente Header', () => {
  it('Testando os campos', () => {
    renderWithRouterAndRedux(<Header />);

    const email = screen.getByTestId('email-field');
    const total = screen.getByTestId('total-field');
    const currency = screen.getByTestId('header-currency-field');

    expect(email).toBeInTheDocument();
    expect(total).toBeInTheDocument();
    expect(currency).toBeInTheDocument();
  });

  it('Se o componete header e renderizado na rota /carteira', () => {
    const initialEntries = ['/carteira'];
    const { history } = renderWithRouterAndRedux(<Header />, { initialEntries });
    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  });

  it('Testa se o componente possui as informaçoes do estado global', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const email = screen.getByTestId('email-input');
    const pass = screen.getByTestId('password-input');
    const button = screen.getByRole('button', {
      name: /entrar/i,
    });

    userEvent.type(email, 'ntla.brs@gmail.com');
    userEvent.type(pass, '123456');
    userEvent.click(button);

    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  });
});
