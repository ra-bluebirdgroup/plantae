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
      <Link className="Link" to="/my_garden">
        My Garden
      </Link>
        <Link className="Link" to="/flowers">
          Flowers
        </Link>
        <Link className="Link" to="/plants">
          Plants
        </Link>
        <Link className="Link" to="/food">
          Edible
        </Link>
        <Link className="Link" to="/identifier">
          Ask Wol
        </Link>
        <Link className="Link" to="/log_out">
          Log Out
        </Link>
        <input
          placeholder="Search plants"
          type="text"
          className="searchinput"
        />
        <button name="searchButton" className="searchButton"><b>search</b></button>
      </div>
    </>
  )
}

export default UserNavBar
