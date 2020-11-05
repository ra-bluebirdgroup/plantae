import React from "react";
import { Link } from "react-router-dom";
import logo from "./PlantaeLogo.png";

const NavBar = (props) => {
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
          Edible
        </Link>
        <Link className="Link" to="/identifier">
          Ask Wol
        </Link>
        <Link className="Link" to="/login">
          Log in
        </Link>
        <Link className="Link" to="/signup">
          Sign Up
        </Link>
        <Link className="Link" to="/info">
          Info
        </Link>
      </div>
    </>
  )
}

export default NavBar
