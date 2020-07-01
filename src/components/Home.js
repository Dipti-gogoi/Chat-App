import React, { Component } from "react";
import SideBar from "./SideBar";
import "../components/Home.css";
import Header from "./Header";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  async componentDidMount() {
    this.props.model.Login();
    setTimeout(() => {
      this.setState({
        loading: false
      });
    }, 2000);
  }

  render() {
    if (this.state.loading)
      return (
        <h1>
          Welcome, {this.props.model.UserName} wait for while your app is
          Loading....
        </h1>
      );
    return (
      <div className="flex-container">
        <div className="header">
          <Header name={this.props.model.UserName} value={"CHAT APP"} />
        </div>
        <div className="page-sidebar-container">
          <div className="page">
            <div className="text-area-view">
              <p>Welcome, {this.props.model.UserName} explore your chat app</p>
            </div>
          </div>
          <div className="side-bar">
            <SideBar {...this.props} />
          </div>
        </div>
        <div className="footer">Advertisement</div>
      </div>
    );
  }
}

export default Home;
