import React from "react";

class PlantCard extends React.Component {
  state = {
    plant: this.props,
    scientificName: "",
    image_url: ""
  }

  componentDidMount(){
    if (!this.props.image_url) {
      console.log(this.props)
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
      ScientificName: this.props.scientific_name
   })
 }

 resetScientificName  = () => {
   this.setState({
      ScientificName: ""
   })
 }


  render(){
      let {family_ScientificName } = this.props;

    return(
      <div onMouseEnter={this.setScientificName} onMouseLeave={this.resetScientificName} className="card">
      <img
            src={this.state.image_url}
            alt={this.props.scientific_name}
            className="card__image"
            // onClick={this.handleClick}
          />
         <p><a className="Link" href="api/ss">{this.state.ScientificName}</a></p>
    </div>
    )
  }

}

export default PlantCard;
