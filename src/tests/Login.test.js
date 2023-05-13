import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Login from '../pages/Login';

describe('Realizando testes de rota e inputs', () => {
  it('Verifica se os inputs de email e senha estão na tela e ao clicar no botão e redirecionado', () => {
    renderWithRouterAndRedux(<Login />);

    const inputEmail = screen.getByRole('textbox', {
      name: /e-mail:/i,
    });
    expect(inputEmail).toBeInTheDocument();
    userEvent.type(inputEmail, 'ntla.brs@gmail.com');
    expect(inputEmail.value).toBe('ntla.brs@gmail.com');

    const inputPassword = screen.getByRole('textbox', {
      name: /Password:/i,
    });
    expect(inputPassword).toBeInTheDocument();
    userEvent.type(inputPassword, '123456');
    expect(inputPassword.value).toBe('123456');
  });

  it('Teste de rota na home', () => {
    const { history } = renderWithRouterAndRedux(<Login />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
});
