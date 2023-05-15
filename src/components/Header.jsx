import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import walletLogo from '../images/wallet-logo.png';

class Header extends Component {
  render() {
    const {
      userEmail, totalExpenses,
    } = this.props;
    return (
      <header className="flex items-center  m-8 rounded-md pl-2 bg-cyan-700 w-84">
        <div className="flex items-center  m-2  pl-2 bg-cyan-700 space-x-2 md:space-x-10">
          <div>
            <img
              className=" w-20"
              src={ walletLogo }
              alt="wallet"
            />
          </div>
          <p
            className="text-zinc-50"
            data-testid="email-field "
          >
            { userEmail }
          </p>
          <p
            className="text-zinc-50"
            data-testid="total-field"
          >
            R$:
            {' '}
            {totalExpenses.toFixed(2)}
          </p>
        </div>
      </header>
    );
  }
}

const mapStateToProps = ({ user, wallet }) => ({
  userEmail: user.email,
  totalExpenses: wallet.totalExpenses,
});

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  totalExpenses: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
