import React, { Component, PropTypes } from "react";
import { Switch, Route } from "react-router";
import { StyleSheet, css } from "aphrodite";
import SmokeElement from "smoke-effect-react";
import { NavLink } from "react-router-dom"
import Cookies from "js-cookie"

import { puffIn } from "react-magic";
import Auth from "./auth";
import Registration from "./registration";

const styles = StyleSheet.create({
    bling: {
      animationName: puffIn,
      animationDuration: "1.5s",
    },
  });

const handleLogout = () => {
    Cookies.remove("username")
    props.handleSuccesfulLogout()
}

export default function NavBar(props) {
    return (
        <div className="navbar-wrapper">
            <div className="header-wrapper">
                <div className={css(styles.bling)}>
                    <div>
                    <Registration />
                    </div>
                    <div className="logo">
                        <h3>My Family Website</h3>
                    </div>
                    <div>
                    <Auth />
                    </div>
                </div>
            </div>


            <div className="navlinks-wrapper">
                <NavLink exact path="/" to="/">Home</NavLink>
                <NavLink path="/events" to="/events">Events</NavLink>
                <NavLink path="/chat" to="/chat">Chat</NavLink>
                <NavLink path="/family-info" to="/family-info">Family Info</NavLink>
            </div>
            <div className="greeting">
                Hello, {props.username}
                <button onClick={handleLogout}>Logout</button>
            </div> 
        </div>
    )
}