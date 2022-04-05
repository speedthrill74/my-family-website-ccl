import React, { Component } from "react"
import { Switch, Route } from "react-router";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from 'react-modal';
import Cookies from "js-cookie"

import Auth from "./auth";
import app from "./app";

Modal.setAppElement(".app-wrapper");

const token = " "; 

export default class Chat extends Component {
    constructor(props) {
        super(props)

        this.state = {
            error: undefined,
            isLoaded: false,
            text: [],
            user: [],
            data: [],
            showModal: false
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handlePageRefresh = this.handlePageRefresh.bind(this);
        this.getData = this.getData.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

  handleOpenModal () {
    this.setState({ 
      showModal: true 
    });
  }
    
    
  handleCloseModal () {
    this.setState({ 
      showModal: false 
    });
  }

  componentDidMount() {
    this.getData();
  }

  // componentDidUpdate(prevState) {
  //   if (prevState.text !== prevState.text) {
  //     this.getData(this.state.text);
  //   }
  // }
  
  handlePageRefresh() {
    window.location.reload(false);
}

  handleChange(e) {
    this.setState({
      [e.target.name] : e.target.value
    });
    event.preventDefault(event)
    console.log(this.State)  
}

  getData() {
    fetch("https://git.heroku.com/my-family-website-ccl.git/post/get", {
    })
    .then((response) => response.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          data: result
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      })
    }
  handleSubmit(e) {
    // const form = event.currentTarget;
    // const inputValue = form.elements["text", "user"].value;
    return fetch("https://git.heroku.com/my-family-website-ccl.git/post/add", {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
            text: this.state.text,
            user: this.state.user
        })
    })
    event.preventDefault(event)
  }
    
  render() {
    const { error, isLoaded, text, user, data } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="content-wrapper">
          
          {data.map((data) => (
          <div className="posts">
            <p>{data.text}</p>
            <p>{data.user}</p>

          </div>
          ))}
          <div className="modal">
            <button onClick={this.handleOpenModal}>Create Post</button>
            <Modal 
               isOpen={this.state.showModal}
               onSubmit={this.handleSubmit(event)}
               contentLabel="Modal"
            >
              <h2>Chat</h2>
              <label>
                Text:
              </label><br/>
                  
              <input type="text"
                     onChange={this.handleChange}
                     name="text"
                     placeholder="Add Text Here"
                     value={this.state.text}
                    />
                  <br/>
              <label>
                User:
              </label><br/>
              <input type="user"
                     onChange={this.handleChange}
                     name="user"
                     placeholder="Add Name Here"
                     value={this.state.user}
                    />
              <br/>
              <input type="submit" 
                     value="Submit" 
                    />
              
              <button onClick={this.handlePageRefresh, this.handleCloseModal}>Close Modal</button>
            </Modal>
          </div>
        </div>
      );
    }
  }
}