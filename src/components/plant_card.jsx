import React from "react";

class PlantCard extends React.Component {
  state = {
    plant: this.props,
    scientificName: "",
    image_url: ""
  }

  componentDidMount(){
    console.log(this.props)
    if (!this.props.image_url) {

      let API = 'http://localhost:3000/api/v1/getImage'
      fetch(API, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        scientificName: this.props.scientific_name
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
  } else {
   this.setState({
     image_url: this.props.image_url
   })
  }

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
    this.props.setCurrentPlantId(this.props)
}

  render(){
      let {family_ScientificName } = this.props;

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

export default PlantCard;
