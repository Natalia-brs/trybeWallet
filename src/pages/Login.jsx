import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginAction } from '../redux/actions';
import walletLogo from '../images/wallet-logo.png';

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
      <div
        className=" flex h-screen w-screen
        flex-col bg-black md:items-center md:justify-center "
      >
        <div
          className="flex mt-24 items-center justify-center space-y-8
        rounded bg-black/80 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
        >
          <h1 className="text-slate-300 text-4xl font-semibold">Wallet App</h1>
          <img
            className=" w-24"
            src={ walletLogo }
            alt="wallet"
          />
        </div>
        <form
          className=" mt-24 space-y-8
        rounded bg-black/80 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
        >
          <h4 className="text-slate-300 text-4xl font-semibold">Login </h4>
          <div className="space-y-4">
            <label
              className="inline-block w-full"
              htmlFor="email-input"
            >
              <input
                className="input"
                data-testid="email-input"
                placeholder="Email"
                type="textbox"
                name="email"
                value={ email }
                id="email-input"
                onChange={ this.handleChange }
              />
            </label>

            <label
              className="inline-block w-full"
              htmlFor="pass-input"
            >
              <input
                className="input text-slate-300"
                data-testid="password-input"
                placeholder="Senha"
                type="password"
                name="password"
                value={ password }
                id="pass-input"
                onChange={ this.handleChange }
              />
            </label>
          </div>
          { buttonDisabled ? (
            <button
              className="text-slate-300 w-full rounded
              bg-blue-500 py-3 font-semibold opacity-50 cursor-not-allowed"
              type="button"
              onClick={ this.handleClick }
            >
              {' '}
              Entrar
            </button>
          ) : <button
            className="text-slate-300 w-full rounded bg-sky-500  py-3 font-semibold"
            type="button"
            onClick={ this.handleClick }
          >
            {' '}
            Entrar
            </button> }
        </form>
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
