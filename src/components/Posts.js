import React, { Component } from "react";
import SideBar from "./SideBar";
import Header from "./Header";
import "../components/Posts.css";

import { observer } from "mobx-react";

const Posts = observer(
  class BasePage extends Component {
    componentDidMount() {
      this.props.model.searchForPosts();
      this.props.model.Login();
    }

    onClickUser = e => {
      this.props.history.push("/chat");
    };

    render() {
      const model = this.props.model;
      return (
        <div className="flex-container">
          <div className="header">
            <Header value={"POSTS"} />
          </div>
          <div className="page-sidebar-container">
            <div className="page">
              {model.loading ? (
                <p>fetching your posts...</p>
              ) : (
                <ul>
                  {model.posts.map(post => (
                    <li>
                      <div className="post">
                        <p className="user">{post.Sender}</p>
                        <p className="content">{post.PostHtml}</p>
                        <p className="user">{post.Recipient}</p>
                        <p className="date">{post.PostedOnUtc}</p>
                      </div>
                    </li>
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
export default Posts;
