import React, { Component } from "react";
import CommentComponentView from "./commentView";
import axios from "axios";
class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      key: null,
      searchItem: "",
      feedbacklist: [],
      message: "",
      refresh: false,
      firstCall: true
    };
  }

  searchData = e => {
    console.log(e.target.value);
    this.setState({
      searchItem: e.target.value
    });
  };
  togglePanel = (e, key) => {
    e.preventDefault();
    this.setState({
      open: !this.state.open,
      key: key
    });
  };

  componentWillMount() {
    const { refresh, firstCall } = this.state;
    if (true) {
      const url = `http://localhost:5000/feedback/feedback_list`;
      axios
        .get(url)
        .then(response => response.data)
        .then(data => {
          if (data.success) {
            this.setState({ feedbacklist: data.result });
          }
        });
    }
  }

  changeFeed = (e, Index) => {
    var value = document.getElementById("dropdown").value;
    console.log("value", e, value);
    const matchContent = this.state.feedbacklist.filter(
      (item, key) => Index === key
    );
    let id =
      matchContent.length > 0 ? matchContent[0]._id : "11111111111111111111";
    console.log("value inside the match", id);
    let obj = {};
    obj[`${e}`] = value;
    console.log(obj);
    let req = {
      url: `http://localhost:5000/feedback/feedback_messages/${id}/_update`,
      method: "PUT",
      data: {
        data: obj
      }
    };
    axios(req)
      .then(response => response)
      .then(data => {
        console.log(data);
        if (data.data.success && data.statusText === "OK") {
          this.setState({
            message: data.data.message
            // refresh: true
          });
          console.log("inside the update", this.state.message);
        } else {
          this.setState({
            message: data.data.message
          });
        }
      });
  };
  render() {
    console.log("key value inside the render", this.state.key);
    const { togglePanel, searchData } = this;
    const { open, key, searchItem, feedbacklist } = this.state;
    return (
      <CommentComponentView
        {...this.props}
        togglePanel={togglePanel}
        open={open}
        keys={key}
        searchItem={searchItem}
        searchData={searchData}
        feedbacklist={feedbacklist}
        changeFeed={this.changeFeed}
      />
    );
  }
}

export default Comment;
