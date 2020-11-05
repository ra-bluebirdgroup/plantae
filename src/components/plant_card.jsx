import React from "react";
import TextLoop from "react-text-loop";

class PlantCard extends React.Component {
  state = {
    plantid: false,
    plant: this.props,
    scientificName: "",
    image_url: ""
  }

  componentDidMount(){
    console.log(this.props.plant)

    if(this.props.plant) {

      this.setState({
        plantid: true,
        plant: this.props.plant,
        image_url: this.props.plant.similar_images[0].url
      })

    } else if (!this.props.image_url) {
      this.getImage()

  } else {
   this.setState({
     image_url: this.props.image_url
   })
  }

  }

  getImage = () => {
    let API = 'https://theplantaeapi.herokuapp.com/api/v1/getImage'
    fetch(API, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      scientificName: this.state.plant.scientific_name
    }
  })
  .then(res => res.json())
  .then(data => {
     if (data.errors) {
       alert(data.errors)
    } else {
      this.setState({
        image_url: data.data.hits[Math.floor(Math.random() * 24)].largeImageURL
      })
    }
   })
  }

 setScientificName = () => {
   this.setState({
      ScientificName: this.props.common_name
   })
 }

 resetScientificName  = () => {
   this.setState({
      ScientificName: ""
   })
 }

handleClick = (e) => {
  console.log(this.props)
    this.props.setCurrentPlantId(this.state.plant)
}

  render(){
    if(this.state.plantid) {
      return (
        <div onClick={this.handleClick} onMouseEnter={this.setScientificName} onMouseLeave={this.resetScientificName} className="card">
        <img
              src={this.state.image_url}
              alt={this.state.plant.plant_details.common_names}
              className="card_image"
            />
           <TextLoop className="common_name" children={this.props.plant.plant_details.common_names}interval={1000} springConfig={{ stiffness: 150 }}>
           </TextLoop>
        </div>
        )

    } else {

    return(
      <div onClick={this.handleClick} onMouseEnter={this.setScientificName} onMouseLeave={this.resetScientificName} className="card">
      <img
            src={this.state.image_url}
            alt={this.props.scientific_name}
            className="card_image"
          />
         <p className="common_name">{this.state.ScientificName}</p>
    </div>
    )
  }
 }
}

export default PlantCard;
