import React from "react";
import TextLoop from "react-text-loop";
import Wol from "./Wol.gif";

class Identifier extends React.Component {
 state = {
   imagePath: "",
   indentifierResponse: [
     <span>Greetings {this.props.currentUser && this.props.currentUser.user.username}...</span>,
    <span>Welcome to Plantae!</span>,
    <span>My name is Wol</span>,
    <span>an old wise owl</span>,
    <span>if you need advice</span>,
    <span>identifiying a plant</span>,
    <span>show me an image</span>,
    <span>and get my opinion</span>,
    <span></span>
  ],
  queryImage: null
 }

 postIdentification = e => {
   e.preventDefault()
     fetch("http://localhost:3000/api/v1/identifier", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
         "Accept": "application/json"
       },
       body: JSON.stringify({
         imagePath: this.state.imagePath
       })
     })
     .then(res => res.json())
     .then(data => {
       console.log(data)
          this.setState({
            indentifierResponse: data.descriptions,
            queryImage: this.state.imagePath,
            imagePath: ""
          })
      })
 }

 updateImagePath = e => {
  this.setState({ imagePath: e.target.value})
 }

  render(){
    let queryImage = ""
    console.log(this.state)
    if (this.state.queryImage){
      let src = this.state.queryImage
      queryImage = <img
            src={src}
            alt={this.props.scientific_name}
            className="queryImage"
          />;
    }

    if (this.props.currentUser) {

    return(

      <div className="identifier-page">
      {queryImage}
      <div className="talk-bubble tri-right border round btm-left-in">
      <div className="talktext">
      <h2>
               <TextLoop children={this.state.indentifierResponse}interval={2000} springConfig={{ stiffness: 150 }}>
               </TextLoop>{" "}
           </h2>
      </div>
      </div><br/>
      <div className="triangle">
      </div>
      <img
            src={Wol}
            alt={this.props.scientific_name}
            className="tenor"
          />
       <div className="identifier-form">
         <h1>Ask Wol</h1>
         <p>the plant identifiying owl</p>
         <form className="identifier-form" onSubmit={this.postIdentification}>
         <h1>link to image</h1>
           <p>enter image url or local path</p>
           <input
             name="image_url"
             value={this.state.imagePath}
             type="image_url"
             onChange={this.updateImagePath}
             placeholder="image url"
           /><br/><br/>
           <button className="identify-button" type="submit">
             go
           </button>
          </form>
       </div>
       </div>
    )
  } else {
    return(
      <>
        <h1>Please Sign up, or Log in to start identifiying plants!</h1>
      </>
    )
  }
 }
}
export default Identifier;
