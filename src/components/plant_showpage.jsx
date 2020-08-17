import React from "react";

class PlantShowPage extends React.Component {
  state = {
    plant: []
  }

  componentDidMount(){
    console.log(this.props)
    let API = `http://localhost:3000/api/v1/plants/${this.props.currentPlant.id}`
    fetch(API)
   .then(res => res.json())
   .then(data => {
     if (data.errors) {
       alert(data.errors)
    } else {
      this.setState({
        plant: data.data
      })
    }
   })
  }

  addOrRemovePlant = (event) => {
    event.persist()
  console.log("ok")
    if (event.target.value === "add to garden!") {

    fetch("http://localhost:3000/api/v1/user_plants", {
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

     fetch(`http://localhost:3000/api/v1/user_plants/${this.state.plant.data.scientific_name}`, {
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
    if(this.state.plant.data){
     let my_garden = []
     let addOrRemove = ""
     let addOrRemoveButton = ""

     if (this.props.currentUser && this.props.currentUser.userplants.length > 0){

  my_garden = this.props.currentUser.userplants.map(plant => plant.scientific_name)
   my_garden.includes(this.state.plant.data.scientific_name) ? addOrRemove = "remove from garden!" :  addOrRemove = "add to garden!"
}

       if (this.props.currentUser){
        addOrRemoveButton = <button onClick={this.addOrRemovePlant} className="card_button" name="cardDetails" value={addOrRemove}>{addOrRemove}</button>
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
     <div>{sources.map((source, index) => <a key={index} href={source.url}>{source.url}</a>)}</div>
      <p>Subspecies:</p>
     <div>{subspecies.map((subspecies, index) => <p key={index} >{subspecies.common_name}, </p>)}</div>
      <p>Varieties:</p>
     <div>{varieties.map((varieties, index) => <p key={index} >{varieties.common_name}</p>)}</div>
     <p>{vegetable}</p>
     <p>{year}</p>
     <p>{author}</p>
     <p>{bibliography}</p>

     <button onClick={this.handleBackButtonClick}> back ↩ </button>
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
