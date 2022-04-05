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

export default class Events extends Component {
    constructor(props) {
        super(props)

        this.state = {
            error: undefined,
            isLoaded: false,
            event_name: [],
            place: [],
            date: [],
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
    fetch("https://git.heroku.com/my-family-website-ccl.git/event/get", {
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
    return fetch("https://git.heroku.com/my-family-website-ccl.git/event/add", {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
            event_name: this.state.event_name,
            place: this.state.place,
            date: this.state.date,
        })
    })
    event.preventDefault(event)
  }
    
  render() {
    const { error, isLoaded, event_name, place, date, data } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="content-wrapper">
          
          {data.map((data) => (
          <div className="posts">
            <p>{data.event_name}</p>
            <p>{data.place}</p>
            <p>{data.date}</p>

          </div>
          ))}
          <div className="modal">
            <button onClick={this.handleOpenModal}>Create Event</button>
            <Modal 
               isOpen={this.state.showModal}
               onSubmit={this.handleSubmit(event)}
               contentLabel="Modal"
            >
              <h2>Event</h2>
              <label>
                Name of Event:
              </label><br/>
                  
              <input type="text"
                     onChange={this.handleChange}
                     name="event_name"
                     placeholder="Add Name of the Event Here"
                     value={this.state.event_name}
                    />
                  <br/>
              <label>
                Location:
              </label><br/>
              <input type="text"
                     onChange={this.handleChange}
                     name="place"
                     placeholder="Add Location Here"
                     value={this.state.place}
                    />
              <br/>
              <label>
                Date of event:
              </label><br/>
              <input type="text"
                     onChange={this.handleChange}
                     name="date"
                     placeholder="Add Date of Event Here"
                     value={this.state.date}
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