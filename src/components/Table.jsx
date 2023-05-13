import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { HiOutlineTrash } from 'react-icons/hi2';
import { updateTable } from '../redux/actions/index';

class Table extends Component {
  renderTable = (dado) => {
    const { description, method, currency, tag, value, id, exchangeRates } = dado;

    return (
      <tr
        className=" bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700"
        key={ id }
      >
        <td
          className="whitespace-nowrap px-14 py-4"
        >
          {' '}
          {description}
          {' '}
        </td>
        <td className="whitespace-nowrap px-14 py-4">
          {' '}
          { tag }
          {' '}
        </td>
        <td className="whitespace-nowrap px-14 py-4">
          {' '}
          { method }
          {' '}
        </td>
        <td className="whitespace-nowrap px-14 py-4">
          {' '}
          { Number(value).toFixed(2) }
          {' '}
        </td>
        <td className="whitespace-nowrap px-14 py-4">
          {' '}
          { exchangeRates[currency].name }
          {' '}
        </td>
        <td className="whitespace-nowrap px-14 py-4">
          {' '}
          { parseFloat(exchangeRates[currency].ask).toFixed(2) }
          {' '}
        </td>
        <td className="whitespace-nowrap px-14 py-4">
          {' '}
          { parseFloat(exchangeRates[currency].ask) * Number(value)}
        </td>
        <td className="whitespace-nowrap px-14 py-4"> Real </td>
        <td>

          <button
            className=" rounded-md bg-cyan-600 whitespace-nowrap px-14 py-4"
            type="button"
            data-testid="delete-btn"
            onClick={ () => this.handleClick(id) }
          >
            <HiOutlineTrash />
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
      <div className="flex flex-col overflow-x-auto  scrollbar-thin scrollbar-track-transparent scrollbar-thumb-cyan-600">
        <div className="sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-x-auto ">
              <table className="text-sm font-light">
                <thead className="bg-white font-medium">
                  <tr className="bg-stone-950">
                    <th scope="col" className="px-10 py-4 text-slate-300">Descrição</th>
                    <th scope="col" className="px-6 py-4 text-slate-300">Tag</th>
                    <th scope="col" className="px-6 py-4 text-slate-300">Método de pagamento</th>
                    <th scope="col" className="px-6 py-4 text-slate-300">Valor</th>
                    <th scope="col" className="px-6 py-4 text-slate-300">Moeda</th>
                    <th scope="col" className="px-6 py-4 text-slate-300">Câmbio utilizado</th>
                    <th scope="col" className="px-6 py-4 text-slate-300">Valor convertido</th>
                    <th scope="col" className="px-6 py-4 text-slate-300">Moeda de conversão</th>
                    <th scope="col" className="px-6 py-4 text-slate-300">Editar/Excluir</th>
                  </tr>
                </thead>
                <tbody>
                  { expenses && expenses.map((item) => this.renderTable(item)) }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
});

export default connect(mapStateToProps)(Table);
