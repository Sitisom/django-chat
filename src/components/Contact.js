import React from "react";
import { NavLink } from "react-router-dom";

const Contact = props => (
  <NavLink to={`${props.chatURL}`} style={{ color: "#fff" }}>
    <li className="contact">
      <div className="wrap">
        <span className={`contact-status ${props.status}`} />
        <p className="name">{props.name}</p>
      </div>
    </li>
  </NavLink>
);

export default Contact;
