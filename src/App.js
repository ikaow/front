import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router";
import { connect } from "react-redux";
import NewsContainer from "./container/NewsContainer";
import LoginContainer from "./container/LoginContainer";
import ProfileContainer from "./container/ProfileContainer";
import PrivateRoute from "./hoc/PrivateRoute";
import { authLogout } from "./ducks/auth";
import Header from "./components/Header/Header";
import styled from "styled-components";

const Wrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
  a {
    color: black;
    text-decoration: underline;
  }
`;

class App extends Component {
  render() {
    return (
      <Wrapper>
        <Header
          onLogout={this.props.onLogout}
          isAuthenticated={this.props.isAuthenticated}
        />
        <Switch>
          <Route exact path="/" component={NewsContainer} />
          <Route path="/login" component={LoginContainer} />
          <PrivateRoute path="/profile" component={ProfileContainer} />
          <Route component={() => <h1>404</h1>} />
        </Switch>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.rootReducer.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(authLogout)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
