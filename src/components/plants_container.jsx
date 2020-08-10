import React from 'react'
import PlantCard from "./plant_card";


let API = 'http://localhost:3000/api/v1/plants'
class PlantsContainer extends React.Component {
  state = {
    plants: []
  }

  componentDidMount() {
    fetch(API)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      this.setState({
        plants: data.data
      })
    })
  }

  render(){
    console.log(this.state)
    if (this.state.plants.data){
      return(
    <div className="cards">
         {
           this.state.plants.data.map(plant => <PlantCard key={plant.id}{...plant}/>)
       }
    </div>
      )
    } else {
   return(
    <>
     <p>loading...</p>
    </>
   )
 }
 }
}
export default PlantsContainer
