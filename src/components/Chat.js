import React, { Component } from "react";
import SideBar from "./SideBar";
import "../components/Home.css";
import Header from "./Header";

class Chat extends Component {
  componentDidMount() {
    this.props.model.Login();
  }

  onClickPost = e => {
    this.props.model.Login();
    this.props.model.createPost();
    alert("Post created successfully, check your updated posts ");
    document.getElementById("post-content").value = "";
  };

  onChangeTextArea = e => {
    // Update the model *directly* using a model method.
    this.props.model.setPostContent(e.target.value);
  };
  render() {
    return (
      <div className="flex-container">
        <div className="header">
          <Header value={"POST A MESSAGE"} />
        </div>

        <div className="page-sidebar-container">
          <div className="page">
            <div className="text-area-view">
              <h3 htmlFor="exampleFormControlTextarea1">Create a post: </h3>
              <textarea
                id="post-content"
                rows="5"
                placeholder="type in here..."
                onChange={this.onChangeTextArea}
              />
              <button className="rectangular" onClick={this.onClickPost}>
                {this.props.model.UserName} Post
              </button>
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

export default Chat;
