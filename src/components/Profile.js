import React, { Component } from "react";
import avatar from "./../assets/avatar.png";
import SideBar from "./SideBar";
import "../components/Profile.css";
import Header from "./Header";

class Profile extends Component {
  render() {
    return (
      <div className="flex-container">
        <div className="header">
          <div className="header">
            <Header value={"PROFILE"} />
          </div>
        </div>
        <div className="page-sidebar-container">
          <div className="page">
            <div className="profile-form-view">
              <img src={avatar} className="avatar" alt="" />
              <div className="profile-form">
                <form>
                  <label>
                    User Name:
                    <input
                      type="text"
                      placeholder={this.props.model.UserName}
                    />
                    <br />
                  </label>
                  <label>
                    Email ID:
                    <input
                      type="text"
                      placeholder={this.props.model.EmailAddress}
                    />
                  </label>
                  <br />
                  <label>
                    Password:
                    <input
                      type="text"
                      placeholder={this.props.model.Password}
                    />
                  </label>
                  <br />
                  <input type="submit" value="EDIT" />
                  <input type="submit" value="SAVE" />
                </form>
              </div>
            </div>
          </div>
          <div className="side-bar">
            <SideBar {...this.props} listItems={this.sideBarList} />
          </div>
        </div>
        <div className="footer">Advertisement</div>
      </div>
    );
  }
}

export default Profile;
