import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { apiFetch, gettNewExpense } from '../redux/actions';

class WalletForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      method: 'Dinheiro',
      currency: 'USD',
      tag: 'Alimentação',
      value: '',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(apiFetch());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleClick = (event) => {
    event.preventDefault();
    const { dispatch, expenses } = this.props;

    const expenseObj = { ...this.state, exchangeRates: {}, id: expenses.length };

    dispatch(gettNewExpense(expenseObj));

    this.setState({
      description: '',
      method: 'Dinheiro',
      currency: 'USD',
      tag: 'Alimentação',
      value: '',
    });
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies } = this.props;
    return (
      <div
        className="flex items-center m-8 rounded-md
      pl-4 bg-cyan-700 space-x-2 md:space-x-10"
      >
        <label htmlFor="value-input">
          <span className="text-zinc-50">Valor: </span>
          <input
            className="input2"
            data-testid="value-input"
            type="number"
            name="value"
            value={ value }
            id="value-input"
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="descriptions-input">
          <span className="text-zinc-50">Descrição: </span>
          <input
            className="input2"
            data-testid="description-input"
            type="textbox"
            name="description"
            value={ description }
            id="descriptions-input"
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="currency-input">
          <span className="text-zinc-50">Moeda: </span>
          <select
            className="input2"
            data-testid="currency-input"
            name="currency"
            value={ currency }
            id="currency-input"
            onChange={ this.handleChange }
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
          <span className="text-zinc-50">Método de Pagamento: </span>
          <select
            className="input2 "
            data-testid="method-input"
            type="text"
            name="method"
            value={ method }
            id="method-input"
            onChange={ this.handleChange }
          >
            <option value="Dinheiro"> Dinheiro </option>
            <option value="Cartão de crédito"> Cartão de crédito </option>
            <option value="Cartão de débito"> Cartão de débito </option>
          </select>
        </label>

        <label htmlFor="tag-input">
          <span className="text-zinc-50">Categoria: </span>
          <select
            className="input2 "
            data-testid="tag-input"
            name="tag"
            value={ tag }
            id="tag-input"
            onChange={ this.handleChange }
          >
            <option value="Alimentação"> Alimentação </option>
            <option value="Lazer"> Lazer </option>
            <option value="Trabalho"> Trabalho </option>
            <option value="Transporte"> Transporte </option>
            <option value="Saúde"> Saúde </option>
          </select>
        </label>

        <div>
          <button
            className="text-slate-950 px-4 m-4 rounded-md
            bg-stone-50 py-3 font-semibold hover:text-white hover:bg-cyan-900"
            type="button"
            onClick={ this.handleClick }
          >
            Adicionar despesa

          </button>
        </div>
      </div>
    );
  }
}

WalletForm.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
  expenses: wallet.expenses,
});

export default connect(mapStateToProps)(WalletForm);
