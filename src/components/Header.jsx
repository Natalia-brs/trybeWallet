import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const {
      userEmail,
    } = this.props;
    return (
      <div>

        <p data-testid="email-field">
          {' '}
          E-mail:
          {' '}
          { userEmail }
        </p>
        <p data-testid="total-field"> 0 </p>
        <p data-testid="header-currency-field"> BRL </p>

      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  userEmail: user.email,
});

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
