import React, { Component } from "react";
import logo from "../assets/logo.svg";
import "../components/LoginScreen.css";
import { observer } from "mobx-react";

export const LoginScreen = observer(
  class BasePage extends Component {
    ///

    OnLogin = e => {
      this.props.model.Login();
      console.log("test", this.props.model.LoginStatus);
      setTimeout(() => {
        if (this.props.model.LoginStatus) {
          this.props.history.push("/home");
        } else alert("check your user id and password");
      }, 2000);
    };

    ///
    OnChangeEmailAddress = e => {
      // Extract value from the event object.
      const NewValue = e.target.value;

      // Update the model *directly* using a model method.
      this.props.model.SetEmailAddress(NewValue);
    };

    ///
    OnChangePassword = e => {
      // Extract value from the event object.
      const NewValue = e.target.value;

      // Update the model *directly* using a model method.
      this.props.model.SetPassword(NewValue);
    };
    render() {
      return (
        <div align="center" className="login-screen-container">
          <img src={logo} className="logo" alt="" />

          <h1>Welcome Sign in to Continue</h1>
          <div className="form">
            <form>
              <label className="user-id">
                User ID:
                <input
                  type="text"
                  name="EmailAddress"
                  onChange={this.OnChangeEmailAddress}
                />
                <br />
              </label>
              <label>
                Password:
                <input
                  type="password"
                  name="Password"
                  onChange={this.OnChangePassword}
                />
              </label>
              <br />
            </form>
            <button className="submit-button" onClick={this.OnLogin}>
              Login
            </button>
          </div>
        </div>
      );
    }
  }
);
