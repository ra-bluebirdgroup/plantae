import React from "react";
import TextLoop from "react-text-loop";
import tenor from "./tenor.gif";

class Identifier extends React.Component {
 state = {
   imagePath: "",
   indentifierResponse: []
 }
 content: {
   content: ' ';
   position: "absolute";
   width: "0";
   height: "0";
   left: "-8px";
   right: "auto";
   top: "auto";
   bottom: "-40px";
   border: "32px solid";
   color: "transparent transparent transparent #666";
   "&::after": {
     content: ' ';
     position:" absolute";
     width: "0";
     height: "0";
     left:" 0px";
     right: "auto";
     top: "auto";
     bottom: "-20px";
     border: "22px solid";
     color: "transparent transparent transparent lightyellow";

        }
    }

 componentDidMount(){
   const user_id = localStorage.user_id

   if (user_id) {
    fetch("http://localhost:3000/api/v1/auto_login", {
      headers: {
        "Authorization": user_id
      }
    })
    .then(res => res.json())
    .then(response => {
      if (response.errors){
       alert(response.errors)
     } else {
        this.props.setUser(response)
       }
    })
  }

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
       console.log(data.data)
          this.setState({indentifierResponse: data})
      })
 }

 updateImagePath = e => {
  this.setState({ imagePath: e.target.value})
 }

  render(){
    console.log(this.state)
    if (this.props.currentUser) {

    return(
      <div className="identifier-page">
      <div className="talk-bubble tri-right border round btm-left-in">
      <div className="talktext">
      <h2>
               <TextLoop interval={2000} springConfig={{ stiffness: 150 }}>
                  <span>Greetings {this.props.currentUser.user.username}...</span>
                   <span>Welcome to Plantae!</span>
                   <span>My name is Wol</span>
                   <span>an old wise owl</span>
                   <span>if you need advice</span>
                   <span>identifiying a plant</span>
                   <span>show me an image</span>
                   <span>and get my opinion</span>
                   <span></span>
               </TextLoop>{" "}
           </h2>
      </div>
      </div><br/>
      <div className="triangle">
      </div>
      <img
            src={tenor}
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
             value={this.state.image_url}
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
