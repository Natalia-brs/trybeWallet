import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { apiFetch } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: '',
      method: 'Dinheiro',
      tag: 'alimentaçao',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(apiFetch());
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies } = this.props;
    return (
      <div>
        <label htmlFor="value-input">
          <span>Valor: </span>
          <input
            data-testid="value-input"
            type="text"
            name="value"
            value={ value }
            id="value-input"
          />
        </label>

        <label htmlFor="descriptions-input">
          <span>Descrição: </span>
          <input
            data-testid="description-input"
            type="text"
            name="description"
            value={ description }
            id="descriptions-input"
          />
        </label>

        <label htmlFor="currency-input">
          <span>Moeda: </span>
          <select
            data-testid="currency-input"
            type="text"
            name="currency"
            value={ currency }
            id="currency-input"
          >
            {currencies.map((coin, index) => (
              <option
                key={ index }
                value={ coin }
              >
                {' '}
                { coin }
                {' '}
              </option>
            )) }
          </select>
        </label>

        <label htmlFor="method-input">
          <span>Método de Pagamento: </span>
          <select
            data-testid="method-input"
            type="text"
            name="method"
            value={ method }
            id="method-input"
          >
            <option value="dinheiro"> Dinheiro </option>
            <option value="cartao-credito"> Cartão de crédito </option>
            <option value="cartao-debito"> Cartão de débito </option>
          </select>
        </label>

        <label htmlFor="method-input">
          <span>Categoria: </span>
          <select
            data-testid="tag-input"
            type="text"
            name="method"
            value={ tag }
            id="method-input"
          >
            <option value="alimentaçao"> Alimentação </option>
            <option value="lazer"> Lazer </option>
            <option value="trabalho"> Trabalho </option>
            <option value="transporte"> Transporte </option>
            <option value="saude"> Saúde </option>
          </select>
        </label>
      </div>
    );
  }
}

WalletForm.defaultProps = {
  currencies: 'USD',
};

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string),
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
