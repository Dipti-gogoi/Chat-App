import React, { Component } from "react";
import "../components/SideBar.css";

class SideBar extends Component {
  onClickHome = () => {
    this.props.history.push("/home");
  };

  onClickProfile = e => {
    this.props.history.push("/profile");
  };

  onClickSearchForFriend = () => {
    this.props.model.searchForUsers();
    this.props.history.push("/friends");
  };

  onClickSignOut = () => {
    this.props.model.LoginStatus = "";
    this.props.model.setCookie("");
    this.props.history.push("/");
  };

  onClickPosts = () => {
    this.props.model.searchForPosts();
    this.props.history.push("/posts");
  };

  render() {
    return (
      <ul>
        <li>
          <button className="rectangular" onClick={this.onClickProfile}>
            {this.props.model.UserName} Profile
          </button>
        </li>
        <li>
          <button className="rectangular" onClick={this.onClickHome}>
            Home
          </button>
        </li>
        <li>
          <button className="rectangular" onClick={this.onClickPosts}>
            posts
          </button>
        </li>
        <li>
          <button className="rectangular" onClick={this.onClickSearchForFriend}>
            Find a friend
          </button>
        </li>

        <li>
          <button className="rectangular" onClick={this.onClickSignOut}>
            Sign Out
          </button>
        </li>
      </ul>
    );
  }
}
export default SideBar;
