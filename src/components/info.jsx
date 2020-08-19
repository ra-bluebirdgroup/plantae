import React from "react";
import logo from "./PlantaeLogoNoTree.png";

class Info extends React.Component {
  state = {

  }

  render(){

    return(
      <div className="plantData">
      <a href="/">
                <img src={logo} alt="Plantae logo" />
      </a>
      <h1>A easy-to-use reference tool help users collect, organize, cite, and share botanical data.</h1>

      <h2>Overview:</h2>
      <h1>Plantae enables users users to explore 1 million indexed plants!</h1>
      <h1>As well as identify unknown plants by submitting a plant image.</h1>
    <h1> Please <a href="/signup">Sign Up</a> or <a href="/login">Log In</a></h1>
    <h2> to begin exploring the plantae kingdom...</h2>
      </div>
    )
  }

}

export default Info;
