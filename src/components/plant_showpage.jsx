import React from "react";

class PlantShowPage extends React.Component {
  state = {
    plant: [],
    image_url: ""
  }

  componentDidMount(){
    if (this.props.currentPlant &&  this.props.currentPlant.plant_details) {
      this.setState({
        plant: this.props.plant
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
        plant: data.data
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
        plantid: this.state.plant.data.scientific_name
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

    if (this.props.currentPlant && this.props.currentPlant.plant_details) {
      return (
        <>
         <p>ok</p>
        </>
       )

    } else if (this.state.plant) {

    if(this.state.plant.data){
     let my_garden = []
     let addOrRemove = "add to garden!"
     let addOrRemoveButton = ""
   console.log(this.props)
     if (this.props.currentUser && this.props.currentUser.userplants.length > 0){

  my_garden = this.props.currentUser.userplants.map(plant => plant.scientific_name)
   my_garden.includes(this.state.plant.data.scientific_name) ? addOrRemove = "remove from garden!" :  addOrRemove = "add to garden!"
}

       if (this.props.currentUser){
        addOrRemoveButton = <button className="showPageButton" onClick={this.addOrRemovePlant} name="cardDetails" value={addOrRemove}>{addOrRemove}</button>
       }

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
}

export default PlantShowPage;
