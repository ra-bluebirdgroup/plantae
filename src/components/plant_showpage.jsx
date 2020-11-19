import React from "react";
import TextLoop from "react-text-loop";

class PlantShowPage extends React.Component {
  state = {
    plant: [],
    image_url: ""
  }

  componentDidMount(){
    if (this.props.currentPlant &&  this.props.currentPlant.plant_details) {
      this.setState({
        plant: this.props.currentPlant,
        scientific_name: this.props.currentPlant.plant_details.scientific_name
      })
    } else {
    let API = `https://theplantaeapi.herokuapp.com/api/v1/plants/${this.props.currentPlant.id}`
    fetch(API)
   .then(res => res.json())
   .then(data => {
     if (data.errors) {
       alert(data.errors)
    } else {
      this.setState({
        plant: data.data,
        scientific_name: data.data.data.scientifiic_name
      },()=> this.setImage())
     }
    })
   }
  }

  setImage = () => {

    if (this.state.plant.data.image_url) {
      this.setState({
        image_url: this.state.plant.data.image_url
      })
    } else if (this.props.plant_details) {
     this.setState({
       image_url: this.state.plant.similar_images
      })
     } else {
      let API = 'https://theplantaeapi.herokuapp.com/api/v1/getImage'
      fetch(API, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        scientificName: this.state.plant.data.scientific_name
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

  }


  addOrRemovePlant = (event) => {
    event.persist()
  console.log(this.props)
    if (event.target.value === "add to garden!") {

    fetch("https://theplantaeapi.herokuapp.com/api/v1/user_plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        Authorization: `Bearer ${this.props.currentUser.token}`
      },
      body: JSON.stringify({
        username: this.props.currentUser.user.username,
        plantid: this.state.scientific_name
      })
    })
    .then(res => res.json())
    .then(data => {
       if (data.errors) {
         alert(data.errors)
      } else {
        console.log(data)
        this.props.setUser(data)
      }
     })

   } else {

     fetch(`https://theplantaeapi.herokuapp.com/api/v1/user_plants/${this.state.plant.data.scientific_name}`, {
       method: "DELETE",
       headers: {
         "Content-Type": "application/json",
         "Accept": "application/json",
          Authorization: `Bearer ${this.props.currentUser.token}`
       },
       body: JSON.stringify({
         username: this.props.currentUser.user.username,
         plantid: this.state.plant.data.scientific_name
       })
     })
     .then(res => res.json())
     .then(data => {
            console.log(data)
        if (data.errors) {
          alert(data.errors)
       } else {
         this.props.setUser(data)
       }
      })
   }
  }

handleBackButtonClick = (e) => {
  console.log(this.props)
  if (this.props.currentPlant && this.props.currentPlant.queryImage) {
    this.props.currentPlant.backToWol(e, this.props.currentPlant.queryImage)
  } else {
   this.props.history.goBack()
  }
}

  render(){
              let my_garden = []
              let addOrRemove = "add to garden!"
              let addOrRemoveButton = ""

                if (this.props.currentUser && this.props.currentUser.userplants && this.props.currentUser.userplants.length > 0){
                  my_garden = this.props.currentUser.userplants.map(plant => plant.scientific_name)


                  if (this.state.plant.data && this.state.plant.data) {
                   addOrRemove = "remove from garden!"
                 } else {
                   addOrRemove = "add to garden!"
                 }
                }

               if (this.props.currentUser){
                addOrRemoveButton = <button className="showPageButton" onClick={this.addOrRemovePlant} name="cardDetails" value={addOrRemove}>{addOrRemove}</button>
               }

    if (this.props.currentUser){
     addOrRemoveButton = <button className="showPageButton" onClick={this.addOrRemovePlant} name="cardDetails" value={addOrRemove}>{addOrRemove}</button>
    }

    if (this.state.plant.plant_details) {

      let {
      id,
      confirmed,
      plant_details,
      plant_name,
      probability,
      similar_images
      } = this.state.plant

      let images = similar_images.map((i) => <img key={Math.random()} src={i.url} className="showPage_image"/>)

      return (
        <div onClick={this.handleClick} onMouseEnter={this.setScientificName} onMouseLeave={this.resetScientificName} className="card">
        <div className="plantData">
         <h1><TextLoop children={plant_details.common_names}interval={1000} springConfig={{ stiffness: 150 }}></TextLoop></h1>
               {images}
         <p>{confirmed ? "Confirmed: True" : "Confirmed: False"}</p>
         <p>probability: {probability}</p>
         <p>name authority: {plant_details.name_authority}</p>
         <p>scientific name: {plant_details.scientific_name}</p>
         <p>genus: {plant_details.structured_name.genus}</p>
         <p>species: {plant_details.structured_name.species}</p>
         <p>synonyms: </p> <TextLoop children={plant_details.synonyms}interval={1000} springConfig={{ stiffness: 150 }}></TextLoop>

        <h2>Description:</h2>
        <p>{plant_details.wiki_description.value}</p>

        <h2>taxonomy: </h2>
        <p>kingdom: {plant_details.taxonomy.kingdom}</p>
        <p>phylum: {plant_details.taxonomy.phylum}</p>
        <p>class: {plant_details.taxonomy.class}</p>
        <p>order: {plant_details.taxonomy.order}</p>
        <p>family: {plant_details.taxonomy.family}</p>

        <h3>citation:</h3>
        <p><a href={plant_details.wiki_description.citation}>{plant_details.wiki_description.citation}</a></p>
        <p>license: <a href={plant_details.wiki_description.license_url}>{plant_details.wiki_description.license_name}</a></p>
        </div>
        <button className="showPageButton" onClick={this.handleBackButtonClick}> back ↩ </button>
        {addOrRemoveButton}
        </div>
       )

    } else if (this.state.plant.data) {

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
      <div className="plantData">
      <img
        src={this.state.image_url}
        alt={this.props.scientific_name}
        className="showPage_image"
      />
      <p>Common Name: {common_name}</p>
      <p>Scientific Name: {scientific_name}</p>
      <p>Slug: {slug}</p>
      <p>Family Name: {family.name}</p>
      <p>Family Common Name: {family_common_name}</p>
      <p>Genus: {genus.name}</p>
      <p>Species: {main_species.common_name ? main_species.common_name : "FerraFatta"}</p>
      <p>Observations: {observations}</p>
      <p>Sources:</p>
      <div>{sources.map((source, index) => <a ckey={index} href={source.url}><p>{source.url}</p></a>)}</div>
      <div><p>varieties:</p> {varieties.map((varieties, index) => <p key={index} >{varieties.common_name}</p>)}</div>
      <p>is vegetable:{vegetable}</p>
      <p>year of publication{year}</p>
      <p>Author: {author}</p>
      <p>bibliography: {bibliography}</p>
      </div>
      <button className="showPageButton" onClick={this.handleBackButtonClick}> back ↩ </button>
      {addOrRemoveButton}
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
