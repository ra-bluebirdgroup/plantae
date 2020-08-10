import React from "react";

class PlantCard extends React.Component {
  state = {
    plant: this.props
  }

  render(){
      let { common_name, image_url, family_common_name, synonyms } = this.props;
    console.log(this.props)
    return(
      <div className="card">
      <img
            src={image_url}
            alt={common_name}
            className="card__image"
            // onClick={this.handleClick}
          />
      <p>Name: {common_name}</p>
      <p>Family: {family_common_name}</p>
    </div>
    )
  }

}

export default PlantCard;
