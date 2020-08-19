import React from "react";
import PlantsContainer from "./plants_container";
import TextLoop from "react-text-loop";
import Wol from "./Wol.gif";

class Identifier extends React.Component {
 state = {
   imagePath: "",
   plants: [],
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

 componentDidMount() {
   if (this.props.queryImage) {
     console.log("ok")
      this.setState({ imagePath: this.props.queryImage },()=> this.postIdentification())
   }
 }

 postIdentification = (e) => {
   console.log("ok")
   e && e.preventDefault()
   let imagePath = this.state.imagePath

   if (this.state.queryImage) {
      imagePath =  this.state.queryImage
   }
     fetch("http://localhost:3000/api/v1/identifier", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
         "Accept": "application/json"
       },
       body: JSON.stringify({
         imagePath: imagePath
       })
     })
     .then(res => res.json())
     .then(data => {
       console.log(data)
       if (data.error) {
         this.setState({
           indentifierResponse: ["input cant be blank.", "give me a link", "or local path", "and try again!"],
           queryImage: this.state.imagePath,
           imagePath: ""
         })
      } else {
        console.log(data)
          this.setState({
             plants: data.plants,
            indentifierResponse: data.descriptions,
            queryImage: this.state.imagePath,
            imagePath: ""
          })
      }
    })
 }

 updateImagePath = e => {
  this.setState({ imagePath: e.target.value})
 }

  render(){
    let queryImage = ""
    let plants = ""
    console.log(this.state)

    if (this.state.queryImage){
      let src = this.state.queryImage
      queryImage = <img
            src={src}
            alt={this.props.scientific_name}
            className="queryImage"
          />;
    }

    if (this.state.plants.length > 0) {
      // console.log(this.state)
      plants =
      <>
       <h1>Here are Wol's top picks form the Plantae Kingdom:</h1>
       <div className="cards">
                <PlantsContainer
                currentUser={this.props.currentUser}
                {...this.props}
                {...this.state}
                backToWol={this.props.backToWol}
                identifier={this.imagePath}
                my_plants={this.state.plants[0]}/>

       </div>
       </>
  }

    if (this.props.currentUser) {

    return(
      <>
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
         <form onSubmit={this.postIdentification}>
         <h3>link to image</h3>
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
       <div>
       {plants}
       </div>
       </>

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
