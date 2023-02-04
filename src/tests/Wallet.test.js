import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';

describe(' Testando o componente wallet', () => {
  it('Testando os inputs', () => {
    const initialEntries = ['/carteira'];
    renderWithRouterAndRedux(<Wallet />, { initialEntries });

    const valueInput = screen.getByTestId('value-input');
    const DescripInput = screen.getByTestId('description-input');
    const CurrInput = screen.getByTestId('currency-input');
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');
    const button = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });

    expect(valueInput).toBeInTheDocument();
    expect(DescripInput).toBeInTheDocument();
    expect(CurrInput).toBeInTheDocument();
    expect(methodInput).toBeInTheDocument();
    expect(tagInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('Testando se a rota está certa', () => {
    const initialEntries = ['/carteira'];
    const { history } = renderWithRouterAndRedux(<Wallet />, { initialEntries });

    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  });

  it('Testando o estado da aplicação', () => {
    const globalState = {
      user: {
        email: '',
      },
      wallet: {
        currencies: [],
        expenses: [],
      },
    };
    const { store } = renderWithRouterAndRedux(<Wallet />, { globalState });
    const valueInput = screen.getByTestId('value-input');
    expect(valueInput.value).toBe('');

    userEvent.type(valueInput, '30');
    const button = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });
    userEvent.click(button);
    expect(store.getState()).toMatchObject(globalState);
  });
});
