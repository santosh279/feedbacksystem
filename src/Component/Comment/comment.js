import React, { Component } from "react";
import CommentComponentView from "./commentView";
import axios from "axios";
import { Snackbar, Paper } from "@material-ui/core";

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
      firstCall: false,
      textAreaValue: "",
      diableOnclickOfTextField: false,
      respSuccess: false
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
      open: this.state.diableOnclickOfTextField
        ? this.state.open
        : !this.state.open,
      key: key
    });
  };

  componentWillMount() {
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

  changeFeed = (type, value, Index) => {
    let newValue =
      value.data === "Public Comment" ? "Team Comment" : "Public Comment";
    const matchContent = this.state.feedbacklist.filter(
      (item, key) => Index === key
    );
    let id =
      matchContent.length > 0 ? matchContent[0]._id : "11111111111111111111";
    let obj = {};
    obj[`${type}`] = newValue;
    this.updateApiCall(id, obj);
  };

  resolveButton = (type, value, Index) => {
    const matchContent = this.state.feedbacklist.filter(
      (item, key) => Index === key
    );
    let id = matchContent.length > 0 ? matchContent[0]._id : "1234567890";
    let obj = {};
    obj[`${type}`] = !value.data;
    console.log(obj);
    this.updateApiCall(id, obj);
  };

  updateApiCall = (id, obj) => {
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
        if (data.data.success && data.statusText === "OK") {
          this.setState({
            message: data.data.message,
            respSuccess: true
          });
          window.location.href = "/"
        } else {
          this.setState({
            message: data.data.message,
            respSuccess: true
          });
        }
      });
  };

  textArea = e => {
    this.setState({
      textAreaValue: e.target.value,
      diableOnclickOfTextField: true
    });
  };
  handleClose = () => {
    this.setState({
      respSuccess: false
    });
  };

  textAreaButton = i => {
    let temp = this.state.textAreaValue || " ";
    let newArrayValue = [];
    newArrayValue.push(temp);
    const matchContent = this.state.feedbacklist.filter(
      (item, key) => key === i
    );
    let id = matchContent.length > 0 ? matchContent[0]._id : "1234567890";
    let prevValues =
      matchContent.length > 0 ? matchContent[0].correspondingMessage : [];
    // console.log()
    let finalCorrespondingValues = prevValues.concat(newArrayValue);
    let obj = {};
    obj["correspondingMessage"] = finalCorrespondingValues;
    console.log(obj);
    this.updateApiCall(id, obj);
    this.eraseText();
  };

  eraseText = () => {
    document.getElementById("textArea").value = "";
  };

  render() {
    const { togglePanel, searchData } = this;
    const { open, key, searchItem, feedbacklist } = this.state;
    return (
      <div>
        <CommentComponentView
          {...this.props}
          togglePanel={togglePanel}
          open={open}
          keys={key}
          searchItem={searchItem}
          searchData={searchData}
          feedbacklist={feedbacklist}
          changeFeed={this.changeFeed}
          resolveButton={this.resolveButton}
          textArea={this.textArea}
          textAreaButton={this.textAreaButton}
          respSuccess={this.state.respSuccess}
        />
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          onClose={this.handleClose}
          open={this.state.respSuccess}
          message={this.state.message}
          autoHideDuration={4000}
        />
      </div>
    );
  }
}

export default Comment;
