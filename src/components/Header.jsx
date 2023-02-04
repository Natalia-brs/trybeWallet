import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const {
      userEmail, totalExpenses,
    } = this.props;
    return (
      <div>
        <p data-testid="email-field">
          { userEmail }
        </p>
        <p data-testid="total-field">
          {totalExpenses.toFixed(2)}
        </p>
        <p data-testid="header-currency-field"> BRL </p>

      </div>
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
