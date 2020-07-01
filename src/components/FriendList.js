import React, { Component } from "react";
import SideBar from "./SideBar";
import Header from "./Header";
import { observer } from "mobx-react";

const FriendList = observer(
  class BasePage extends Component {
    componentDidMount() {
      this.props.model.searchForUsers();
    }

    onClickUser = e => {
      console.log("event1234", e.target.id);
      this.props.model.setReceipentId(e.target.id);
      this.props.history.push("/chat");
    };

    render() {
      const model = this.props.model;
      return (
        <div className="flex-container">
          <div className="header">
            <Header value={"FRIEND LIST"} />
          </div>
          <div className="page-sidebar-container">
            <div className="page">
              {model.loading ? (
                <p>fetching your friends...</p>
              ) : (
                <ul>
                  {model.friendList.map(user => (
                    <button
                      className="rectangular"
                      onClick={this.onClickUser}
                      id={user.UserSid}
                    >
                      {user.UserName}
                    </button>
                  ))}
                </ul>
              )}
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
);
export default FriendList;
