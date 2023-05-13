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
      <div
        className=" flex h-screen w-screen flex-col bg-black md:items-center md:justify-center "
      >
        <form className=" mt-24 space-y-8 rounded bg-black/80 py-10 px-6 md:mt-0 md:max-w-md md:px-14">
          <h1 className="text-slate-300 text-4xl font-semibold">Login </h1>
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

          <button
            className="text-slate-300 w-full rounded bg-sky-700 py-3 font-semibold"
            type="button"
            disabled={ buttonDisabled }
            onClick={ this.handleClick }
          >
            {' '}
            Entrar

          </button>
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
