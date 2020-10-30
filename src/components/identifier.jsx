import React from "react";
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
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
    <span>I'll describe it for you!</span>,
    <span></span>
  ],
  queryImage: null,
  camera: ""
 }

 componentDidMount() {
   if (this.props.queryImage) {
      this.setState({ imagePath: this.props.queryImage },()=> this.postIdentification())
   }
 }

 handleTakePhoto = (dataUri) => {
   this.setState({
     queryImage: dataUri,
     camera: ""
   })
  this.postId()
 }

 takePhoto = () => {
   if (this.state.queryImage) {
    console.log(this.state)
   } else {
   return (
     this.setState({
   camera: <Camera
     onTakePhoto = { (dataUri) => { this.handleTakePhoto(dataUri); } }
   />
 })
 )
}
 }

 postId = () => {
   const data = {
         api_key: process.env.REACT_APP_PLANTID,
         images: this.state.queryImage,
         modifiers: ["crops_fast", "similar_images"],
         plant_language: "en",
         plant_details: ["common_names",
                           "url",
                           "name_authority",
                           "wiki_description",
                           "taxonomy",
                           "synonyms"]
       }

       fetch('https://api.plant.id/v2/identify', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify(data),
       })
       .then(response => response.json())
       .then(data => {
         console.log('Success:', data);
       })
       .catch((error) => {
         console.error('Error:', error);
       })
 }

 postIdentification = (e) => {
   e && e.preventDefault()

     fetch("https://theplantaeapi.herokuapp.com/api/v1/identifier", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
         "Accept": "application/json"
       },
       body: JSON.stringify({
         imagePath: this.state.queryImage
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

      plants =
      <>
      <div className="card">
       <h1>Here are Wol's top picks form the Plantae Kingdom:</h1>
       </div>
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
      <div className="talk-bubble tri-right border round btm-left-in">
      <div className="talktext">
      <h2>
               <TextLoop children={this.state.indentifierResponse}interval={1000} springConfig={{ stiffness: 150 }}>
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
         {this.queryImage}
         <p>the plant identifiying owl</p>
              {queryImage}
         <h3>link to image</h3>
           <p>enter image url or local path</p>
           <input type="file" accept=".jpg"/>
           <button onClick={this.takePhoto}>Take Photo</button>
           <br/><br/>
           {this.state.camera}

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
