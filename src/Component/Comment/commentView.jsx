import React from "react";
import Button from "@material-ui/core/Button";
import "./commentView.css";
import listJson from "./data.json";

const CommentComponentView = props => {
  console.log("feedbacklist>>>>>", props.feedbacklist);
  const filteredList = props.feedbacklist.filter(item => {
    return (
      item.message.toLowerCase().indexOf(props.searchItem.toLowerCase()) !== -1
    );
  });
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow fixed-top">
        <div className="container">
          <a className="navbar-brand">Feedback System</a>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              <Button
                className="button"
                style={{
                  backgroundColor: "white",
                  outlineColor: "#CAD5F9",
                  outlineStyle: "solid"
                }}
              >
                <i
                  className="fa fa-comments"
                  aria-hidden="true"
                  style={{ fontSize: "25px", marginRight: "2px" }}
                />
                Comments
              </Button>
              {/* </li> */}
            </ul>
          </div>
        </div>
      </nav>
      <div
        className="card"
        style={{ marginTop: "10%", width: "50%", marginLeft: "25%" }}
      >
        <div className="card-body">
          <div className="container">
            Comments
            <div
              className="custom-control custom-checkbox"
              style={{ top: "0px", left: "73%", display: "inline" }}
            >
              <input
                type="checkbox"
                className="custom-control-input"
                id="defaultChecked"
                checked
              />
              <label className="custom-control-label" for="defaultChecked">
                Current Page Only
              </label>
            </div>
            <div
              className="input-group md-form form-sm form-1 pl-0"
              style={{
                marginTop: "25px",
                width: "883px",
                marginBottom: "35px"
              }}
            >
              <div className="input-group-prepend">
                <span
                  className="input-group-text purple lighten-3"
                  id="basic-text1"
                >
                  <i className="fa fa-search text-white" aria-hidden="true" />
                </span>
              </div>
              <input
                className="form-control my-0 py-1"
                type="text"
                placeholder="Search in comments"
                aria-label="Search in comments"
                onChange={e => props.searchData(e)}
              />
            </div>
            <p>
              {filteredList.length > 0 ? (
                filteredList.map((item, key) => {
                  return (
                    <div className="card" style={{ marginBottom: "10px" }}>
                      <div
                        className="card-header"
                        style={{ backgroundColor: "white", height: "60px" }}
                      >
                        {item.feedBackType === "Team Comment" ? (
                          <select
                            id="dropdown"
                            style={{
                              border: "none",
                              background: "none",
                              outline: "none"
                            }}
                            onClick={e => props.changeFeed("feedBackType", key)}
                          >
                            <option value={item.feedBackType}>
                              {item.feedBackType}
                            </option>
                            <option value="Public Comment">
                              Public Comment
                            </option>
                          </select>
                        ) : (
                          <select
                            id="dropdown"
                            style={{
                              border: "none",
                              background: "none",
                              outline: "none"
                            }}
                            onClick={e => props.changeFeed("feedBackType", key)}
                          >
                            <option value={item.feedBackType}>
                              {item.feedBackType}
                            </option>
                            <option value="Team Comment">Team Comment</option>
                          </select>
                        )}
                      </div>
                      <div
                        style={{
                          position: "absolute",
                          display: "inline",
                          top: "13px",
                          left: "84%"
                        }}
                      >
                        <p>Notify:</p>
                        <select
                          style={{
                            display: "inline",
                            top: "2px",
                            left: "60px",
                            position: "absolute",
                            background: "none",
                            border: "none",
                            outline: "none"
                          }}
                        >
                          <option>{item.notify}</option>
                        </select>
                      </div>
                      <div
                        className="card-body content"
                        onClick={e => props.togglePanel(e, key)}
                      >
                        <img
                          src={`http://localhost:5000/image/${item.image}`}
                          width="30"
                          height="30"
                          alt="logo"
                          style={{ borderRadius: "50%" }}
                        />
                        <p
                          style={{
                            display: "inline",
                            marginLeft: "15px",
                            fontSize: "20px",
                            fontStyle: "oblique",
                            fontFamily: "auto"
                          }}
                        >
                          {item.name}:{item.message}
                        </p>
                        <div
                          style={{
                            display: "inline",
                            position: "absolute",
                            top: "100px",
                            left: "60px"
                          }}
                        >
                          <p>{item.time.split("T")[0]}</p> {/* <div> */}
                          <li
                            style={{
                              position: "absolute",
                              top: "0px",
                              left: "70px"
                            }}
                          >
                            <div
                              style={{
                                position: "absolute",
                                top: "0px",
                                left: "10px"
                              }}
                            >
                              <i className="fa fa-heart" />
                            </div>
                            <div
                              style={{
                                position: "absolute",
                                top: "0px",
                                left: "30px"
                              }}
                            >
                              {item.likes}
                            </div>
                          </li>
                          {/* </div> */}
                        </div>

                        {/* <span className="dot" style={{ display: "inline" }} /> */}
                      </div>
                      <div>
                        {/* {item.correspondingMessage.forEach(element => {
                        console.log("inside the coresponding element", element);
                        return <div>{element}</div>;
                      })} */}
                        {props.open && props.keys === key ? (
                          <div className="card-body">
                            <textarea
                              rows="5"
                              cols="60"
                              placeholder="What is your Response?"
                            />
                            <Button
                              variant="contained"
                              color="primary"
                              style={{ marginLeft: "-74%", marginTop: "10%" }}
                            >
                              Add Comment
                            </Button>
                          </div>
                        ) : null}
                      </div>
                      <div
                        className="card-footer"
                        style={{ backgroundColor: "white", height: "60px" }}
                      >
                        <select
                          style={{
                            border: "none",
                            background: "none",
                            outline: "none"
                          }}
                        >
                          <option>Assign to someone</option>
                          <option>Assign to Everyone</option>
                        </select>
                        <div
                          className="custom-control custom-checkbox"
                          style={{ top: "0px", left: "70%", display: "inline" }}
                        >
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            // id="defaultCheckedResolve"
                            checked={item.resolve}
                          />
                          <label
                            className="custom-control-label"
                            // for="defaultCheckedResolve"
                          >
                            Resolve
                          </label>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div style={{ textAlign: "center" }}>
                  {"No Feedbacks Found"}
                </div>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentComponentView;
