import React from "react";

class PlantCard extends React.Component {
  state = {
    plant: this.props
  }

  render(){
      let { common_name, image_url, family_common_name } = this.props;
      if (!image_url) {
        image_url = 'https://www.savetheredwoods.org/wp-content/uploads/JedediahSmithRedwoodscrop-1024x516.jpg'
      }
    console.log(this.props)
    return(
      <div className="card">
      <img
            src={image_url}
            alt={common_name}
            className="card__image"
            onError={this.addDefaultSrc}
            // onClick={this.handleClick}
          />

    </div>
    )
  }

}

export default PlantCard;
