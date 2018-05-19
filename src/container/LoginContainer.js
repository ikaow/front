import propTypes from "prop-types";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { authorize } from "../ducks/auth";
import PreLoader from "../components/PreLoader/PreLoader";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import styled from "styled-components";

const LoginForm = styled.form`
  margin-top: 30px;
  input {
    margin-right: 15px;
  }
`;

class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.emailInputRef = React.createRef();
    this.passInputRef = React.createRef();
  }

  onAuth = e => {
    this.props.dispatch(
      authorize({
        email: this.emailInputRef.current.value,
        password: this.passInputRef.current.value
      })
    );
    e.preventDefault();
  };

  clearPasswordInput(err) {
    if (
      err !== null &&
      this.passInputRef.current !== null &&
      err.message === "wrong_email_or_password"
    ) {
      return (this.passInputRef.current.value = "");
    }
  }

  render() {
    const { loading, error } = this.props.auth;
    this.clearPasswordInput(error);
    return (
      <Fragment>
        <LoginForm onSubmit={this.onAuth}>
          <label htmlFor="email">
            Email:
            <input type="email" ref={this.emailInputRef} disabled={loading} />
          </label>
          <label htmlFor="password">
            Пароль:
            <input type="password" ref={this.passInputRef} disabled={loading} />
          </label>
          <input
            type="submit"
            value={loading ? "Проверяю…" : "LogIn"}
            disabled={loading}
          />
        </LoginForm>
        <PreLoader loading={loading} />
        <ErrorMessage error={error} />
      </Fragment>
    );
  }
}

LoginContainer.propTypes = {
  auth: propTypes.shape({
    loading: propTypes.bool.isRequired,
    error: propTypes.object
  })
};

const mapStateToProps = state => ({
  auth: state.rootReducer.auth
});

export default connect(mapStateToProps)(LoginContainer);
