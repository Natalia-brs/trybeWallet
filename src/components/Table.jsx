import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateTable } from '../redux/actions/index';

class Table extends Component {
  renderTable = (dado) => {
    const { description, method, currency, tag, value, id, exchangeRates } = dado;

    return (
      <tr key={ id }>
        <td>
          {' '}
          {description}
          {' '}
        </td>
        <td>
          {' '}
          { tag }
          {' '}
        </td>
        <td>
          {' '}
          { method }
          {' '}
        </td>
        <td>
          {' '}
          { Number(value).toFixed(2) }
          {' '}
        </td>
        <td>
          {' '}
          { exchangeRates[currency].name }
          {' '}
        </td>
        <td>
          {' '}
          { parseFloat(exchangeRates[currency].ask).toFixed(2) }
          {' '}
        </td>
        <td>
          {' '}
          { parseFloat(exchangeRates[currency].ask) * Number(value)}
        </td>
        <td> Real </td>
        <td>
          <button
            type="button"
            data-testid="delete-btn"
            onClick={ () => this.handleClick(id) }
          >
            Excluir
          </button>
        </td>
      </tr>
    );
  };

  handleClick = (id) => {
    const { dispatch } = this.props;
    dispatch(updateTable(id));
  };

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { expenses && expenses.map((item) => this.renderTable(item)) }
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
});

export default connect(mapStateToProps)(Table);
