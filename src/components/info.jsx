import React from "react";

class PlantShowPage extends React.Component {
  state = {
    plant: []
  }

  componentDidMount(){
    console.log(this.props)
    let API = `http://localhost:3000/api/v1/plants/${this.props.currentPlantId}`
    fetch(API)
   .then(res => res.json())
   .then(data => {
     if (data.errors) {
       alert(data.errors)
    } else {
      console.log(data)
      this.setState({
        plant: data.data
      })
    }
   })
  }

 goBack = (e) => {

}

  render(){
    console.log(this.state.plant.data)
    if(this.state.plant.data){
      console.log(this.state)
      let {
      author,
      bibliography,
      common_name,
      family,
      family_common_name,
      genus,
      genus_id,
      image_url,
      main_species,
      observations,
      scientific_name,
      slug,
      sources,
      species,
      subspecies,
      subvarieties,
      varieties,
      vegetable,
      year
    } = this.state.plant.data
    return(
      <div onClick={this.handleClick} onMouseEnter={this.setScientificName} onMouseLeave={this.resetScientificName} className="card">
      <img
            src={image_url}
            alt={this.props.scientific_name}
            className="showPage_image"
          />
     <p>Common Name: {common_name}</p>
     <p>Scientific Name: {scientific_name}</p>
     <p>Slug: {slug}</p>
     <p>Family Name: {family.name}</p>
     <p>Family Common Name: {family_common_name}</p>
     <p>Genus: {genus.name}</p>
     <p>Species: {main_species.common_name}</p>
     <p>Observations: {observations}</p>
     <p>Resources:</p>
     <p>{sources.map((source) => <a href={source.url}>{source.url}</a>)}</p>
      <p>Subspecies:</p>
     <p>{subspecies.map((subspecies) => <>{subspecies.common_name}, </>)}</p>
      <p>Varieties:</p>
     <p>{varieties.map((varieties) => <>{varieties.common_name}</>)}</p>
     <p>{vegetable}</p>
     <p>{year}</p>
     <p>{author}</p>
     <p>{bibliography}</p>

     <button onClick={()=>this.props.history.goBack()}> back ↩ </button>
    </div>
    )
  } else {
    return(
      <>
        <p>Loading...</p>
      </>
    )
   }
  }

}

export default PlantShowPage;
