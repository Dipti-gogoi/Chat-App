/// Import modules reqiored by this module.
/// The {} means import a named component (not the default one).
import React, { Component } from "react";
import { LoginScreen } from "./components/LoginScreen";
import Profile from "./components/Profile";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import "./App.css";
import FriendList from "./components/FriendList";
import Posts from "./components/Posts";
import Chat from "./components/Chat";

class App extends Component {
  render() {
    return (
      <main>
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <LoginScreen {...props} model={this.props.model} />
              )}
            />
            <Route
              exact
              path="/home"
              render={props => <Home {...props} model={this.props.model} />}
            />
            <Route
              exact
              path="/profile"
              render={props => <Profile {...props} model={this.props.model} />}
            />
            <Route
              exact
              path="/friends"
              render={props => (
                <FriendList {...props} model={this.props.model} />
              )}
            />
            <Route
              exact
              path="/posts"
              render={props => <Posts {...props} model={this.props.model} />}
            />
            <Route
              exact
              path="/chat"
              render={props => <Chat {...props} model={this.props.model} />}
            />
          </Switch>
        </BrowserRouter>
      </main>
    );
  }
}
export default App;
