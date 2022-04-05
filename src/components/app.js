import React, { Component } from 'react';
import { Switch, Route } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";

import Home from "./home";
import Auth from "./auth";
import Registration from "./registration";
import NavBar from "./nav-bar";
import Footer from "./footer";
import Chat from "./chat";
import Events from "./events";
import FamilyInfo from "./family-info";

export default class App extends Component {
  constructor(props) {
    super()

    this.state = {
      userData: {}
    }

    this.handleSuccesfulLogin = this.handleSuccesfulLogin.bind(this)
    this.handleSuccesfulLogout = this.handleSuccesfulLogout.bind(this)
  }

  componentDidMount() {
    if (Cookies.get("username")) {
      fetch("http://127.0.0.1:5000/user/get")
      .then(response => response.json())
      .then(data => {
        const userData = data.filter(user => user.username == Cookies.get("username"))[0]
        this.setState({ userData })
      })
    }
  }

  handleSuccesfulLogin(username) {
    fetch("http://127.0.0.1:5000/user/get")
    .then(response => response.json())
    .then(data => {
      const userData = data.filter(user => user.username == username)[0]
      this.setState({ userData })
    })
  }

  handleSuccesfulLogout() {
    this.setState({
      userData: {}
    })
  }


  render() {
    return (
      <div className='app'>
        <div className="page-wrapper">
          <NavBar username={this.state.userData.username} handleSuccesfulLogout={this.handleSuccesfulLogout} />

          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/events" component={Events} />
            <Route path="/chat" component={Chat} />
            <Route path="/family-info" component={FamilyInfo} />
          </Switch>

          <Footer />
        </div>
      </div>
    );
  }
}