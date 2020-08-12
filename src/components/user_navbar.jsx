import React from 'react';
import { Link } from 'react-router-dom';
import logo from "./PlantaeLogo.png";
const UserNavBar = props => {
  return (
    <>
        <a href="/">
          <img className="logo" src={logo} alt="Plantae logo" />
        </a>
      <div className="NavBar">
        <Link className="Link" to="/flowers">
          Flowers
        </Link>
        <Link className="Link" to="/plants">
          Plants
        </Link>
        <Link className="Link" to="/food">
          Food
        </Link>
        <Link className="Link" to="/identifier">
          Identifier
        </Link>
        <Link className="Link" to="/community">
          Community
        </Link>
        <Link className="Link" to="/my_garden">
          My Garden
        </Link>
        <Link className="Link" to="/log_out">
          Log Out
        </Link>
      </div>
    </>
  )
}

export default UserNavBar
