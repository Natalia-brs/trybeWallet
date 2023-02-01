import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginAction } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      buttonDisabled: true,
    };
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const { value } = target;
    this.setState({
      [name]: value,
    }, () => this.validateForm());
  };

  handleClick = () => {
    const { dispatch, history } = this.props;
    dispatch(loginAction({ ...this.state }));
    history.push('/carteira');
  };

  validateForm = () => {
    const { email, password } = this.state;
    const passCharacters = 6;
    const regexMail = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
    const validateEmail = regexMail.test(email);
    const validatePassword = password.length >= passCharacters;
    this.setState({
      buttonDisabled: !(
        validateEmail
        && validatePassword
      ),
    });
  };

  render() {
    const { email, password, buttonDisabled } = this.state;
    return (
      <div>
        <label htmlFor="email-input">
          <span>E-mail: </span>
          <input
            data-testid="email-input"
            type="text"
            name="email"
            value={ email }
            id="email-input"
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="pass-input">
          <span>Password: </span>
          <input
            data-testid="password-input"
            type="password"
            name="password"
            value={ password }
            id="pass-input"
            onChange={ this.handleChange }
          />
        </label>

        <button
          type="button"
          disabled={ buttonDisabled }
          onClick={ this.handleClick }
        >
          {' '}
          Entrar

        </button>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
